FROM node:22-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./
COPY prisma ./prisma

RUN pnpm install 
RUN npx prisma generate

COPY . .

RUN pnpm run build 

EXPOSE 3000

CMD [ "pnpm", "run", "dev" ]

