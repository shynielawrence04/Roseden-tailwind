// src/app.js

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getCartCount() {
  const count = localStorage.getItem("cartCount");
  return count ? parseInt(count, 10) : 0;
}

function setCartCount(count) {
  localStorage.setItem("cartCount", String(count));
}

function updateCartUI() {
  const cartEl = document.querySelector("#cartCount");
  if (!cartEl) return;
  cartEl.textContent = getCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
  // Cart count on all pages
  updateCartUI();

  // Mobile menu toggle
  const menuBtn = document.querySelector("#menuBtn");
  const mobileMenu = document.querySelector("#mobileMenu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
    });
  }

  // Newsletter validation (index.html)
  const newsletterEmail = document.querySelector("#newsletterEmail");
  const newsletterBtn = document.querySelector("#newsletterBtn");
  const newsletterMsg = document.querySelector("#newsletterMsg");

  if (newsletterEmail && newsletterBtn && newsletterMsg) {
    newsletterBtn.addEventListener("click", () => {
      const email = newsletterEmail.value.trim();

      if (!isValidEmail(email)) {
        newsletterMsg.textContent = "Please enter a valid email address.";
        newsletterMsg.className = "mt-3 text-sm text-rose-700";
        return;
      }

      newsletterMsg.textContent = "✅ Thanks for subscribing!";
      newsletterMsg.className = "mt-3 text-sm text-rose-700";
      newsletterEmail.value = "";
    });
  }

  // Contact form validation (contact.html)
  const contactForm = document.querySelector("#contactForm");
  const contactMsg = document.querySelector("#contactMsg");

  if (contactForm && contactMsg) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.querySelector("#email")?.value.trim();
      const subject = document.querySelector("#subject")?.value.trim();
      const message = document.querySelector("#message")?.value.trim();

      if (!email || !isValidEmail(email)) {
        contactMsg.textContent = "Please enter a valid email.";
        contactMsg.className = "text-sm text-rose-700";
        return;
      }

      if (!subject || subject.length < 3) {
        contactMsg.textContent = "Subject must be at least 3 characters.";
        contactMsg.className = "text-sm text-rose-700";
        return;
      }

      if (!message || message.length < 10) {
        contactMsg.textContent = "Message must be at least 10 characters.";
        contactMsg.className = "text-sm text-rose-700";
        return;
      }

      contactMsg.textContent = "✅ Message sent successfully (demo).";
      contactMsg.className = "text-sm text-rose-700";
      contactForm.reset();
    });
  }

  // Add to cart (product.html)
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = getCartCount();
      setCartCount(current + 1);
      updateCartUI();

      btn.textContent = "Added!";
      btn.classList.add("opacity-80");
      setTimeout(() => {
        btn.textContent = "Add to Cart";
        btn.classList.remove("opacity-80");
      }, 700);
    });
  });

  // Product search filter (product.html)
  const searchInput = document.querySelector("#productSearch");
  const productMsg = document.querySelector("#productMsg");
  const cards = Array.from(document.querySelectorAll(".product-card"));

  if (searchInput && cards.length) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      let visibleCount = 0;

      cards.forEach((card) => {
        const name = (card.getAttribute("data-name") || "").toLowerCase();
        const show = name.includes(q);
        card.classList.toggle("hidden", !show);
        if (show) visibleCount++;
      });

      if (productMsg) {
        if (!q) productMsg.textContent = "";
        else productMsg.textContent = `Showing ${visibleCount} result(s) for "${q}"`;
      }
    });
  }
});
