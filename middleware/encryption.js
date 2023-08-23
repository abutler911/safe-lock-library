const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");

function encrypt(buffer) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return Buffer.concat([iv, encrypted]);
}

function decrypt(encrypted) {
  const iv = encrypted.slice(0, 16);
  const data = encrypted.slice(16);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  return Buffer.concat([decipher.update(data), decipher.final()]);
}

module.exports = { encrypt, decrypt };
