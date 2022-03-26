import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ handleSubmit }, popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this.buttonElement = this._popupForm.querySelector('.popup__submit-button');
    this._handleSubmit = handleSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
