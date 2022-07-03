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
