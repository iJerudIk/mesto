// Импорты
import '../styles/pages/index.css';

const logoImage = new URL('../images/logo.svg', import.meta.url);
const profileImage = new URL('../images/profile-image.svg', import.meta.url);

const whoIsTheGoat = [
  {name : 'логотип', image : logoImage},
  {name : 'Пожилой мужчина', link : profileImage}
];

import { Card } from '../scripts/components/Card.js';
import { Section } from '../scripts/components/Section.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

import { initialCards } from '../scripts/utils/constants.js';
import {
  editButton, addButton,
  inputName,
  inputJob,
  inputTitle,
  inputLink,
  editFormElement, addFormElement,
} from '../scripts/utils/constants.js';

const defaultCardList = new Section({
  items : initialCards,
  renderer : (item) => {
    const cardElement = createCard(item, '#place-template');
    defaultCardList.addItem(cardElement);
  }
}, '.elements__list');
defaultCardList.renderItems();

function createCard(item, selector) {
  const card = new Card({
    handleCardClick : () => {
      popupPlace.open({ data : {
        image : card._link,
        title : card._title
      } });
    }
  }, item, selector);
  const cardElement = card.generateCard();

  return cardElement;
}

const user = new UserInfo('.profile__name', '.profile__job');

// Создание попапов
const popupEdit = new PopupWithForm({
  submitRenderer : () => {
    user.setUserInfo(popupEdit._getInputValues());
    popupEdit.close();
  }
}, '.popup_content_profile');
const popupAdd = new PopupWithForm({
  submitRenderer : () => {
    const cardElement = createCard(popupAdd._getInputValues(), '#place-template');
    defaultCardList.addItem(cardElement);

    popupAdd.close();
    formAdd.deactivateButton();
  }
}, '.popup_content_add-place');
export const popupPlace = new PopupWithImage('.popup_content_place-info');

popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupPlace.setEventListeners();

// Подключение валидации
const parameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const formEdit = new FormValidator(parameters, document.forms.editingProfile); formEdit.enableValidation();
const formAdd = new FormValidator(parameters, document.forms.newPlace); formAdd.enableValidation();

// Слушатели кнопок
editButton.addEventListener('click', function() {
  const userInfo = user.getUserInfo();

  inputName.value = userInfo.name;
  inputJob.value = userInfo.job;

  formEdit.resetErrors();
  formEdit.activateButton();

  popupEdit.open();
});
addButton.addEventListener('click', function() {
  formAdd.resetErrors();

  popupAdd.open();
});
