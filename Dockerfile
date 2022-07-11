FROM node:18-alpine
WORKDIR /app
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build
CMD ["npm", "start"]