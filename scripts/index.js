const initialCards = [
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

const profileOpenPopupButton = document.querySelector('.profile__edit-btn');
const popupProfileEdit = document.querySelector('.popup__type_edit-profile');
const addCardOpenPopupButton = document.querySelector('.profile__add-img-btn');
const popupAddCard = document.querySelector('.popup_type_add-card');
const form = document.querySelector('.form');
const profileClosePopupButton = popupProfileEdit.querySelector('.popup__close-btn');
const addCardClosePopupButton = popupAddCard.querySelector('.popup__close-btn');
const profileName = document.querySelector('.profile__name')
const profileOccupation = document.querySelector('.profile__occupation')
const formFieldName = document.querySelector('.form__field_type_name')
const formFieldOccupation = document.querySelector('.form__field_type_occupation')

//функция добавления карточки в разметку (в начало)
function addCard(element) {
  const cardList = document.querySelector('.elements__list');
  const cardTemplate = document.querySelector('#placeCard').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = element.link;
  cardElement.querySelector('.element__image').alt = element.name;
  cardElement.querySelector('.element__name').textContent = element.name;
  cardList.prepend(cardElement);
}

//добавить карточки "из коробки"
initialCards.forEach(addCard);

//открыть попап добавления карточки
function openAddCardPopup() {
  popupAddCard.classList.add('popup_opened');
}

//закрыть попап добавления карточки
function closeAddCardPopup() {
  popupAddCard.classList.remove('popup_opened');
}

//открыть попап редактирования профиля
function openEditProfilePopup() {
  formFieldName.value = profileName.textContent;
  formFieldOccupation.value = profileOccupation.textContent;
  popupProfileEdit.classList.add('popup_opened');
}

//закрыть попап редактирования профиля
function closeEditProfilePopup() {
  popupProfileEdit.classList.remove('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = formFieldName.value;
  profileOccupation.textContent = formFieldOccupation.value;
  closeEditProfilePopup();
}

profileOpenPopupButton.addEventListener('click', openEditProfilePopup);
profileClosePopupButton.addEventListener('click', closeEditProfilePopup);
addCardOpenPopupButton.addEventListener('click', openAddCardPopup);
addCardClosePopupButton.addEventListener('click', closeAddCardPopup);
form.addEventListener('submit', formSubmitHandler);

