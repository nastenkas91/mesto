import './index.css'

import {
  initialCards,
  popupProfileEdit,
  profileEditButton,
  popupAddCard,
  addCardButton,
  popupImage,
  validationObject,
  cardListSelector,
  profileNameSelector,
  profileOccupationSelector,
  fieldName,
  fieldOccupation
} from "../utils/data.js";

import FormValidator from "../components/FormValidator.js"
import Card from "../components/Card.js"
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const cardSection = new Section({
  renderer: (cardData) => {
    const card = new Card({
        cardData,
        handleCardClick: () => {
          imageView.open(cardData);
        }
      },
      "#placeCard");
    return card.generateCard();
    },
  },
  cardListSelector
);

const imageView = new PopupWithImage(popupImage);

const cardForm = new PopupWithForm(popupAddCard, {
  handleFormSubmit: (cardData) => {
    cardSection.addItem(cardData);
    //cardForm.close()
  }})

const profileInfo = new UserInfo({nameSelector: profileNameSelector,
  occupationSelector: profileOccupationSelector})

const profileForm = new PopupWithForm(popupProfileEdit, {
  handleFormSubmit: (userData) => {
    profileInfo.setUserInfo(userData);
    console.log(userData)
    //profileForm.close()
  }
})

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

//установка слушателей
profileEditButton.addEventListener('click', () => {
  formValidators['editProfile'].resetValidation();
  const {profileName, profileOccupation} = profileInfo.getUserInfo();
  fieldName.value = profileName;
  fieldOccupation.value = profileOccupation;
  profileForm.open();
});

addCardButton.addEventListener('click', () => {
  formValidators['addCard'].resetValidation();
  cardForm.open()
});

imageView.setEventListeners()
profileForm.setEventListeners()
cardForm.setEventListeners()

//отрисовка карточек из коробки
cardSection.renderItems(initialCards);

