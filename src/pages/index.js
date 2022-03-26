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
      renderer : createCard
    }, '.elements__list');
    defaultCardList.renderItems();

    // Функции + попапы
    const popupPlace = new PopupWithImage('.popup_content_place-info');
    const popupDelete = new PopupWithSubmiting({
      handleSubmit : (element) => {
        renderLoading(popupDelete.buttonElement, 'Удаление...')
        api.removeCard(element._id, popupDelete.buttonElement)
          .then(() => {
            element.deleteCard(element);
            popupDelete.close();
          })
          .catch((err) => {
            console.log(`Ошибка : ${err}`);
          })
          .finally(() => {renderLoading(popupDelete.buttonElement, 'Да')})
      }
    }, '.popup_content_delete-place');

    function createCard(item) {
      const card = new Card({
        handleCardClick : () => {
          popupPlace.open({ data : {
            image : item.link,
            name : item.name
          } });
        },
        handleCardDelete : () => {popupDelete.open(card)},
        handleCardLike : () => {
          if(!card.isLiked) {
            api.setLike(card._id)
              .then((likes) => {
                card._likeButton.classList.add('elements__like-button_active');
                card._numberLikes.textContent = likes.length;
              })
              .catch((err) => {
                console.log(`Ошибка : ${err}`);
              })
          }else{
            api.removeLike(card._id)
              .then((likes) => {
                card._likeButton.classList.remove('elements__like-button_active');
                card._numberLikes.textContent = likes.length;
              })
              .catch((err) => {
                console.log(`Ошибка : ${err}`);
              })
          }
          card.isLiked = !card.isLiked;
        }
      }, item, userId, '#place-template');
      const cardElement = card.generateCard();

      return cardElement;
    }
    function renderLoading(button, text){
      button.textContent = text;
    }

    const data = {};
    data['cardList'] = defaultCardList;
    data['user'] = user;
    data['userId'] = userId;
    data['popupPlace'] = popupPlace;
    data['popupDelete'] = popupDelete;
    data['createCard'] = createCard;
    data['renderLoading'] = renderLoading;

    return data;
  })
  .then((data) => {
    // Подключение валидации

    // Я не очень хорошо понял тот вариант, который вы мне предложили, и решил оставить так
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
      handleSubmit : (userInfo) => {
        data.renderLoading(popupEdit.buttonElement, 'Сохранение...');
        api.setUserInfo(userInfo, popupEdit.buttonElement)
          .then(() => {
            data.user.setUserInfo(userInfo);
            popupEdit.close();
          })
          .catch((err) => {
            console.log(`Ошибка : ${err}`);
          })
          .finally(() => {data.renderLoading(popupEdit.buttonElement, 'Сохранить')})
      }
    }, '.popup_content_profile');
    const popupAvatar = new PopupWithForm({
      handleSubmit : (avatar) => {
        data.renderLoading(popupAvatar.buttonElement, 'Сохранение...');
        api.setUserAvatar(avatar.link, popupAvatar.buttonElement)
          .then(() => {
            data.user.setUserAvatar(avatar.link);
            popupAvatar.close();
          })
          .catch((err) => {
            console.log(`Ошибка : ${err}`);
          })
          .finally(() => {data.renderLoading(popupAvatar.buttonElement, 'Сохранить')})
      }
    }, '.popup_content_avatar');
    const popupAdd = new PopupWithForm({
      handleSubmit : (cardInfo) => {
        data.renderLoading(popupAdd.buttonElement, 'Создание...');
        api.addNewCard(cardInfo, popupAdd.buttonElement)
          .then((card) => {
            cardInfo['likes'] = [];
            cardInfo['owner'] = {_id : data.userId};
            cardInfo['_id'] = card._id;
            data.cardList.addItem(cardInfo);

            popupAdd.close();
          })
          .catch((err) => {
            console.log(`Ошибка : ${err}`);
          })
          .finally(() => {data.renderLoading(popupAdd.buttonElement, 'Создать')})
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

      data.popupEdit.setInputValues(userInfo);

      data.formEdit.resetErrors();
      data.formEdit.activateButton();

      data.popupEdit.open();
    });
    addButton.addEventListener('click', function() {
      data.formAdd.resetErrors();
      data.formAdd.deactivateButton();

      data.popupAdd.open();
    });
    avatarButton.addEventListener('click', function() {

      data.formAvatar.resetErrors();
      data.formAvatar.deactivateButton();

      data.popupAvatar.open(avatarButton);
    });

    // Вызов функций
    data.popupEdit.setEventListeners();
    data.popupAdd.setEventListeners();
    data.popupAvatar.setEventListeners();
    data.popupDelete.setEventListeners();
    data.popupPlace.setEventListeners();
  })
  .catch((err) => {
    console.log(`Ошибка : ${err}`);
  })
