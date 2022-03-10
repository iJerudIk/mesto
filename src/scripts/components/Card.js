export class Card {
  constructor({ handleCardClick }, item, cardSelector) {
    this._title = item.title;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

  // Установка слушателей
  _setEventListeners() {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardClick();
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
