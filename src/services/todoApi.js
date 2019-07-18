export const setTodo = (name= '') =>   new Promise((res,rej)=> {
    setTimeout(()=>
        res(name.toLocaleUpperCase()
    ), 3000)
})