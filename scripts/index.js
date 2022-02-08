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

//функция создания карточки
function createCard(nameValue, linkValue) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = linkValue;
  cardElement.querySelector('.element__image').alt = nameValue;
  cardElement.querySelector('.element__name').textContent = nameValue;
  return cardElement;
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
cardList.addEventListener('click', function (evt) {
  if(evt.target.classList.contains('element__like-btn')) {
    evt.target.classList.toggle('element__like-btn_active');
  }
})

//удалить карточку
cardList.addEventListener('click', function (evt) {
  if(evt.target.classList.contains('element__delete-btn')) {
    evt.target.closest('.element').remove();
  }
})

//просмотр увеличенной картинки
function showImage(evt) {
  popupImage.querySelector('.popup__image').src = evt.target.src;
  popupImage.querySelector('.popup__image').alt = evt.target.alt;
  popupImage.querySelector('.popup__caption').textContent = evt.target.alt;
  openPopup(popupImage);
}

//открыть картинку в полном размере
cardList.addEventListener('click', function (evt) {
  if(evt.target.classList.contains('element__image')) {
    showImage(evt);
  }
})

//открыть попап
function openPopup(popup) {
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
  const currentPopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
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




