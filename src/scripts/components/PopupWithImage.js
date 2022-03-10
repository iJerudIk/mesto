import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupElement = document.querySelector('.popup_content_place-info');
    this._popupImage = this._popupElement.querySelector('.popup__image');
    this._popupTitle = this._popupElement.querySelector('.popup__title');
  }

  open({ data }) {
    this._popupImage.setAttribute('src', data.image);
    this._popupImage.setAttribute('alt', data.title);
    this._popupTitle.textContent = data.title;

    super.open();
  }
}
