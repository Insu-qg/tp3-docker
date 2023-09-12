FROM node:18
WORKDIR /docker-tp3
COPY . .
RUN npm install 
RUN npm run build
RUN npm install serve
CMD npx serve dist -p 1900