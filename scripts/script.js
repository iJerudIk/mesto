let closeButton = document.querySelector('.popup__close-button');
let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let inputName = document.querySelector('.popup__input_content_name');
let inputJob = document.querySelector('.popup__input_content_job');
let popup = document.querySelector('.popup');

function openPopup(){
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}
function closePopup(){
  popup.classList.remove('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function formSubmitHandler(evt){
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', closePopup);
