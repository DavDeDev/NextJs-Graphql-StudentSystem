FROM node:18-alpine as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# enbable corepack to use pnpm
RUN corepack enable
COPY . /pulsecare-webapp
WORKDIR /pulsecare-webapp

FROM base AS deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm exec next telemetry disable

# https://docs.docker.com/build/building/multi-stage/#differences-between-legacy-builder-and-buildkit



FROM deps as production-bundle
RUN pnpm build

FROM deps as development
EXPOSE 3000
CMD ["pnpm", "dev"]


FROM production-bundle as production
EXPOSE 3000
CMD ["pnpm", "start"]

