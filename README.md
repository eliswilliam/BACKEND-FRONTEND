# CINEHOME - Sistema Completo de Autenticação

## 📋 Descrição
Sistema completo de autenticação para a plataforma CINEHOME, incluindo frontend e backend com funcionalidades de:
- Registro e login de usuários
- Recuperação de senha via email
- Interface responsiva
- API RESTful

## 🏗️ Estrutura do Projeto
```
├── front/              # Interface do usuário
│   ├── index.html      # Página de login/registro
│   ├── home.html       # Página principal
│   ├── style.css       # Estilos
│   ├── main.js         # Lógica principal
│   └── config.js       # Configuração da API
└── backend/            # API Node.js
    ├── src/
    │   ├── app.js      # Servidor principal
    │   ├── config/     # Configurações
    │   ├── controllers/# Controladores
    │   ├── models/     # Modelos de dados
    │   ├── routes/     # Rotas da API
    │   ├── services/   # Serviços
    │   └── utils/      # Utilitários
    └── package.json    # Dependências
```

## 🚀 Tecnologias Utilizadas

### Frontend
- HTML5, CSS3, JavaScript
- Design responsivo
- Interface moderna

### Backend
- Node.js v18+
- Express.js v5.1.0
- MongoDB Atlas com Mongoose v8.19.1
- JWT v9.0.2 para autenticação
- bcryptjs v3.0.2 para hash de senhas
- Nodemailer v6.10.1 para envio de emails

## 📦 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/eliswilliam/BACKEND-FRONTEND.git
cd BACKEND-FRONTEND
```

### 2. Configure o Backend
```bash
cd backend
npm install
```

### 3. Configure as variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e configure:
```bash
cp .env.example .env
```

### 4. Configuração das variáveis de ambiente:
```env
MONGO_URI=sua_string_de_conexao_mongodb
JWT_SECRET=sua_chave_secreta_jwt
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_de_aplicativo
APP_NAME=CINEHOME
FRONTEND_URL=https://seu-frontend.com
RESET_CODE_EXPIRY=10
```

### 5. Inicie o servidor
```bash
npm start
```

## 🌐 Endpoints da API

### Autenticação
- `POST /api/users/register` - Registro de usuário
- `POST /api/users/login` - Login de usuário

### Recuperação de Senha
- `POST /api/users/forgot-password` - Solicitar código de recuperação
- `POST /api/users/verify-reset-code` - Verificar código
- `POST /api/users/reset-password` - Redefinir senha

### Saúde da API
- `GET /health` - Status da API

## 📱 Frontend

### Configuração
Edite o arquivo `front/config.js`:
```javascript
const CONFIG = {
    API_BASE_URL: 'https://sua-api.render.com'
};
```

### Funcionalidades
- Login e registro de usuários
- Recuperação de senha por email
- Interface responsiva
- Validação de formulários

## 🚀 Deploy

### Deploy do Backend (Render)
1. Conecte seu repositório ao Render
2. Configure as variáveis de ambiente:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
   - `APP_NAME=CINEHOME`
   - `FRONTEND_URL`
   - `RESET_CODE_EXPIRY=10`

### Deploy do Frontend
1. Configure a URL da API em `config.js`
2. Hospede os arquivos estáticos

## 🔐 Segurança
- Senhas criptografadas com bcryptjs
- Autenticação JWT
- Códigos de recuperação com expiração
- Validação de entrada
- CORS configurado

## 📧 Sistema de Email
O sistema envia emails personalizados em português para:
- Confirmação de recuperação de senha
- Códigos de verificação
- Confirmação de alteração de senha

## 🛠️ Desenvolvimento

### Scripts disponíveis
```bash
npm start       # Iniciar servidor
npm run dev     # Modo desenvolvimento com nodemon
```

### Estrutura de dados
```javascript
// Usuário
{
  name: String,
  email: String (único),
  password: String (hash),
  resetCode: String,
  resetCodeExpires: Date
}
```

## 📞 Suporte
Para dúvidas ou problemas, consulte a documentação ou entre em contato.

---
**CINEHOME** - Sua plataforma de entretenimento 🎬