// 1. 中心扩散法

const longestPalindrome = (str) => {
    let max = 0;
    let result = '';
    for (let i = 0; i < str.length; i++) {
        // 回文分为奇数和偶数
        let oddStr = centerSpread(str, i, i);
        let evenStr = centerSpread(str, i, i + 1);
        let curMaxStr = oddStr.length > evenStr.length ? oddStr : evenStr;
        if (curMaxStr.length > max) {
            result = curMaxStr;
            max = curMaxStr.length;
        }

    }
    return result;
}

const centerSpread = (str, left, right) => {
    while (left >= 0 && right < str.length) {
        if (str[left] === str[right]) {
            left--;
            right++;
        } else {
            break;
        }
    }
    // 因为跳出while时，str[left] !== str[right]，所以回文不包括left和right
    return str.substring(left + 1, right);
}

console.log(longestPalindrome('babad'));



// 2. 马拉车 Manacher 算法

// http://www.cxyxiaowu.com/2869.html