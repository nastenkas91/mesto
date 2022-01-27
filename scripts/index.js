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
  cardElement.querySelector('.element__like-btn').addEventListener('click', addLike);
  cardElement.querySelector('.element__delete-btn').addEventListener('click', () => {
    cardElement.remove();})
  cardElement.querySelector('.element__image').addEventListener('click', showImage);
  addCard(cardElement);
}

//добавить картинку в галерею
function addCard(element) {
  cardList.prepend(element);
}

//поставить лайк
function addLike(evt) {
  evt.target.classList.toggle('element__like-btn_active');
}

//открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//окно создания карточки
function formCardSubmitHandler(event) {
  event.preventDefault();
  createCard(cardTitle.value, cardImage.value);
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

//добавить карточки "из коробки"
for (let i=0; i<initialCards.length; i++) {
  createCard(initialCards[i].name, initialCards[i].link);
}

//просмотр увеличенной картинки
function showImage(evt) {
  popupImage.querySelector('.popup__image').src = evt.target.src;
  popupImage.querySelector('.popup__image').alt = evt.target.alt;
  popupImage.querySelector('.popup__caption').textContent = evt.target.alt;
  openPopup(popupImage);
}

profileEditButton.addEventListener('click', openProfileForm)
closeProfileButton.addEventListener('click', () => closePopup(popupProfileEdit));
formProfile.addEventListener('submit', formProfileSubmitHandler);

addCardButton.addEventListener('click', () => openPopup(popupAddCard));
closeCardButton.addEventListener('click', () => closePopup(popupAddCard));
formCard.addEventListener('submit', formCardSubmitHandler);

closeImageButton.addEventListener('click', () => closePopup(popupImage));

