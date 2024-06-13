const openMenu = () => {
  const menu = document.querySelector(".KC_menu");
  const menuBg = document.querySelector(".KC_menuBg");
  menu.classList.remove("hidden");
  menuBg.classList.remove("hidden");
};

const hiddenMenu = () => {
  const menu = document.querySelector(".KC_menu");
  const menuBg = document.querySelector(".KC_menuBg");
  menu.classList.add("hidden");
  menuBg.classList.add("hidden");
};

export { hiddenMenu , openMenu}