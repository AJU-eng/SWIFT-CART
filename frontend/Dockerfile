FROM node:18-alpine

WORKDIR /app

COPY package.json .

# RUN npm install --legacy-peer-deps && npm install --legacy-peer-deps @esbuild/linux-x64

RUN npm  install --legacy-peer-deps

COPY . .



# Run the build process manually to see detailed error messages
RUN npm run build



EXPOSE 5173

CMD [ "npm","run","dev" ]