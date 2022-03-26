import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupName = this._popup.querySelector('.popup__title');
  }

  open({ data }) {
    this._popupImage.setAttribute('src', data.image);
    this._popupImage.setAttribute('alt', data.name);
    this._popupName.textContent = data.name;

    super.open();
  }
}
