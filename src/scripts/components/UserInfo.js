export class UserInfo {
  constructor(profileNameSelector, profileJobSelector){
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._profileName.textContent;
    userInfo.job = this._profileJob.textContent;

    return userInfo;
  }

  setUserInfo(userInfo) {
    this._profileName.textContent = userInfo.name;
    this._profileJob.textContent = userInfo.job;
  }
}
