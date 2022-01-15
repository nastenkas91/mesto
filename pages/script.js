const profileOpenPopupButton = document.querySelector('button.profile__edit-btn');
const profileEditPopup = document.querySelector('.popup');
const profileClosePopupButton = document.querySelector('button.popup__close-btn');
const profileSubmitButton = document.querySelector('button.popup__submit-btn');

let profileName = document.querySelector('.profile__name')
let profileOccupation = document.querySelector('.profile__occupation')
let popupProfileName = document.querySelector('.popup__field_name')
let popupProfileOccupation = document.querySelector('.popup__field_occupation')


function openProfileEditPopup() {
  profileEditPopup.classList.add('popup_opened');
  popupProfileName.value = profileName.textContent;
  popupProfileOccupation.value = profileOccupation.textContent;
}


