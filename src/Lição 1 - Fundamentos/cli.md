### **Instalação da CLI do NestJS**
Antes de começar, certifique-se de que você tenha o **Node.js** e o **npm** instalados. Então, instale a CLI globalmente:

```bash
npm i -g @nestjs/cli
```

---

### **Comandos Comuns da CLI**

#### **1. Criar um Novo Projeto**
```bash
nest new nome-do-projeto
```
- Este comando cria uma estrutura básica de projeto NestJS.
- Durante a execução, você pode escolher entre **npm**, **yarn** ou **pnpm** para gerenciar pacotes.

---

#### **2. Rodar a Aplicação**
Dentro do diretório do projeto:
```bash
npm run start
```
Outras variações para ambiente:
- **Desenvolvimento com hot-reload:** `npm run start:dev`
- **Produção:** `npm run start:prod`

---

#### **3. Criar Módulos**
Os módulos organizam funcionalidade relacionada.

```bash
nest generate module nome-do-modulo
```
**Exemplo:**
```bash
nest g module users
```
Isso criará um arquivo `users.module.ts` no diretório `src/users`.

---

#### **4. Criar Controladores**
Os controladores gerenciam as rotas HTTP.

```bash
nest generate controller nome-do-controlador
```
**Exemplo:**
```bash
nest g controller users
```
Isso criará:
- Um arquivo `users.controller.ts`.
- Se um módulo `users` existir, o controlador será registrado automaticamente nele.

---

#### **5. Criar Serviços**
Os serviços encapsulam a lógica de negócios.

```bash
nest generate service nome-do-servico
```
**Exemplo:**
```bash
nest g service users
```
Isso criará:
- Um arquivo `users.service.ts`.
- O serviço será automaticamente registrado no módulo correspondente.

---

#### **6. Gerar um Recurso Completo**
O comando `resource` cria automaticamente um módulo, controlador e serviço para um recurso.

```bash
nest generate resource nome-do-recurso
```
Durante a execução, você será questionado:
- Tipo de transporte HTTP (REST ou GraphQL).
- Deseja incluir operações CRUD básicas.

**Exemplo:**
```bash
nest g resource products
```
Isso criará:
- `products.module.ts`
- `products.controller.ts`
- `products.service.ts`

Além disso, incluirá métodos básicos para manipulação CRUD.

---

### **Outros Comandos Úteis**
- **Criar um Gateway (WebSocket):**
  ```bash
  nest generate gateway nome-do-gateway
  ```
- **Criar um Middleware:**
  ```bash
  nest generate middleware nome-do-middleware
  ```
- **Criar um Guard (Guarda de Rotas):**
  ```bash
  nest generate guard nome-do-guard
  ```
- **Criar um Interceptor:**
  ```bash
  nest generate interceptor nome-do-interceptor
  ```
- **Criar um Pipe:**
  ```bash
  nest generate pipe nome-do-pipe
  ```

---

### **Personalizar Diretórios de Saída**
Você pode especificar o diretório ao gerar arquivos:
```bash
nest generate controller pasta/nome-do-controller
```

---

### **Ajuda com a CLI**
Para ver todos os comandos disponíveis e suas opções:
```bash
nest --help
```