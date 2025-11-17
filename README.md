# prisma-ORM Docker Guide

This project is a Node.js + TypeScript + Express app using Prisma (PostgreSQL).
The provided Dockerfile builds the app, generates Prisma Client, applies pending migrations on start, and runs the server on port 3000.

## Prerequisites
- Docker installed
- A reachable PostgreSQL database URL (for example on your host or in the cloud)

Your `DATABASE_URL` should look like:
```
postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public
```

## Build the image
From the project root:
```bash
docker build -t prisma-orm .
```

## Run the container
Map container port 3000 to host port 3000 and pass the `DATABASE_URL` env var:
```bash
docker run --name prisma-orm \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public" \
  -e NODE_ENV=production \
  prisma-orm
```

- On container start, the entrypoint runs `npx prisma migrate deploy` to apply any pending migrations in the current database.
- Then it starts the server with `node dist/index.js`.
- The Express server listens on port `3000`.

## Verify
Once the container is running, open:
```
http://localhost:3000/
```

## Notes
- For local development with hot-reload (without Docker), you can use:
  ```bash
  npm run dev
  ```
  Ensure your local `.env` has a valid `DATABASE_URL`.
- If you change the Prisma schema, you may need to create and apply a new migration before building the image:
  ```bash
  npx prisma migrate dev --name <migration_name>
  ```

## What the Dockerfile does (brief)
- Uses Node 20 base images and a multi-stage build (builder + runner)
- Installs dependencies with `npm ci`
- Runs `npx prisma generate` to generate the Prisma Client
- Builds TypeScript to `dist/`
- Copies built artifacts into a slim runtime image
- Exposes port 3000
- On start: `prisma migrate deploy` then `node dist/index.js`
