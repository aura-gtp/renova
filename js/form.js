/* ========================================
   RENOVA — Form → WhatsApp
   Captura dados do formulário e envia via WhatsApp
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', handleFormSubmit);

  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
}

function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const fields = {
    name: form.querySelector('#form-name'),
    company: form.querySelector('#form-company'),
    phone: form.querySelector('#form-phone'),
    email: form.querySelector('#form-email'),
    type: form.querySelector('#form-type'),
    message: form.querySelector('#form-message')
  };

  // Validate all fields
  let isValid = true;
  Object.values(fields).forEach(field => {
    if (field && !validateField(field)) {
      isValid = false;
    }
  });

  if (!isValid) {
    showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
    return;
  }

  // Build WhatsApp message
  const whatsappMessage = buildWhatsAppMessage(fields);
  const whatsappNumber = '5549999184631';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Show success notification
  showNotification('Redirecionando para o WhatsApp...', 'success');

  // Open WhatsApp after a brief delay
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
  }, 800);

  // Reset form
  form.reset();
  form.querySelectorAll('.form__field').forEach(field => {
    field.classList.remove('filled', 'error', 'success');
  });
}

function buildWhatsAppMessage(fields) {
  const lines = [
    '🏭 *SOLICITAÇÃO DE ORÇAMENTO*',
    '━━━━━━━━━━━━━━━━━━━',
    '',
    `👤 *Nome:* ${fields.name?.value || ''}`,
    `🏢 *Empresa:* ${fields.company?.value || 'Não informada'}`,
    `📞 *Telefone:* ${fields.phone?.value || ''}`,
    `📧 *E-mail:* ${fields.email?.value || ''}`,
    `🔧 *Tipo:* ${fields.type?.value || 'Não especificado'}`,
    '',
    '💬 *Mensagem:*',
    fields.message?.value || '',
    '',
    '━━━━━━━━━━━━━━━━━━━',
    '_Mensagem enviada pelo site renovamaquinasindustriais.com.br_'
  ];

  return lines.join('\n');
}

function validateField(field) {
  const wrapper = field.closest('.form__field');
  const value = field.value.trim();
  let isValid = true;

  // Remove previous states
  if (wrapper) {
    wrapper.classList.remove('error', 'success');
  }

  // Check required
  if (field.hasAttribute('required') && !value) {
    isValid = false;
  }

  // Check email
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(value);
  }

  // Check phone
  if (field.type === 'tel' && value) {
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    isValid = phoneRegex.test(value);
  }

  // Apply state
  if (wrapper) {
    if (!isValid) {
      wrapper.classList.add('error');
      field.classList.add('error');
    } else if (value) {
      wrapper.classList.add('success');
      field.classList.remove('error');
    }
  }

  return isValid;
}

function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button class="notification__close" aria-label="Fechar">&times;</button>
  `;

  document.body.appendChild(notification);

  // Animate in
  requestAnimationFrame(() => {
    notification.classList.add('visible');
  });

  // Close button
  notification.querySelector('.notification__close').addEventListener('click', () => {
    notification.classList.remove('visible');
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove
  setTimeout(() => {
    notification.classList.remove('visible');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Phone mask
document.addEventListener('DOMContentLoaded', () => {
  const phoneInput = document.getElementById('form-phone');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    e.target.value = value;
  });
});
