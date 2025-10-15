const emailService = require('./src/services/emailService');

// Função para testar o serviço de email
async function testarEmails() {
  console.log('🧪 Iniciando testes do serviço de email...\n');

  // 1. Verificar configuração SMTP
  console.log('1️⃣ Verificando configuração SMTP...');
  const configOk = await emailService.verifyEmailConfig();
  
  if (!configOk) {
    console.log('❌ Configuração SMTP falhou. Verifique o arquivo .env');
    return;
  }

  // 2. Testar email de recuperação de senha
  console.log('\n2️⃣ Testando email de recuperação de senha...');
  const resetResult = await emailService.sendPasswordResetEmail(
    'teste@exemplo.com', 
    '123456'
  );

  if (resetResult.success) {
    console.log('✅ Email de recuperação enviado com sucesso!');
    console.log('📧 Message ID:', resetResult.messageId);
  } else {
    console.log('❌ Erro ao enviar email de recuperação:', resetResult.error);
  }

  // 3. Testar email de confirmação
  console.log('\n3️⃣ Testando email de confirmação...');
  const confirmResult = await emailService.sendPasswordChangeConfirmation(
    'teste@exemplo.com'
  );

  if (confirmResult.success) {
    console.log('✅ Email de confirmação enviado com sucesso!');
    console.log('📧 Message ID:', confirmResult.messageId);
  } else {
    console.log('❌ Erro ao enviar email de confirmação:', confirmResult.error);
  }

  console.log('\n🎉 Testes concluídos!');
  console.log('\n📋 Resumo:');
  console.log('- Configuração SMTP:', configOk ? '✅ OK' : '❌ Erro');
  console.log('- Email de recuperação:', resetResult.success ? '✅ OK' : '❌ Erro');
  console.log('- Email de confirmação:', confirmResult.success ? '✅ OK' : '❌ Erro');
}

// Executar os testes
testarEmails().catch(error => {
  console.error('💥 Erro durante os testes:', error);
});