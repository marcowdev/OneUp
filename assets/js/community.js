const ONEUP_POSTS_KEY = 'oneup_posts';

const defaultPosts = [
  {
    id: 'post-1',
    author: 'OneUp Team',
    content: 'Bem-vindo à comunidade OneUp! Compartilhe recomendações, avaliações e experiências com outros jogadores.',
    likes: 3,
    createdAt: '2025-01-10T12:00:00.000Z',
  },
  {
    id: 'post-2',
    author: 'PlayerXP',
    content: 'Qual jogo vocês mais recomendam para quem gosta de mundo aberto e exploração?',
    likes: 5,
    createdAt: '2025-01-11T16:30:00.000Z',
  },
];

function getPosts() {
  const storedPosts = JSON.parse(localStorage.getItem(ONEUP_POSTS_KEY));

  if (!storedPosts || storedPosts.length === 0) {
    localStorage.setItem(ONEUP_POSTS_KEY, JSON.stringify(defaultPosts));
    return defaultPosts;
  }

  return storedPosts;
}

function savePosts(posts) {
  localStorage.setItem(ONEUP_POSTS_KEY, JSON.stringify(posts));
}

function createPost(author, content) {
  const posts = getPosts();

  const newPost = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    author,
    content,
    likes: 0,
    createdAt: new Date().toISOString(),
  };

  posts.unshift(newPost);
  savePosts(posts);
}

function likePost(postId) {
  const posts = getPosts();

  const post = posts.find((item) => item.id === postId);

  if (!post) return;

  post.likes += 1;

  savePosts(posts);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}