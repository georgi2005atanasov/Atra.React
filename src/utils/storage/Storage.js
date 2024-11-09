class Storage {
  static #KEY_PREFIX = "ATRAREGA";

  static KEYS = {
    USER_NAME: `${this.#KEY_PREFIX}_userName`,
    EMAIL: `${this.#KEY_PREFIX}_email`,
  };

  static #getItem(key) {
    return localStorage.getItem(key);
  }

  static #setItem(key, value) {
    localStorage.setItem(key, value);
  }

  static #removeItem(key) {
    localStorage.removeItem(key);
  }

  static getUserName() {
    return this.#getItem(this.KEYS.USER_NAME);
  }

  static setUserName(userName) {
    this.#setItem(this.KEYS.USER_NAME, userName);
  }

  static getEmail() {
    return this.#getItem(this.KEYS.EMAIL);
  }

  static setEmail(email) {
    this.#setItem(this.KEYS.EMAIL, email);
  }

  static clearAll() {
    Object.values(this.KEYS).forEach((key) => this.#removeItem(key));
  }
}

export default Storage;
