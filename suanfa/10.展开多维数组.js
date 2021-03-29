// zhaodongfang
function flat(arr, i = 1) {
    for (let j = 0; j < i; j++) {
        temp()
    }

    function temp() {
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                let index = arr[i].length;
                arr.splice(i, 1, ...arr[i])
                i += index
            }
        }
    }
    return arr
}
// my
function flat(arr, level = 1) {
    let data = [];

    function temp(arr, j) {
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            if (Array.isArray(item)) {
                if (j < level) {
                    let result = temp(item, j +
                        1);
                } else {
                    data.push(item);
                }
            } else {
                data.push(item);
            }
        }
    }
    temp(arr, 0);
    return data;
}
let arr = [1, [2, 3, [4, 5, [6, 7], 8], 9], 10];

console.log(flat(arr));
console.log(flat(arr, 2));
console.log(flat(arr, 3));