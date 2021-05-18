//插入排序
// 1、当前数字（curValue）的前面已经排好序了，后面未排序的数据位置也不会被打乱。
// 2、for循环中的每个数据都会跟前面的数据进行比对，当不对的时候会把前面的数据移植到当前位置。
var arr = [5,4,2,8,9,6,7];

function insertion(arr) {
    var length = arr.length
    if(length == 0) {
        return arr;
    }

    for(var i = 0; i < length; i++) {
        const curValue = arr[i]
        var j = i
        while(j > 0 && arr[j - 1] > curValue) {
            arr[j] = arr[j - 1]
            j -= 1
            
        }
        arr[j] = curValue
    }
    return arr;
}

console.log(insertion(arr))


// 希尔排序
function shellSort(arr) {
    const len = arr.length
    let sublistcount = Math.floor(len / 2)

    function gapInsertSort(nlist, startPostion, gap) {
        for (let i = startPostion + gap; i < nlist.length; i += gap) {
            const curValue = nlist[i]
            let position = i
            while(position >= gap && nlist[position - gap] > curValue) {
                nlist[position] = nlist[position - gap]
                position = position - gap
            }
            nlist[position] = curValue
        }
    }

    while (sublistcount > 0) {
        for (let i = 0; i < sublistcount; i++) {
            gapInsertSort(arr, i, sublistcount)
        }
        sublistcount = Math.floor(sublistcount / 2)
    }
    return arr
}
var arr = [5,4,2,8,9,6,7,10];
console.log(shellSort(arr))

// 冒泡排序
function bubbleSort(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}
var arr = [5,4,2,8,9,6,7,10];
console.log(bubbleSort(arr))
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

