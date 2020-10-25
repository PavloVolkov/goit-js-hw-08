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
gallery.addEventListener("click", onGalleryClick);

/** gallery  */
function onGalleryClick(e) {
  e.preventDefault();

  modal.classList.add("is-open");
  console.log();
  const currentUrl = e.target.dataset.source;
  modalInnerImage.src = currentUrl;
  const modalClose = document.querySelector(".is-open");
  modalClose.addEventListener("click", onModalClose);
  modalClose;
  addEventListener("keyup", onModalClose);
}

/**close button */
const modalCloseBtn = document.querySelector(".lightbox__button");

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
