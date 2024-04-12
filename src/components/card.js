import {
  addLikeCard,
  removeLikeCard,
  deleteCardById,
  saveLikeState,
  getLikeState,
} from './api.js';

// Функции для работы с карточками

export function createCard(
  dataCard,
  deleteCard,
  likeCard,
  imageCard,
  currentUserId
) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likesCounter = cardElement.querySelector('.card__like-counter');
  const isLiked = getLikeState(dataCard._id);

  if (dataCard) {
    cardElement.querySelector('.card__image').src = dataCard.link || '';
    cardElement.querySelector('.card__image').alt = dataCard.name || '';
    cardElement.querySelector('.card__title').textContent = dataCard.name || '';

    if (dataCard.owner._id === currentUserId._id) {
      deleteButton.style.visibility = 'visible';
    } else {
      deleteButton.style.visibility = 'hidden';
    }

    if (isLiked === 'true') {
      likeButton.classList.add('card__like-button_is-active');
    }

    likesCounter.textContent = dataCard.likes.length;
  }

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement, dataCard._id);
  });

  likeButton.addEventListener('click', () => {
    likeCard(likeButton, likesCounter, dataCard._id);
  });

  cardImage.addEventListener('click', () => {
    imageCard(dataCard);
  });

  return cardElement;
}

// Функция удаления карточки

export function deleteCard(deleteElement, cardId) {
  deleteCardById(cardId)
    .then(() => {
      deleteElement.remove();
    })
    .catch((error) => {
      console.error('Ошибка при удалении карточки:', error);
    });
}

// Функция добавления лайка

export function likeCard(likeButton, likesCounter, cardId) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  if (isLiked) {
    removeLikeCard(cardId)
      .then((data) => {
        likesCounter.textContent = data.likes.length;
        likeButton.classList.remove('card__like-button_is-active');
        saveLikeState(cardId, false);
      })
      .catch((error) => {
        console.error('Ошибка при удалении лайка:', error);
      });
  } else {
    addLikeCard(cardId)
      .then((data) => {
        likesCounter.textContent = data.likes.length;
        likeButton.classList.add('card__like-button_is-active');
        saveLikeState(cardId, true);
      })
      .catch((error) => {
        console.error('Ошибка при добавлении лайка:', error);
      });
  }
}
