// Импорты
import { openPopup, closePopup } from './script.js';
import { placePopupCloseButton } from './script.js';

// Данные попапа
const popupElement = document.querySelector('.popup_content_place-info');
const popupImage = popupElement.querySelector('.popup__image');
const popupTitle = popupElement.querySelector('.popup__title');


export class Card {
  constructor(placeTitle, placeLink, cardSelector) {
    this._title = placeTitle;
    this._link = placeLink;
    this._cardSelector = cardSelector;
  }

  // Получение -template элемента
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);

    return cardElement;
  }

  // Открытие / Закрытие попапов
  _handleOpenPopup() {
    popupImage.setAttribute('src', this._link);
    popupImage.setAttribute('alt', this._title);
    popupTitle.textContent = this._title;

    openPopup(popupElement);
  }

  // Установка слушателей
  _setEventListeners() {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });
    this._element.querySelector('.elements__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('elements__like_active');
    });
    this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
      this._element.remove();
      this._element = null;
    });
  }

  // Генерирование карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.elements__image').setAttribute('src', this._link);
    this._element.querySelector('.elements__image').setAttribute('alt', this._title);
    this._element.querySelector('.elements__title').textContent = this._title;

    return this._element;
  }
}
