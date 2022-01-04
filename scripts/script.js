// Импорты
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';

// Константы
const popupEdit = document.querySelector('.popup_content_profile');
const popupAdd = document.querySelector('.popup_content_add-place');
const popupPlace = document.querySelector('.popup_content_place-info');

const editPopupCloseButton = popupEdit.querySelector('.popup__close-button');
const addPopupCloseButton = popupAdd.querySelector('.popup__close-button');
export const placePopupCloseButton = popupPlace.querySelector('.popup__close-button');

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

// Открытие / Закрытие попапов
function closeByEscape(evt) {
  if(evt.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
function closeByOverlay(evt) {
  if(evt.target.classList.contains('popup')){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closeByEscape);
  popup.addEventListener('click', closeByOverlay);
}
export function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown',  closeByEscape);
  popup.removeEventListener('click', closeByOverlay);
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
function createCard(title, link, selector) {
  const card = new Card(title, link, selector);
  return card.generateCard();
}

initialCards.forEach(function(item) {
  placesContainer.append(createCard(item.title, item.link, "#place-template"));
});

// Слушатели кнопок
editButton.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  formEdit.inputList.forEach((inputElement) => {
    formEdit.checkInputValidaty(inputElement);
    formEdit.toggleButtonState();
  });

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
placePopupCloseButton.addEventListener('click', function() {
  closePopup(popupPlace);
});

editFormElement.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEdit);
});
addFormElement.addEventListener('submit', function(evt) {
  evt.preventDefault();

  placesContainer.prepend(createCard(inputTitle.value, inputLink.value, "#place-template"));

  closePopup(popupAdd);
  formAdd.deactivateButton();
  addFormElement.reset();
});
