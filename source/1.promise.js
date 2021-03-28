// 1. promise 是一个类
// 2. 执行器立即执行
// 3. 执行器有两个函数，表示状态。默认等待
// 4. then catch
// 5. 状态改变后，不可再改
let Promise = require('./1.promise-source/1.promise.js');


let promise = new Promise((resolve, reject) => {
    console.log('new promise')
    resolve('成功');
    reject('失败');
})

promise.then((value) => {
    console.log('success', value)
}, (err) => {
    console.log('error', err)
})

console.log('tong bu ok')