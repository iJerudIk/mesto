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
const placePopupContainer = document.querySelector('.place-popup-container');

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


function openEditPopup(){
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  popupEdit.classList.add('popup_opened');
}
function openAddPopup(){
  inputTitle.value = '';
  inputLink.value = '';
  popupAdd.classList.add('popup_opened');
}

function closeEditPopup(){
  popupEdit.classList.remove('popup_opened');
}
function closeAddPopup(){
  popupAdd.classList.remove('popup_opened');
}

function editFormSubmitHandler(evt){
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeEditPopup();
}


function makeNewPopup(placeTitle, placeLink, placeElement) {
  const placePopupTemplate = document.querySelector('#place-popup-template').content;
  const placePopup = placePopupTemplate.querySelector('.popup-place').cloneNode(true);

  placePopup.querySelector('.popup-place__title').textContent = placeTitle;
  placePopup.querySelector('.popup-place__image').setAttribute('src', placeLink);

  placePopupContainer.prepend(placePopup);

  placeElement.querySelector('.elements__image').addEventListener('click', function (){
    placePopup.classList.add('popup-place_opened');
  });
  placePopup.querySelector('.popup-place__close-button').addEventListener('click', function (){
    placePopup.classList.remove('popup-place_opened');
  });
}

function makeNewPlace(placeTitle, placeLink){
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.elements__element').cloneNode(true);

  placeElement.querySelector('.elements__title').textContent = placeTitle;
  placeElement.querySelector('.elements__image').setAttribute('src', placeLink);
  placeElement.querySelector('.elements__like').addEventListener('click', function (evt){
    evt.target.classList.toggle('elements__like_active');
  });
  placeElement.querySelector('.elements__delete-button').addEventListener('click', function (){
    placeElement.remove();
    initialCards.pop();
  });

  makeNewPopup(placeTitle, placeLink, placeElement);

  placesContainer.prepend(placeElement);
}


initialCards.forEach(function(item){
  makeNewPlace(item.title, item.link);
});

function addPlace(evt){
  evt.preventDefault();

  makeNewPlace(inputTitle.value, inputLink.value);

  initialCards.push({title: inputTitle.value, link: inputLink.value});
  closeAddPopup();
}

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addPlace);
editPopupCloseButton.addEventListener('click', closeEditPopup);
addPopupCloseButton.addEventListener('click', closeAddPopup);
