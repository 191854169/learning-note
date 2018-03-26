// !数组去重的方法 
//第一种：时间复杂度为O(n^2)
var a = [1,1,'1','2',1,2];
function unique(arr) {
	return arr.filter(function(ele, index, array) { 
		return array.indexOf(ele) === index; 
			}
		)
	}
console.log(unique(a));


//第二种：时间复杂度为O(n)
var a = [1,1,'1','2',1,2];
function unique(arr) {
	return arr.filter(function(ele, index, array) { 
		return obj.hasOwnProperty(typeof ele + ele)  ? 
		false : (obj[typeof ele + ele] = true)
			}
		)
	}
console.log(unique(a));

//将arguments转换成数组的方法：
//这种方法采用了数组的slice方法，将arguments里的内容一个个拆分放到新的数组中。
//这里采用了call方法，将slice的上下文绑定到了arguments中去
var arr = Array.prototype.slice.call(arguments);
[...arguments]



// !!数组求和的方法 

//第一种：
let arr = [1,2,3,4,5];
function sum(arr) {
	let x = 0;
	for(let i = 0; i < arr.length; i++) {
		x += arr[i];
	}
	return x;
}

//第二种：
let arr =  [1,2,3,4,5,6];
function sum(arr) {
	return arr.reduce((a,b) => {a+b})
}
sum(arr);

// !数组排序的方法 
[].sort(callback);

function sort(callback) {
	console.log(this)
}

// !数组打乱顺序的方法 

let arr = [1,2,3,4,5,6,7,8,9];

arr.sort(function() {
	return Math.random() - 0.5
})


// !数组求最大值的方法 
Math.max(...arr)  //9

// !数组去重的方法 
var c = [...new Set([2, "12", 2, 12, 1, 2, 1, 6, 12, 13, 6])];
// [2, "12", 12, 1, 6, 13]
// 正则 

//检测string中是否有汉字的正则表示：
var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");

//检测string中是否全是阿拉伯数字

var reg = new RegExp()


// !!设备来源判断方法 

function deviceType(){ 
	var ua = navigator.userAgent; 
	var agent = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]; 
	for(var i=0; i<len,len = agent.length; i++){ 
		if(ua.indexOf(agent[i])>0){ 
			break; 
		} 
	} 
} 
deviceType(); 
window.addEventListener('resize', function(){ deviceType(); }) 

//微信的 有些不太一样 
function isWeixin(){ 
	var ua = navigator.userAgent.toLowerCase(); 
	if(ua.match(/MicroMessenger/i)=='micromessenger'){ 
		return true; 
	}else{ 
		return false; 
	} 
}


// !!判断数据的类型 
var isType = function(type) {
	return function(obj) {
		return Object.prototype.toString.call(obj) === '[object ' + type + ']';
	}
}

var isString = isType('String');
isString(1);

//for循环注册这些函数
var Type = {};
for(var i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
	(function(type) {
		Type['is' + type] = function(obj) {
			return Object.prototype.toString.call(obj) === '[object ' + type + ']'; 
		}
	})(type)
}

