const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");
const menuItems = document.querySelectorAll(".menu-item");

openMenu.addEventListener("click", () => {
  aside.classList.add("aside-visible");
});

closeMenu.addEventListener("click", () => {
  aside.classList.remove("aside-visible");
});

menuItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    aside.classList.remove("aside-visible");
    event.stopPropagation();
  });
});


let previusTitle = document.title

window.addEventListener('blur', () => {
    previusTitle = document.title
    document.title = 'A donde vas 🙄 seguí chusmeando'
})

window.addEventListener('focus', () => {
    document.title = previusTitle
})