/**
 *
 * @param {String} area
 */
export function getStorage (area) {
    return new Promise((res, rej) =>   {
        try {
            const rawData = localStorage.getItem(area);
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
export function setStorage (area, data) {
    return new Promise((res, rej)=>{
        try {
            const rawData = JSON.stringify(data)
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