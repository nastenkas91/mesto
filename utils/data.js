export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const popupProfileEdit = '.popup_type_edit-profile';
export const profileEditButton = document.querySelector('.profile__edit-btn');

export const popupAddCard = '.popup_type_add-card';
export const addCardButton = document.querySelector('.profile__add-img-btn');

export const profileNameSelector = '.profile__name';
export const profileOccupationSelector = '.profile__occupation';
export const fieldName = document.querySelector('.form__field_type_name');
export const fieldOccupation = document.querySelector('.form__field_type_occupation');

export const cardTitle =  document.querySelector('.form__field_type_card-title');
export const cardImage =  document.querySelector('.form__field_type_card-img');

export const popupImage = '.popup_type_image';

export const cardListSelector = '.elements__list';

export const validationObject = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_active'
};
