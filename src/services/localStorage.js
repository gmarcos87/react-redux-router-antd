import { encrypt, decrypt } from "../utils/encrypt";

/**
 *
 * @param {String} area
 */
export function getStorage (area, secret='insecure') {
    return new Promise(async(res, rej) =>   {
        try {
            let rawData = localStorage.getItem(area);
            if(secret) {
                rawData = await decrypt(rawData, secret)
            }
            const data = JSON.parse(rawData);
            res({data});
        }
        catch (error) {
            console.error('Read localStorage', error)
            res({error})
        }
    })
}

/**
 *  @param {String} area
 *  @param {Object} data
 */
export function setStorage (area, data, secret='insecure') {
    return new Promise(async(res, rej)=>{
        try {
            let rawData = JSON.stringify(data)
            if (secret) {
                rawData = await encrypt(data, secret)
            }
            localStorage.setItem(area, rawData)
            res({status: 'ok'})
        } catch (error) {
            rej(error);
        }
    })
}

/**
 *  @param {String} area
 */
export function deleteStorage (area) {
    return new Promise((res, rej)=>{
            localStorage.removeItem(area)
            res({status: 'ok'})
    })
}

export function clearStorage () {
    return new Promise((res, rej)=>{
            localStorage.clear()
            res({status: 'ok'})
    })
}