##############################
# Dockerfile for prisma-ORM  #
##############################

FROM node:20-bookworm-slim AS builder

WORKDIR /app

# Install OpenSSL (important for Prisma)
RUN apt-get update -y && apt-get install -y openssl

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src
RUN npm run build


# ---------------------------
# FINAL RUNNER IMAGE
# ---------------------------
FROM node:20-bookworm-slim AS runner
WORKDIR /app

# Install OpenSSL ALSO in runner (required for Prisma at runtime)
RUN apt-get update -y && apt-get install -y openssl

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["/bin/sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
