// 1. 基本的promise的特性
// 1.1. promise 是一个类
// 1.2. 执行器立即执行
// 1.3. 执行器有两个函数，表示状态。默认等待
// 1.4. then catch
// 1.5. 状态改变后，不可再改
let Promise = require('./1.promise-source/1.promise.js');


let promise = new Promise((resolve, reject) => {
    console.log('new promise')
    // 1. 基本的promise
    // resolve('成功');
    // reject('失败');
    // 2. 异步promise。先把then存起来，异步调用resolve后再执行。发布订阅模式。
    setTimeout(() => {
        // resolve('成功');
        reject('失败');
    }, 1000);
})

// promise.then((value) => {
//     console.log('success', value)
// }, (err) => {
//     console.log('error', err)
// })

// promise.then((value) => {
//     console.log('success2', value)
// }, (err) => {
//     console.log('error2', err)
// });

// 3. 链式调用  then会返回新的promise
// 3.1 then返回普通值  作为下一层then的成功  // 无论then走的是resolve还是reject
// 3.2 then 报错  下一次then的失败
// 3.3 then返回promise 
promise.then((value) => {
    console.log('success', value)
    // return 1;
    // return;
    // return new Error();  // return 一个错误 不是报错
    // throw Error('报错'); // 报错
    return new Promise((resolve, reject) => {
        // resolve('okk')
        reject('errr')
    });
}, (err) => {
    console.log('error', err)
}).then((value) => {
    console.log('success2', value)
}, (err) => {
    console.log('error2', err)
})



console.log('tong bu ok')