// DOM Elements
const modal = document.querySelector("#modal");
const openButton = document.querySelector("#open-modal");
const closeButton = document.querySelector(".close-button");


// Event Listeners
openButton.addEventListener("click", (e) => {
    modal.showModal();
});

closeButton.addEventListener("click", (e) => {
    modal.close();
});

