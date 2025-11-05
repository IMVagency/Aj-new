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

  // === Mobile Menu (SAFE) ===
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.getElementById("mobileMenu"); // Must have ID!
  const closeBtn = document.querySelector(".close-btn");

  // Only run if elements exist
  if (hamburger && mobileMenu && closeBtn) {
    // Open menu
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.add("active");
    });

    // Close with X button
    closeBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });

    // Close when clicking outside content
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove("active");
      }
    });

    // Optional: Close with ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
      }
    });
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
