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


function openPopup(popup){
  popup.classList.add('popup_opened');
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
}

function editFormSubmitHandler(evt){
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEdit);
}

function createCard(placeTitle, placeLink){
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.elements__element').cloneNode(true);

  placeElement.querySelector('.elements__title').textContent = placeTitle;
  placeElement.querySelector('.elements__image').setAttribute('src', placeLink);
  placeElement.querySelector('.elements__like').addEventListener('click', function (evt){
    evt.target.classList.toggle('elements__like_active');
  });
  placeElement.querySelector('.elements__delete-button').addEventListener('click', function (){
    placeElement.remove();
  });
  placeElement.querySelector('.elements__image').addEventListener('click', function (evt){
    const placePopup = document.querySelector('.popup_content_place-info');
    placePopup.querySelector('.popup__image').setAttribute('src', placeLink);
    placePopup.querySelector('.popup__image').setAttribute('alt', placeTitle);
    placePopup.querySelector('.popup__title').textContent = placeTitle;
    placePopup.classList.add('popup_opened');
    placePopup.querySelector('.popup__close-button').addEventListener('click', function (){
      placePopup.classList.remove('popup_opened');
    })
  });

  return placeElement;
}


initialCards.forEach(function(item){
  placesContainer.prepend(createCard(item.title, item.link));
});

function addPlace(evt){
  evt.preventDefault();

  placesContainer.prepend(createCard(inputTitle.value, inputLink.value));

  closePopup(popupAdd);
}

editButton.addEventListener('click', function (){
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupEdit);
});
addButton.addEventListener('click', function (){
  inputTitle.value = '';
  inputLink.value = '';
  openPopup(popupAdd);
});
editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addPlace);
editPopupCloseButton.addEventListener('click', function (){
  closePopup(popupEdit);
});
addPopupCloseButton.addEventListener('click', function (){
  closePopup(popupAdd);
});
