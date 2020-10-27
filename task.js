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

gallery.innerHTML = galleryItems;

const modal = document.querySelector(".js-lightbox");
const modalInnerImage = document.querySelector(".lightbox__image");
const modalInnerContent = document.querySelector(".lightbox__content");
gallery.addEventListener("click", onGalleryClick);

/** gallery  */
function onGalleryClick(e) {
  e.preventDefault();

  modal.classList.add("is-open");
  modalInnerImage.src = e.target.dataset.source;

  const modalClose = document.querySelector(".is-open");
  modalClose.addEventListener("click", onModalClose);

  const modalCloseBtn = document.querySelector(".lightbox__button");
  modalCloseBtn.addEventListener("click", onModalCloseBtnClick);

  modalCloseBtn.addEventListener("click", onModalCloseBtnClick);
  function onModalCloseBtnClick(e) {
    modal.classList.remove("is-open");
    modalInnerImage.src = "";
  }
  /**overlay close*/
  function onModalClose(e) {
    if (e.target === document.querySelector(".lightbox__image")) {
      return;
    }
    modal.classList.remove("is-open");
    modalInnerImage.src = "";
  }
  /**esc button close */
  const galleryEl = document.querySelector(".js-gallery");

  galleryEl.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      modal.classList.remove("is-open");
      modalInnerImage.src = "";
    }
  });
}

/** change to next or prev by arrows */
let currentModalUrl = "";
let nexturl;
gallery.addEventListener("keydown", (e) => {
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
  modalInnerImage.src = nexturl;
});
gallery.addEventListener("keydown", (e) => {
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
});
