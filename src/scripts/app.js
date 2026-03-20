function initAccordion() {
  const accordion = document.querySelector("[data-accordion]");
  if (!accordion) return;

  const items = Array.from(accordion.querySelectorAll("[data-accordion-item]"));

  if (!items.length) return;

  const triggers = items.map((item) =>
    item.querySelector(".accordion-trigger"),
  );

  let activeIndex = -1;

  /* ---------- helpers ---------- */

  function setActive(index) {
    items.forEach((item, i) => {
      const trigger = triggers[i];
      const panel = document.getElementById(
        trigger.getAttribute("aria-controls"),
      );

      const isActive = i === index;

      item.classList.toggle("is-active", isActive);
      trigger.setAttribute("aria-expanded", String(isActive));
      panel.hidden = !isActive;
    });

    activeIndex = index;
  }

  /* ---------- click ---------- */

  accordion.addEventListener("click", (e) => {
    const item = e.target.closest("[data-accordion-item]");
    if (!item) return;

    const trigger = item.querySelector(".accordion-trigger");
    if (!trigger) return;

    const index = triggers.indexOf(trigger);
    if (index === -1) return;

    index === activeIndex ? setActive(-1) : setActive(index);
  });

  /* ---------- hover ---------- */

  accordion.addEventListener("pointerover", (e) => {
    const item = e.target.closest("[data-accordion-item]");
    if (!item) return;

    const index = items.indexOf(item);
    if (index !== activeIndex) {
      item.classList.add("is-hovered");
    }
  });

  accordion.addEventListener("pointerout", (e) => {
    const item = e.target.closest("[data-accordion-item]");
    if (!item) return;

    item.classList.remove("is-hovered");
  });

  /* ---------- keyboard ---------- */

  accordion.addEventListener("keydown", (e) => {
    const index = triggers.indexOf(document.activeElement);
    if (index === -1) return;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        triggers[(index + 1) % triggers.length].focus();
        break;

      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        triggers[(index - 1 + triggers.length) % triggers.length].focus();
        break;

      case "Home":
        e.preventDefault();
        triggers[0].focus();
        break;

      case "End":
        e.preventDefault();
        triggers.at(-1).focus();
        break;

      case "Enter":
      case " ":
        e.preventDefault();
        index === activeIndex ? setActive(-1) : setActive(index);
        break;

      case "Escape":
        e.preventDefault();
        setActive(-1);
        triggers[index].focus();
        break;
    }
  });
}

/* ---------- DOM READY ---------- */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAccordion);
} else {
  initAccordion();
}
