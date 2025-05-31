const { cmd } = require('../command'); // Assuming you have a command handler
const axios = require('axios'); // For making HTTP requests to GitHub API

// GitHub repository details
const REPO_OWNER = 'tonicmeef';
const REPO_NAME = 'TONICI-MD';
const PLUGINS_FOLDER = 'plugins'; // Folder where plugins are stored

// GitHub API base URL
const GITHUB_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${PLUGINS_FOLDER}`;

// Function to fetch commit history for a file
async function fetchCommitHistory(filePath) {
    try {
        const response = await axios.get(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits`, {
            params: {
                path: filePath,
                per_page: 1 // Fetch only the latest commit
            }
        });
        return response.data[0]; // Return the latest commit
    } catch (error) {
        console.error("Error fetching commit history:", error);
        return null;
    }
}

// Function to check if a commit is within the last 2 hours
function isCommitRecent(commit) {
    if (!commit) return false;
    const commitDate = new Date(commit.commit.author.date);
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
    return commitDate >= twoHoursAgo;
}

// Command to list plugins with recent commit history
cmd({
    pattern: "recentplugins", // Command trigger
    alias: ["commits", "newplugins","whatsnew"], // Aliases
    use: '.recentplugins', // Example usage
    react: "🕒", // Emoji reaction
    desc: "List all plugins with commit history from the last 2 hours.", // Description
    category: "utility", // Command category
    filename: __filename // Current file name
},

async (conn, mek, m, { from, reply }) => {
    try {
        // Fetch the folder structure from GitHub
        const response = await axios.get(GITHUB_API_URL);
        const plugins = response.data.filter(item => item.type === 'file'); // Only list files

        if (plugins.length === 0) {
            return reply("*No plugins found in the repository.*");
        }

        // Fetch commit history for each plugin and filter by recent commits
        let recentPlugins = [];
        for (const plugin of plugins) {
            const commit = await fetchCommitHistory(plugin.path);
            if (isCommitRecent(commit)) {
                recentPlugins.push(plugin);
            }
        }

        if (recentPlugins.length === 0) {
            return reply("*No plugins have been updated in the last 2 hours.*");
        }

        // Construct a list of recent plugins
        let pluginList = "🕒 *RECENTLY UPDATED PLUGINS (Last 2 Hours):*\n\n";
        recentPlugins.forEach((plugin, index) => {
            pluginList += `${index + 1}. ${plugin.name}\n`; // Add plugin name to the list
        });

        // Send the list to the user
        await reply(pluginList);
    } catch (error) {
        console.error("Error:", error); // Log the error
        reply("*Error: Unable to fetch plugins from the repository. Please try again later.*");
    }
});
