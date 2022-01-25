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
const popup = document.querySelector('.popup');
const form = document.querySelector('.form');
const popupCloseButton = document.querySelector('.popup__close-btn');
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



function openPopup() {
  formFieldName.value = profileName.textContent;
  formFieldOccupation.value = profileOccupation.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = formFieldName.value;
  profileOccupation.textContent = formFieldOccupation.value;
  closePopup();
}

profileOpenPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);

