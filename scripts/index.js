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
  cardList,
  cardTemplate,
} from "./data.js";

import {
  switchButtonOff,
  validationObject
} from "./validate.js"

//функция создания карточки
function createCard(nameValue, linkValue) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.src = linkValue;
  cardImage.alt = nameValue;
  cardElement.querySelector('.element__name').textContent = nameValue;
  setCardEventListeners(cardElement);
  return cardElement;
}

function setCardEventListeners(element) {
  element.querySelector('.element__like-btn').addEventListener('click', addLike);
  element.querySelector('.element__delete-btn').addEventListener('click', removeCard);
  element.querySelector('.element__image').addEventListener('click', showImage);
}

//добавить картинку в галерею
function addCard(element) {
  cardList.prepend(element);
}

//добавить карточки "из коробки"
function addInitialCards() {
  initialCards.forEach(function (card) {
    cardList.append(createCard(card.name, card.link));
  })
}

//поставить лайк
function addLike(evt) {
  evt.target.classList.toggle('element__like-btn_active');
}

//просмотр увеличенной картинки
function showImage(evt) {
  popupImage.querySelector('.popup__image').src = evt.target.src;
  popupImage.querySelector('.popup__image').alt = evt.target.alt;
  popupImage.querySelector('.popup__caption').textContent = evt.target.alt;
  openPopup(popupImage);
}

//удалить карточку
function removeCard(evt) {
  evt.target.closest('.element').remove();
}

//открыть попап
function openPopup(popup, validationConfig) {
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
  const cardElement = createCard(cardTitle.value, cardImage.value);
  addCard(cardElement);
  closePopup(popupAddCard);
  cardTitle.value = '';
  cardImage.value = '';
  const submitButton = popupAddCard.querySelector(validationObject.submitButtonSelector);
  switchButtonOff(submitButton, validationObject);
}

//окно редактирования профиля
function openProfileForm() {
    formFieldName.value = profileName.textContent;
    formFieldOccupation.value = profileOccupation.textContent;
    openPopup(popupProfileEdit);
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
profileEditButton.addEventListener('click', openProfileForm)
closeProfileButton.addEventListener('click', () => closePopup(popupProfileEdit));
formProfile.addEventListener('submit', formProfileSubmitHandler);

addCardButton.addEventListener('click', () => openPopup(popupAddCard));
closeCardButton.addEventListener('click', () => closePopup(popupAddCard));
formCard.addEventListener('submit', formCardSubmitHandler);

closeImageButton.addEventListener('click', () => closePopup(popupImage));


