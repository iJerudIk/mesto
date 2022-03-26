export class UserInfo {
  constructor(profileNameSelector, profileAboutSelector, profileAvatarSelector){
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._profileName.textContent;
    userInfo.about = this._profileAbout.textContent;

    return userInfo;
  }

  setUserInfo(userInfo) {
    this._profileName.textContent = userInfo.name;
    this._profileAbout.textContent = userInfo.about;
  }
  setUserAvatar(avatarLink) {
    this._profileAvatar.style = `background-image: url(${avatarLink})`;
  }
}
