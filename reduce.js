Array.prototype.myReduce = function(cb, total) {
    let index = 0;
    let length = this.length;
    if (total === undefined) {
        if (length===0) {
            throw Error('Reduce of empty array with no initial value')
        }
        total = this[0];
        index = 1;
    }
    for(let i = index; i<length;i++) {
        total = cb(total, this[i],i, this);
    }
    return total
}
let arr = [1,2,3];
let total = arr.myReduce(function(prev, curr,index, arr) {
    console.log(index)
    return prev + curr
});
console.log(total)
// [1,2].reduce(function(prev, curr,index, arr) {console.log(arr)});



// Array.reduce
// 简单介绍
// 语法:arr.reduce(callback,[,initialValue])
// 参数:
// callback:针对每一项执行的函数
//   account:初始值/上一次回调返回的值
//   current:当前值
//   index:可选，当前索引
//   scrouce:可选,原数组
// initialValue:可选，累加的初始值
// 描述:方法接收一个函数作为累加器，reduce 为数组中的每一个元素依次执行回调函数，不包括数中被删除或从未被赋值的元素
// 如果没有初始值，pre将使用数组中的第一个元素
// 在没有初始值的空数组上调用reduce将报错
// 在没有初始值的仅有一个元素的数组上使用reduce，那么callback不会被执行，此唯一值将被返回
// 解答小疑惑 - callback 执行次数
[1, 2, 3, 4].reduce((pre, cur, index, array) => {
  console.log(pre, cur, index);
  return pre + cur;
});
// 此时代码没有初始值，callback执行3次 ----> pre=1,cur=2,index=1(第一次执行的时候)
[1, 2, 3, 4].reduce((pre, cur, index, array) => {
  console.log(pre, cur, index);
  return pre + cur;
}, 0);
// 此时代码有初始值，callback执行4次 ----> pre=0,cur=1,index=0(第一次执行的时候)
// 实现
// 分析
// Array.reduce是Array.prototype上的原型方法
// Array.reduce 接收两个参数:callback函数和initialVaule初始值[可选]
// 没有初始值 && 空数字 会进行报错
// 没有初始值 && 数组长度为1 直接返回数组里的这一项，不需要执行callback
// 没有初始值 && 数组长度大于1 正常流程走 index=1
// 有初始值 && 数组长度大于1 正常流程走 index=0
// reduce返回值是pre
if (!Array.prototype.reduce) {
  Object.defineProperty(Array.prototype, "reduce", {
    value: function (callback) {
      if (this === null) {
        throw new TypeError("Array.prototype.reduce called on null or undefiend");
      }
      if (typeof callback !== "function") {
        throw new TypeError(callback + "is not a function");
      }
      var o = Object(this);
      //位运算符  
      //>>>是无符号右移运算符，保证结果为非负整数,是length值所要的数字。(如果运算为NaN，length结果为0，在后续代码中遍历对象也不会抛出异常)
      var len = o.length >>> 0;
      var k = 0;
      var value;
      if (arguments.length >= 2) {
        value = arguments[1];
      } else {
        while (k < len && !(k in o)) {
          k++;
        }
        if (k >= len) {
          throw new TypeError("Reduce of empty array with no initial value");
        }
        value = o[k++];
      }
      while (k < len) {
        if (k in o) {
          value = callback(value, o[k], k, o);
        }
        k++;
      }
      return value;
    },
  });
}