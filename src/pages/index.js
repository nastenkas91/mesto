import './index.css'

import {
  //initialCards,
  popupProfileEdit,
  profileEditButton,
  popupAddCard,
  addCardButton,
  popupImage,
  popupConfirmSelector,
  validationObject,
  cardListSelector,
  profileNameSelector,
  profileOccupationSelector,
  profileAvatarSelector,
  popupEditAvatarSelector,
  editAvatarButton,
  fieldName,
  fieldOccupation,
  apiConfig
} from "../utils/data.js";

import FormValidator from "../components/FormValidator.js"
import Card from "../components/Card.js"
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupConfirm from "../components/PopupConfirm.js";

const api = new Api(apiConfig);

const profileInfo = new UserInfo({
  nameSelector: profileNameSelector,
  occupationSelector: profileOccupationSelector,
  avatarSelector: profileAvatarSelector
})

const profileForm = new PopupWithForm(popupProfileEdit, {
  handleFormSubmit: (userData) => {
    profileForm.changeSubmitButton(true);
    api
      .editProfileInfo({
        userName: userData.profileName,
        occupation: userData.profileOccupation})
      .then((res) => {
        profileInfo.setUserInfo(res);
        profileForm.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        profileForm.changeSubmitButton(false);
      });
  }
})

function createCard(cardData) {
  const card = new Card({
      cardData: { ...cardData, userId: profileInfo.returnProfileId() },
      handleCardClick: () => {
        imageView.open(cardData);
      },

      handleLikeClick: () => {
        if (card.isLiked()) {
          api
            .deleteLike(card.returnCardId())
            .then((res) => {
              card.updateLikes(res)
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          api.addLike(card.returnCardId())
            .then((res) => {
              card.updateLikes(res);
            })
            .catch((err) => {
              console.log(err)
            })
        }
      },

      handleDeleteClick: () => {
        popupWithConfirm.open();
        popupWithConfirm.setConfirmAction(() => {
          api.deleteCard(card.returnCardId())
            .then(() => {
              card.removeCard();
              popupWithConfirm.close();
            })
            .catch((err) => {
              console.log(err)
            })
        })
      }
    },
    "#placeCard");
  return card.generateCard();
}

const cardSection = new Section({
  renderer: createCard,
  },
  cardListSelector
);

const imageView = new PopupWithImage(popupImage);

const popupWithConfirm = new PopupConfirm(popupConfirmSelector);

const popupWithAvatar = new PopupWithForm(popupEditAvatarSelector, {
  handleFormSubmit: (avData) => {
    popupWithAvatar.changeSubmitButton(true);
    api
      .editAvatar({
        data: avData.avatarLink
      })
      .then((res) => {
        profileInfo.setUserInfo(res);
        popupWithAvatar.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        popupWithAvatar.changeSubmitButton(false);
      });
  }
})


//добавление новой карточки
const cardForm = new PopupWithForm(popupAddCard, {
  handleFormSubmit: (cardData) => {
    //cardSection.addItem(cardData);
    cardForm.changeSubmitButton(true)
    api.addNewCard(cardData)
      .then((res) => {
        cardSection.addItem(res);
        cardForm.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        cardForm.changeSubmitButton(false);
      });
  }})


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
  profileForm.setInputValues(profileInfo.getUserInfo());
  profileForm.open();
});

editAvatarButton.addEventListener('click', () => {
  formValidators['editAvatar'].resetValidation();
  popupWithAvatar.open();
})

addCardButton.addEventListener('click', () => {
  formValidators['addCard'].resetValidation();
  cardForm.open()
});

imageView.setEventListeners()
profileForm.setEventListeners()
cardForm.setEventListeners()
popupWithConfirm.setEventListeners()
popupWithAvatar.setEventListeners()

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, items]) => {
    profileInfo.setUserInfo(data);
    cardSection.renderItems(items.reverse())
  })
  .catch(((err) => {
    console.log(err)
  }))
