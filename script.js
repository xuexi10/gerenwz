/* ==========================================================
   个人网站交互脚本
   - 深色 / 浅色主题切换
   - 移动端菜单
   - 打字机效果
   - 滚动进度条、返回顶部、导航高亮
   - 元素滚动显现动画
   ========================================================== */

(function () {
  "use strict";

  /* ---------- 可在这里修改打字机轮流显示的文字 ---------- */
  var ROLES = ["前端开发工程师", "热爱开源的开发者", "终身学习者"];

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  /* ============ 主题切换 ============ */
  var rootEl = document.documentElement;
  var themeToggle = document.getElementById("theme-toggle");
  var savedTheme = null;

  try {
    savedTheme = localStorage.getItem("theme");
  } catch (e) {
    savedTheme = null;
  }

  var currentTheme = savedTheme || (prefersDark ? "dark" : "light");
  rootEl.setAttribute("data-theme", currentTheme);

  themeToggle.addEventListener("click", function () {
    var next = rootEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
    rootEl.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* 隐私模式下 localStorage 不可用时静默忽略 */
    }
  });

  /* ============ 移动端导航菜单 ============ */
  var navToggle = document.getElementById("nav-toggle");
  var navMenu = document.getElementById("nav-menu");

  navToggle.addEventListener("click", function () {
    var isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "关闭菜单" : "打开菜单");
  });

  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "打开菜单");
    });
  });

  /* ============ 打字机效果 ============ */
  var typeText = document.getElementById("type-text");
  var roleIndex = 0;
  var charIndex = 0;
  var isDeleting = false;

  function type() {
    var current = ROLES[roleIndex];
    var visible = isDeleting ? current.slice(0, charIndex - 1) : current.slice(0, charIndex + 1);
    typeText.textContent = visible;

    var speed = isDeleting ? 45 : 110;
    if (!isDeleting && visible === current) {
      speed = 1700;
      isDeleting = true;
    } else if (isDeleting && visible === "") {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % ROLES.length;
      speed = 350;
    }

    charIndex = isDeleting ? visible.length : visible.length;
    setTimeout(type, speed);
  }

  if (typeText && !prefersReducedMotion) {
    setTimeout(type, 900);
  } else if (typeText) {
    typeText.textContent = ROLES[0];
  }

  /* ============ 滚动进度条 ============ */
  var progressBar = document.getElementById("scroll-progress");

  function updateProgress() {
    var scrollTop = window.scrollY;
    var height = document.documentElement.scrollHeight - window.innerHeight;
    var percent = height > 0 ? (scrollTop / height) * 100 : 0;
    progressBar.style.width = percent + "%";
  }

  /* ============ 导航栏滚动状态 / 高亮 / 返回顶部 ============ */
  var nav = document.querySelector(".nav");
  var backToTop = document.getElementById("back-to-top");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  function highlightNav() {
    var pos = window.scrollY + 100;
    var currentId = sections[0] ? sections[0].id : "";

    sections.forEach(function (section) {
      if (pos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + currentId
      );
    });
  }

  function onScroll() {
    updateProgress();
    highlightNav();
    nav.classList.toggle("scrolled", window.scrollY > 10);
    backToTop.classList.toggle("visible", window.scrollY > 500);
  }

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ============ 滚动显现动画 ============ */
  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealItems.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ============ 页脚年份 ============ */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
