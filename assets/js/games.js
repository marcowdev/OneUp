const ONEUP_FAVORITES_KEY = 'oneup_favorites';
const ONEUP_RATINGS_KEY = 'oneup_ratings';
const ONEUP_CUSTOM_GAMES_KEY = 'oneup_custom_games';

const defaultGames = [
  {
    id: 'elden-ring',
    title: 'Elden Ring',
    genre: 'RPG',
    platform: 'PC, PlayStation, Xbox',
    icon: '🗡️',
    description: 'RPG de ação em mundo aberto com exploração, chefes difíceis e fantasia sombria.',
  },
  {
    id: 'zelda-totk',
    title: 'Zelda: Tears of the Kingdom',
    genre: 'Aventura',
    platform: 'Nintendo Switch',
    icon: '🛡️',
    description: 'Aventura de exploração, criatividade e resolução de puzzles em mundo aberto.',
  },
  {
    id: 'forza-horizon',
    title: 'Forza Horizon 5',
    genre: 'Corrida',
    platform: 'PC, Xbox',
    icon: '🏎️',
    description: 'Corrida arcade em mundo aberto com carros, eventos e customização.',
  },
  {
    id: 'hades',
    title: 'Hades',
    genre: 'Roguelike',
    platform: 'PC, Consoles',
    icon: '🔥',
    description: 'Roguelike de ação rápido com narrativa forte e progressão viciante.',
  },
  {
    id: 'stardew-valley',
    title: 'Stardew Valley',
    genre: 'Simulação',
    platform: 'PC, Mobile, Consoles',
    icon: '🌾',
    description: 'Simulador de fazenda com pesca, mineração, amizade e construção de rotina.',
  },
  {
    id: 'god-of-war',
    title: 'God of War',
    genre: 'Ação',
    platform: 'PC, PlayStation',
    icon: '🪓',
    description: 'Ação narrativa com combate pesado, mitologia nórdica e forte relação entre pai e filho.',
  },
];

function getCustomGames() {
  return JSON.parse(localStorage.getItem(ONEUP_CUSTOM_GAMES_KEY)) || [];
}

function saveCustomGames(customGames) {
  localStorage.setItem(ONEUP_CUSTOM_GAMES_KEY, JSON.stringify(customGames));
}

function getAllGames() {
  return [...defaultGames, ...getCustomGames()];
}

function createGameSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function addCustomGame(gameData) {
  const customGames = getCustomGames();

  const newGame = {
    id: `${createGameSlug(gameData.title)}-${Date.now()}`,
    title: gameData.title,
    genre: gameData.genre,
    platform: gameData.platform,
    icon: gameData.icon || '🎮',
    description: gameData.description,
    custom: true,
  };

  customGames.push(newGame);
  saveCustomGames(customGames);

  return newGame;
}

function deleteCustomGame(gameId) {
  const customGames = getCustomGames().filter((game) => game.id !== gameId);
  saveCustomGames(customGames);
}

function getFavorites() {
  return JSON.parse(localStorage.getItem(ONEUP_FAVORITES_KEY)) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem(ONEUP_FAVORITES_KEY, JSON.stringify(favorites));
}

function isFavorite(gameId) {
  return getFavorites().includes(gameId);
}

function toggleFavorite(gameId) {
  const favorites = getFavorites();

  if (favorites.includes(gameId)) {
    saveFavorites(favorites.filter((id) => id !== gameId));
    return;
  }

  favorites.push(gameId);
  saveFavorites(favorites);
}

function getRatings() {
  return JSON.parse(localStorage.getItem(ONEUP_RATINGS_KEY)) || {};
}

function saveRating(gameId, rating) {
  const ratings = getRatings();

  ratings[gameId] = rating;

  localStorage.setItem(ONEUP_RATINGS_KEY, JSON.stringify(ratings));
}

function getRating(gameId) {
  const ratings = getRatings();

  return ratings[gameId] || 0;
}

function getGameById(gameId) {
  return getAllGames().find((game) => game.id === gameId);
}

function getFavoriteGames() {
  return getFavorites()
    .map((gameId) => getGameById(gameId))
    .filter(Boolean);
}

function getRatedGames() {
  const ratings = getRatings();

  return Object.keys(ratings)
    .map((gameId) => {
      const game = getGameById(gameId);

      if (!game) return null;

      return {
        ...game,
        rating: ratings[gameId],
      };
    })
    .filter(Boolean);
}