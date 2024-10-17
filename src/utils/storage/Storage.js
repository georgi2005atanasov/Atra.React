class Storage {
  static #KEY_PREFIX = "ATRAREGA";

  static KEYS = {
    DEVICE_ID: `${this.#KEY_PREFIX}_deviceId`,
    ACCESS_TOKEN: `${this.#KEY_PREFIX}_accessToken`,
  };

  static #getItem(key) {
    return sessionStorage.getItem(key);
  }

  static #setItem(key, value) {
    sessionStorage.setItem(key, value);
  }

  static #removeItem(key) {
    sessionStorage.removeItem(key);
  }

  static getDeviceId() {
    return this.#getItem(this.KEYS.DEVICE_ID);
  }

  static setDeviceId(deviceId) {
    this.#setItem(this.KEYS.DEVICE_ID, deviceId);
  }

  static getAccessToken() {
    return this.#getItem(this.KEYS.ACCESS_TOKEN);
  }

  static setAccessToken(accessToken) {
    this.#setItem(this.KEYS.ACCESS_TOKEN, accessToken);
  }

  static clearAll() {
    Object.values(this.KEYS).forEach((key) => this.#removeItem(key));
  }
}

export default Storage;
