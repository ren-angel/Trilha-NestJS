Com o **GitHub Actions**, podemos aplicar CI/CD (Continuous Integration/Continuous Deployment), o que nos permite automatizar testes, builds e deploys para vários tipos de ambientes, como Docker, Azure, entre outros.

#### 1. **Criar o arquivo de workflow**
Dentro do repositório, crie o arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy NestJS App

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      # Checkout do repositório
      - name: Checkout Code
        uses: actions/checkout@v3

      # Configurar o Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      # Instalar dependências
      - name: Install Dependencies
        run: npm install

      # Rodar testes
      - name: Run Tests
        run: npm run test

      # Build do código
      - name: Build Application
        run: npm run build

      # Fazer login no Docker Hub
      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      # Construir e enviar a imagem para o Docker Hub
      - name: Build and Push Docker Image
        run: |
          docker build -t ${{ secrets.DOCKER_USERNAME }}/nestjs-app:latest .
          docker push ${{ secrets.DOCKER_USERNAME }}/nestjs-app:latest

  deploy:
    runs-on: ubuntu-latest
    needs: build

    steps:
      # Fazer login no servidor remoto (exemplo: SSH)
      - name: Deploy to Server
        uses: appleboy/ssh-action@v0.1.8
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            docker pull ${{ secrets.DOCKER_USERNAME }}/nestjs-app:latest
            docker stop nestjs_app || true
            docker rm nestjs_app || true
            docker run -d -p 3000:3000 --name nestjs_app ${{ secrets.DOCKER_USERNAME }}/nestjs-app:latest
```

#### 2. **Configurar os segredos no GitHub**
No repositório do GitHub:
1. Vá para **Settings > Secrets and variables > Actions > New repository secret**.
2. Adicione os seguintes segredos:
   - `DOCKER_USERNAME` (seu usuário do Docker Hub)
   - `DOCKER_PASSWORD` (sua senha do Docker Hub)
   - `SERVER_HOST` (endereço do servidor remoto)
   - `SERVER_USER` (usuário SSH)
   - `SERVER_SSH_KEY` (chave privada para acesso SSH)

---

### **Fluxo Geral**
1. Você faz um `push` para o branch `main`.
2. O GitHub Actions:
   - Faz build da aplicação.
   - Executa os testes.
   - Empacota a aplicação em um contêiner Docker.
   - Publica a imagem no Docker Hub.
   - Faz deploy no servidor remoto usando Docker.