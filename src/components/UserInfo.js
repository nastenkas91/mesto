export default class UserInfo {
  constructor({ nameSelector, occupationSelector }) {
    this._name = document.querySelector(nameSelector);
    this._occupation = document.querySelector(occupationSelector);
  }

  getUserInfo() {
    const userInfo = {
      profileName: this._name.textContent,
      profileOccupation: this._occupation.textContent
    }
    return userInfo;
  }

  setUserInfo({ profileName, profileOccupation }) {
    this._name.textContent = profileName;
    this._occupation.textContent = profileOccupation;
  }
}
