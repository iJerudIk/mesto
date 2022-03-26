import { Popup } from './Popup.js';

export class PopupWithSubmiting extends Popup {
  constructor({ handleSubmit }, popupSelector) {
    super(popupSelector);
    this._element = {};
    this._popupForm = this._popup.querySelector('.popup__form');
    this.buttonElement = this._popupForm.querySelector('.popup__submit-button');
    this._handleSubmit = handleSubmit;
  }

  open(element){
    this._element = element
    super.open();
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._element);
    });
    super.setEventListeners();
  }
}
