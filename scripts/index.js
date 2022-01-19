const profileOpenPopupButton = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const form = document.querySelector('.form');
const popupCloseButton = document.querySelector('.popup__close-btn');
const profileName = document.querySelector('.profile__name')
const profileOccupation = document.querySelector('.profile__occupation')
const formFieldName = document.querySelector('.form__field_type_name')
const formFieldOccupation = document.querySelector('.form__field_type_occupation')


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

