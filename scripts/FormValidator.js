export class FormValidator {
  constructor(data, formElement) {
    this._parameters = data;
    this._formElement = formElement;
    this.inputList = Array.from(this._formElement.querySelectorAll(this._parameters.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._parameters.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._parameters.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._parameters.errorClass);
  }
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._parameters.inputErrorClass);
    errorElement.classList.remove(this._parameters.errorClass);
    errorElement.textContent = '';
  }

  checkInputValidaty(inputElement) {
    if(!inputElement.validity.valid){
      this._showInputError(inputElement, inputElement.validationMessage);
    }else{
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this.inputList.some(function (inputElement){
      return !inputElement.validity.valid;
    });
  }

  deactivateButton() {
    this._buttonElement.classList.add(this._parameters.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', 'true');
  }
  activateButton() {
    this._buttonElement.classList.remove(this._parameters.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  toggleButtonState() {
    if (this._hasInvalidInput()){
      this.deactivateButton();
    }else{
      this.activateButton();
    }
  }

  _setEventListeners() {
    this.toggleButtonState();
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.checkInputValidaty(inputElement);
        this.toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._setEventListeners(); // Как-то глупо, но этого требует задание
  }
}
