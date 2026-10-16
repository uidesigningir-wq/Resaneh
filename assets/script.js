/* ==========================================
   RESANEH | CFU GILAN
   Main JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // 1. منوی موبایل
  const menuToggle = document.querySelector(
    ".menu-toggle, .nav-toggle, #menuToggle"
  );

  const navigation = document.querySelector(
    ".nav-links, .navigation, #navLinks"
  );

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (
        !navigation.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navigation.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 2. انیمیشن ظاهرشدن عناصر هنگام اسکرول
  const animatedElements = document.querySelectorAll(
    ".reveal, .fade-in, [data-reveal]"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible", "revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    animatedElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    animatedElements.forEach((element) => {
      element.classList.add("visible", "revealed");
    });
  }

  // 3. دکمه بازگشت به بالای صفحه
  const backToTop = document.querySelector(
    "#backToTop, .back-to-top"
  );

  if (backToTop) {
    const updateBackToTop = () => {
      backToTop.classList.toggle(
        "visible",
        window.scrollY > 400
      );
    };

    window.addEventListener("scroll", updateBackToTop, {
      passive: true
    });

    updateBackToTop();

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // 4. نمایش سال جاری در فوتر
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // 5. جست‌وجوی ساده در کارت‌های خبری
  const searchInput = document.querySelector(
    "#newsSearch, [data-news-search]"
  );

  const newsCards = document.querySelectorAll(
    "[data-news-card], .news-card"
  );

  if (searchInput && newsCards.length) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value
        .trim()
        .toLocaleLowerCase("fa");

      newsCards.forEach((card) => {
        const text = card.textContent.toLocaleLowerCase("fa");
        const matches = text.includes(query);

        card.hidden = !matches;
      });
    });
  }

  // 6. فیلتر دسته‌بندی اخبار
  const categoryButtons = document.querySelectorAll(
    "[data-category-filter]"
  );

  if (categoryButtons.length && newsCards.length) {
    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedCategory = button.dataset.categoryFilter;

        categoryButtons.forEach((item) => {
          item.classList.toggle("active", item === button);
          item.setAttribute(
            "aria-pressed",
            String(item === button)
          );
        });

        newsCards.forEach((card) => {
          const cardCategory = card.dataset.category || "all";

          const matches =
            selectedCategory === "all" ||
            cardCategory === selectedCategory;

          card.hidden = !matches;
        });

        // با تغییر دسته‌بندی، جست‌وجوی قبلی پاک شود
        if (searchInput) {
          searchInput.value = "";
        }
      });
    });
  }

  // 7. نمایش تصاویر جایگزین در صورت خطای بارگذاری
  document.querySelectorAll("img[data-fallback]").forEach((image) => {
    image.addEventListener("error", () => {
      const fallback = image.dataset.fallback;

      if (fallback && image.src !== new URL(fallback, location.href).href) {
        image.src = fallback;
      }
    });
  });

  // 8. ثبت وضعیت بارگذاری صفحه
  document.documentElement.classList.add("js-loaded");

});
