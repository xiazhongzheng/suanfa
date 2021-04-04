// 题目描述：
//     运用你所掌握的数据结构，设计和实现一个 LRU (最近最少使用) 缓存机制 。
//     实现 LRUCache 类：
//         LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存
//         int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
//         void put(int key, int value) 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字-值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。


// 示例：

//     输入：["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
//             [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
//     输出：[null, null, null, 1, null, -1, null, -1, 3, 4]
//     解释：
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // 缓存是 {1=1}
// lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
// lRUCache.get(1); // 返回 1
// lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
// lRUCache.get(2); // 返回 -1 (未找到)
// lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
// lRUCache.get(1); // 返回 -1 (未找到)
// lRUCache.get(3); // 返回 3
// lRUCache.get(4); // 返回 4

var LRUCache = function (capacity = 0) {
    //TODO
    this.sort = [];
    this.cache = {};
    this.maxLength = capacity;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    //TODO
    let result = this.cache[key];
    if (result && result !== undefined) {
        this.sort.splice(this.sort.indexOf(key), 1)
        this.sort.unshift(key);
        console.log('get',result);
        return result;
    } else {
        console.log('get',-1);
        return -1;
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    //TODO
    if (this.sort.length >= this.maxLength) {
        let lastKey = this.sort.pop();
        delete this.cache[lastKey];
    }
    this.sort.unshift(key);
    this.cache[key] = value;
    console.log('cache', this.cache)
};

let lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1); // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2); // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1); // 返回 -1 (未找到)
lRUCache.get(3); // 返回 3
lRUCache.get(4); // 返回 4