const toggleButton = document.querySelector('.green');
const blueBox = document.querySelector('.blue');

toggleButton.addEventListener('click', () => {
    blueBox.classList.toggle('show');
});