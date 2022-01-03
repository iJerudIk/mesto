// Импорты
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// Константы
const popupEdit = document.querySelector('.popup_content_profile');
const popupAdd = document.querySelector('.popup_content_add-place');

const editPopupCloseButton = popupEdit.querySelector('.popup__close-button');
const addPopupCloseButton = popupAdd.querySelector('.popup__close-button');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editFormElement = popupEdit.querySelector('.popup__form');
const addFormElement = popupAdd.querySelector('.popup__form');

const inputName = editFormElement.querySelector('.popup__input_content_name');
const inputJob = editFormElement.querySelector('.popup__input_content_job');
const inputTitle = addFormElement.querySelector('.popup__input_content_title');
const inputLink = addFormElement.querySelector('.popup__input_content_link');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const placesContainer = document.querySelector('.elements__list');

const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Открытие / Закрытие попапов
function keyHandler(evt) {
  if(evt.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
function overlayHandler(evt) {
  if(evt.target.classList.contains('popup')){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', keyHandler);
  popup.addEventListener('click', overlayHandler)
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown',  keyHandler);
  popup.removeEventListener('click', overlayHandler);
}

// Подключение валидации
const parameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  fieldErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
};

const formEdit = new FormValidator(parameters, document.forms.editingProfile); formEdit.enableValidation();
const formAdd = new FormValidator(parameters, document.forms.newPlace); formAdd.enableValidation();


// Добавление первоначальный карточек
initialCards.forEach(function(item) {
  const card = new Card(item.title, item.link, "#place-template");
  const cardElement = card.generateCard();
  placesContainer.append(cardElement);
});

// Слушатели кнопок
editButton.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  formEdit.activateButton();

  openPopup(popupEdit);
});
addButton.addEventListener('click', function() {
  openPopup(popupAdd);
});
editPopupCloseButton.addEventListener('click', function() {
  closePopup(popupEdit);
});
addPopupCloseButton.addEventListener('click', function() {
  closePopup(popupAdd);
});


editFormElement.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEdit);
});
addFormElement.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const card = new Card(inputTitle.value, inputLink.value, "#place-template");
  const cardElement = card.generateCard();

  placesContainer.prepend(cardElement);

  closePopup(popupAdd);
  inputTitle.value = '';
  inputLink.value = '';
});
