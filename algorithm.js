//插入排序
//i+1 > i 不变 走下一轮循环
//i+1 < i 继续 i+1 与 i-1的比较
var arr = [5,4,2,8,9,6,7];

function insertion(arr) {
    var length = arr.length;

    if(length == 0) {
        return arr;
    }

    for(var i = 0; i < length; i++) {
        var j = i;
        while(i+1 < length) {
            if(arr[i+1] > arr[j]) {
                break;
            }

            while(arr[i+1] < arr[j] && j >=0) {
                j -= 1;
            } 
                var temp = arr.splice(i+1,1)[0];
				arr.splice(j+1,0,temp);
                break;
            
        }
    }
    return arr;
}
class LinkedNode{
    constructor(value,next = null){
        this.value = value;
        this.next = next;
    }
}
class LinkedList{
    /**
     * head指向链表的第一个
     * tail指向链表的最后一个
     */
    constructor() {
        this.head = null;
        this.tail = null;
    }

    prepend(value) {
        if(this.head === null) {
            this.head = new LinkedNode(value, this.head);
        }
        return this;
    }

    append(value) {
        if(!this.head) {
            this.head = new LinkedNode(value);
            this.tail = new LinkedNode(value);
            return this;
        }

        // 先将上一个末尾的next指向新Node
        // 再将末尾Node变为新Node
        this.tail.next = new LinkedNode(value);
        this.tail = new LinkedNode(value);
        return this;
    }

    deleteHead(value) {
        if(!this.head) {
            return null;
        }

        let currentHead = this.head;
        // this.head.next = this.head.next.next;
        // 要判断你用的值有没有？
        if(this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }
        return currentHead;
    }
    find(value = undefined, callBack = undefined) {}


}
// 队列 --- 使用链表来实现
class Deque{
    constructor() {
        this.LinkedList = new LinkedList();
    }

    isEmpty() {
        return !this.LinkedList.head;
    }

    peek() {}

    enDeque(value) {
        this.LinkedList.append(value);
    }

    deDeque(value) {
        const removeHead = this.LinkedList.deleteHead(value);
        return removeHead ? removeHead.value : null;
    }
}
// 广度优先搜索 --- 无权最短路径问题
function BreadthFirstSearch(name) {
        
    
}

