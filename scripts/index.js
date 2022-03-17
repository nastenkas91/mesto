import {
  initialCards,
  popupProfileEdit,
  profileEditButton,
  formProfile,
  popupAddCard,
  addCardButton,
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
  cardList,
  validationObject
} from "../utils/data.js";

import {FormValidator} from "../components/FormValidator.js"

import {Card} from "../components/Card.js"

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
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

//закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

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

formProfile.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', () => {
  formValidators['addCard'].resetValidation();
  openPopup(popupAddCard)
});

formCard.addEventListener('submit', handleCardFormSubmit);

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



