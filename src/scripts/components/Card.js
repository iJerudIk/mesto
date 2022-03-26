export class Card {
  constructor({ handleCardClick, handleCardDelete, handleCardLike }, item, userId, cardSelector) {
    this._userId = userId;
    this._ownerId = item.owner._id;

    this._id = item._id;
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes.length;
    this._isLiked = item.likes.some((like) => {
      if(like._id === this._userId)
        return true;
      return false;
    });

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
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
    this._element.querySelector('.elements__like-button').addEventListener('click', (evt) => {
      this._handleCardLike(this._isLiked);

      if(!this._isLiked){
        evt.target.classList.add('elements__like-button_active');
        this._likes++;
        this._element.querySelector('.elements__like-number').textContent = this._likes;
      }else{
        evt.target.classList.remove('elements__like-button_active');
        this._likes--;
        this._element.querySelector('.elements__like-number').textContent = this._likes;
      }

      this._isLiked = !this._isLiked;
    });
    this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
      this._handleCardDelete();
    });
  }

  // Генерирование карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.elements__image').setAttribute('src', this._link);
    this._element.querySelector('.elements__image').setAttribute('alt', this._name);
    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__like-number').textContent = this._likes;

    if(this._ownerId !== this._userId)
      this._element.querySelector('.elements__delete-button').style.display = 'none';
    if(this._isLiked)
      this._element.querySelector('.elements__like-button').classList.add('elements__like-button_active');

    return this._element;
  }
}
