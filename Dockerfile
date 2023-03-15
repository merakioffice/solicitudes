FROM node:18-alpine
WORKDIR /app
COPY package.json ./
#RUN npm install --force
#RUN npm i -g http-service
COPY . .
RUN ls
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "http"]
