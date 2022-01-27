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

const popupProfileEdit = document.querySelector('.popup_type_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-btn');
const closeProfileButton = popupProfileEdit.querySelector('.popup__close-btn');
const formProfile = popupProfileEdit.querySelector('.form');

const popupAddCard = document.querySelector('.popup_type_add-card');
const addCardButton = document.querySelector('.profile__add-img-btn');
const closeCardButton = popupAddCard.querySelector('.popup__close-btn');
const formCard = popupAddCard.querySelector('.form');


const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const formFieldName = formProfile.querySelector('.form__field_type_name');
const formFieldOccupation = formProfile.querySelector('.form__field_type_occupation');

const cardTitle =  formCard.querySelector('.form__field_type_card-title');
const cardImage =  formCard.querySelector('.form__field_type_card-img');

const popupImage = document.querySelector('.popup_type_image');
const closeImageButton = popupImage.querySelector('.popup__close-btn');

const cardList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#placeCard').content;
const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

//добавить картинку в галерею
function addCard(element) {
  cardList.prepend(element);
}

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

//добавление карточки
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
for (i=0; i<initialCards.length; i++) {
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

