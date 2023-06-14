# FROM node as builder
# WORKDIR /usr/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # stage 2
# FROM node
# WORKDIR /usr/app
# COPY package*.json ./
# RUN npm install --production

# COPY --from=builder /usr/app/dist ./dist

# COPY .env .

# EXPOSE 5000
# CMD node dist/src/server.js

FROM node as builder
WORKDIR /build
ADD *.json /build/
RUN npm install
ADD . /build
RUN npm run build

FROM node
WORKDIR /app
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/*.json ./
RUN npm install --production
EXPOSE 8082
CMD npm run start:prod

