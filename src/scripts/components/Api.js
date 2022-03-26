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
      .then(this._checkResponse)
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
      .then(this._checkResponse)
  }
  removeCard(cardId, button) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method : 'DELETE',
      headers : this._headers
    })
      .then(this._checkResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method : 'GET',
      headers : this._headers
    })
      .then(this._checkResponse)
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
      .then(this._checkResponse)
  }
  setUserAvatar(avatarLink, button) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method : 'PATCH',
      headers : this._headers,
      body : JSON.stringify({
        avatar: avatarLink,
      })
    })
      .then(this._checkResponse)
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method : 'PUT',
      headers : this._headers
    })
      .then(this._checkResponse)
  }
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method : 'DELETE',
      headers : this._headers
    })
      .then(this._checkResponse)
  }

  _checkResponse(res){
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка ${res.status}`);
  }
}
