var obj = {
    name: 'xiaoqing',
    age: 18
}

function myFreeze(object) {
    for (const key in object) {
        Object.defineProperty(obj, key, {
            writable: false
        })
    }
}

myFreeze(obj)
obj.name = 'new xiaoqing';
obj.age = 19;
console.log(obj)