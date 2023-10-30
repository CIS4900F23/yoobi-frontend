FROM node:latest
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i -g npm@latest
RUN npm ci && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app/frontend
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
