export default class Card {
  constructor({ cardData: { _id, link, name, likes, owner, userId },
                handleCardClick, handleLikeClick, handleDeleteClick },
                cardSelector) {
    this._id = _id;
    this._image = link;
    this._name = name;
    this._likes = likes;
    this._ownerId = owner._id;
    this._userId = userId;
    this._selector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
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
    this._likesCount = this._card.querySelector('.element__likes-count');
    this._likesCount.textContent = this._likes.length;
    this._deleteButton = this._card.querySelector('.element__delete-btn');
    if (this._userId !== this._ownerId) {
      this._deleteButton.style.display = 'none';
    }
    this._changeLikeStatus();
    this._setCardEventListeners();
    return this._card;
  }

  returnCardId() {
    return this._id;
  }

  isLiked() {
    return Boolean(this._likes.find((item) => item._id === this._userId));
  }

  //поставить лайк
  _changeLikeStatus() {
    this._likesCount.textContent = this._likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add('element__like-btn_active');
    } else this._likeButton.classList.remove('element__like-btn_active');
  }

  updateLikes(data) {
    this._likes = data.likes;
    this._changeLikeStatus();
  }

  //удалить карточку
  removeCard() {
    this._card.remove();
    this._card = null;
  }

  //установить слушатели событий
  _setCardEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });
    if (this._userId === this._ownerId) {
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteClick();
      });
    }
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}
