const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');
const postsContainer = document.getElementById('posts-container');
const addPostBtn = document.getElementById('add-post-btn');
const postModal = document.getElementById('post-modal');
const closeBtn = document.querySelector('.close-btn');
const postForm = document.getElementById('post-form');

// --- Theme Logic ---
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
  body.classList.add('light-mode');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  if (body.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  } else {
    localStorage.setItem('theme', 'dark');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
  }
});

// --- Post Management ---
let posts = JSON.parse(localStorage.getItem('design_posts')) || [
  {
    id: 1,
    title: '미니멀리즘과 화이트 스페이스',
    content: '디자인에서 여백은 단순히 비어있는 공간이 아닙니다. 정보의 우선순위를 정하고 시선의 흐름을 유도하는 강력한 도구입니다...',
    tag: 'UI/UX',
    date: '2026-04-15'
  },
  {
    id: 2,
    title: '다크모드 디자인의 핵심 가이드',
    content: '단순히 검은색 배경을 쓰는 것이 다크모드가 아닙니다. 명암비와 눈의 피로도를 고려한 컬러 팔레트 구성이 중요합니다.',
    tag: 'Trend',
    date: '2026-04-14'
  }
];

function renderPosts() {
  postsContainer.innerHTML = '';
  posts.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
      <span class="post-tag">${post.tag}</span>
      <h3 class="post-title">${post.title}</h3>
      <p class="post-content-preview">${post.content}</p>
      <span class="post-date">${post.date}</span>
    `;
    postsContainer.appendChild(card);
  });
}

// Modal Logic
addPostBtn.onclick = () => postModal.style.display = 'block';
closeBtn.onclick = () => postModal.style.display = 'none';
window.onclick = (event) => {
  if (event.target == postModal) postModal.style.display = 'none';
};

// Form Submission
postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newPost = {
    id: Date.now(),
    title: document.getElementById('post-title').value,
    content: document.getElementById('post-content').value,
    tag: document.getElementById('post-tag').value || 'General',
    date: new Date().toISOString().split('T')[0]
  };
  
  posts.push(newPost);
  localStorage.setItem('design_posts', JSON.stringify(posts));
  renderPosts();
  postForm.reset();
  postModal.style.display = 'none';
});

// Initial Render
renderPosts();
