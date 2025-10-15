# 🎬 CINEHOME - Frontend Conectado ao Backend

## 🔗 Sistema Integrado

O frontend CINEHOME agora está **totalmente conectado** ao backend HOME-BACKEND (estado "elis1").

### ✨ Funcionalidades Disponíveis

#### 🔐 **Autenticação Completa**
- ✅ **Login** - Conectado ao backend
- ✅ **Cadastro** - Conectado ao backend  
- ✅ **Esqueceu a senha** - Sistema completo com email

#### 📧 **Recuperação de Senha (3 etapas)**
1. **Digite o email** → Backend envia código por email
2. **Digite o código de 6 dígitos** → Backend valida
3. **Digite nova senha** → Backend atualiza

## 🚀 Como Usar

### 1. **Iniciar o Backend**
```bash
cd HOME-BACKEND/backend
npm start
```
*O backend deve estar rodando em `http://localhost:3001`*

### 2. **Abrir o Frontend**
Abra o arquivo `index.html` no navegador

### 3. **Testar as Funcionalidades**
- **Cadastro**: Crie uma nova conta
- **Login**: Entre com suas credenciais
- **Esqueceu a senha**: Use o workflow completo

## ⚙️ Configuração

### 📁 Arquivos Modificados
- `index.html` - Adicionado script de configuração
- `main.js` - Conectado ao backend HOME-BACKEND
- `config.js` - **NOVO** - Configurações centralizadas

### 🔧 Personalizar URLs
Edite o arquivo `config.js`:

```javascript
const CONFIG = {
  API_BASE_URL: 'http://localhost:3001', // Backend local
  // Para produção: 'https://seu-backend.com'
}
```

## 🔗 Endpoints Conectados

| Função | Frontend | Backend |
|--------|----------|---------|
| **Login** | `main.js` | `POST /api/users/login` |
| **Cadastro** | `main.js` | `POST /api/users/register` |
| **Solicitar código** | `main.js` | `POST /api/users/forgot-password` |
| **Verificar código** | `main.js` | `POST /api/users/verify-reset-code` |
| **Nova senha** | `main.js` | `POST /api/users/reset-password` |

## 🛠️ Recursos Técnicos

### ✅ **Implementado**
- Validação de formulários
- Mensagens de erro específicas
- Loading states nos botões
- Timeout para conexões lentas
- Workflow completo de recuperação
- Sistema de configuração flexível
- Verificação de saúde do backend

### 🔐 **Segurança**
- Códigos temporários (10 minutos)
- Máximo 3 tentativas por código
- Tokens JWT para autenticação
- Validação no frontend e backend

## 📋 Como Testar

### 1. **Teste Completo de Recuperação**
1. Cadastre um usuário
2. Clique em "Esqueceu a senha?"
3. Digite o email cadastrado
4. Verifique o email recebido
5. Digite o código de 6 dígitos
6. Crie uma nova senha
7. Faça login com a nova senha

### 2. **Verificação de Erros**
- Teste com emails inexistentes
- Teste códigos inválidos
- Teste senhas muito curtas
- Teste sem internet/backend

## 🎯 Status da Integração

**✅ COMPLETO** - Frontend totalmente conectado ao backend HOME-BACKEND (estado "elis1")

- **Backend**: Sistema robusto de autenticação + emails
- **Frontend**: Interface responsiva + validações
- **Integração**: Workflow completo funcionando
- **Configuração**: Sistema flexível para mudanças

---

*Desenvolvido para funcionar perfeitamente com o backend HOME-BACKEND salvo como "elis1"*