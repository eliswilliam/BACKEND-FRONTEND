# 🎬 CINEHOME - Backend API

> **Sistema completo de autenticação e recuperação de senha para a plataforma CINEHOME**

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## 📋 **Visão Geral**

O CINEHOME Backend é uma API RESTful robusta desenvolvida para gerenciar autenticação de usuários e funcionalidades de recuperação de senha para a plataforma de streaming CINEHOME. O sistema oferece segurança avançada, emails personalizados e uma arquitetura escalável.

## 🚀 **Tecnologias Utilizadas**

### **Backend Framework**
- **Node.js** `v18+` - Runtime JavaScript server-side
- **Express.js** `v5.1.0` - Framework web minimalista e flexível

### **Banco de Dados**
- **MongoDB Atlas** - Banco de dados NoSQL em nuvem
- **Mongoose** `v8.19.1` - ODM para MongoDB e Node.js

### **Autenticação e Segurança**
- **JWT (JSON Web Tokens)** `v9.0.2` - Autenticação stateless
- **bcryptjs** `v3.0.2` - Hash seguro de senhas
- **CORS** `v2.8.5` - Política de compartilhamento de recursos

### **Sistema de Email**
- **Nodemailer** `v6.10.1` - Envio de emails
- **Gmail SMTP** - Serviço de email confiável

### **Configuração**
- **dotenv** `v17.2.3` - Gerenciamento de variáveis de ambiente

## 🏗️ **Arquitetura do Sistema**

```
📁 src/
├── 📁 config/
│   └── db.js              # Configuração MongoDB Atlas
├── 📁 controllers/
│   └── userControllers.js # Lógica de negócio dos usuários
├── 📁 models/
│   └── userModel.js       # Schema do usuário MongoDB
├── 📁 routes/
│   └── userRoutes.js      # Definição das rotas da API
├── 📁 services/
│   └── emailService.js    # Serviço de envio de emails
├── 📁 utils/
│   └── codeGenerator.js   # Geração de códigos seguros
└── app.js                 # Configuração principal da aplicação
```

## 🔐 **Funcionalidades de Segurança**

### **Autenticação JWT**
- Tokens seguros com expiração de 24 horas
- Assinatura criptográfica para validação
- Middleware de proteção de rotas

### **Proteção de Senhas**
- Hash bcrypt com salt de 12 rounds
- Validação de força de senha (mínimo 6 caracteres)
- Política de senhas seguras

### **Sistema de Recuperação**
- Códigos temporários de 6 dígitos
- Expiração automática em 10 minutos
- Máximo de 3 tentativas por código
- Proteção contra ataques de força bruta

## 📧 **Sistema de Email Personalizado**

### **Templates CINEHOME**
- Design responsivo com gradientes personalizados
- Branding completo da marca CINEHOME
- Cores oficiais: `#5555FF` e `#7676f7`
- Ícone de cinema 🎬 integrado

### **Tipos de Email**
1. **Recuperação de Senha**
   - Assunto: "🎬 Código de recuperação CINEHOME"
   - Código destacado de 6 dígitos
   - Instruções claras em português brasileiro

2. **Confirmação de Alteração**
   - Assunto: "✅ Senha alterada com sucesso - CINEHOME"
   - Notificação de segurança
   - Data e hora da alteração

## 🗃️ **Modelo de Dados**

### **Usuário (User Schema)**
```javascript
{
  email: String,              // Email único do usuário
  password: String,           // Senha hasheada com bcrypt
  resetCode: String,          // Código de recuperação (hasheado)
  resetCodeExpiry: Date,      // Data de expiração do código
  resetCodeAttempts: Number,  // Contador de tentativas
  createdAt: Date,           // Data de criação automática
  updatedAt: Date            // Data de atualização automática
}
```

## 🌐 **Endpoints da API**

### **Autenticação**
```http
POST /api/users/register
POST /api/users/login
```

