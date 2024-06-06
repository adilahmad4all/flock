# Use a Node.js base image
FROM node:18-alpine As base

ARG SERVICE_PATH
ARG PACKAGE_NAME
ARG PNPM_VERSION
ARG EXPOSED_PORT

# Install package manager
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    npm i --global --no-update-notifier --no-fund pnpm@${PNPM_VERSION}

# Use the node user from the image (instead of the root user)
USER node

# Get all dependencies and install
FROM base AS dependencies

WORKDIR /usr/app

COPY --chown=node:node pnpm-lock.yaml pnpm-workspace.yaml package.json  ./
COPY --chown=node:node ${SERVICE_PATH}/package.json ./${SERVICE_PATH}/package.json
# copy all libs TODO: change to only packages
COPY --chown=node:node ./libs/ ./libs/
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
     pnpm i --frozen-lockfile \ 
    | grep -v "cross-device link not permitted\|Falling back to copying packages from store"
     # --filter ${PACKAGE_NAME}

# Build application using all dependencies, copy necessary files
FROM dependencies AS build

RUN ls ./libs
WORKDIR /usr/app/${SERVICE_PATH}

COPY --chown=node:node ${SERVICE_PATH} ./

ENV NODE_ENV production
RUN pnpm -r build
RUN rm -rf node_modules src \
    && pnpm -r exec -- rm -rf node_modules

# Use base image for correct context, get built files from build stage
# Install only production dependencies
FROM base AS deploy

WORKDIR /usr/app

ENV NODE_ENV production

COPY --chown=node:node --from=build /usr/app .
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    pnpm i --frozen-lockfile  --prod --config.confirmModulesPurge=false\
    | grep -v "cross-device link not permitted\|Falling back to copying packages from store"

RUN ls ${SERVICE_PATH}
ENV EXEC_PATH=${SERVICE_PATH}/dist/main.js

CMD node ${EXEC_PATH}

EXPOSE ${EXPOSED_PORT}

FROM nginx:1.15.8-alpine AS serve

COPY --from=build /usr/app/packages/client/flock/dist/ /usr/share/nginx/html

ENV NODE_ENV production
EXPOSE 80 8080

