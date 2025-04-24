FROM node:lts-buster
RUN git clone https://github.com/tonicmeef/TONIC-MD
RUN npm install
COPY . .
EXPOSE 9090
CMD ["npm", "start"]
