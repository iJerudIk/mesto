// Импорты
import './index.css';

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
  parameters
} from '../scripts/utils/constants.js';


// Создание секции
const defaultCardList = new Section({
  items : initialCards,
  renderer : (item) => {
    const cardElement = createCard(item, '#place-template');
    defaultCardList.addItem(cardElement);
  }
}, '.elements__list');
defaultCardList.renderItems();

// Создание юсера
const user = new UserInfo('.profile__name', '.profile__job');

// Создание попапов
const popupEdit = new PopupWithForm({
  submitRenderer : () => {
    const userInfo = popupEdit._getInputValues()
    user.setUserInfo(userInfo);
    popupEdit.close();
  }
}, '.popup_content_profile');
const popupAdd = new PopupWithForm({
  submitRenderer : () => {
    const cardInfo = popupAdd._getInputValues()
    const cardElement = createCard(cardInfo);
    defaultCardList.addItem(cardElement);

    popupAdd.close();
    formAdd.deactivateButton();
  }
}, '.popup_content_add-place');
export const popupPlace = new PopupWithImage('.popup_content_place-info');

// Подключение валидации
const formEdit = new FormValidator(parameters, document.forms.editingProfile); formEdit.enableValidation();
const formAdd = new FormValidator(parameters, document.forms.newPlace); formAdd.enableValidation();


// Функции
function createCard(item) {
  const card = new Card({
    handleCardClick : () => {
      popupPlace.open({ data : {
        image : card._link,
        title : card._title
      } });
    }
  }, item, '#place-template');
  const cardElement = card.generateCard();

  return cardElement;
}


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


// Вызов функций
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupPlace.setEventListeners();
