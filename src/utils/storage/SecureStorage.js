const subtle = window.crypto.subtle;

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
    const keyPair = await subtle.generateKey(
      {
        name: "RSASSA-PKCS1-v1_5",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: { name: "SHA-256" },
      },
      true,
      ["sign", "verify"]
    );

    console.log(keyPair);
    
  }

  static async getDeviceId() {
    const deviceId = await keytar.getPassword(
      "atra",
      this.#KEYS.DEVICE_ID
    );
    return deviceId;
  }

  static async setDeviceId(newDeviceId) {
    this.deviceId = newDeviceId;
    await keytar.setPassword("myApp", this.#KEYS.DEVICE_ID, newDeviceId);
  }

  static async getPublicKey() {
    const publicKey = await keytar.getPassword(
      "atra",
      this.#KEYS.PUBLIC_KEY
    );

    return publicKey;
  }

  static async setPublicKey(publicKeyPem) {
    await keytar.setPassword(
      "atra",
      this.#KEYS.PUBLIC_KEY,
      publicKeyPem
    );
  }

  static async getPrivateKey() {
    const privateKey = await keytar.getPassword(
      "atra",
      this.#KEYS.PRIVATE_KEY
    );

    return privateKey;
  }

  static async setPrivateKey(privateKeyPem) {
    await keytar.setPassword(
      "atra",
      this.#KEYS.PRIVATE_KEY,
      privateKeyPem
    );
  }

  static async getAccessToken() {
    const accessToken = await keytar.getPassword(
      "atra",
      this.#KEYS.ACCESS_TOKEN
    );

    return accessToken;
  }

  static async setAccessToken(accessToken) {
    await keytar.setPassword(
      "atra",
      this.#KEYS.ACCESS_TOKEN,
      accessToken
    );
  }
}

export default SecureStorage;
