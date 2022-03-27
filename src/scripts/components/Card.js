export class Card {
  constructor({ handleCardClick, handleCardDelete, handleCardLike }, item, userId, cardSelector) {
    this._ownerId = item.owner._id;
    this._userId = userId;
    this._id = item._id;

    this.name = item.name;
    this.link = item.link;
    this.likes = item.likes.length;
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
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
    this._likeButton.addEventListener('click', (evt) => {
      this._handleCardLike(this._isLiked);
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleCardDelete();
    });
  }

  // Генерирование карточки
  generateCard() {
    this.element = this._getTemplate();
    this._cardImage = this.element.querySelector('.elements__image');
    this._cardTitle = this.element.querySelector('.elements__title');
    this._likeButton = this.element.querySelector('.elements__like-button');
    this._numberLikes = this.element.querySelector('.elements__like-number');
    this._deleteButton = this.element.querySelector('.elements__delete-button');
    this._setEventListeners();

    this._cardImage.setAttribute('src', this.link);
    this._cardImage.setAttribute('alt', this.name);
    this._cardTitle.textContent = this.name;
    this._numberLikes.textContent = this.likes;

    if(this._isLiked){
      this._likeButton.classList.add('elements__like-button_active');
    }else{
      this._likeButton.classList.remove('elements__like-button_active');
    }

    if(this._ownerId !== this._userId)
      this._deleteButton.style.display = 'none';

    return this.element;
  }

  deleteCard(card) {
    card.element.remove();
    card = null;
  }

  updateLikes(likes) {
    this._likeButton.classList.toggle('elements__like-button_active');
    this._numberLikes.textContent = likes.length;
    this._isLiked = !this._isLiked;
  }
}
