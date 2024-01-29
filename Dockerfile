FROM node:latest
WORKDIR /gestoraapi
COPY . .

RUN rm -rf node_modules
RUN npm i

CMD ["npm", "start"]

EXPOSE 3333