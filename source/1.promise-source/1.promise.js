// Promise/A+ 规范

// 1. promise 是一个类
// 2. 执行器立即执行
// 3. 执行器有两个函数，表示状态。默认等待
// 4. then catch
// 5. 状态改变后，不可再改
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
// 根据x 判断是否是promise，以及调用resolve还是reject
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) { // 禁止套娃  禁止本次then返回的promise，再在onFulfilled,  onRejected里返回
        return reject(new TypeError('errrrrr'));
    }

    // 兼容其他的promise写法
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        // 是对象或者函数   并且有then方法
        let called = false; // 为了防止其他的promise会多次改变状态，这里判断只能执行一次
        try { // 取值时也可能报错 getter方法
            let then = x.then;

            if (typeof then === 'function') {
                // x 作为this 调用then 
                // 不用x.then();  因为会再次触发getter ，或许会报错
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolve(y);
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } else {
                if (called) return;
                called = true;
                resolve(x);
            }

        } catch (error) {
            reject(error);
        }


    } else {
        resolve(x); // x 是普通值
    }
}
class Promise {

    constructor(executor) { // executor执行器
        this.status = PENDING;
        this.value;
        this.reason;

        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        const resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value;
                this.status = FULFILLED;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    then(onFulfilled, onRejected) { // onFulfilled,  onRejected

        let promise2 = new Promise((resolve, reject) => {
            if (this.status === PENDING) { // 异步  发布订阅
                this.onResolvedCallbacks.push(() => {
                    // 切片编程 AOP
                    // before  todo ..
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0)
                });
                this.onRejectedCallbacks.push(() => {
                    // 切片编程 AOP
                    // before  todo ..
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0)
                });
            }
            if (this.status === FULFILLED) {
                setTimeout(() => { // 为了promise2存在
                    try {
                        let x = onFulfilled(this.value);
                        // x 可能是promise 。。。
                        resolvePromise(promise2, x, resolve, reject);
                        // resolve(x);
                    } catch (error) {
                        reject(error);
                    }
                }, 0)
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }
        });
        return promise2;
    }
}

module.exports = Promise;