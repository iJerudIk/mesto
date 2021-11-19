let closeButton = document.querySelector('.popup__close-button');
let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__form');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let inputName = document.querySelector('.form__name');
let inputJob = document.querySelector('.form__job');

let popup = document.querySelector('.popup');


function togglePopup(){
  popup.classList.toggle('popup_opened');
}
function formSubmitHandler(evt){
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  togglePopup();
}

editButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', function(){
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  togglePopup();
});
