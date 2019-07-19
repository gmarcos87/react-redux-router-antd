
export const getRole = (userId) =>   new Promise((res,rej)=> {
    setTimeout(()=> {
        if (userId === 1) {
            res({ data: { role: 'admin'}});
        } else if (userId === 2) {
            res({ data:  { role: 'bussines'}});
        } else {
            res({ error: 'user id not found'})
        }
    }, 3000)
})