const util = require('util');
const fs = require('fs')
let readFile = util.promisify(fs.readFile)

;
(function () {
    // 同步yield
    function* sync() {
        let data = yield 1;
        data = yield 2;
        return data;
    }

    let value;
    let done;
    let it = sync();

    do {
        let {
            value: v,
            done: d
        } = it.next(value);
        value = v;
        done = d;
    } while (!done)
    console.log(value)
});

;
(function () {
    function* read(parems) {
        let data = yield readFile(parems, 'utf8');
        data = yield readFile(data, 'utf8');
        return data;
    }

    // co返回的是一个promise
    function co(it) {
        return new Promise((resolve, reject) => {
            function next(data) {
                // 递归的方法处理异步
                let {
                    value,
                    done
                } = it.next(data);
                if (done) {
                    resolve(value);
                } else {
                    Promise.resolve(value).then(next, reject)
                }
            }
            next();
        });
    }

    co(read('./tutorial/source/2.async/a.txt')).then((data) => {
        console.log(data)
    })
})();