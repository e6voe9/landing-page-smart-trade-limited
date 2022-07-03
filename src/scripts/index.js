import "./../styles/index.scss";

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
