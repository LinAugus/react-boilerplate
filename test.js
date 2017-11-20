function api() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                name: 'allin',
                age: 18
            }) 
        }, 1000)
    })
}

async function foo() {
    let a = await api();
    console.log(a, 'a')
}

console.log(foo())