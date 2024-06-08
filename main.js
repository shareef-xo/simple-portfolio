document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("recommendation-form");
  const recommendationsList = document.getElementById("recommendations-list");
  const popupOverlay = document.getElementById("popupOverlay");

  function loadRecommendations() {
    const recommendations =
      JSON.parse(localStorage.getItem("recommendations")) || [];
    recommendationsList.innerHTML = "";
    recommendations.forEach((rec) => {
      const box = document.createElement("div");
      box.className = "recommendations-box";
      box.innerHTML = `
          <p class="recommendations-content">${rec.message}</p>
          <p class="recommendations-user">- <span class="user">${rec.name}</span></p>
        `;
      recommendationsList.appendChild(box);
    });
  }

  function addRecommendation(name, message) {
    const recommendations =
      JSON.parse(localStorage.getItem("recommendations")) || [];
    recommendations.push({ name, message });
    localStorage.setItem("recommendations", JSON.stringify(recommendations));
    loadRecommendations();
    openPopup();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    addRecommendation(name, message);
    form.reset();
  });

  loadRecommendations();
});

function openPopup() {
  const popupOverlay = document.getElementById("popupOverlay");
  popupOverlay.classList.add("show");
}

function closePopup() {
  const popupOverlay = document.getElementById("popupOverlay");
  popupOverlay.classList.remove("show");
}

function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  if (this.scrollY >= 100) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

function togglePopup() {
  const popupOverlay = document.getElementById("popupOverlay");
  popupOverlay.classList.toggle("show");
}
