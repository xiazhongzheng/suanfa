// 题目描述
// 给定一个字符串 S 和一个字符 C。返回一个代表字符串 S 中每个字符到字符串 S 中的字符 C 的最短距离的数组。


// 示例 :
// 输入: S = "loveleetcode", C = 'e'
// 输出: [3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0]

// 说明:
// - 字符串 S 的长度范围为 [1, 10000]。
// - C 是一个单字符，且保证是字符串 S 里的字符。
// - S 和 C 中的所有字母均为小写字母。

var shortestToChar = function (S, C) {
    var len = S.length;
    var result = new Array(len).fill(len - 1);
    for (var i = 0; i < len; i++) {
        if (S[i] === C) {
            for (var j = 0; j < result.length; j++) {
                if (i === j) {
                    result[i] = 0;
                } else {
                    var a = Math.abs(j - i);
                    if (a < result[j]) {
                        result[j] = a;
                    }
                }
            }
        }
    }
    return result
}

var result = shortestToChar("loveleetcode", 'e')
console.log(result)



// 思路:分别寻找每个字符左右的对短距离并取最小值 
var shortestToChar = function (S, C) {
    let arr = S.split('');
    let res = []
    for (let i = 0; i < arr.length; i++) {
        let n = -1
        for (let j = i; j < arr.length; j++) {
            if (arr[j] == C) {
                n = (j - i);
                break
            }
        }
        for (let k = i; k >= 0; k--) {
            if (arr[k] == C) {
                if (n == -1) {
                    n = (i - k)
                } else {
                    n = Math.min((i - k), n)
                }
                break
            }
        }
        res.push(n)
    }
    return res

};