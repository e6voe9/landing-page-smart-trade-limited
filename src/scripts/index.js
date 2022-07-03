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
      video = videoBlock.querySelector(".video-block__video");

    const handleBtnClick = () => {
      video.play();
      video.controls = true;
      btn.classList.add("video-block__button--hidden");
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

const video = document.querySelector("#video");
const advantages = document.querySelector("#advantages");
const mission = document.querySelector("#mission");
const roadmap = document.querySelector("#roadmap");
const faq = document.querySelector("#faq");
const demo = document.querySelector("#demo");
const contacts = document.querySelector("#contacts");

const sidebarNavItems = document.querySelectorAll(".sidebar-nav__item");

function getBodyScrollTop() {
  return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
}

if (video && advantages && mission && roadmap && faq && demo && contacts && sidebarNavItems.length !== 0) {
  const v = video.getBoundingClientRect().y;
  const a = advantages.getBoundingClientRect().y;
  const m = mission.getBoundingClientRect().y;
  const r = roadmap.getBoundingClientRect().y;
  const f = faq.getBoundingClientRect().y;
  const d = demo.getBoundingClientRect().y;
  const c = contacts.getBoundingClientRect().y;

  document.addEventListener(
    "scroll",
    function () {
      const pageScrollTop = getBodyScrollTop();

      const vy = Math.abs(v - pageScrollTop);
      const ay = Math.abs(v - pageScrollTop);
      const my = Math.abs(v - pageScrollTop);
      const ry = Math.abs(v - pageScrollTop);
      const fy = Math.abs(v - pageScrollTop);
      const dy = Math.abs(v - pageScrollTop);
      const cy = Math.abs(v - pageScrollTop);

      const arr = [vy, ay, my, ry, fy, dy, cy];

      const min = Math.min(vy, ay, my, ry, fy, dy, cy);

      const idx = arr.indexOf(min);

      if (!sidebarNavItems[idx].classList.contains("sidebar-nav__item--active")) {
        sidebarNavItems.forEach((el) => {
          el.classList.remove("sidebar-nav__item--active");
        });
        sidebarNavItems[idx].classList.add("sidebar-nav__item--active");
      }
    },
    { passive: true }
  );
}
