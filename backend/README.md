# 🏠 HOME BACKEND - API em Português Brasileiro

## 📧 Sistema de Email Profissional com Design Moderno

API Node.js/Express com sistema completo de autenticação e recuperação de senha, otimizada para deploy no Render.

---

## 🎨 Características Principais

### 📧 **Emails Profissionais em Português BR**
- ✅ Design moderno com gradiente violeta e branco
- ✅ Textos em português brasileiro
- ✅ Fuso horário América/São_Paulo
- ✅ Templates responsivos para todos os clientes de email

### 🔐 **Sistema de Autenticação Completo**
- ✅ Login/Registro de usuários
- ✅ Recuperação de senha com código de 6 dígitos
- ✅ JWT para sessões seguras
- ✅ Validação robusta de dados

### 🌐 **Otimizado para Produção**
- ✅ Configurado para deploy no Render
- ✅ CORS configurado para frontend
- ✅ Logs detalhados em português
- ✅ Tratamento de erros profissional

---

## 🚀 Deploy Rápido

### 1. **Clone e Configure**
```bash
git clone https://github.com/eliswilliam/BACKEND-FRONTEND.git
cd BACKEND-FRONTEND/backend
npm install
```

### 2. **Configure Variáveis de Ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite com seus dados reais
nano .env
```

### 3. **Execute Localmente**
```bash
npm start
# Servidor rodando em http://localhost:3001
```

---

## ⚙️ Configuração de Variáveis

### 📋 **Variáveis Obrigatórias**

```env
# MongoDB
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db

# JWT
JWT_SECRET=sua-chave-super-secreta

# SMTP (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-aplicativo-16-chars
```

### 🔧 **Configuração Gmail SMTP**

1. Ative autenticação de 2 fatores
2. Gere uma senha de aplicativo
3. Use a senha de 16 caracteres no `SMTP_PASS`

---

## 📡 Endpoints da API

### 🔐 **Autenticação**
```http
POST /api/users/register     # Cadastrar usuário
POST /api/users/login        # Fazer login
```

### 📧 **Recuperação de Senha**
```http
POST /api/users/forgot-password    # Solicitar código
POST /api/users/verify-reset-code  # Verificar código
POST /api/users/reset-password     # Redefinir senha
```

### 🏥 **Health Check**
```http
GET /health                  # Status da API
```

---

## 🎨 Preview dos Emails

### 📧 **Email de Recuperação de Senha**
- **Assunto**: 🔐 Código de Recuperação de Senha
- **Design**: Gradiente violeta com código destacado
- **Idioma**: Português brasileiro
- **Responsivo**: Funciona em todos os clientes

### ✅ **Email de Confirmação**
- **Assunto**: ✅ Senha Alterada com Sucesso
- **Design**: Confirmação visual clara
- **Segurança**: Alertas se não foi o usuário

---

## 🛠️ Desenvolvimento

### 📁 **Estrutura do Projeto**
```
backend/
├── src/
│   ├── app.js              # Aplicação principal
│   ├── config/             # Configurações
│   ├── controllers/        # Lógica de negócio
│   ├── models/             # Modelos do banco
│   ├── routes/             # Rotas da API
│   ├── services/           # Serviços (email, etc)
│   └── utils/              # Utilitários
├── .env.example            # Template de configuração
├── .gitignore              # Arquivos ignorados
└── package.json            # Dependências
```

### 🧪 **Testes**
```bash
# Testar configuração de email
node teste-email.js

# Testar API
curl http://localhost:3001/health
```

---

## 🌐 Deploy no Render

### 1. **Conectar Repository**
- Vá em https://dashboard.render.com
- New → Web Service
- Conecte este repository

### 2. **Configurar Build**
```yaml
Build Command: cd backend && npm install
Start Command: cd backend && npm start
```

### 3. **Configurar Variáveis de Ambiente**
Adicione todas as variáveis do `.env.example` no painel do Render.

### 4. **Deploy Automático**
Cada push para `main` faz deploy automático.

---

## 🔧 Solução de Problemas

### ❌ **"CORS Error"**
**Solução**: Configure CORS no backend
```javascript
app.use(cors({ origin: 'https://seu-frontend.com' }));
```

### ❌ **"Email não enviado"**
**Solução**: Verifique configurações SMTP
- Use senha de aplicativo do Gmail
- Verifique se 2FA está ativo

### ❌ **"Servidor dormindo"**
**Solução**: Normal no Render gratuito
- Primeira requisição pode demorar 30-60s
- Use ferramentas de "ping" para manter ativo

---

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 📞 Suporte

- 🐛 **Issues**: Use as Issues do GitHub
- 📧 **Email**: Configurado para português brasileiro
- 🔧 **Diagnóstico**: Use `diagnostico-render.html` no frontend

---

**🎉 Backend pronto para produção com emails profissionais em português!**

### ⭐ Se este projeto foi útil, deixe uma estrela!

---

*Desenvolvido com ❤️ para a comunidade brasileira*