FROM node
WORKDIR /home/app

COPY package.json package-lock.json ./
RUN ["npm", "ci"]

COPY . .
RUN ["npm", "run", "build"]

EXPOSE 5000
EXPOSE 3000

ENTRYPOINT ["npm", "start"]
