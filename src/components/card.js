import { openPopupImage } from './modal.js';

// Функции для работы с карточками

export function createCard(dataCard, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');

  if (dataCard) {
    cardElement.querySelector('.card__image').alt = dataCard.alt || '';
    cardElement.querySelector('.card__image').src = dataCard.link || '';
    cardElement.querySelector('.card__title').textContent = dataCard.name || '';
  }

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  cardImage.addEventListener('click', () => {
    openPopupImage(dataCard);
  });

  likeButton.addEventListener('click', () => {
    handleLikeCard(cardElement);
  });

  return cardElement;
}

// Функция удаления карточки

export function deleteCard(deleteElement) {
  deleteElement.remove();
}

// Функция добавления лайка

export function handleLikeCard(cardElement) {
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
}
