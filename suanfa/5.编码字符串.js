// 题目描述:
// 给定一个经过编码的字符串，返回它解码后的字符串。
// 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
// 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
// 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。

// 示例 1：
// 输入：s = "3[a]2[bc]"
// 输出："aaabcbc"
// numArr = [3]
// strArr = ['' ,a]

// 示例 2：
// 输入：s = "3[a2[cd]]"
// 输出："acdcdacdcdacdcd"
// numArr = [3 , 2]
// strArr = [a , cd]


// 示例 3：
// 输入：s = "2[abc]3[cd]ef"
// 输出："abcabccdcdcdef"


// 示例 4：
// 输入：s = "abc3[cd]xyz"
// 输出："abccdcdcdxyz"
// numArr = []
// strArr = [abc, 3cd]

// 输入：s = "3[a2[cd]]"
// 输出："acdcdacdcdacdcd"
// numArr = [3 , 2]
// strArr = ['' ,a , cd]

var decodeString = function (s) {
    let numArr = [];
    let strArr = [];
    let numTemp = 0;
    let strTemp = '';
    let result = '';
    while (s) {
        let curr = s[0];
        s = s.substr(1);
        if (curr === '[') {
            if (strTemp) {
                strArr.push(strTemp);
                strTemp = '';
            }
            if (numTemp) {
                numArr.push(numTemp);
                numTemp = 0;
            }
        } else if (curr === ']') {
            if (strTemp) {
                strArr.push(strTemp);
                strTemp = '';
            }

            let num = numArr.pop() || 1;
            let str = strArr.pop()
            let newStr = (new Array(num)).fill(str).join('');
            strArr[strArr.length - 1] = strArr[strArr.length - 1] + newStr;
        } else if (/[0-9]/.test(curr)) {
            strArr.push(strTemp);
            strTemp = '';
            numTemp = numTemp * 10 + Number(curr);

        } else {
            numTemp = 0;
            strTemp += curr;
        }
    }
    strArr.push(strTemp);
    result = strArr.join('');
    return result;
}



console.log(decodeString('3[a]2[bc]')); // aaabcbc
console.log(decodeString('3[a2[cd]]')); // acdcdacdcdacdcd
console.log(decodeString('2[abc]3[cd]ef')); // abcabccdcdcdef
console.log(decodeString('abc3[cd]xyz')); // abccdcdcdxyz


/* 思路方式: 使用栈，循环遍历字符串 当c为数字时，计算倍数 10 * multi + parseInt(c) 当c为字母时，拼接字符串 str 当c为[时,把倍数multi和 str推入栈中 stack.push({ multi: multi, str: str })，并重置multi和str的值 当c为]时,出栈拼接字符串 str = n.str + str.repeat(n.multi) */
var decodeString = function (s) {
    const stack = []
    let str = ''
    let multi = 0

    for (let c of s) {
        if (c === '[') {
            stack.push({
                multi: multi,
                str: str
            })
            multi = 0
            str = ''
        } else if (c === ']') {
            const n = stack.pop()
            str = n.str + str.repeat(n.multi)
        } else if (c >= 0) {
            // 注意连续的数字
            multi = 10 * multi + parseInt(c)
        } else {
            str += c
        }
    }

    return str
};

/* 思路：递归写法，当遍历到符号“[”时候，递归一次，得到对应的"]"的位置和中括号内的字符串，乘数multi在之前已经做了记录，只需要进行拼接。 遍历到符号“]”时，结束本次递归。 / /*

@param {string} s
@return {string} */
var decodeString = function (s) {
    var dfs = (s, i) => {
        let res = '';
        let multi = 0;
        let tmp = '';
        while (i < s.length) {
            const str = s[i];
            if (str >= '0' && str <= '9') {
                multi = multi * 10 + Number(str);
            } else if (str === '[') {
                [i, tmp] = dfs(s, i + 1);
                res += tmp.repeat(multi);
                multi = 0;
            } else if (str === ']') {
                return [i, res];
            } else {
                res += str;
            }
            i++;
        }
        return res;
    }
    return dfs(s, 0);
};
console.log(decodeString('3[a]2[bc]')); // aaabcbc
console.log(decodeString('3[a2[cd]]')); // acdcdacdcdacdcd
console.log(decodeString('2[abc]3[cd]ef')); // abcabccdcdcdef
console.log(decodeString('abc3[cd]xyz')); // abccdcdcdxyz