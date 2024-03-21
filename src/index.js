import './pages/index.css';
import { createCard, deleteCard } from './components/card.js';
import {
  openPopupProfile,
  openPopupAddCard,
  openPopupImage,
  closePopupOnOverlayClick,
  handleFormSubmit,
  handleAddCardSubmit,
} from './components/modal.js';
import { initialCards } from './scripts/cards.js';

const placeList = document.querySelector('.places__list');
const profileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup_type_edit .popup__form');
const addCardForm = document.querySelector('.popup_type_new-card .popup__form');

initialCards.forEach((element) => {
  const cardElement = createCard(element, deleteCard);
  placeList.append(cardElement);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', () => {
    openPopupImage(element);
  });
});

closePopupOnOverlayClick();

profileButton.addEventListener('click', openPopupProfile);
addCardButton.addEventListener('click', openPopupAddCard);
formElement.addEventListener('submit', handleFormSubmit);
addCardForm.addEventListener('submit', handleAddCardSubmit);
