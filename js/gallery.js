import items from "./gallery-items.js";
// Создание и рендер разметки по массиву данных и предоставленному шаблону.

// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на 
// элементе img, и указываться в href ссылки(это необходимо для доступности).
/* <li class="gallery__item">
  <a
    class="gallery__link"
   href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.chrefom/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li> */
const galleryListRef = document.querySelector(".js-gallery");
const originalImgRef = document.querySelector(".lightbox__image");
const lightboxRef = document.querySelector(".lightbox");
const closerModaBtnlRef = document.querySelector("button[data-action='close-lightbox']");
const lightboxOverleyRef = document.querySelector(".lightbox__overlay");

const createGalleryCard = item => {
    const galleryItem = document.createElement("li");
    galleryItem.classList.add("gallery__item");
    const galleryLink = document.createElement("a");
    galleryLink.classList.add("gallery__link");
    galleryLink.setAttribute("href", item.original);
    const galleryImage = document.createElement("img");
    galleryImage.classList.add("gallery__image");
    galleryImage.setAttribute("src", item.preview);
    galleryImage.setAttribute("data-source", item.original);
    galleryImage.setAttribute("alt", item.description);

    galleryLink.appendChild(galleryImage);
    galleryItem.appendChild(galleryLink);
    return galleryItem;
}
const cardItems = items.map(item => createGalleryCard(item));
galleryListRef.append(...cardItems);

//Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
//Подмена значения атрибута src элемента img.lightbox__image
// Открытие модального окна по клику на элементе галереи.
galleryListRef.addEventListener("click", clickImageHandler);
closerModaBtnlRef.addEventListener("click", closeModalHandler);
lightboxOverleyRef.addEventListener("click", pressbackdroplHandler);

function clickImageHandler(event) {
    event.preventDefault();
    if (event.target.nodeName !== "IMG") return;
    const linkOriginalImg = event.target.dataset.source;
    setOriginalImageHandler(linkOriginalImg);
    openModalHendler();
};
function setOriginalImageHandler(url) {
  originalImgRef.src = url;
}
function openModalHendler() {
  lightboxRef.classList.add("is-open");
  window.addEventListener("keydown", pressEscHandler);
}
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того,
// чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
function closeModalHandler() {
  deleteLinkImg();
  window.removeEventListener("keydown", pressEscHandler);
  lightboxRef.classList.remove("is-open");
}
function pressEscHandler(event) {
  if(event.code !== "Escape") return;
  closeModalHandler();
  // console.log(event);
};
function pressbackdroplHandler(event) {
  if (event.target !== event.currentTarget) return;
  closeModalHandler();
}
function deleteLinkImg() {
  originalImgRef.src = '';
}