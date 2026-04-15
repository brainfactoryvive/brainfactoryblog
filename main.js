const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers-container');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Theme Toggle Logic
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

// Lotto Generation Logic
generateBtn.addEventListener('click', () => {
  lottoNumbersContainer.innerHTML = '';
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }

  const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

  sortedNumbers.forEach((number, index) => {
    const numberDiv = document.createElement('div');
    numberDiv.classList.add('lotto-number');
    numberDiv.textContent = number;
    numberDiv.style.animationDelay = `${index * 0.1}s`;
    lottoNumbersContainer.appendChild(numberDiv);
  });
});
