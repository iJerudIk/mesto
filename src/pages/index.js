// Импорты
import './index.css';

import { Card } from '../scripts/components/Card.js';
import { Section } from '../scripts/components/Section.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithSubmiting } from '../scripts/components/PopupWithSubmiting.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api.js';

import {
  editButton, addButton, avatarButton,
  inputName, inputAbout,
  parameters,
  initialCards
} from '../scripts/utils/constants.js';

// Подключение API
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-37',
  headers: {
    authorization: '0030f8db-ebc1-4e0a-99f6-f5d531d5f908',
    'Content-Type': 'application/json'
  }
});
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, cards]) => {
    // Создание юсера
    const user = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');
    user.setUserInfo(userInfo);
    user.setUserAvatar(userInfo.avatar);
    const userId = userInfo._id;

    // Создание секции
    const defaultCardList = new Section({
      items : cards,
      renderer : (item) => {
        const cardElement = createCard(item);
        defaultCardList.addItem(cardElement);
      }
    }, '.elements__list');
    defaultCardList.renderItems();

    // Функции + попапы
    const popupPlace = new PopupWithImage('.popup_content_place-info');
    const popupDelete = new PopupWithSubmiting({
      submitRenderer : (element) => {
        api.renderLoading(popupDelete.buttonElement, 'Удаление...');
        api.removeCard(element._id, popupDelete.buttonElement)
          .then(() => {
            element._element.remove();
            element = null;
            popupDelete.close();
          })
      }
    }, '.popup_content_delete-place');

    function createCard(item) {
      const card = new Card({
        handleCardClick : () => {
          popupPlace.open({ data : {
            image : card._link,
            name : card._name
          } });
        },
        handleCardDelete : () => {popupDelete.open(card)},
        handleCardLike : (isLiked) => {
          if(!isLiked) {
            api.setLike(card._id);
          }else{
            api.removeLike(card._id);
          }
        }
      }, item, userId, '#place-template');
      const cardElement = card.generateCard();

      return cardElement;
    }

    let data = {};
    data['cardList'] = defaultCardList;
    data['user'] = user;
    data['userId'] = userId;
    data['createCard'] = createCard;
    data['popupPlace'] = popupPlace;
    data['popupDelete'] = popupDelete;

    return data;
  })
  .then((data) => {
    // Подключение валидации
    const formEdit = new FormValidator(parameters, document.forms.editingProfile); formEdit.enableValidation();
    const formAdd = new FormValidator(parameters, document.forms.newPlace); formAdd.enableValidation();
    const formAvatar = new FormValidator(parameters, document.forms.editingAvatar); formAvatar.enableValidation();

    data['formEdit'] = formEdit;
    data['formAdd'] = formAdd;
    data['formAvatar'] = formAvatar;

    return data;
  })
  .then((data) => {
    // Создание попапов
    const popupEdit = new PopupWithForm({
      submitRenderer : (userInfo) => {
        api.renderLoading(popupEdit.buttonElement, 'Сохранение...');
        api.setUserInfo(userInfo, popupEdit.buttonElement)
          .then(() => {
            data.user.setUserInfo(userInfo);
            popupEdit.close();
          })
      }
    }, '.popup_content_profile');
    const popupAvatar = new PopupWithForm({
      submitRenderer : (avatar) => {
        api.renderLoading(popupAvatar.buttonElement, 'Сохранение...');
        api.setUserAvatar(avatar.link, popupAvatar.buttonElement)
          .then(() => {
            data.user.setUserAvatar(avatar.link);
            popupAvatar.close();
          })
      }
    }, '.popup_content_avatar');
    const popupAdd = new PopupWithForm({
      submitRenderer : (cardInfo) => {
        api.renderLoading(popupAdd.buttonElement, 'Создание...');
        api.addNewCard(cardInfo, popupAdd.buttonElement)
          .then((card) => {
            cardInfo['likes'] = [];
            cardInfo['owner'] = {_id : data.userId};
            cardInfo['_id'] = card._id;
            const cardElement = data.createCard(cardInfo);
            data.cardList.addItem(cardElement);

            popupAdd.close();
            data.formAdd.deactivateButton();
          })
      }
    }, '.popup_content_add-place');

    data['popupEdit'] = popupEdit;
    data['popupAdd'] = popupAdd;
    data['popupAvatar'] = popupAvatar;

    return data;
  })
  .then((data) => {
    // Слушатели кнопок
    editButton.addEventListener('click', function() {
      const userInfo = data.user.getUserInfo();

      inputName.value = userInfo.name;
      inputAbout.value = userInfo.about;

      data.formEdit.resetErrors();
      data.formEdit.activateButton();

      data.popupEdit.open();
    });
    addButton.addEventListener('click', function() {
      data.formAdd.resetErrors();

      data.popupAdd.open();
    });
    avatarButton.addEventListener('click', function() {
      data.formAvatar.resetErrors();

      data.popupAvatar.open(avatarButton);
    });

    // Вызов функций
    data.popupEdit.setEventListeners();
    data.popupAdd.setEventListeners();
    data.popupAvatar.setEventListeners();
    data.popupDelete.setEventListeners();
    data.popupPlace.setEventListeners();
  })
