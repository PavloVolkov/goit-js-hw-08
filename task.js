import items from "./gallery-items.js";

const gallery = document.querySelector(".js-gallery");

const galleryItems = items
  .map(({ preview, original, description }) => {
    return `
<li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>
`;
  })
  .join("");

gallery.insertAdjacentHTML("beforeend", galleryItems);

const modal = document.querySelector(".js-lightbox");
const modalInnerImage = document.querySelector(".lightbox__image");
const modalInnerContent = document.querySelector(".lightbox__content");
const galleryEl = document.querySelector(".js-gallery");
gallery.addEventListener("click", onGalleryClick);

/** gallery  */
function onGalleryClick(e) {
  e.preventDefault();

  if (e.target === document.querySelector(".js-gallery")) {
    return;
  }
  modal.classList.add("is-open");

  modalInnerImage.src = e.target.dataset.source;

  const modalClose = document.querySelector(".lightbox__overlay");
  modalClose.addEventListener("click", onModalClose);

  const modalCloseBtn = document.querySelector(".lightbox__button");
  modalCloseBtn.addEventListener("click", onModalCloseBtnClick);

  modalCloseBtn.addEventListener("click", onModalCloseBtnClick);

  galleryEl.addEventListener("keydown", onModalCloseBtnEscDw);
  gallery.addEventListener("keydown", onArrowRightKeyDown);
  gallery.addEventListener("keydown", onArrowLeftKeyDown);
  function closeFn() {
    modal.classList.remove("is-open");
    modalInnerImage.src = "";
  }

  function onModalCloseBtnClick(e) {
    closeFn();
  }
  function onModalClose(e) {
    closeFn();
  }

  function onModalCloseBtnEscDw(e) {
    e.preventDefault();
    if (e.code !== "Escape") {
    }
    if (e.code === "Escape") {
      closeFn();
    }
  }
}

/** change to next or prev by arrows */
gallery.addEventListener("keydown", onArrowRightKeyDown);
gallery.addEventListener("keydown", onArrowLeftKeyDown);
let currentModalUrl = "";
let nexturl;

function onArrowRightKeyDown(e) {
  if (e.code === "ArrowRight") {
    if (currentModalUrl === "") {
      currentModalUrl = modalInnerImage.src;
    }
    if (currentModalUrl !== "") {
      items.forEach((el, index) => {
        if (index === 8) {
          return;
        }
        if (el.original === currentModalUrl) {
          nexturl = items[`${index + 1}`].original;
        }
      });

      currentModalUrl = nexturl;
    }
  }
}
function onArrowLeftKeyDown(e) {
  if (e.code === "ArrowLeft") {
    if (currentModalUrl === "") {
      currentModalUrl = modalInnerImage.src;
    }
    if (currentModalUrl !== "") {
      items.find((el, index) => {
        if (index === 0) {
          return;
        }
        if (el.original === currentModalUrl) {
          nexturl = items[`${index - 1}`].original;
        }
      });
      currentModalUrl = nexturl;
    }
  }
  modalInnerImage.src = nexturl;
}
