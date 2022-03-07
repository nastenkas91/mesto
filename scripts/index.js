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
  popups,
  image,
  caption,
  closeImageButton,
  cardList,
  validationObject
} from "./data.js";

import {FormValidator} from "./FormValidator.js"

import {Card} from "./Card.js"

//создать карточку
function createCard(data, handleCardClick) {
  const card = new Card(data, '#placeCard', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

//добавить картинку в галерею
function addCard(element) {
  cardList.prepend(element);
}

//добавить карточки "из коробки"
function addInitialCards(handleCardClick) {
  initialCards.forEach(function (data) {
    const cardElement = createCard(data, handleCardClick)
    addCard(cardElement);
  })
}

//открыть попап
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  //popup.addEventListener('mousedown', handleOverlayClose);
  document.addEventListener('keydown', handleEscClose);
}

//закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  //popup.removeEventListener('mousedown', handleOverlayClose);
  document.removeEventListener('keydown', handleEscClose);
}
/*
//закрытие попапа при щелчке по оверлею
function handleOverlayClose(event) {
  if (event.currentTarget === event.target) {
    closePopup(event.target);
  }
}
*/
//закрытие попапа при нажатии на esc
function handleEscClose(event) {
  if (event.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

//окно создания карточки
function handleCardFormSubmit(event) {
  event.preventDefault();
  const cardData = {
    name: cardTitle.value, link: cardImage.value
  }
  const cardElement = createCard(cardData, handleCardClick);
  addCard(cardElement);
  closePopup(popupAddCard);
  formCard.reset();
}

//просмотр увеличенной картинки
function handleCardClick(name, link) {
  image.src = link;
  image.alt = name;
  caption.textContent = name;
  openPopup(popupImage);
}

//окно редактирования профиля
function openProfileForm() {
    formFieldName.value = profileName.textContent;
    formFieldOccupation.value = profileOccupation.textContent;
    openPopup(popupProfileEdit);
}

//изменение профиля
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = formFieldName.value;
  profileOccupation.textContent = formFieldOccupation.value;
  closePopup(popupProfileEdit);
}

addInitialCards(handleCardClick);

//подключение валидации
//объект с экзкмплярами валидаторов всех форм
const formValidators = {};
const enableValidation = (validationObject) => {
  const formList = Array.from(document.querySelectorAll(validationObject.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationObject, formElement);
    //получаем имя формы
    const formName = formElement.getAttribute('name');
    //записываем полученный экземпляр под именем формы в объект
    formValidators[formName] = validator;
    validator.enableValidation()
  })
}

enableValidation(validationObject);

//навесить события на элементы
profileEditButton.addEventListener('click', () => {
  formValidators['editProfile'].resetValidation();
  openProfileForm();
});

//closeProfileButton.addEventListener('click', () => closePopup(popupProfileEdit));
formProfile.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', () => {
  formValidators['addCard'].resetValidation();
  openPopup(popupAddCard)
});

//closeCardButton.addEventListener('click', () => closePopup(popupAddCard));
formCard.addEventListener('submit', handleCardFormSubmit);

//closeImageButton.addEventListener('click', () => closePopup(popupImage));

//объединить обработчики оверлея и крестиков
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    } else if (evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  })
})



