let closeButton = document.querySelector('.popup__close-button');
let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let inputName = formElement.querySelector('.popup__input_content_name');
let inputJob = formElement.querySelector('.popup__input_content_job');
let popup = document.querySelector('.popup');

function openPopup(){
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  popup.classList.add('popup_opened');
}
function closePopup(){
  popup.classList.remove('popup_opened');
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
