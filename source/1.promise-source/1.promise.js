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
        const resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value;
                this.status = FULFILLED;
            }
        }
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
            }
        }
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    then(onFulfilled, onRejected) { // onFulfilled,  onRejected
        if (this.status === FULFILLED) {
            onFulfilled(this.value);
        }
        if (this.status === REJECTED) {
            onRejected(this.reason);
        }
    }
}

module.exports = Promise;