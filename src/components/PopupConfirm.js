import Popup from "./Popup";

export default class PopupConfirm extends Popup {
  constructor(selector) {
    super(selector);
    this._form = this._popup.querySelector('.form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleConfirm();
    })
  }

  setConfirmAction(handleConfirm) {
    this._handleConfirm = handleConfirm;
  }

}
