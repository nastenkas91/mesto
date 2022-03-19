import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._link = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }
  open({ name, link }) {
    this._link.src = link;
    this._link.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
