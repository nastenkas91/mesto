export default class UserInfo {
  constructor({ nameSelector, occupationSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._occupation = document.querySelector(occupationSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      profileName: this._name.textContent,
      profileOccupation: this._occupation.textContent,
      profileAvatar: this._avatar.src
    }
    return userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._occupation.textContent = data.about;
    this._avatar.src = data.avatar;
    this._profileId = data._id
  }

  returnProfileId() {
    return this._profileId;
  }

}
