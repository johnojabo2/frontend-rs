from node:22-alpine
workdir /app
copy package.json .
run npm install && npm install -g serve
copy . .
run npm run build
cmd ["serve", "-p", "3000", "-d", "dist"]

