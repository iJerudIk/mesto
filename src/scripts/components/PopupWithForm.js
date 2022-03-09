import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ submitRenderer }, popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form')
    this._submitRenderer = submitRenderer;
    this._inputValues = {};
  }

  _getInputValues() {
    const inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    inputList.forEach((input) => {
      this._inputValues[input.name] = input.value; // Мне подсказали так сделать
    });

    return this._inputValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitRenderer();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
