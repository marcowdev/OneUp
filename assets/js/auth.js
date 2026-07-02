const ONEUP_USERS_KEY = 'oneup_users';
const ONEUP_CURRENT_USER_KEY = 'oneup_current_user';

const ADMIN_USER = {
  id: 'admin-oneup',
  name: 'Administrador',
  email: 'admin@oneup.com',
  password: 'admin123',
  role: 'admin',
  createdAt: '2025-01-01T00:00:00.000Z',
};

function safeParseJSON(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function generateId() {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }

  return String(Date.now());
}

function getUsers() {
  return safeParseJSON(localStorage.getItem(ONEUP_USERS_KEY), []);
}

function saveUsers(users) {
  localStorage.setItem(ONEUP_USERS_KEY, JSON.stringify(users));
}

function seedAdminUser() {
  const users = getUsers();

  const adminIndex = users.findIndex((user) => user.email === ADMIN_USER.email);

  if (adminIndex >= 0) {
    users[adminIndex] = {
      ...users[adminIndex],
      ...ADMIN_USER,
      role: 'admin',
    };
  } else {
    users.push(ADMIN_USER);
  }

  saveUsers(users);
}

function getCurrentUser() {
  return safeParseJSON(localStorage.getItem(ONEUP_CURRENT_USER_KEY), null);
}

function setCurrentUser(user) {
  localStorage.setItem(ONEUP_CURRENT_USER_KEY, JSON.stringify(user));
}

function logout() {
  localStorage.removeItem(ONEUP_CURRENT_USER_KEY);
  window.location.href = 'login.html';
}

function registerUser(name, email, password) {
  seedAdminUser();

  const users = getUsers();

  const normalizedEmail = email.trim().toLowerCase();

  const userAlreadyExists = users.some(
    (user) => user.email.toLowerCase() === normalizedEmail
  );

  if (userAlreadyExists) {
    return {
      success: false,
      message: 'Já existe uma conta cadastrada com este e-mail.',
    };
  }

  const newUser = {
    id: generateId(),
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: 'user',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  return {
    success: true,
    message: 'Conta criada com sucesso. Agora faça login.',
  };
}

function loginUser(email, password) {
  seedAdminUser();

  const users = getUsers();

  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find(
    (storedUser) =>
      storedUser.email.toLowerCase() === normalizedEmail &&
      storedUser.password === password
  );

  if (!user) {
    return {
      success: false,
      message: 'E-mail ou senha inválidos.',
    };
  }

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || 'user',
  };

  setCurrentUser(safeUser);

  return {
    success: true,
    message: 'Login realizado com sucesso.',
    user: safeUser,
  };
}

function protectPage() {
  const user = getCurrentUser();

  if (!user) {
    window.location.href = 'login.html';
    return null;
  }

  return user;
}

function protectAdminPage() {
  const user = protectPage();

  if (!user) return null;

  if (user.role !== 'admin') {
    alert('Acesso permitido apenas para administradores.');
    window.location.href = 'index.html';
    return null;
  }

  return user;
}

function updateHeaderAuthArea() {
  seedAdminUser();

  const authArea = document.querySelector('[data-auth-area]');

  if (!authArea) return;

  const user = getCurrentUser();

  if (!user) {
    authArea.innerHTML = '<a href="login.html">Entrar</a>';
    return;
  }

  if (user.role === 'admin') {
    authArea.innerHTML = `
      <a href="admin.html">Administrador</a>
      <button class="btn-secondary" type="button" onclick="logout()">Sair</button>
    `;
    return;
  }

  authArea.innerHTML = `
    <a href="perfil.html">${user.name}</a>
    <button class="btn-secondary" type="button" onclick="logout()">Sair</button>
  `;
}

seedAdminUser();

window.getUsers = getUsers;
window.getCurrentUser = getCurrentUser;
window.registerUser = registerUser;
window.loginUser = loginUser;
window.logout = logout;
window.protectPage = protectPage;
window.protectAdminPage = protectAdminPage;
window.updateHeaderAuthArea = updateHeaderAuthArea;