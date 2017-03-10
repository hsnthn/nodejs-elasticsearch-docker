FROM nodesource/trusty

# Install app dependencies
COPY package.json package.json
RUN npm install

# Bundle app source
COPY . .

RUN chmod +x wait-for-it.sh
RUN chmod +x wait_and_run.sh

EXPOSE 3000
CMD [ "npm", "start" ]

