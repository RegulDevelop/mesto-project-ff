// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const placeList = document.querySelector('.places__list');

function createCard(data) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = data.link;
  cardElement.querySelector('.card__title').textContent = data.name;

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach((element) => {
  const cardElement = createCard(element, deleteCard);

  placeList.append(cardElement);
});
