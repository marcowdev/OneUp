const ONEUP_CART_KEY = 'oneup_cart';

const storeItems = [
  {
    id: 'avatar-neon',
    name: 'Avatar Neon',
    category: 'Avatar',
    price: 19.9,
    icon: '🧑‍🚀',
    description: 'Avatar futurista para personalizar seu perfil gamer.',
  },
  {
    id: 'skin-samurai',
    name: 'Skin Samurai Azul',
    category: 'Skin',
    price: 29.9,
    icon: '🥷',
    description: 'Visual inspirado em guerreiros futuristas para destacar seu perfil.',
  },
  {
    id: 'badge-lendario',
    name: 'Insígnia Lendária',
    category: 'Colecionável',
    price: 14.9,
    icon: '🏆',
    description: 'Badge especial para exibir conquistas no perfil.',
  },
  {
    id: 'tema-cyber',
    name: 'Tema Cyber City',
    category: 'Tema',
    price: 24.9,
    icon: '🌃',
    description: 'Tema visual com clima urbano, neon e atmosfera futurista.',
  },
  {
    id: 'pack-emotes',
    name: 'Pack de Emotes',
    category: 'Emotes',
    price: 9.9,
    icon: '😎',
    description: 'Pacote com reações para interagir na comunidade.',
  },
  {
    id: 'moldura-elite',
    name: 'Moldura Elite',
    category: 'Perfil',
    price: 17.9,
    icon: '💠',
    description: 'Moldura premium para destacar seu card de jogador.',
  },
];

function getCart() {
  return JSON.parse(localStorage.getItem(ONEUP_CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(ONEUP_CART_KEY, JSON.stringify(cart));
}

function addToCart(itemId) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === itemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: itemId,
      quantity: 1,
    });
  }

  saveCart(cart);
}

function removeFromCart(itemId) {
  const cart = getCart().filter((item) => item.id !== itemId);
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(ONEUP_CART_KEY);
}

function getCartItems() {
  return getCart()
    .map((cartItem) => {
      const storeItem = storeItems.find((item) => item.id === cartItem.id);

      if (!storeItem) return null;

      return {
        ...storeItem,
        quantity: cartItem.quantity,
        subtotal: storeItem.price * cartItem.quantity,
      };
    })
    .filter(Boolean);
}

function getCartTotal() {
  return getCartItems().reduce((total, item) => total + item.subtotal, 0);
}

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}