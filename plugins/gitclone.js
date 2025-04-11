import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import config from '../config.cjs';

const downloadGitHubRepo = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const repoUrl = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['gitclone', 'ghdownload'];

  if (validCommands.includes(cmd)) {
    if (!repoUrl) return m.reply('Please provide a GitHub repository URL.');

    try {
      await m.React('🕘');

      // Generate folder name and paths
      const repoName = repoUrl.split('/').pop().replace('.git', '') || 'repo';
      const clonePath = path.join('./', repoName);
      const zipPath = `${repoName}.zip`;

      // Clone the repository
      exec(`git clone ${repoUrl} ${clonePath}`, async (error) => {
        if (error) {
          console.error('Error cloning GitHub repository:', error.message);
          m.reply('Failed to clone GitHub repository.');
          await m.React('❌');
          return;
        }

        // Create a zip file
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });
        archive.directory(clonePath, false).pipe(output);
        archive.finalize();

        output.on('close', async () => {
          // Send the zipped repository
          const caption = `> Repository cloned and zipped successfully by ᴊɪɴᴡᴏᴏ ᴠ3💯`;
          await Matrix.sendMedia(m.from, zipPath, 'zip', caption, m);

          // Clean up files and directories
          fs.rmSync(clonePath, { recursive: true, force: true });
          fs.unlinkSync(zipPath);

          await m.React('✅');
        });

        output.on('error', async (err) => {
          console.error('Error zipping repository:', err.message);
          m.reply('Failed to zip GitHub repository.');
          await m.React('❌');
        });
      });
    } catch (error) {
      console.error('Error handling GitHub repository:', error.message);
      m.reply('Failed to process GitHub repository.');
      await m.React('❌');
    }
  }
};

export default downloadGitHubRepo;
