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
export function writeStorage (area, data) {
    return new Promise((res, rej)=>{
        try {
            const rawData = JSON.stringify(data)
            localStorage.setItem(area, rawData)
        } catch (error) {
            rej(error);
        }
    })
}