// 题目描述
//     这个问题和“最多能完成排序的块”相似，但给定数组中的元素可以重复，输入数组最大长度为2000，其中的元素最大为10**8。
//     arr是一个可能包含重复元素的整数数组，我们将这个数组分割成几个“块”，并将这些块分别进行排序。之后再连接起来，使得连接的结果和按升序排序后的原数组相同。
//     我们最多能将数组分成多少块？


// 示例 1:
//     输入: arr = [5,4,3,2,1]
//     输出: 1
//     解释:
//     将数组分成2块或者更多块，都无法得到所需的结果。
//     例如，分成 [5, 4], [3, 2, 1] 的结果是 [4, 5, 1, 2, 3]，这不是有序的数组。


// 示例 2:
//     输入: arr = [2,1,3,4,4]
//     输出: 4
//     解释:
//     我们可以把它分成两块，例如 [2, 1], [3, 4, 4]。
//     然而，分成 [2, 1], [3], [4], [4] 可以得到最多的块数。

// 示例 3:
//     输入: arr = [5,1,3,6,7,7]
// 输出4
// 5 1 3 , 6 ,7 , 7


// 注意:
//     arr的长度在[1, 2000]之间。
//     arr[i]的大小在[0, 10**8]之间。

var maxChunksToSorted = function (arr) {
    let curmax = arr[0];
    let maxIndex = 0;
    let result = [];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] >= curmax) {
            let curItem = arr.slice(maxIndex, i);
            result.push(curItem);
            curmax = arr[i];
            maxIndex = i;
        }
    }
    result.push(arr.slice(maxIndex, arr.length));
    return result;
}

console.log(maxChunksToSorted([5, 4, 3, 2, 1]))
console.log(maxChunksToSorted([2, 1, 3, 4, 4]))
console.log(maxChunksToSorted([5, 1, 3, 6, 7, 7]))




//思路：使用一个栈来存储每一份分区中的最大值，并且每个区块的最大值是依次递增的。只需要将当前元素和栈的最上面元素进行比较，大于则推入栈中，反之则弹出栈中元素，直到弹出值比当前值要小，将所有弹出元素合并为一个分区，将最先弹出的元素压入栈即可

var maxChunksToSorted = function (arr) {
    let stack = [];
    for (let i = 0; i < arr.length; i++) {
        if (!stack.length || arr[i] >= stack[stack.length - 1]) {
            stack.push(arr[i])
        } else {
            const curmax = stack.pop();
            while (stack[stack.length - 1] > arr[i]) {
                stack.pop();
            }
            stack.push(curmax);
        }
    }
    return stack.length;
};

/**

思路：遍历arr，判断第i个元素及其之前的元素能否划分到一个区间。这些区间的数目和加上最后那块区间，就是能够划分的区间数目。能否划分的依据是第i个元素及其之前的元素的最大值要小于等于后边的元素的最小值。
关键点 用两个栈来存储每一位对应的前面所有元素（包括自身）的最大值和后边所有元素的最小值。 最后一个元素是边界情况，其后没有元素所以不会被判断到，但末尾这一块应当计入，所以返回值加一 Number.MINVALUE取值比0大，min取值得设定为0 */
var maxChunksToSorted = function (arr) {
    let max = Number.MAXVALUE,
        min = 0,
        result = 0
    let MXStack = [],
        MNStack = []
    for (let i = 0; i < arr.length; i++) {
        min = Math.max(min, arr[i]);
        MXStack.push(min)
    }
    for (let i = arr.length - 1; i >= 0; i--) {
        max = Math.min(max, arr[i]);
        MNStack.push(max)
    }
    for (let i = 0; i < arr.length; i++) {
        if (MXStack[i] <= MNStack[arr.length - 1 - i - 1]) result++
    }
    return result + 1
};