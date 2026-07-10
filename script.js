const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const navItems = [...document.querySelectorAll(".nav-item")];
const contactForm = document.querySelector("[data-contact-form]");
const submitButton = document.querySelector("[data-submit-button]");
const formMessage = document.querySelector("[data-form-message]");

const closeSubmenus = (exceptItem) => {
  navItems.forEach((item) => {
    if (item !== exceptItem) {
      item.classList.remove("is-submenu-open");
    }
  });
};

const closeMobileNav = () => {
  if (!nav || !menuButton) return;

  nav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "메뉴 열기");
};

const scrollToHash = (hash) => {
  if (!hash || hash === "#") return false;

  const target = document.querySelector(hash);
  if (!target) return false;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  history.pushState(null, "", hash);
  return true;
};

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");

    if (!isOpen) {
      closeSubmenus();
    }
  });

  navItems.forEach((item) => {
    const trigger = item.querySelector(":scope > a");
    const submenu = item.querySelector(".submenu");

    if (!trigger || !submenu) return;

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const isOpen = item.classList.toggle("is-submenu-open");
      closeSubmenus(isOpen ? item : undefined);
    });
  });

  nav.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLAnchorElement)) return;

    if (target.closest(".submenu")) {
      const didScroll = scrollToHash(target.hash);

      if (didScroll) {
        event.preventDefault();
      }

      closeMobileNav();
      closeSubmenus();
      return;
    }

    if (target.classList.contains("nav-cta")) {
      closeMobileNav();
      closeSubmenus();
    }
  });
}

document.addEventListener("click", (event) => {
  const target = event.target;

  if (target instanceof HTMLAnchorElement && target.hash && target.origin === location.origin) {
    if (scrollToHash(target.hash)) {
      event.preventDefault();
      closeMobileNav();
      closeSubmenus();
    }
  }

  if (nav && !nav.contains(target)) {
    closeSubmenus();
  }
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

if (contactForm && submitButton && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    formMessage.className = "form-message";

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      formMessage.textContent = "필수 항목을 모두 입력하고 개인정보 동의에 체크해주세요.";
      formMessage.classList.add("is-error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "접수 중...";
    formMessage.textContent = "문의 내용을 확인하고 있습니다.";

    window.setTimeout(() => {
      const formData = new FormData(contactForm);
      const inquiry = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        serviceType: formData.get("serviceType"),
        message: formData.get("message"),
        source: "website"
      };

      console.info("과제용 문의 데이터", inquiry);
      formMessage.textContent = "문의가 접수되었습니다. 확인 후 연락드리겠습니다.";
      formMessage.classList.add("is-success");
      contactForm.reset();
      submitButton.disabled = false;
      submitButton.textContent = "문의 접수하기";
    }, 700);
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSubmenus();
    closeMobileNav();
  }
});

if (header) {
  const setScrolled = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });
}
