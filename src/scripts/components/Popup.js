export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);

    this._handleEscClose = this._handleEscClose.bind(this); // Это мне тоже подсказали
  }

// Открытие / Закрытие попапов
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

// Обработчики доп. закрытий
  _handleEscClose(evt) {
    if(evt.key === 'Escape'){ this.close(); }
  }
  _handleOverlayClose(evt) {
    if(evt.target.classList.contains('popup')){
      this.close();
    }
  }

// Установка / Удаление слушателей
  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('mousedown', this._handleOverlayClose.bind(this));
  }
}
