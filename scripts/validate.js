const currentValidationSettings = { 
  formSelector: '.form', 
  inputSelector: '.form__input', 
  submitButtonSelector: '.form__submit-button', 
  disabledButtonClass: 'form__submit-button_disabled', 
  inputErrorClass: 'form__input_type_error', 
  errorClass: 'form__input-error_active' 
};

// Показать класс с ошибкой 
const showInputError = (formElement, inputElement, errorMessage, selectors) => { 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 

  inputElement.classList.add(selectors.inputErrorClass); 
  errorElement.textContent = errorMessage; 
  errorElement.classList.add(selectors.errorClass); 
};

// Удалить класс с ошибкой 
const hideInputError = (formElement, inputElement, selectors) => { 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 

  inputElement.classList.remove(selectors.inputErrorClass); 
  errorElement.classList.remove(selectors.errorClass); 
  errorElement.textContent = ''; 
};

// Проверка валидности поля ввода 
const checkInputValidity = (formElement, inputElement, selectors) => { 
  if (!inputElement.validity.valid) { 
    showInputError(formElement, inputElement, inputElement.validationMessage, selectors); 
  } else { 
    hideInputError(formElement, inputElement, selectors); 
  }; 
};

// Проверка валидности всех полей ввода 
const hasInvalidInput = (inputList) => { 
  return inputList.some((inputElement) => { 
    return !inputElement.validity.valid; 
  }); 
};

// Переключение кнопки submit 
const toggleButtonState = (inputList, buttonElement, selectors) => { 
  if (hasInvalidInput(inputList)) { 
    buttonElement.classList.add(selectors.disabledButtonClass); 
    buttonElement.setAttribute('disabled', true); 
  } else { 
    buttonElement.classList.remove(selectors.disabledButtonClass); 
    buttonElement.removeAttribute('disabled'); 
  }; 
};

// Добавление обработчиков всем полям формы 
const setEventListeners = (formElement, selectors) => { 
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector)); 
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector); 

  toggleButtonState(inputList, buttonElement, selectors); 

  inputList.forEach((inputElement) => { 
    inputElement.addEventListener('input', () => { 
      checkInputValidity(formElement, inputElement, selectors); 
      toggleButtonState(inputList, buttonElement, selectors); 
    }); 
  }); 
};

// Включение валидации форм 
const enableValidation = (selectors) => { 
  const formList = Array.from(document.querySelectorAll(selectors.formSelector)); 

  formList.forEach((formElement) => { 
    formElement.addEventListener('submit', (evt) => { 
      evt.preventDefault(); 
    }); 
    setEventListeners(formElement, selectors); 
  }); 
}; 

enableValidation(currentValidationSettings); 