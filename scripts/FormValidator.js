export class FormValidator {
  constructor(data, formElement) {
    this._parameters = data;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._parameters.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._parameters.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._parameters.inputErrorClass);
    inputElement.parentElement.classList.add(this._parameters.fieldErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._parameters.errorClass);
    console.log('show');
  }
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._parameters.inputErrorClass);
    inputElement.parentElement.classList.remove(this._parameters.fieldErrorClass);
    errorElement.classList.remove(this._parameters.errorClass);
    errorElement.textContent = '';
    console.log('hide');
  }

  _cheackInputValidaty(inputElement) {
    if(!inputElement.validity.valid){
      this._showInputError(inputElement, inputElement.validationMessage);
    }else{
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(function (inputElement){
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

  _toggleButtonState() {
    if (this._hasInvalidInput()){
      this.deactivateButton();
    }else{
      this.activateButton();
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._cheackInputValidaty(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._setEventListeners(); // Как-то глупо, но этого требует задание
  }
}
