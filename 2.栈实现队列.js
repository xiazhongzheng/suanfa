// 题目描述
// 使用栈实现队列的下列操作：

// push(x) -- 将一个元素放入队列的尾部。
// pop() -- 从队列首部移除元素。
// peek() -- 返回队列首部的元素。
// empty() -- 返回队列是否为空。
// 示例:

// MyQueue queue = new MyQueue();

// queue.push(1);
// queue.push(2);
// queue.peek(); // 返回 1
// queue.pop(); // 返回 1
// queue.empty(); // 返回 false
// 说明:

// 你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
// 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
// 假设所有操作都是有效的、 （例如，一个空的队列不会调用 pop 或者 peek 操作）。


var MyQueue = function () {
    //TODO
    // let queue = {
    //     stack1: [], // 用数组的push和pop模拟栈
    //     stack2: []
    // };
    // return queue
    this.stack1 = [];
    this.stack2 = [];
};
/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
    //TODO
    this.stack1.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
    //TODO
    let result;
    while (this.stack1.length) {
        let temp = this.stack1.pop();
        if (!this.stack1.length) {
            result = temp;
        } else {
            this.stack2.push(temp);
        }
    }
    while (this.stack2.length) {
        let temp = this.stack2.pop();
        this.stack1.push(temp);
    }
    return result;
};
// 1,2,3 stack1
// 3,2,1 stack2
// 1,2,3 stack1
/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
    //TODO
    let result;
    while (this.stack1.length) {
        let temp = this.stack1.pop();
        if (!this.stack1.length) {
            result = temp;
        }
        this.stack2.push(temp);
    }
    while (this.stack2.length) {
        let temp = this.stack2.pop();
        this.stack1.push(temp);
    }
    return result;
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
    //TODO
    return !this.stack1.length
};


let q = new MyQueue();
q.push(1)
q.push(2)
q.push(3)
console.log(q)
console.log(q.peek())
console.log(q.pop())
console.log(q.empty())
console.log(q)


// let q2 = new MyQueue();
// q2.push(11)
// q2.push(21)
// q2.push(31)
// console.log(q2)