### **Recuperação de Senha**
```http
POST /api/users/forgot-password
POST /api/users/verify-reset-code
POST /api/users/reset-password
```

### **Saúde da API**
```http
GET /health
```

## 📝 **Exemplos de Uso**

### **1. Cadastro de Usuário**
```bash
curl -X POST https://seu-servidor.com/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@exemplo.com",
    "password": "senha123"
  }'
```

### **2. Login**
```bash
curl -X POST https://seu-servidor.com/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@exemplo.com",
    "password": "senha123"
  }'
```

### **3. Solicitar Código de Recuperação**
```bash
curl -X POST https://seu-servidor.com/api/users/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@exemplo.com"
  }'
```

## ⚙️ **Configuração de Ambiente**

### **Variáveis Obrigatórias**
```env
# Banco de Dados
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db

# Servidor
PORT=3001

# Autenticação
JWT_SECRET=sua-chave-secreta-super-segura

# Email SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-aplicacao

# Aplicação
APP_NAME=CINEHOME
RESET_CODE_EXPIRY=10
```

## 🚀 **Instalação e Execução**

### **1. Clonar o Repositório**
```bash
git clone https://github.com/eliswilliam/BACKEND-CADASTROLOGIN.git
cd BACKEND-CADASTROLOGIN
```

### **2. Instalar Dependências**
```bash
npm install
```

### **3. Configurar Ambiente**
```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar com suas configurações
nano .env
```

### **4. Executar Aplicação**
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 🌍 **Deploy na Nuvem**

### **Render.com (Recomendado)**
1. Conectar repositório GitHub
2. Configurar variáveis de ambiente
3. Definir comando de build: `npm install`
4. Definir comando de start: `npm start`

### **Variáveis para Render**
- `MONGO_URI` - String de conexão MongoDB Atlas
- `JWT_SECRET` - Chave secreta para JWT
- `SMTP_HOST` - Servidor SMTP (smtp.gmail.com)
- `SMTP_PORT` - Porta SMTP (587)
- `SMTP_USER` - Email do remetente
- `SMTP_PASS` - Senha de aplicação Gmail
- `APP_NAME` - CINEHOME
- `RESET_CODE_EXPIRY` - 10

## 🔧 **Scripts Disponíveis**

```json
{
  "start": "node src/app.js",        // Produção
  "dev": "nodemon src/app.js",       // Desenvolvimento
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## 📊 **Monitoramento e Logs**

### **Logs da Aplicação**
- ✅ Conexão MongoDB bem-sucedida
- ✅ Configuração email validada
- ✅ Endpoints disponíveis listados
- ❌ Erros de autenticação
- ❌ Falhas de envio de email

### **Health Check**
```bash
GET /health
# Resposta: { "status": "OK", "message": "API CINEHOME operacional" }
```

## 🛡️ **Medidas de Segurança Implementadas**

- **Rate Limiting** - Proteção contra spam de emails
- **Validação de Entrada** - Sanitização de dados
- **CORS Configurado** - Controle de acesso
- **Códigos Temporários** - Expiração automática
- **Hash Seguro** - bcrypt com salt alto
- **Logs Seguros** - Sem exposição de dados sensíveis

## 🤝 **Contribuição**

1. **Fork** o projeto
2. **Crie** uma branch: `git checkout -b feature/nova-funcionalidade`
3. **Commit** suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. **Push** para a branch: `git push origin feature/nova-funcionalidade`
5. **Abra** um Pull Request

## 📜 **Licença**

Este projeto está sob a licença ISC.

## 👨‍💻 **Autor**

**Elis William**
- GitHub: [@eliswilliam](https://github.com/eliswilliam)
- Email: ekoueeliswilliam@gmail.com

---

**🎬 Desenvolvido com ❤️ para a plataforma CINEHOME**

> *Sistema robusto, seguro e escalável para autenticação de usuários*