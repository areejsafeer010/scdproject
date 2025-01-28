const { validateEmail, setupLoginHandler } = require('./script');

describe('Email Validation Functions', () => {
  test('validateEmail should return true for valid email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co')).toBe(true);
  });

  test('validateEmail should return false for invalid email addresses', () => {
    expect(validateEmail('plainaddress')).toBe(false);
    expect(validateEmail('@missingusername.com')).toBe(false);
    expect(validateEmail('user@.com')).toBe(false);
  });
});

describe('Login Form Handler', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="loginForm">
        <input id="emailInput" type="text" />
        <div id="loginMessage"></div>
      </form>
    `;
  });

  test('setupLoginHandler should display an error message for invalid email', () => {
    setupLoginHandler();
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    document.getElementById('emailInput').value = 'invalidemail';

    loginForm.dispatchEvent(new Event('submit'));
    expect(loginMessage.textContent).toBe('Please enter a valid email address.');
    expect(loginMessage.className).toBe('message error-message');
  });

  test('setupLoginHandler should display a success message for valid email', () => {
    setupLoginHandler();
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    document.getElementById('emailInput').value = 'valid@example.com';

    loginForm.dispatchEvent(new Event('submit'));
    expect(loginMessage.textContent).toBe('Email is valid.');
    expect(loginMessage.className).toBe('message success-message');
  });
});
