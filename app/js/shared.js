function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollButton() {
  const button = document.querySelector(".js-scroll-button");
  button.addEventListener("click", scrollToTop);
}

function hideScrollButton() {
  const button = document.querySelector(".js-scroll-button");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.style.display = "flex";
  } else {
    button.style.display = "none";
  }
}

window.onscroll = function () {
  hideScrollButton();
};
scrollButton();
