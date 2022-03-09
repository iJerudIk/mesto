// Карточки
export const initialCards = [
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

// Другие константы
export const popupEdit = document.querySelector('.popup_content_profile');
export const popupAdd = document.querySelector('.popup_content_add-place');
export const popupPlace = document.querySelector('.popup_content_place-info');

export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

export const editFormElement = popupEdit.querySelector('.popup__form');
export const addFormElement = popupAdd.querySelector('.popup__form');

export const inputName = editFormElement.querySelector('.popup__input_content_name');
export const inputJob = editFormElement.querySelector('.popup__input_content_job');
export const inputTitle = addFormElement.querySelector('.popup__input_content_title');
export const inputLink = addFormElement.querySelector('.popup__input_content_link');
