import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, { handleFormSubmit }) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._form.querySelector('.form__submit-btn')
    this._submitButtonDefaultText = this._submitButton.textContent;
    this._fieldList = Array.from(this._form.querySelectorAll('.form__field'));
  }

  _getInputValues() {
    const inputValues = {}
    this._fieldList.forEach((field) => {
      inputValues[field.name] = field.value;
    })
    return inputValues;
  }

  setInputValues(data) {
    this._fieldList.forEach((field) => {
      field.value = data[field.name];
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  changeSubmitButton(isSubmitting) {
    this._submitButton.textContent = isSubmitting ? 'Сохранение...'
      : this._submitButton.textContent = this._submitButtonDefaultText;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
