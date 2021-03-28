function curring (fn) {
    function inner(args = []) {
        return args.length >= fn.length ? fn(...args) : (...userArgs) => inner([...args, ...userArgs])
    }
    return inner();
}


function sum(a,b,c,d) {
    return a+b+c+d;
}
let sum1 = curring(sum);
let sum2 = sum1(1);
let sum3 = sum2(2,3);
let result = sum3(4);
console.log(result);
// args缓存放在inner里，每次调用时都是新的缓存，可以共用
let sum12 = sum1(1);
let sum13 = sum12(2,3);
let result1 = sum13(4);

console.log(result1);


// function curring(fn, ...args) {
//     const len = fn.length;
//     return args.length >= len ? fn(...args) : (...userArgs) => curring(fn, ...args, ...userArgs)
// }

// function sum(a,b,c,d) {
//     return a+b+c+d;
// }
// let sum1 = curring(sum, 1);
// let sum2 = sum1(2,3);
// let result = sum2(4);
// console.log(result);
// // args缓存放在最外层，再次调用时，会有缓存问题。
// let sum12 = sum1(1);
// let sum13 = sum12(2,3);
// let result1 = sum13(4);

// console.log(result1);