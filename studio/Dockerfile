## USAGE:
# Build:        docker build --target production -t supabase/studio:latest .
# Run:          docker run -p 3000:3000 supabase/studio
# Deploy:       docker push supabase/studio:latest
# Clean build:
#    docker build --target production --no-cache -t supabase/studio:latest .
#    docker builder prune


FROM node:14-slim as base

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system nodejs --uid 1001 --ingroup nodejs

RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /usr/src/app
# Do `npm ci` separately so we can cache `node_modules`
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
COPY package*.json ./
RUN npm clean-install && npm cache clean --force
COPY . .

FROM base as dev
USER nodejs
EXPOSE 8082
CMD ["npm", "run", "dev"]

FROM base as production
RUN npm run build && rm -rf .next/cache/webpack && npm prune --production
USER nodejs
EXPOSE 3000
CMD ["npm", "run", "start"]
