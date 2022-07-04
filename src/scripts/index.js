import "./../styles/index.scss";

import Swiper, { Navigation, Pagination, EffectCoverflow } from "swiper";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// init Swiper:
const demoSwiperBlock = document.querySelector("#demoSwiper");
const swiper = new Swiper(demoSwiperBlock, {
  // configure Swiper to use modules
  modules: [Navigation, Pagination, EffectCoverflow],
  effect: "coverflow",
  slidePerView: 1,
  loop: true,
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
const fullPageSwiper = document.querySelector(".fullpage-swiper");
const sidebarNavItems = document.querySelectorAll(".sidebar-nav__item");
const sidebarNav = document.querySelector(".sidebar-nav");

function getBodyScrollTop() {
  return fullPageSwiper.scrollTop;
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
      if (idx === 0) {
        sidebarNav.classList.add("sidebar-nav--hidden");
      } else {
        sidebarNav.classList.remove("sidebar-nav--hidden");
        const shouldChangeActiveItem = !sidebarNavItems[idx - 1].classList.contains("sidebar-nav__item--active");

        if (shouldChangeActiveItem) {
          sidebarNavItems.forEach((el) => {
            el.classList.remove("sidebar-nav__item--active");
          });
          sidebarNavItems[idx - 1].classList.add("sidebar-nav__item--active");
        }
      }
    },
    { passive: true }
  );
}
