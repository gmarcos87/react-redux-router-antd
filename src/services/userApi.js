
export const getRole = ({userId}) =>   new Promise((res,rej)=> {
    setTimeout(()=> {
        if (userId === "1") {
            res({ data:  { role: 'business', userId: userId}});
        } else if (userId === "2") {
            res({ data: { role: 'admin', userId: userId}});
        } else {
            res({ error: 'user id not found'})
        }
    }, 500)
})