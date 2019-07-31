import { AES, enc } from "crypto-js";

/**
 * @param {Object} data
  * @param {String} secret
 */
export const encrypt = (data, secret ) => new Promise((res, rej) => {
  try {
    const encrypted = AES.encrypt(JSON.stringify(data), secret)
    res(encrypted)
  } catch(e){
    rej(e)
  }}
)

/**
 * @param {String} data
  * @param {String} secret
 */
export const decrypt = (data, secret ) => new Promise((res, rej) => {
  try {
    const decrypted = AES.decrypt(data, secret).toString(enc.Utf8)
    res(decrypted)
  } catch(e){
    rej(e)
  }}
)