import './pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card.js';
import {
  openModal,
  closeModal,
  closePopupOverlay,
} from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  getUserInfo,
  getInitialCards,
  updateUserProfile,
  addNewCard,
  updateUserAvatar,
} from './components/api.js';

const placeList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imageOpen = document.querySelector('.popup_type_image');
const userAvatarPopup = document.querySelector('.popup_type_icon');

const profileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const userAvatarOpen = document.querySelector('.profile__image');

const profileCloseButton = profilePopup.querySelector('.popup__close');
const addCardCloseButton = addCardPopup.querySelector('.popup__close');
const imageCloseButton = imageOpen.querySelector('.popup__close');
const userAvatarCloseButton = userAvatarPopup.querySelector('.popup__close');

const profileForm = document.querySelector('.popup_type_edit .popup__form');
const addCardForm = document.querySelector('.popup_type_new-card .popup__form');
const userAvatarForm = document.querySelector('.popup_type_icon .popup__form');

const nameInputImage = addCardForm.querySelector(
  '.popup__input_type_card-name'
);
const linkInputImage = addCardForm.querySelector('.popup__input_type_url');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active',
};

// Функция изменения текста кнопки на "Сохранение..."

function showSavingText(button) {
  button.textContent = 'Сохранение...';
}

// Функция изменения текста кнопки на "Сохранить"

function resetButtonText(button) {
  button.textContent = 'Сохранить';
}

// Обработчик «отправки» формы profile

function handleProfileSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');
  const saveButton = profileForm.querySelector('.popup__button');

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileName.textContent = nameValue;
  profileDescription.textContent = jobValue;

  showSavingText(saveButton);

  closeModal(profilePopup);

  updateUserProfile(nameValue, jobValue)
    .then((data) => {
      console.log(data);
      resetButtonText(saveButton);
      closeModal(profilePopup);
    })
    .catch((error) => {
      console.error('Ошибка при обновлении данных профиля:', error);
      resetButtonText(saveButton);
    });
}

// Обработчик «отправки» формы addCard

function handleAddCardSubmit(evt, currentUser) {
  evt.preventDefault();

  const nameValue = nameInputImage.value;
  const linkValue = linkInputImage.value;
  const saveButton = addCardForm.querySelector('.popup__button');

  showSavingText(saveButton);

  addNewCard(nameValue, linkValue)
    .then((data) => {
      const newCardElement = createCard(
        data,
        deleteCard,
        likeCard,
        openImageCard,
        currentUser
      );
      placeList.prepend(newCardElement);
      closeModal(addCardPopup);
      addCardForm.reset();
      clearValidation(addCardForm, validationConfig);
      resetButtonText(saveButton);
    })
    .catch((error) => {
      console.error('Ошибка при добавлении новой карточки:', error);
      resetButtonText(saveButton);
    });
}

// Обработчик «отправки» формы userAvatar

function handleUserAvatarSubmit(evt) {
  evt.preventDefault();

  const avatarUrl = document.querySelector('.popup__input_type_url').value;
  const saveButton = userAvatarForm.querySelector('.popup__button');

  showSavingText(saveButton);

  updateUserAvatar(avatarUrl)
    .then((data) => {
      console.log('Аватар успешно обновлён:', data);

      userAvatarOpen.style.backgroundImage = `url(${avatarUrl})`;

      closeModal(userAvatarPopup);
      userAvatarForm.reset();
      clearValidation(userAvatarForm, validationConfig);
      resetButtonText(saveButton);
    })
    .catch((error) => {
      console.error('Ошибка при обновлении аватара:', error);
      resetButtonText(saveButton);
    });
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
  clearValidation(profileForm, validationConfig);
});
addCardButton.addEventListener('click', () => openModal(addCardPopup));
userAvatarOpen.addEventListener('click', () => openModal(userAvatarPopup));

profileCloseButton.addEventListener('click', () => closeModal(profilePopup));
addCardCloseButton.addEventListener('click', () => closeModal(addCardPopup));
imageCloseButton.addEventListener('click', () => closeModal(imageOpen));
userAvatarCloseButton.addEventListener('click', () =>
  closeModal(userAvatarPopup)
);

profilePopup.addEventListener('click', closePopupOverlay);
addCardPopup.addEventListener('click', closePopupOverlay);
imageOpen.addEventListener('click', closePopupOverlay);
userAvatarPopup.addEventListener('click', closePopupOverlay);

profileForm.addEventListener('submit', handleProfileSubmit);
addCardForm.addEventListener('submit', (evt) => {
  getUserInfo()
    .then((userData) => {
      const currentUser = userData;
      handleAddCardSubmit(evt, currentUser);
    })
    .catch((error) => {
      console.error(
        'Ошибка при получении данных текущего пользователя:',
        error
      );
    });
});
userAvatarForm.addEventListener('submit', (evt) => {
  handleUserAvatarSubmit(evt);
});

enableValidation(validationConfig);

// Используем Promise.all() для параллельного выполнения запросов на получение данных о пользователе и карточек

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    const userNameElement = document.querySelector('.profile__title');
    const userAboutElement = document.querySelector('.profile__description');

    userNameElement.textContent = userData.name;
    userAboutElement.textContent = userData.about;
    userAvatarOpen.style.backgroundImage = `url(${userData.avatar})`;

    cardsData.forEach((card) => {
      const cardElement = createCard(
        card,
        deleteCard,
        likeCard,
        openImageCard,
        userData
      );
      placeList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error('Ошибка при загрузке данных:', err);
  });
