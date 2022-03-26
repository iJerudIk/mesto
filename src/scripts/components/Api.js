export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method : 'GET',
      headers : this._headers
    })
      .then((res) => {
        if(res.ok) return res.json();
        return Promise.reject(`Ошибка ${res.status}`)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  addNewCard(cardInfo, button) {
    return fetch(`${this._baseUrl}/cards`, {
      method : 'POST',
      headers : this._headers,
      body : JSON.stringify({
        name: cardInfo.name,
        link: cardInfo.link
      })
    })
      .then((res) => {
        if(res.ok) return res.json();
        return Promise.reject(`Ошибка ${res.status}`)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        this.renderLoading(button, 'Создать');
      })
  }
  removeCard(cardId, button) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method : 'DELETE',
      headers : this._headers
    })
      .then((res) => {
        if(res.ok) return res.json();
        return Promise.reject(`Ошибка ${res.status}`)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        this.renderLoading(button, 'Да');
      })
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method : 'GET',
      headers : this._headers
    })
      .then((res) => {
        if(res.ok) return res.json();
        return Promise.reject(`Ошибка ${res.status}`)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }
  setUserInfo(userInfo, button) {
    return fetch(`${this._baseUrl}/users/me`, {
      method : 'PATCH',
      headers : this._headers,
      body : JSON.stringify({
        name: userInfo.name,
        about: userInfo.about
      })
    })
      .then((res) => {
        if(res.ok) return res.json();
        return Promise.reject(`Ошибка ${res.status}`)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        this.renderLoading(button, 'Сохранить');
      })
  }
  setUserAvatar(avatarLink, button) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method : 'PATCH',
      headers : this._headers,
      body : JSON.stringify({
        avatar: avatarLink,
      })
    })
      .then((res) => {
        if(res.ok) return res.json();
        return Promise.reject(`Ошибка ${res.status}`)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        this.renderLoading(button, 'Сохранить');
      })
  }

  setLike(cardId) {
    fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method : 'PUT',
      headers : this._headers
    })
      .then((res) => {
        if(res.ok) return res.json();
        return Promise.reject(`Ошибка ${res.status}`)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }
  removeLike(cardId) {
    fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method : 'DELETE',
      headers : this._headers
    })
      .then((res) => {
        if(res.ok) return res.json();
        return Promise.reject(`Ошибка ${res.status}`)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  renderLoading(button, text){
    button.textContent = text
  }
}
