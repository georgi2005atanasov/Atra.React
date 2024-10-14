class SecureStorage {
  static KEY_PREFIX = "ATRAREGA";

  static #KEYS = {
    PUBLIC_KEY: `${this.KEY_PREFIX}_publicKey`,
    PRIVATE_KEY: `${this.KEY_PREFIX}_privateKey`,
    DEVICE_ID: `${this.KEY_PREFIX}_deviceId`,
    ACCESS_TOKEN: `${this.KEY_PREFIX}_accessToken`,
  };

  // Generate and store RSA keys in Keytar
  static async generateKeys() {
    
  }

  static async getDeviceId() {

  }

  static async setDeviceId(newDeviceId) {

  }

  static async getAccessToken() {
    
  }

  static async setAccessToken(accessToken) {
    
  }
}

export default SecureStorage;
