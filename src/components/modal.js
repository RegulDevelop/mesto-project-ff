import { createCard, deleteCard } from './card.js';

const placeList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

const profilePopup = document.querySelector('.popup_type_edit');
const profileCloseButton = profilePopup.querySelector('.popup__close');

const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardCloseButton = addCardPopup.querySelector('.popup__close');

const imageOpen = document.querySelector('.popup_type_image');
const imageCloseButton = imageOpen.querySelector('.popup__close');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const addCardForm = addCardPopup.querySelector('.popup__form');
const nameInputImage = addCardForm.querySelector(
  '.popup__input_type_card-name'
);
const linkInputImage = addCardForm.querySelector('.popup__input_type_url');

// Закрытие и открытие попапа кликом на кнопку profile

export function openPopupProfile() {
  profilePopup.classList.add('popup_is-animated');

  setTimeout(() => {
    profilePopup.classList.add('popup_is-opened');
  }, 10);

  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;

  profileCloseButton.addEventListener('click', closePopupProfile);
  document.addEventListener('keydown', closePopupEscape);
}

function closePopupProfile() {
  profilePopup.classList.remove('popup_is-opened');

  profileCloseButton.removeEventListener('click', closePopupProfile);
  document.removeEventListener('keydown', closePopupEscape);
}

// Закрытие и открытие попапа кликом на кнопку +

export function openPopupAddCard() {
  addCardPopup.classList.add('popup_is-animated');

  setTimeout(() => {
    addCardPopup.classList.add('popup_is-opened');
  }, 10);

  addCardCloseButton.addEventListener('click', closePopupAddCard);
  document.addEventListener('keydown', closePopupEscape);
}

function closePopupAddCard() {
  addCardPopup.classList.remove('popup_is-opened');

  addCardCloseButton.removeEventListener('click', closePopupAddCard);
  document.removeEventListener('keydown', closePopupEscape);
}

// Закрытие и открытие попапа кликом на изображение

export function openPopupImage(dataCard) {
  const popupImage = imageOpen.querySelector('.popup__image');
  const imageCaption = imageOpen.querySelector('.popup__caption');

  imageOpen.classList.add('popup_is-animated');

  setTimeout(() => {
    imageOpen.classList.add('popup_is-opened');
  }, 10);

  if (dataCard) {
    popupImage.src = dataCard.link || '';
    imageCaption.textContent = dataCard.name || '';
  }

  imageCloseButton.addEventListener('click', closePopupImage);
  document.addEventListener('keydown', closePopupEscape);
}

function closePopupImage() {
  imageOpen.classList.remove('popup_is-opened');

  imageCloseButton.removeEventListener('click', closePopupImage);
  document.removeEventListener('keydown', closePopupEscape);
}

// Закрытие попапа кликом на оверлей

export function closePopupOnOverlayClick() {
  popups.forEach((popup) => {
    popup.addEventListener('click', (event) => {
      if (event.target === popup) {
        popup.classList.remove('popup_is-opened');
      }
    });
  });
}

// Закрытие попапа нажатием на клавишу ESC

function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_is-opened')) {
        popup.classList.remove('popup_is-opened');
      }
    });
  }
}

// Обработчик «отправки» формы profile

export function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileName.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closePopupProfile();
}

// Обработчик «отправки» формы addCard

export function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInputImage.value;
  const linkValue = linkInputImage.value;
  const newCardData = {
    name: nameValue,
    link: linkValue,
    alt: '',
  };
  const newCardElement = createCard(newCardData, deleteCard);

  placeList.prepend(newCardElement);
  closePopupAddCard();
  addCardForm.reset();
}
