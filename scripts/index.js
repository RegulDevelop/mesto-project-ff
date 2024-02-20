// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const placeList = document.querySelector('.places__list');

function createCard(dataCard, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').alt = dataCard.alt;
  cardElement.querySelector('.card__image').src = dataCard.link;
  cardElement.querySelector('.card__title').textContent = dataCard.name;

  deleteButton.addEventListener('click', () => {
    deleteCard(dataCard, cardElement);
  });

  return cardElement;
}

function deleteCard(dataCard, cardElement) {
  cardElement.remove();
}

initialCards.forEach((element) => {
  const cardElement = createCard(element, deleteCard);

  placeList.append(cardElement);
});
