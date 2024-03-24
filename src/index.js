import './pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card.js';
import {
  openModal,
  closeModal,
  closePopupOverlay,
} from './components/modal.js';
import { initialCards } from './scripts/cards.js';

const placeList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imageOpen = document.querySelector('.popup_type_image');

const profileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const profileCloseButton = profilePopup.querySelector('.popup__close');
const addCardCloseButton = addCardPopup.querySelector('.popup__close');
const imageCloseButton = imageOpen.querySelector('.popup__close');

const profileForm = document.querySelector('.popup_type_edit .popup__form');
const addCardForm = document.querySelector('.popup_type_new-card .popup__form');

const nameInputImage = addCardForm.querySelector(
  '.popup__input_type_card-name'
);
const linkInputImage = addCardForm.querySelector('.popup__input_type_url');

// Создание и добавление карточек из массива

initialCards.forEach((element) => {
  const cardElement = createCard(element, deleteCard, likeCard, openImageCard);
  placeList.append(cardElement);
});

// Обработчик «отправки» формы profile

function handleProfileSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileName.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closeModal(profilePopup);
}

// Обработчик «отправки» формы addCard

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInputImage.value;
  const linkValue = linkInputImage.value;
  const altText = nameValue;

  const newCardData = {
    name: nameValue,
    link: linkValue,
    alt: altText,
  };

  const newCardElement = createCard(
    newCardData,
    deleteCard,
    likeCard,
    openImageCard
  );

  placeList.prepend(newCardElement);
  closeModal(addCardPopup);
  addCardForm.reset();
}

// Функция заполнения формы редактирования профиля

function fillProfileForm() {
  const nameInputProfile = document.querySelector('.popup__input_type_name');
  const jobInputProfile = document.querySelector(
    '.popup__input_type_description'
  );
  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  nameInputProfile.value = profileName.textContent;
  jobInputProfile.value = profileDescription.textContent;
}

// Функция клика по изображению

function openImageCard(dataCard) {
  const popupImage = document.querySelector('.popup__image');
  const imageCaption = document.querySelector('.popup__caption');

  if (dataCard) {
    popupImage.src = dataCard.link || '';
    imageCaption.textContent = dataCard.name || '';
  }

  openModal(imageOpen);
}

profileButton.addEventListener('click', () => {
  openModal(profilePopup);
  fillProfileForm();
});
addCardButton.addEventListener('click', () => openModal(addCardPopup));

profileCloseButton.addEventListener('click', () => closeModal(profilePopup));
addCardCloseButton.addEventListener('click', () => closeModal(addCardPopup));
imageCloseButton.addEventListener('click', () => closeModal(imageOpen));

profilePopup.addEventListener('click', closePopupOverlay);
addCardPopup.addEventListener('click', closePopupOverlay);
imageOpen.addEventListener('click', closePopupOverlay);

profileForm.addEventListener('submit', handleProfileSubmit);
addCardForm.addEventListener('submit', handleAddCardSubmit);
