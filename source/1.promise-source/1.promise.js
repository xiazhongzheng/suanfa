// Promise/A+ 规范

// 1. promise 是一个类
// 2. 执行器立即执行
// 3. 执行器有两个函数，表示状态。默认等待
// 4. then catch
// 5. 状态改变后，不可再改
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';


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
                    try {
                        let x = onFulfilled(this.value);
                        resolve(x);
                    } catch (error) {
                        reject(error);
                    }
                });
                this.onRejectedCallbacks.push(() => {
                    // 切片编程 AOP
                    // before  todo ..
                    try {
                        let x = onRejected(this.reason);
                        resolve(x);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
            if (this.status === FULFILLED) {
                try {
                    let x = onFulfilled(this.value);
                    // x 可能是promise 。。。

                    resolve(x);
                } catch (error) {
                    reject(error);
                }
            }
            if (this.status === REJECTED) {
                try {
                    let x = onRejected(this.reason);
                    resolve(x);
                } catch (error) {
                    reject(error);
                }
            }
        });
        return promise2;
    }
}

module.exports = Promise;