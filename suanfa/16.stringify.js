function jsonStringify(obj) {
    let type = typeof obj;
    if (type !== 'object' || type === null) {
        // 不是对象和数组，或者null
        if (/string|undifined|function/.test(type)) {
            obj = '"' + obj + '"';
        }
        return String(obj);
    } else {
        // 对象或数组可以遍历的
        let json = [];
        arr = Array.isArray(obj);
        for (const key in obj) {
            let val = obj[key];
            let type = typeof val;
            if (/string|undifined|function/.test(type)) {
                val = '"' + val + '"';
            } else if (type === 'object') {
                val = jsonStringify(val);
            }
            // 对象以key:value的形式，数组以value的形式
            let v = (arr ? "" : '"' + key + '":') + String(val);
            json.push(v)
        }
        let res = (arr ? "[" : "{") + String(json) + (arr ? "]" : "}")
        return res;
    }
}

console.log(jsonStringify({ x: 5 }))
// "{"x":5}"
console.log(jsonStringify([1, "false", false]))
// "[1,"false",false]"
console.log(jsonStringify({ b: undefined }))
// "{"b":"undefined"}"