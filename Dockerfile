FROM hayd/alpine-deno:1.0.0
WORKDIR /usr/src/app
COPY . .
EXPOSE 8080
CMD [ "deno", "run", "--allow-net", "--allow-env", "--allow-write", "--allow-read", "--allow-plugin", "--unstable", "--config", "tsconfig.json", "src/server.ts" ]