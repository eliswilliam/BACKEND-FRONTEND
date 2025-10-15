const nodemailer = require('nodemailer');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true pour 465, false pour les autres ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false // Pour éviter les erreurs de certificat en développement
  }
});

// Verificar a configuração SMTP
const verifyEmailConfig = async () => {
  try {
    await transporter.verify();
    console.log('✅ Configuração de email SMTP validada');
    return true;
  } catch (error) {
    console.error('❌ Erro na configuração de email SMTP:', error.message);
    return false;
  }
};

// Envoyer um email de recuperação de senha
const sendPasswordResetEmail = async (email, resetCode) => {
  const mailOptions = {
    from: {
      name: process.env.APP_NAME || 'HOME BACKEND',
      address: process.env.SMTP_USER
    },
    to: email,
    subject: '🔐 Código de Recuperação de Senha',
    html: `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Código de Recuperação</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8f9ff; font-family: 'Inter', Arial, sans-serif;">
        <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(108, 99, 255, 0.15);">
          
          <!-- Header com gradiente violeta -->
          <div style="background: linear-gradient(135deg, #6c63ff 0%, #9b59b6 50%, #8e44ad 100%); padding: 50px 40px; text-align: center;">
            <div style="background-color: rgba(255, 255, 255, 0.1); border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <div style="font-size: 36px;">🏠</div>
            </div>
            <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
              ${process.env.APP_NAME || 'HOME BACKEND'}
            </h1>
            <p style="margin: 12px 0 0; font-size: 18px; color: rgba(255, 255, 255, 0.9); font-weight: 500;">
              Sistema de Recuperação Segura
            </p>
          </div>
          
          <!-- Conteúdo principal -->
          <div style="padding: 50px 40px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h2 style="color: #6c63ff; margin: 0 0 16px; font-size: 26px; font-weight: 600;">
                Seu Código de Verificação
              </h2>
              <p style="color: #64748b; line-height: 1.7; font-size: 16px; margin: 0;">
                Você solicitou a recuperação da sua senha. Use o código abaixo para redefinir sua senha de forma segura:
              </p>
            </div>
            
            <!-- Código em destaque -->
            <div style="background: linear-gradient(135deg, #f8f9ff 0%, #f0f0ff 100%); border: 3px solid #6c63ff; border-radius: 16px; padding: 32px; text-align: center; margin: 32px 0; position: relative;">
              <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #ffffff; padding: 0 16px; color: #6c63ff; font-size: 14px; font-weight: 600;">
                CÓDIGO DE VERIFICAÇÃO
              </div>
              <div style="font-size: 42px; font-weight: 700; color: #6c63ff; letter-spacing: 8px; font-family: 'Courier New', monospace; margin: 8px 0;">
                ${resetCode}
              </div>
              <div style="margin-top: 16px; color: #64748b; font-size: 14px;">
                Digite este código no aplicativo
              </div>
            </div>
            
            <!-- Informações de segurança -->
            <div style="background: #faf8ff; border: 2px solid #e9e4ff; border-radius: 12px; padding: 24px; margin: 32px 0;">
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="color: #8e44ad; font-size: 20px; margin-top: 2px;">🛡️</div>
                <div>
                  <h3 style="margin: 0 0 8px; color: #8e44ad; font-size: 16px; font-weight: 600;">
                    Informações Importantes de Segurança
                  </h3>
                  <ul style="margin: 0; padding-left: 20px; color: #64748b; font-size: 14px; line-height: 1.6;">
                    <li>Este código expira em <strong style="color: #8e44ad;">${process.env.RESET_CODE_EXPIRY || 10} minutos</strong></li>
                    <li>Use apenas uma vez para redefinir sua senha</li>
                    <li>Nunca compartilhe este código com terceiros</li>
                    <li>Se não solicitou, ignore este email e sua conta permanecerá segura</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Botão de suporte -->
            <div style="text-align: center; margin-top: 40px;">
              <div style="background: #ffffff; border: 2px solid #e9e4ff; border-radius: 12px; padding: 20px; display: inline-block;">
                <p style="margin: 0; color: #64748b; font-size: 14px;">
                  Precisa de ajuda? <br>
                  <strong style="color: #6c63ff;">Entre em contato com nosso suporte</strong>
                </p>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #faf8ff; padding: 30px 40px; text-align: center; border-top: 1px solid #e9e4ff;">
            <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px;">
              Este email foi enviado automaticamente pelo sistema de segurança.
            </p>
            <p style="margin: 0; color: #94a3b8; font-size: 12px;">
              © 2025 ${process.env.APP_NAME || 'HOME BACKEND'}. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      ${process.env.APP_NAME || 'HOME BACKEND'} - Recuperação de Senha
      
      Seu código de verificação: ${resetCode}
      
      Este código expira em ${process.env.RESET_CODE_EXPIRY || 10} minutos.
      
      Se você não solicitou esta recuperação, ignore este email.
      
      Para sua segurança, nunca compartilhe este código com terceiros.
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email de recuperação enviado para:', email);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    return { success: false, error: error.message };
  }
};

// Envoyer um email de confirmação de alteração de senha
const sendPasswordChangeConfirmation = async (email) => {
  const mailOptions = {
    from: {
      name: process.env.APP_NAME || 'HOME BACKEND',
      address: process.env.SMTP_USER
    },
    to: email,
    subject: '✅ Senha Alterada com Sucesso',
    html: `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmação de Alteração</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8f9ff; font-family: 'Inter', Arial, sans-serif;">
        <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(108, 99, 255, 0.15);">
          
          <!-- Header com gradiente violeta de sucesso -->
          <div style="background: linear-gradient(135deg, #6c63ff 0%, #9b59b6 50%, #8e44ad 100%); padding: 50px 40px; text-align: center;">
            <div style="background-color: rgba(255, 255, 255, 0.1); border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <div style="font-size: 36px;">✅</div>
            </div>
            <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
              ${process.env.APP_NAME || 'HOME BACKEND'}
            </h1>
            <p style="margin: 12px 0 0; font-size: 18px; color: rgba(255, 255, 255, 0.9); font-weight: 500;">
              Confirmação de Segurança
            </p>
          </div>
          
          <!-- Conteúdo principal -->
          <div style="padding: 50px 40px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h2 style="color: #6c63ff; margin: 0 0 16px; font-size: 26px; font-weight: 600;">
                Senha Alterada com Sucesso!
              </h2>
              <p style="color: #64748b; line-height: 1.7; font-size: 16px; margin: 0;">
                Sua senha foi alterada com sucesso em nossa plataforma. Sua conta está segura e protegida.
              </p>
            </div>
            
            <!-- Informações da alteração -->
            <div style="background: linear-gradient(135deg, #f8f9ff 0%, #f0f0ff 100%); border: 3px solid #6c63ff; border-radius: 16px; padding: 32px; margin: 32px 0;">
              <div style="text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px;">🔒</div>
                <h3 style="margin: 0 0 12px; color: #6c63ff; font-size: 20px; font-weight: 600;">
                  Alteração Confirmada
                </h3>
                <p style="margin: 0; color: #64748b; font-size: 16px;">
                  <strong>Data e hora:</strong> ${new Date().toLocaleString('pt-BR', {
                    timeZone: 'America/Sao_Paulo',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            
            <!-- Alerta de segurança -->
            <div style="background: #faf8ff; border: 2px solid #e9e4ff; border-radius: 12px; padding: 24px; margin: 32px 0;">
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="color: #8e44ad; font-size: 20px; margin-top: 2px;">🛡️</div>
                <div>
                  <h3 style="margin: 0 0 8px; color: #8e44ad; font-size: 16px; font-weight: 600;">
                    Aviso Importante de Segurança
                  </h3>
                  <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.6;">
                    <strong style="color: #8e44ad;">Você não fez esta alteração?</strong><br>
                    Se você não solicitou esta mudança de senha, entre em contato com nosso suporte 
                    imediatamente ou altere sua senha novamente por segurança.
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Dicas de segurança -->
            <div style="background: #ffffff; border: 2px solid #e9e4ff; border-radius: 12px; padding: 24px; margin: 32px 0;">
              <h3 style="margin: 0 0 16px; color: #6c63ff; font-size: 16px; font-weight: 600;">
                💡 Dicas para Manter sua Conta Segura
              </h3>
              <ul style="margin: 0; padding-left: 20px; color: #64748b; font-size: 14px; line-height: 1.6;">
                <li>Use senhas únicas e complexas</li>
                <li>Não compartilhe suas credenciais</li>
                <li>Faça logout quando usar computadores públicos</li>
                <li>Mantenha seu email de recuperação atualizado</li>
              </ul>
            </div>
            
            <!-- Botão de suporte -->
            <div style="text-align: center; margin-top: 40px;">
              <div style="background: #ffffff; border: 2px solid #e9e4ff; border-radius: 12px; padding: 20px; display: inline-block;">
                <p style="margin: 0; color: #64748b; font-size: 14px;">
                  Precisa de ajuda ou tem dúvidas? <br>
                  <strong style="color: #6c63ff;">Nossa equipe está aqui para ajudar</strong>
                </p>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #faf8ff; padding: 30px 40px; text-align: center; border-top: 1px solid #e9e4ff;">
            <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px;">
              Este email foi enviado automaticamente pelo sistema de segurança.
            </p>
            <p style="margin: 0; color: #94a3b8; font-size: 12px;">
              © 2025 ${process.env.APP_NAME || 'HOME BACKEND'}. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      ${process.env.APP_NAME || 'HOME BACKEND'} - Confirmação de Alteração de Senha
      
      Sua senha foi alterada com sucesso em ${new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo'
      })}.
      
      Se você não fez esta alteração, entre em contato com o suporte imediatamente.
      
      Para sua segurança, mantenha sempre suas credenciais em local seguro.
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email de confirmação enviado para:', email);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Erro ao enviar email de confirmação:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  verifyEmailConfig,
  sendPasswordResetEmail,
  sendPasswordChangeConfirmation
};