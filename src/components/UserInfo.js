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

  setUserInfo({ profileName, profileOccupation, profileAvatar, profileId }) {
    this._name.textContent = profileName;
    this._occupation.textContent = profileOccupation;
    this._avatar.src = profileAvatar;
    this._profileId = profileId
  }

  returnProfileId() {
    return this._profileId;
  }

}
