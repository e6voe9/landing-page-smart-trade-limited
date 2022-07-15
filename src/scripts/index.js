import "./../styles/index.scss";

import Swiper, { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// init Swiper:
const demoSwiperBlock = document.querySelector("#demoSwiper");
const swiper = new Swiper(demoSwiperBlock, {
  // configure Swiper to use modules
  modules: [Navigation, Pagination, EffectCoverflow, Autoplay],
  effect: "coverflow",
  slidePerView: 1,
  speed: 1000,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".demo__arrow-right",
    prevEl: ".demo__arrow-left",
  },
});

if (process.env.NODE_ENV === "development") {
  require("../index.html");
}

// --------- LAZY LOAD IMAGES ---------
// const images = document.querySelectorAll('img');
// const options = {
// 	root: null,
// 	rootMargin: '0px',
// 	threshold: 0.1
// }

// function handleImg(myImg, observer) {
// 	myImg.forEach(myImgSingle => {
// 		if (myImgSingle.intersectionRatio > 0) {
// 			loadImage(myImgSingle.target);
// 		}
// 	})
// }

// function loadImage(image) {
// 	image.src = image.getAttribute('data-src');
// 	observer.unobserve(image);
// }
// const observer = new IntersectionObserver(handleImg, options);
// images.forEach(img => {
// 	observer.observe(img);
// })

const videoBlocks = document.querySelectorAll(".video-block");

if (videoBlocks.length !== 0) {
  videoBlocks.forEach((videoBlock) => {
    const btn = videoBlock.querySelector(".video-block__button"),
      video = videoBlock.querySelector(".video-block__video"),
      videoBox = videoBlock.querySelector(".video-block__video-box");

    const handleBtnClick = () => {
      video.play();
      video.controls = true;
      btn.classList.add("video-block__button--hidden");
      videoBox.classList.add("video-block__video-box--active");
    };

    btn.addEventListener("click", handleBtnClick);
  });
}

const faqs = document.querySelectorAll(".faq-item");

if (faqs.length !== 0) {
  faqs.forEach((faq) => {
    const head = faq.querySelector(".faq-item__head"),
      body = faq.querySelector(".faq-item__body");

    let isOpen = false;

    const clickHandler = () => {
      if (isOpen) {
        head.classList.remove("faq-item__head--active");
        body.style.height = 0;
        isOpen = !isOpen;
      } else {
        head.classList.add("faq-item__head--active");
        body.style.height = body.scrollHeight + "px";
        isOpen = !isOpen;
      }
    };

    head.addEventListener("click", clickHandler);
  });
}

const hero = document.querySelector("#hero");
const video = document.querySelector("#video");
const advantages = document.querySelector("#advantages");
const mission = document.querySelector("#mission");
const roadmap = document.querySelector("#roadmap");
const faq = document.querySelector("#faq");
const demo = document.querySelector("#demo");
const contacts = document.querySelector("#contacts");
const sidebarNavItems = document.querySelectorAll(".sidebar-nav__item");
const sidebarNav = document.querySelector(".sidebar-nav");
const activeSidebarMenuNameBlock = document.querySelector(".mob-sidebar-nav__main");
const mobSidebarNav = document.querySelector(".mob-sidebar-nav");
const burger = document.querySelector(".burger");
let isMenuOpened = false;
let activeMenuIdx = 0;

const langChangeBlock = document.querySelector(".lang-change-block");
const langChangeDesktop = langChangeBlock.querySelector(".lang-change");

const widthOfTheScreen = window.innerWidth;
let fullPageSwiper = null;
let getBodyScrollTop = null;

if (widthOfTheScreen < 768) {
  fullPageSwiper = window;
  getBodyScrollTop = () => fullPageSwiper.pageYOffset;
} else {
  fullPageSwiper = document.querySelector(".fullpage-swiper");
  getBodyScrollTop = () => fullPageSwiper.scrollTop;
}

if (video && advantages && mission && roadmap && faq && demo && contacts && sidebarNavItems.length !== 0) {
  const h = hero.getBoundingClientRect().y;
  const v = video.getBoundingClientRect().y;
  const a = advantages.getBoundingClientRect().y;
  const m = mission.getBoundingClientRect().y;
  const r = roadmap.getBoundingClientRect().y;
  const f = faq.getBoundingClientRect().y;
  const d = demo.getBoundingClientRect().y;
  const c = contacts.getBoundingClientRect().y;

  fullPageSwiper.addEventListener(
    "scroll",
    () => {
      const pageScrollTop = getBodyScrollTop();

      const hy = Math.abs(h - pageScrollTop);
      const vy = Math.abs(v - pageScrollTop);
      const ay = Math.abs(a - pageScrollTop);
      const my = Math.abs(m - pageScrollTop);
      const ry = Math.abs(r - pageScrollTop);
      const fy = Math.abs(f - pageScrollTop);
      const dy = Math.abs(d - pageScrollTop);
      const cy = Math.abs(c - pageScrollTop);

      const arr = [hy, vy, ay, my, ry, fy, dy, cy];

      const min = Math.min(hy, vy, ay, my, ry, fy, dy, cy);

      const idx = arr.indexOf(min);
      activeMenuIdx = idx;
      if (idx === 0) {
        sidebarNavItems.forEach((el) => {
          el.classList.remove("sidebar-nav__item--active");
        });
        sidebarNav.classList.add("sidebar-nav--hidden");
        activeSidebarMenuNameBlock.style.opacity = 0;
        burger.classList.add("burger--white");
        mobSidebarNav.classList.remove("mob-sidebar-nav--background-white");
        langChangeDesktop.classList.remove("lang-change--black");
      } else {
        langChangeDesktop.classList.add("lang-change--black");
        mobSidebarNav.classList.add("mob-sidebar-nav--background-white");
        burger.classList.remove("burger--white");
        sidebarNav.classList.remove("sidebar-nav--hidden");
        const shouldChangeActiveItem = !sidebarNavItems[idx - 1].classList.contains("sidebar-nav__item--active");

        if (shouldChangeActiveItem) {
          sidebarNavItems.forEach((el) => {
            el.classList.remove("sidebar-nav__item--active");
          });
          sidebarNavItems[idx - 1].classList.add("sidebar-nav__item--active");
          activeSidebarMenuNameBlock.style.opacity = 1;
          activeSidebarMenuNameBlock.textContent = sidebarNavItems[idx - 1].textContent;
        }
      }
    },
    { passive: true }
  );
}

const toggleBurger = () => {
  burger.classList.toggle("burger--active");
};

const toggleSideBarNav = () => {
  sidebarNav.classList.toggle("sidebar-nav--open");
};

const toggleMenu = () => {
  toggleBurger();
  toggleSideBarNav();
  isMenuOpened = !isMenuOpened;

  if (activeMenuIdx === 0 && isMenuOpened === true) {
    burger.classList.remove("burger--white");
  } else if (activeMenuIdx === 0 && isMenuOpened === false) {
    burger.classList.add("burger--white");
  }
};

burger.addEventListener("click", toggleMenu);
sidebarNavItems.forEach((item) => {
  item.addEventListener("click", toggleMenu);
});

const langChanges = document.querySelectorAll(".lang-change");

langChanges.forEach((item) => {
  const head = item.querySelector(".lang-change__head"),
    body = item.querySelector(".lang-change__body");

  const headClickHandler = () => body.classList.toggle("lang-change__body--active");

  head.addEventListener("click", headClickHandler);
});
