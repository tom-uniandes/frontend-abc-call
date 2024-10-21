FROM node:22.0.0

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli@18.1.4

RUN npm install

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]