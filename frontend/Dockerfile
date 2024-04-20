FROM node:18-alpine

WORKDIR /app

COPY package.json .

# RUN npm install --legacy-peer-deps && npm install --legacy-peer-deps @esbuild/linux-x64

RUN npm  install --legacy-peer-deps

COPY . .

EXPOSE 5173

CMD [ "npm","run","dev" ]