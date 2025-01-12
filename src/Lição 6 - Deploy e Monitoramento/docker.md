O uso do **Docker** encapsula a aplicação em um contêiner, garantindo que ela funcione da mesma forma em qualquer ambiente.

#### 1. **Criar um Dockerfile**
O `Dockerfile` é o ponto de partida para empacotar a aplicação.

```dockerfile
# Usar uma imagem base do Node.js
FROM node:18

# Definir diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar arquivos do package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install --production

# Copiar todo o código para dentro do contêiner
COPY . .

# Compilar o código TypeScript para JavaScript
RUN npm run build

# Expor a porta que a aplicação usa
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]
```

#### 2. **Criar um arquivo `docker-compose.yml` (opcional)**
Para gerenciar serviços como banco de dados e o app em conjunto.

```yaml
version: '3.8'
services:
  app:
    build: .
    container_name: nestjs_app
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
    depends_on:
      - db

  db:
    image: postgres:15
    container_name: postgres_db
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydatabase
```

#### 3. **Comandos Docker**
- Construir a imagem:  
  ```bash
  docker build -t nestjs-app .
  ```
- Rodar o contêiner:  
  ```bash
  docker run -p 3000:3000 nestjs-app
  ```
- Usar Docker Compose:  
  ```bash
  docker-compose up --build -d
  ```