// Данные попапа
const popupElement = document.querySelector('.popup_content_place-info');
const popupImage = popupElement.querySelector('.popup__image');
const popupTitle = popupElement.querySelector('.popup__title');
const placePopupCloseButton = popupElement.querySelector('.popup__close-button');


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
    popupElement.classList.add('popup_opened');

    document.addEventListener('keydown', (evt) => {this._keyHandler(evt)});
    popupElement.addEventListener('click', (evt) => {this._overlayHandler(evt)})
  }

  _handleClosePopup() {
    popupElement.classList.remove('popup_opened');

    document.removeEventListener('keydown', (evt) => {this._keyHandler(evt)});
    popupElement.removeEventListener('click', (evt) => {this._overlayHandler(evt)});
  }

  // Установка слушателей
  _setEventListeners() {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });

    placePopupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    });
  }

  _keyHandler(evt) {
    if(evt.key === 'Escape'){
      this._handleClosePopup();
    }
  }
  _overlayHandler(evt) {
    if(evt.target.classList.contains('popup')){
      this._handleClosePopup();
    }
  }

  // Генерирование карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.elements__image').setAttribute('src', this._link);
    this._element.querySelector('.elements__image').setAttribute('alt', this._title);
    this._element.querySelector('.elements__title').textContent = this._title;

    this._element.querySelector('.elements__like').addEventListener('click', function (evt){
      evt.target.classList.toggle('elements__like_active');
    });
    this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
      this._element.remove();
    });

    return this._element;
  }
}
