const array = [7, 8, 15, 9, 20, 3, 1, 10, 19];
findLargestDifference(array)
// 给定一个整数数组，请找出两个元素之间的最大差，较小值的元素必须位于较大元素之前
function findLargestDifference(array) {
    let max = 0;
    let min = array[0];
    for (let i = 0; i < array.length; i++) {
        max = Math.max(max, array[i] - min)
        min = Math.min(min, array[i]);
    }
    console.log(max);
} //符合条件的两个数字:7和20