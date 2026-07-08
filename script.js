const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "메뉴 열기");
    }
  });
}

if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  });
}

document.querySelector(".contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("문의 내용이 확인되었습니다. 실제 접수는 이메일 또는 서버 연결 후 사용할 수 있습니다.");
});
