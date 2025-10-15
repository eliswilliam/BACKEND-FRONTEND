document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 CINEHOME carregado!');

  // Vérifier la connexion au backend
  checkBackendHealth().then(isHealthy => {
    if (isHealthy) {
      console.log('✅ Backend HOME-BACKEND conectado e funcionando!');
    } else {
      console.warn('⚠️ Backend HOME-BACKEND não está disponível');
      console.warn('📋 Certifique-se de que o backend está rodando em:', CONFIG.API_BASE_URL);
    }
  });

  const loginText = document.querySelector(".title-text .login");
  const loginFormUI = document.querySelector("form.login");
  const loginBtn = document.querySelector("label.slide.login");
  const signupBtn = document.querySelector("label.slide.signup");
  const signupLink = document.querySelector("form .signup-link a");

  const forgotPasswordLink = document.querySelector('.pass-link a');
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  const verifyCodeForm = document.getElementById('verifyCodeForm');
  const signupForm = document.getElementById('signupForm');
  const backToLoginLink = document.getElementById('backToLogin');
  const backToForgotLink = document.getElementById('backToForgot');

  console.log('🔍 Elementos encontrados:', {
    loginText: !!loginText,
    loginFormUI: !!loginFormUI,
    loginBtn: !!loginBtn,
    signupBtn: !!signupBtn,
    signupLink: !!signupLink,
    forgotPasswordLink: !!forgotPasswordLink
  });

  if (signupBtn && loginFormUI && loginText) {
    signupBtn.onclick = () => {
      showForm(signupForm);
      console.log('📝 Mudou para cadastro');
    };
  }

  if (loginBtn && loginFormUI && loginText) {
    loginBtn.onclick = () => {
      showForm(loginFormUI);
      console.log('🔑 Mudou para login');
    };
  }

  if (signupLink && signupBtn) {
    signupLink.onclick = () => {
      signupBtn.click();
      return false;
    };
  }

  function resetInterface() {
    const forms = [loginFormUI, signupForm, forgotPasswordForm, verifyCodeForm];
    forms.forEach(form => {
      if (form) {
        form.style.display = 'none';
        form.classList.remove('form-transition', 'active');
      }
    });
    
    if (loginFormUI) loginFormUI.style.display = 'block';
    if (signupForm) signupForm.style.display = 'block';
  }

  function showForm(formToShow) {
    const forms = [loginFormUI, signupForm, forgotPasswordForm, verifyCodeForm];
    
    forms.forEach(form => {
      if (form) form.style.display = 'none';
    });
    
    if (formToShow === loginFormUI) {
      resetInterface();
      
      if (loginFormUI && loginText) {
        loginFormUI.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
      }
      
      const loginRadio = document.getElementById('login');
      if (loginRadio) loginRadio.checked = true;
      
    } else if (formToShow === signupForm) {
      resetInterface();
      
      if (loginFormUI && loginText) {
        loginFormUI.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
      }
      
      const signupRadio = document.getElementById('signup');
      if (signupRadio) signupRadio.checked = true;
      
    } else if (formToShow) {
      if (loginFormUI) loginFormUI.style.display = 'none';
      if (signupForm) signupForm.style.display = 'none';
      
      formToShow.style.display = 'block';
      formToShow.classList.add('form-transition', 'active');
    }
  }

  if (forgotPasswordLink) {
    forgotPasswordLink.onclick = (e) => {
      e.preventDefault();
      showForm(forgotPasswordForm);
      console.log('🔐 Mudou para recuperação de senha');
    };
  }

  if (backToLoginLink) {
    backToLoginLink.onclick = (e) => {
      e.preventDefault();
      showForm(loginFormUI);
      console.log('🔑 Voltou para login');
    };
  }

  if (backToForgotLink) {
    backToForgotLink.onclick = (e) => {
      e.preventDefault();
      showForm(forgotPasswordForm);
      console.log('🔐 Voltou para recuperação');
    };
  }

  function showLoadingButton(button, text, isLoading = true) {
    if (isLoading) {
      button.disabled = true;
      button.dataset.originalValue = button.value;
      button.value = text;
      button.style.opacity = '0.7';
      button.style.cursor = 'not-allowed';
    } else {
      button.disabled = false;
      button.value = button.dataset.originalValue || button.value;
      button.style.opacity = '1';
      button.style.cursor = 'pointer';
    }
  }

  const loginForm = document.querySelector('form.login');
  console.log('🔑 Formulário de login:', !!loginForm);

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('🚀 Login iniciado');

      const emailInput = loginForm.querySelector('input[type="email"], input[type="text"]');
      const passwordInput = loginForm.querySelector('input[type="password"]');
      const submitBtn = loginForm.querySelector('input[type="submit"]');

      if (!emailInput || !passwordInput || !submitBtn) {
        console.error('❌ Elementos do formulário não encontrados');
        return;
      }

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (!email || !password) {
        alert('❌ Por favor, preencha todos os campos');
        return;
      }

        try {
          showLoadingButton(submitBtn, '⏳ Entrando...', true);        const response = await fetch(getApiUrl('LOGIN'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        });

        console.log('📥 Resposta recebida:', response.status);
        
        if (!response.ok) {
          let errorMessage = '';
          switch (response.status) {
            case 400:
              errorMessage = '❌ Dados inválidos: Verifique seu email e senha';
              break;
            case 401:
              errorMessage = '❌ Email ou senha incorretos';
              break;
            case 404:
              errorMessage = '❌ Conta não encontrada: Este email não existe';
              break;
            case 429:
              errorMessage = '❌ Muitas tentativas: Aguarde alguns minutos';
              break;
            case 500:
              errorMessage = '❌ Erro do servidor: Tente novamente em instantes';
              break;
            default:
              errorMessage = `❌ Erro de conexão (Código: ${response.status})`;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('✅ Login bem-sucedido:', data);

        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', email);
        
        showLoadingButton(submitBtn, '🎬 Redirecionando...', true);
        
        setTimeout(() => {
          window.location.href = 'home.html';
        }, 400);
        
      } catch (error) {
        console.error('❌ Erro no login:', error);
        alert(error.message || '❌ Não foi possível conectar ao servidor. Verifique sua internet.');
      } finally {
        setTimeout(() => showLoadingButton(submitBtn, '', false), 2000);
      }
    });
  } else {
    console.error('❌ Formulário de login não encontrado!');
  }

  console.log('📝 Formulário de cadastro:', !!signupForm);
  
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('🚀 Cadastro iniciado');

      const emailInput = signupForm.querySelector('input[type="email"], input[type="text"]');
      const passwordInputs = signupForm.querySelectorAll('input[type="password"]');
      const submitBtn = signupForm.querySelector('input[type="submit"]');

      if (!emailInput || passwordInputs.length < 2 || !submitBtn) {
        console.error('❌ Elementos do formulário não encontrados');
        return;
      }

      const email = emailInput.value.trim();
      const password = passwordInputs[0].value;
      const confirmPassword = passwordInputs[1].value;

      if (!email || !password || !confirmPassword) {
        alert('❌ Por favor, preencha todos os campos');
        return;
      }

      if (password !== confirmPassword) {
        alert('❌ As senhas não coincidem. Verifique e tente novamente.');
        return;
      }

      if (password.length < CONFIG.SETTINGS.PASSWORD_MIN_LENGTH) {
        alert(`❌ A senha deve ter pelo menos ${CONFIG.SETTINGS.PASSWORD_MIN_LENGTH} caracteres`);
        return;
      }

        try {
          showLoadingButton(submitBtn, '⏳ Cadastrando...', true);        const response = await fetch(getApiUrl('REGISTER'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        });

        console.log('📥 Resposta recebida:', response.status);

        if (!response.ok) {
          let errorMessage = '';
          switch (response.status) {
            case 400:
              errorMessage = '❌ Email já cadastrado: Use outro email ou faça login';
              break;
            case 422:
              errorMessage = '❌ Dados inválidos: Verifique o formato do email';
              break;
            case 500:
              errorMessage = '❌ Erro do servidor: Tente novamente em instantes';
              break;
            default:
              errorMessage = `❌ Erro de conexão (Código: ${response.status})`;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('✅ Cadastro bem-sucedido:', data);

        showLoadingButton(submitBtn, '🎉 Conta criada!', true);
        
        setTimeout(() => {
          signupForm.reset();
          loginBtn.click();
          alert('✅ Conta criada com sucesso! Agora você pode fazer login.');
        }, 1000);

      } catch (error) {
        console.error('❌ Erro no cadastro:', error);
        alert(error.message || '❌ Não foi possível conectar ao servidor. Verifique sua internet.');
      } finally {
        setTimeout(() => showLoadingButton(submitBtn, '', false), 2000);
      }
    });
  } else {
    console.error('❌ Formulário de cadastro não encontrado!');
  }

  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('📧 Solicitação de código iniciada');

      const emailInput = document.getElementById('forgotEmail');
      const submitBtn = forgotPasswordForm.querySelector('input[type="submit"]');
      const email = emailInput.value.trim();

      if (!email || !email.includes('@')) {
        alert('❌ Por favor, digite um email válido');
        return;
      }

        try {
          showLoadingButton(submitBtn, '📧 Enviando...', true);        // Timeout para mobile (12 segundos)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.SETTINGS.REQUEST_TIMEOUT);

        const response = await fetch(getApiUrl('FORGOT_PASSWORD'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ email }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          let errorMessage = '';
          switch (response.status) {
            case 400:
              errorMessage = '❌ Email inválido. Verifique e tente novamente.';
              break;
            case 429:
              errorMessage = '❌ Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.';
              break;
            case 500:
              errorMessage = '❌ Erro no servidor. Tente novamente em instantes.';
              break;
            default:
              errorMessage = `❌ Erro de conexão (${response.status}). Verifique sua internet.`;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('✅ Resposta do servidor:', data);
        
        alert(`✅ Código enviado com sucesso!\n\nVerifique seu email e digite o código de 6 dígitos recebido.\n\nO código expira em ${data.expiresIn || '10 minutos'}.`);
        showForm(verifyCodeForm);
        sessionStorage.setItem('resetEmail', email);

      } catch (error) {
        console.error('❌ Erro ao enviar código:', error);
        
        let errorMessage = '❌ Erro ao enviar código. Tente novamente.';
        
        if (error.name === 'AbortError') {
          errorMessage = '❌ Conexão muito lenta. Verifique sua internet e tente novamente.';
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        alert(errorMessage);
      } finally {
        showLoadingButton(submitBtn, '', false);
      }
    });
  }

  if (verifyCodeForm) {
    verifyCodeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('🔐 Verificação de código iniciada');

      const codeInput = document.getElementById('verificationCode');
      const newPasswordInput = document.getElementById('newPassword');
      const confirmPasswordInput = document.getElementById('confirmNewPassword');
      const submitBtn = verifyCodeForm.querySelector('input[type="submit"]');

      const code = codeInput.value.trim();
      const newPassword = newPasswordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      const email = sessionStorage.getItem('resetEmail');

      if (!code) {
        alert('❌ Digite o código recebido');
        return;
      }

      if (!newPassword || newPassword.length < CONFIG.SETTINGS.PASSWORD_MIN_LENGTH) {
        alert(`❌ A senha deve ter pelo menos ${CONFIG.SETTINGS.PASSWORD_MIN_LENGTH} caracteres`);
        return;
      }

      if (newPassword !== confirmPassword) {
        alert('❌ As senhas não coincidem');
        return;
      }

        try {
          showLoadingButton(submitBtn, '🔍 Verificando...', true);        // Étape 1: Vérifier le code
        const verifyResponse = await fetch(getApiUrl('VERIFY_RESET_CODE'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email, 
            code
          })
        });

        if (!verifyResponse.ok) {
          const error = await verifyResponse.json();
          throw new Error(error.message || 'Código inválido ou expirado');
        }

        const verifyData = await verifyResponse.json();
        const resetToken = verifyData.resetToken;

        // Étape 2: Redéfinir la senha com o token
        showLoadingButton(submitBtn, '🔐 Redefinindo...', true);
        
        const resetResponse = await fetch(getApiUrl('RESET_PASSWORD'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            resetToken, 
            newPassword 
          })
        });

        if (!resetResponse.ok) {
          const error = await resetResponse.json();
          throw new Error(error.message || 'Erro ao redefinir senha');
        }

        const resetData = await resetResponse.json();
        console.log('✅ Senha redefinida:', resetData);
        
        alert('✅ Senha redefinida com sucesso!\n\nAgora você pode fazer login com sua nova senha.');
        
        sessionStorage.removeItem('resetEmail');
        verifyCodeForm.reset();
        showForm(loginFormUI);

      } catch (error) {
        console.error('❌ Erro ao redefinir senha:', error);
        alert(error.message || '❌ Erro ao redefinir senha. Verifique o código.');
      } finally {
        showLoadingButton(submitBtn, '', false);
      }
    });
  }

  console.log('🎉 CINEHOME inicializado com sucesso!');
});