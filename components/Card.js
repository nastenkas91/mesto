export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._image = data.link;
    this._name = data.name;
    this._selector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._cardImg = this._card.querySelector('.element__image');
    this._cardImg.src = this._image;
    this._cardImg.alt = this._name;
    this._card.querySelector('.element__name').textContent = this._name;
    this._likeButton = this._card.querySelector('.element__like-btn');
    this._setCardEventListeners();
    return this._card;
  }

  //поставить лайк
  _addLike() {
    this._likeButton.classList.toggle('element__like-btn_active');
  }

  //удалить карточку
  _removeCard() {
    this._card.remove();
    this._card = null;
  }

  //установить слушатели событий
  _setCardEventListeners() {
    this._card.querySelector('.element__like-btn').addEventListener('click', () => {
      this._addLike();
    });
    this._card.querySelector('.element__delete-btn').addEventListener('click', () => {
      this._removeCard();
    });
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._image);
    });
  }
}
