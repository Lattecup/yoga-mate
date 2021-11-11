const closeButtons = document.querySelectorAll('.popup__close-button');
const readMoreButtons = document.querySelectorAll('.button__read');
const bookSpotButton = document.querySelector('.button__book');
const popups = document.querySelectorAll('.popup')
const readMorePopup = document.querySelector('.popup-read-more');
const bookSpotPopup = document.querySelector('.popup-book-spot');

// Открытие попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

// Закрытие попапа
const closePopup = (popup) => { 
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc); 
}

// Закрытие попапа по Esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

// Открытие попапа read-more
function openReadMorePopup() {
  openPopup(readMorePopup);
};

// Открытие попапов read-more
readMoreButtons.forEach((item) => {
  const button = item.closest('.button__read');
  button.addEventListener('click', openReadMorePopup);
});

// Открытие попапа book-spot
function openBookSpotPopup() {
  openPopup(bookSpotPopup);
};
  
// Закрытие всех попапов
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Закрытие попапа по overlay 
const closePopupByOverlay = (evt) => { 
  if (evt.target.classList.contains('popup_opened')) { 
    closePopup(evt.target); 
  }; 
};

// Закрытие всех попапов по overlay 
popups.forEach((popup) => { 
  popup.addEventListener('click', closePopupByOverlay); 
});

bookSpotButton.addEventListener('click', openBookSpotPopup);