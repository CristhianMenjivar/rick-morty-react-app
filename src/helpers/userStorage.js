const keyStorage = "USER_ACCOUNT";

class UserStorage {
  static saveSession(data) {
    try {
      localStorage.setItem(keyStorage, JSON.stringify(data));
    } catch (error) {
      console.debug(error);
    }
  }

  static getSession() {
    const data = localStorage.getItem(keyStorage);

    if (!data) return null;

    return JSON.parse(data);
  }

  static destroySession() {
    try {
      localStorage.removeItem(keyStorage);
    } catch (error) {
      console.debug(error);
    }
  }
}

export default UserStorage;
