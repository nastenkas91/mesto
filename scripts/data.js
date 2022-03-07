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

export const popupProfileEdit = document.querySelector('.popup_type_edit-profile');
export const profileEditButton = document.querySelector('.profile__edit-btn');
export const closeProfileButton = popupProfileEdit.querySelector('.popup__close-btn');
export const formProfile = popupProfileEdit.querySelector('.form');

export const popupAddCard = document.querySelector('.popup_type_add-card');
export const addCardButton = document.querySelector('.profile__add-img-btn');
export const closeCardButton = popupAddCard.querySelector('.popup__close-btn');
export const formCard = popupAddCard.querySelector('.form');


export const profileName = document.querySelector('.profile__name');
export const profileOccupation = document.querySelector('.profile__occupation');
export const formFieldName = formProfile.querySelector('.form__field_type_name');
export const formFieldOccupation = formProfile.querySelector('.form__field_type_occupation');

export const cardTitle =  formCard.querySelector('.form__field_type_card-title');
export const cardImage =  formCard.querySelector('.form__field_type_card-img');

export const popupImage = document.querySelector('.popup_type_image');
export const image = popupImage.querySelector('.popup__image');
export const caption = popupImage.querySelector('.popup__caption');
export const closeImageButton = popupImage.querySelector('.popup__close-btn');

export const cardList = document.querySelector('.elements__list');
export const popups = document.querySelectorAll('.popup');

export const validationObject = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_active'
};
