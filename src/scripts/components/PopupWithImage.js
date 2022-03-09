import { Popup } from './Popup.js';

import { popupElement, popupImage, popupTitle } from './Card.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ data }) {
    popupImage.setAttribute('src', data.image);
    popupImage.setAttribute('alt', data.title);
    popupTitle.textContent = data.title;

    super.open();
  }
}
