const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

menuBtn.addEventListener("click", () => {
  const opened = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(opened));
  menuBtn.setAttribute("aria-label", opened ? "Menyuni yopish" : "Menyuni ochish");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

searchBtn.addEventListener("click", () => {
  searchPanel.classList.add("open");
  searchInput.focus();
});

closeSearch.addEventListener("click", () => {
  searchPanel.classList.remove("open");
  searchInput.value = "";
  searchResults.replaceChildren();
});

const products = [
  { name: "iPhone", url: "https://www.apple.com/uz/iphone/" },
  { name: "MacBook", url: "https://www.apple.com/mac/" },
  { name: "iPad", url: "https://www.apple.com/ipad/" },
  { name: "Apple Watch", url: "https://www.apple.com/watch/" },
  { name: "AirPods", url: "https://www.apple.com/airpods/" }
];

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  searchResults.replaceChildren();
  if (!query) return;

  const found = products.filter(product => product.name.toLowerCase().includes(query));
  if (!found.length) {
    const message = document.createElement("p");
    message.textContent = "Mahsulot topilmadi.";
    searchResults.appendChild(message);
    return;
  }

  found.forEach(product => {
    const link = document.createElement("a");
    link.href = product.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = product.name;
    searchResults.appendChild(link);
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    searchPanel.classList.remove("open");
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});
