export default class Api {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl
    this._token = apiConfig.headers.authorization;
    this._headers = apiConfig.headers;
  }

  _checkResponse = (res) => {
    return res.ok ? res.json(): Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `${this._token}`
      }
    })
      .then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `${this._token}`
      }
    })
      .then(this._checkResponse);
  }

  editProfileInfo({ userName, occupation }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: occupation
      })
    })
      .then(this._checkResponse);
  }

  editAvatar({ data }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data,
      })
    })
      .then(this._checkResponse);
  }

  addNewCard(cardInfo) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardInfo.name,
        link: cardInfo.link
      })
    })
      .then(this._checkResponse);
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `${this._token}`
      },
  })
      .then(this._checkResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`
      },
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`
      },
    })
      .then(this._checkResponse);
  }

}
