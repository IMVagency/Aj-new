/* -------------------------------------------------
   PSE toggle + Mobile menu (FIXED & SAFE)
   ------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // === PSE Buttons ===
  const pseBtns = document.querySelectorAll(".pse-btn");
  const panels = document.querySelectorAll(".hero-content");

  if (pseBtns.length && panels.length) {
    pseBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.target;

        // Remove active from all buttons
        pseBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // Show target panel
        panels.forEach((p) => {
          p.style.display = p.id === target ? "block" : "none";
        });
      });
    });

    // Optional: Activate first button by default
    if (pseBtns[0]) pseBtns[0].click();
  }

  const nav = document.getElementById("siteNav");
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  // closeBtn removed intentionally - hamburger is the close control now
  const overlay = document.getElementById("menuOverlay");

  if (nav && hamburger && mobileMenu && overlay) {
    // place the panel under the nav (account for scroll)
    function positionMenuCenter() {
      const rect = nav.getBoundingClientRect();
      const top = rect.bottom + window.scrollY + 24; // small gap under nav
      mobileMenu.style.top = `${top}px`;
      // calculate max height available under nav
      const available = window.innerHeight - (rect.bottom + 24);
      mobileMenu.style.maxHeight = `${Math.max(220, available)}px`;
    }

    function openMenu() {
      positionMenuCenter();
      mobileMenu.classList.add("active");
      overlay.classList.add("active");
      hamburger.classList.add("active");
      mobileMenu.setAttribute("aria-hidden", "false");
      overlay.setAttribute("aria-hidden", "false");
      hamburger.setAttribute("aria-expanded", "true");
      // focus first interactive element for accessibility
      const first = mobileMenu.querySelector("a, button");
      if (first) first.focus();
      // prevent background scroll
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      mobileMenu.classList.remove("active");
      overlay.classList.remove("active");
      hamburger.classList.remove("active");
      mobileMenu.setAttribute("aria-hidden", "true");
      overlay.setAttribute("aria-hidden", "true");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      hamburger.focus();
    }

    // toggle by hamburger (open/close)
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.contains("active") ? closeMenu() : openMenu();
    });

    // close when clicking on overlay
    overlay.addEventListener("click", () => closeMenu());

    // close when clicking outside the panel (document)
    document.addEventListener("click", (e) => {
      if (
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target) &&
        mobileMenu.classList.contains("active")
      ) {
        closeMenu();
      }
    });

    // ESC to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("active"))
        closeMenu();
    });

    // reposition on resize/scroll while open
    window.addEventListener("resize", () => {
      if (mobileMenu.classList.contains("active")) positionMenuCenter();
    });
    window.addEventListener("scroll", () => {
      if (mobileMenu.classList.contains("active")) positionMenuCenter();
    });

    // init aria
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    overlay.setAttribute("aria-hidden", "true");
  }
  const tabs = document.querySelectorAll(".tab");

  const titleEl = document.getElementById("valuesTitleText");
  const descEl = document.getElementById("valuesDescription");
  const linkEl = document.getElementById("valuesLink");

  // MAIN BEHAVIOR: Accordion-style switching
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // If clicking already open tab → do nothing
      if (tab.classList.contains("active")) return;

      // Remove active from others
      tabs.forEach((t) => t.classList.remove("active"));

      // Activate clicked tab
      tab.classList.add("active");

      // Fade out content
      titleEl.classList.add("fade");
      descEl.classList.add("fade");
      linkEl.classList.add("fade");

      setTimeout(() => {
        // Update content with the tab's data
        titleEl.textContent = tab.dataset.title;
        descEl.textContent = tab.dataset.text;
        linkEl.textContent = tab.dataset["linkText"];
        linkEl.href = tab.dataset["linkHref"];

        // Fade in again
        titleEl.classList.remove("fade");
        descEl.classList.remove("fade");
        linkEl.classList.remove("fade");
      }, 220);
    });
  });
});
