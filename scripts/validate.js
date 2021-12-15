const showInputError = (formElement, inputElement, errorMessage, parameters) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(parameters.inputErrorClass);
  inputElement.parentElement.classList.add(parameters.fieldErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(parameters.errorClass);
  console.log('show');
}
const hideInputError = (formElement, inputElement, parameters) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(parameters.inputErrorClass);
  inputElement.parentElement.classList.remove(parameters.fieldErrorClass);
  errorElement.classList.remove(parameters.errorClass);
  errorElement.textContent = '';
  console.log('hide');
}

const cheackInputValidaty = (formElement, inputElement, parameters) => {
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, parameters);
  }else{
    hideInputError(formElement, inputElement, parameters);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some(function (inputElement){
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, parameters) => {
  if (hasInvalidInput(inputList)){
    buttonElement.classList.add(parameters.inactiveButtonClass);
  }else{
    buttonElement.classList.remove(parameters.inactiveButtonClass);
  }
}

const setEventListeners = (formElement, parameters) => {
  const inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));
  const buttonElement = formElement.querySelector(parameters.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, parameters);
  inputList.forEach(function (inputElement){
    inputElement.addEventListener('input', function (){
      cheackInputValidaty(formElement, inputElement, parameters);
      toggleButtonState(inputList, buttonElement, parameters);
    });
  });
}

const enableValidation = (parameters) => {
  const formList = Array.from(document.querySelectorAll(parameters.formSelector));
  formList.forEach(function (formElement){

    setEventListeners(formElement, parameters);
  });
}
