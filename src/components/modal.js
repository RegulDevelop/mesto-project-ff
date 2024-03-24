// Функция открытия попапа

export function openModal(popupElement) {
  popupElement.classList.add('popup_is-animated');

  setTimeout(() => {
    popupElement.classList.add('popup_is-opened');
  }, 10);

  document.addEventListener('keydown', closePopupEscape);
}

// Функция закрытия попапа

export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', closePopupEscape);
}

// Закрытие попапа кликом на оверлей

export const closePopupOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
};

// Закрытие попапа нажатием на клавишу ESC

export function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
