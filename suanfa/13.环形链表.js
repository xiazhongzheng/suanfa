// 题目描述：
//     给定一个链表，判断链表中是否有环。
//     如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

//     如果链表中存在环，则返回 true 。 否则，返回 false 。


var a = {
    next: b
}
var b = {
    next: c
}

var c = {
    next: d
}

var d = {
    next: a
}

var hasCycle = function (head) {
    //TODO
    let pos = -1;
    let point = head;
    console.log(point)
    while (point && point.pos === undefined) {
        point.pos = ++pos;
        point = point.next;
    }
    if (point) {
        return true;
    } else {
        return false
    }
};

let result = hasCycle(a);
console.log(result);


// 思路：快慢指针，快的速度是慢的两倍。第一次相遇则是有环，且相遇点距环入口距离加上入环前长度会是环的整数倍。然后从相遇点以及头部同时进行两个指针，相遇时就是环入口

//关键点：注意边界条件，比如第一次确定有环的遍历时要注意开始条件是fast===slow，不能直接while(fast!==slow)这样;一次移动两次的指针，fast=fast.next.next，条件里应当是fast.next非空进行（非空的fast.next有next），同时也要加上fast非空的条件，避免出现报错（fast为空的时候）

var detectCycle = function (head) {
    let fast = head,
        slow = head
    if (!fast || !fast.next)
        return null
    do {
        fast = fast.next.next
        slow = slow.next
    } while (fast && fast.next && fast !== slow)
    if (fast !== slow)
        return null

    fast = head
    while (fast !== slow) {
        fast = fast.next
        slow = slow.next
    }
    return slow
};