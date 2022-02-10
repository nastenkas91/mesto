export const validationObject = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_active'
};

//вывести сообщение об ошибке
const showInputError =(formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

//скрыть сообщение об ошибке
const hideInputError =(formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
}

//проверка нескольких полей формы на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

//выключить кнопку "submit"
export const switchButtonOff = (buttonElement, validationConfig) => {
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

//включить кнопку "submit"
const switchButtonOn = (buttonElement, validationConfig) => {
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  buttonElement.removeAttribute('disabled')
}

//управление состоянием кнопки "submit"
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    switchButtonOff(buttonElement, validationConfig);
  }
  else {
    switchButtonOn(buttonElement, validationConfig);
  }
}

//проверка поля на валидность
const isValid = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  }
  else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

//установка слушателей на поля формы
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig)
      toggleButtonState(inputList, buttonElement, validationConfig);
    })
  })
}

//подключение валидации
const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
}

enableValidation(validationObject);

