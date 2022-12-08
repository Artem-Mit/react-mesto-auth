class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _useFetch(link, newMethod = "GET", newBody) {
    return fetch(`${this._url}${link}`, {
      method: newMethod,
      headers: this._headers,
      body: JSON.stringify(newBody),
    }).then((res) => this._checkResult(res));
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfileInfo() {
    return this._useFetch("/users/me");
  }

  getInitialCards() {
    return this._useFetch("/cards");
  }

  editProfileInfo(data) {
    return this._useFetch("/users/me", "PATCH", data);
  }

  postNewCard(data) {
    return this._useFetch("/cards", "POST", data);
  }

  deleteCard(id) {
    return this._useFetch(`/cards/${id}`, "DELETE");
  }

  setAvatar(data) {
    return this._useFetch(`/users/me/avatar`, "PATCH", data);
  }

  changeLikeCardStatus(id, isLiked) {
    return this._useFetch(`/cards/${id}/likes`, isLiked ? "PUT" : "DELETE");
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-52",
  headers: {
    authorization: "b0796f98-3029-411f-8381-49171784b671",
    "Content-Type": "application/json",
  },
});

export default api;
