import {
  initialCards,
  popupProfileEdit,
  profileEditButton,
  closeProfileButton,
  formProfile,
  popupAddCard,
  addCardButton,
  closeCardButton,
  formCard,
  profileName,
  profileOccupation,
  formFieldName,
  formFieldOccupation,
  cardTitle,
  cardImage,
  popupImage,
  closeImageButton,
  cardList
} from "./data.js";

import {
  resetValidation,
  validationObject
} from "./FormValidator.js"

import {Card} from "./Card.js"

//добавить картинку в галерею
function addCard(element) {
  cardList.prepend(element);
}

//добавить карточки "из коробки"
function addInitialCards() {
  initialCards.forEach(function (data) {
    const card = new Card(data, '#placeCard');
    const cardElement = card.generateCard();
    addCard(cardElement);
  })
}

//открыть попап
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', handleOverlayClose);
  document.addEventListener('keydown', handleEscClose);
}

//закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', handleOverlayClose);
  document.removeEventListener('keydown', handleEscClose);
}

//закрытие попапа при щелчке по оверлею
function handleOverlayClose(event) {
  if (event.currentTarget === event.target) {
    closePopup(event.target);
  }
}

//закрытие попапа при нажатии на esc
function handleEscClose(event) {
  if (event.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

//окно создания карточки
function formCardSubmitHandler(event) {
  event.preventDefault();
  const cardData = {
    name: cardTitle.value, link: cardImage.value
  }
  const card = new Card(cardData, '#placeCard');
  const cardElement = card.generateCard();
  addCard(cardElement);
  closePopup(popupAddCard);
  cardTitle.value = '';
  cardImage.value = '';
}

//окно редактирования профиля
function openProfileForm(validationConfig) {
    formFieldName.value = profileName.textContent;
    formFieldOccupation.value = profileOccupation.textContent;
    openPopup(popupProfileEdit, validationConfig);
}

//изменение профиля
function formProfileSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = formFieldName.value;
  profileOccupation.textContent = formFieldOccupation.value;
  closePopup(popupProfileEdit);
}

addInitialCards();

//навесить события на элементы
profileEditButton.addEventListener('click', () => {
  resetValidation(popupProfileEdit, validationObject);
  openProfileForm();
})
closeProfileButton.addEventListener('click', () => closePopup(popupProfileEdit));
formProfile.addEventListener('submit', formProfileSubmitHandler);

addCardButton.addEventListener('click', () => {
  resetValidation(popupAddCard, validationObject);
  openPopup(popupAddCard)
});
closeCardButton.addEventListener('click', () => closePopup(popupAddCard));
formCard.addEventListener('submit', formCardSubmitHandler);

closeImageButton.addEventListener('click', () => closePopup(popupImage));


