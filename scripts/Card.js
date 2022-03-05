import {popupImage} from "./data.js";
import {openPopup} from "./index.js";

export class Card {
  constructor(data, cardSelector) {
    this._image = data.link;
    this._name = data.name;
    this._selector = cardSelector;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  //метод создания карточки
  generateCard() {
    this._card = this._getElement();
    this._setCardEventListeners();
    this._cardImg = this._card.querySelector('.element__image');
    this._cardImg.src = this._image;
    this._cardImg.alt = this._name;
    this._card.querySelector('.element__name').textContent = this._name;
    return this._card;
  }

  //поставить лайк
  _addLike() {
    this._card.querySelector('.element__like-btn').classList.toggle('element__like-btn_active');
  }

  //удалить карточку
  _removeCard() {
    this._card.remove();
  }

  //просмотр увеличенной картинки
  _showImage() {
    popupImage.querySelector('.popup__image').src = this._image;
    popupImage.querySelector('.popup__image').alt = this._name;
    popupImage.querySelector('.popup__caption').textContent = this._name;
    openPopup(popupImage);
  }

  //установить слушатели событий
  _setCardEventListeners() {
    this._card.querySelector('.element__like-btn').addEventListener('click', () => {
      this._addLike();
    });
    this._card.querySelector('.element__delete-btn').addEventListener('click', () => {
      this._removeCard();
    });
    this._card.querySelector('.element__image').addEventListener('click', () => {
      this._showImage();
    });
  }
}