//或者
var Type = {};
for(let i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
		Type['is' + type] = function(obj) {
			return Object.prototype.toString.call(obj) === '[object ' + type + ']'; 
		}
}

 

 // !!数组或者对象的深浅拷贝 
 //!!浅拷贝
 function extend(parent, child) {
 	var i,
 	for(i in parent) {
 		if(parent.hasOwnProperty(i)) {
 			parent[i] = child[i];
 		}
 	}
 }

 //!!深拷贝
 function extendDeep(parent, child) {
 	var i,
 	toStr = Object.prototype.toString,
 	aStr = '[Object Array]';

 	child = child || {};
 	for(i in parent) {
 		if(parent.hasOwnProperty(i)) {
 			if(typeof parent[i] === 'Object') {
 				child[i] = toStr.call(parent[i]) === aStr ? [] : {};
 				extendDeep(parent[i], child[i]);
 			} else {
 				child[i] = parent[i];
 			}
 		}
 	}

 	return child;
 }



 
 // !!迭代器 
 //第一版本
 var each = function(ary, callback) {
 	for(var i = 0; i < ary.length; i++) {
 		callback(ary[i], i, ary);
 	}
 }

 //第二版本


  
  // !!bind函数的实现 
  Function.prototype._bind = function(...rest) {
  	const func = this;
  	const obj = typeof rest[0] === 'object' ? rest[0] : {};
  	let params = rest.slice(1);
  	return function(...rest) {
  		params = [...params, ...params];
  		func.call(obj, ...params);
  	}
  }


  var a = function(...rest) {
  	console.log(this, rest);
  }._bind({a:1},1,2,3)



    

    // 柯里化 
  //  !!一个函数只有一个返回值，当见到return的时候，函数才不会继续执行下去。

    function add(a,b,c){
    	return a+b+c;
    }

    function foo(fn) {
    	let args = [];
    	let length = fn.length;
    	return function fe(...rest) {
    		args = [...args, ...rest];
    		if(args.length === length) {
    			return fn.apply(null, args);
    		}

    		return fe;
    	}
    }


    
    // !职责链 

    var order = function(orderType, pay, stock) {
    	if(orderType === 1) {
    		if(pay === true) {
    			console.log('500定金已付，得到100优惠券');
    		} else {
    			if(stock > 0) {
    				console.log('普通购买，无优惠券');
    			} else {
    				console.log('库存不足');
    			}
    		}
    	} else if(orderType === 2) {
    		if(pay === true) {
    			console.log('200定金已付，得到50优惠券');
    		} else {
    			if(stock > 0) {
    				console.log('普通购买，无优惠券');
    			} else {
    				console.log('库存不足');
    			}
    		}
    	} else if(orderType === 3) {
    		if(stock > 0) {
    				console.log('普通购买，无优惠券');
    			} else {
    				console.log('库存不足');
    			}
    	}
    }


    //使用职责链：第一次修改
    const order500 = function(orderType, pay, stock) {
    	if(orderType === 1 && pay === true) {
    		console.log('500定金已付，得到100优惠券');
    	} else {
    		order200(orderType, pay, stock);
    	}
    }

    const order200 = function(orderType, pay, stock) {
    	if(orderType === 2 && pay === true) {
    		console.log('200定金已付，得到50优惠券');
    	} else {
    		orderNormal(orderType, pay, stock);
    	}
    }

    const orderNormal = function(orderType, pay, stock) {
    	if(stock > 0) {
    		console.log('普通购买，无优惠券');
    	} else {
    		console.log('库存不足');
    	}
    }

    order500(3,true,1);


    //使用职责链:第二次修改(消除传递节点时存在的链条)
    const order500 = function(orderType, pay, stock) {
    	if(orderType === 1 && pay === true) {
    		console.log('500定金已付，得到100优惠券');
    	} else {
    		// order200(orderType, pay, stock);//这里存在耦合
    		return 'nextSuccessor';
    	}
    }

    const order200 = function(orderType, pay, stock) {
    	if(orderType === 2 && pay === true) {
    		console.log('200定金已付，得到50优惠券');
    	} else {
    		// orderNormal(orderType, pay, stock);
    		return 'nextSuccessor';
    	}
    }

    const orderNormal = function(orderType, pay, stock) {
    	if(stock > 0) {
    		console.log('普通购买，无优惠券');
    	} else {
    		console.log('库存不足');
    	}
    }


var Chain = function(fn) {
	this.fn = fn;
	this.successor = null;
}

Chain.prototype.setNextSuccessor = function(success) {
	return this.successor = success;
}

Chain.prototype.passRequest = function() {
	let ret;

	if(typeof this.fn === 'function') {
		ret = this.fn.apply(this, arguments);
	}

	if(ret === 'nextSuccessor') {
		return this.successor && this.successor.passRequest.apply(this.successor, arguments);
	}

	return ret;
}

//创建每一个职责节点
const chain500 = new Chain(order500);  
const chain200 = new Chain(order200);
const chainNormal = new Chain(orderNormal);

//设置节点之间的联系
chain500.setNextSuccessor(chain200);
chain200.setNextSuccessor(chainNormal);

//开始启动
chain500.passRequest(1,true, 0);


// !函数节流 
const throttle = function(fn, delay = 50) {
	let startTime = 0;
	return function(...args) {
		let currTime = +new Date();
		if(currTime - startTime > delay) {
			fn.apply(this,args);
			startTime = currTime;
		} 
	}
}

// !防抖动 
const debounce = function(fn, delay) {
	let timer = null;

	return function(...args) {
		let that = this;
		clearTimeout(timer);
		timer = setTimeout(fn.bind(that, args), delay); //要注意给函数指定this
	}
}


const rules = [
{
	match: function(){},
	action: function(){},
},{
	match: function(){},
	action: function(){},
},{
	match: function(){},
	action: function(){},
}]

function dutyList(...rest) {
	for(var i = 0,length = rules.length; i < length; i++) {
		if(rules[i].match(...rest)) {
			rules[i].action(a,b,c);
		}
	}
}

