import { closePopupEscape } from './modal.js';

// Функции для работы с карточками

export function createCard(dataCard, deleteCard, likeCard, imageCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');

  if (dataCard) {
    cardElement.querySelector('.card__image').alt = dataCard.alt || '';
    cardElement.querySelector('.card__image').src = dataCard.link || '';
    cardElement.querySelector('.card__title').textContent = dataCard.name || '';
  }

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  likeButton.addEventListener('click', () => {
    likeCard(likeButton);
  });

  cardImage.addEventListener('click', () => {
    imageCard(dataCard);
  });

  return cardElement;
}

// Функция удаления карточки

export function deleteCard(deleteElement) {
  deleteElement.remove();
}

// Функция добавления лайка

export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

// Функция клика по изображению

export function imageCard(dataCard) {
  const popupImage = document.querySelector('.popup__image');
  const imageCaption = document.querySelector('.popup__caption');
  const imageOpen = document.querySelector('.popup_type_image');

  imageOpen.classList.add('popup_is-animated');

  setTimeout(() => {
    imageOpen.classList.add('popup_is-opened');
  }, 10);

  if (dataCard) {
    popupImage.src = dataCard.link || '';
    imageCaption.textContent = dataCard.name || '';
  }

  document.addEventListener('keydown', closePopupEscape);
}
