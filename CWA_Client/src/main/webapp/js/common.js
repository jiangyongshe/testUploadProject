/**
 * 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 例子： (new
 * Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
 * Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/**
 * 根据元素找到数组下标
 */
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};

/**
 * 删除指定元素
 */
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};

/**
 * 对String的扩展，去除前后空格
 */
String.prototype.trim=function() {
    return this.replace(/(^\s*)|(\s*$)/g,'');
};

/**
 * 将数值四舍五入后格式化.
 * @param num 数值(Number或者String)
 * @param cent 要保留的小数位(Number)
 * @param isThousand 是否需要千分位 0:不需要,1:需要(数值类型);
 * @return 格式的字符串,如'1,234,567.45'
 * @type String
 */
function formatNumber(num,cent,isThousand) {
	num = num.toString().replace(/\$|\,/g,'');

	// 检查传入数值为数值类型
	if(isNaN(num)) num = "0";

	// 获取符号(正/负数)
	sign = (num == (num = Math.abs(num)));

	 num = Math.floor(num*Math.pow(10,cent)+0.50000000001); // 把指定的小数位先转换成整数.多余的小数位四舍五入
	 cents = num%Math.pow(10,cent);       // 求出小数位数值
	 num = Math.floor(num/Math.pow(10,cent)).toString();  // 求出整数位数值
	 cents = cents.toString();        // 把小数位转换成字符串,以便求小数位长度

	 // 补足小数位到指定的位数
	 while(cents.length<cent) cents = "0" + cents;

	 if(isThousand) {
		 // 对整数部分进行千分位格式化.
	     for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
	     num = num.substring(0,num.length-(4*i+3))+','+ num.substring(num.length-(4*i+3));
	 }

	 if (cent > 0) return (((sign)?'':'-') + num + '.' + cents);
	 
	 else return (((sign)?'':'-') + num);
};

/**
 * 动态加载JS文件
 * @param filePath 文件路径
 * @param callback 引入成功的回调
 * @returns
 */
loadJavaScript = function(filePath,callback){ 
	  var script=document.createElement('script'); 
	  script.setAttribute("type","text/javascript"); 
	  script.setAttribute("src", filePath); 
	  if (typeof script!="undefined"){ 
		  document.getElementsByTagName("head")[0].appendChild(script); 
	  }
	  script.onload = script.onreadystatechange = function() {
        if (!this.readyState || this.readyState === "loaded" ||  this.readyState === "complete" ) {
            script.onload = script.onreadystatechange = null;
            if(callback&&typeof(callback)== 'function'){
                  callback();//window[callback]();如果传递字符串过来  调用window['函数名']() 调用方法
            }
        }
	  };
}

/**
 * 根据键值对字符串的key获取value
 * @param key
 * @param str
 * @eg: 例如传入'name','name=Abel;age=23' return 'Abel'
 * @returns
 */
function getValueByStrKV(key,str){
	var arr,reg=new RegExp("(^|\\S)"+key+"=([^;]*)(;|$)");
	if(arr=str.match(reg))
	return unescape(arr[2]);
	else
	return null;
};

/**
 * 输入控制台文本
 * @param str
 * @returns
 */
function log(str){
	console.log(str);
};

/**
 * 禁用按钮
 * @param id 元素ID
 * @returns
 */
function disabledBtn(id){
	var ele = document.getElementById(id);
	ele.disabled = true;
}

/**
 * 启用按钮
 * @param id 元素ID
 * @returns
 */
function startBtn(id){
	var ele = document.getElementById(id);
	ele.disabled = false;
}

//写cookies
function setCookie(name, value) {
	var Days = 15;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires="
			+ exp.toGMTString();
}

/**
 * get username from cookie
 */
function getCookie(name) {
	var cookieValue = '';
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) {
		cookieValue = unescape(arr[2]);
	}
	return cookieValue;

}

/**
 * clear all cookie
 */
function clearCookie(){ 
	var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
	if (keys) { 
		for (var i = keys.length; i--;) 
			document.cookie=keys[i]+'=0;expires=' + new Date(0).toUTCString() 
	} 
} 

/**
 * 从url获取参数
 */
function getURLParam(queryName) {
	var queryValue = '';
	var name, value, i;
	var str = location.href;
	var num = str.indexOf("?")
	str = str.substr(num + 1);
	var arrtmp = str.split("&");
	for (i = 0; i < arrtmp.length; i++) {
		num = arrtmp[i].indexOf("=");
		if (num > 0) {
			name = arrtmp[i].substring(0, num);
			value = arrtmp[i].substr(num + 1);
			if (queryName === name) {
				queryValue = value;
				break;
			}
		}
	}
    if(queryValue.indexOf("#")>=0){
      queryValue=queryValue.split("#")[0];
    }
	return queryValue;
}

/**
 * 开启等待动画
 */
function openWaitAnimation(obj){
	if(obj==null||obj==undefined||obj==""){
		obj="正在加载中...";
	}
	var loadEle = document.getElementById('loadDiv');
	if(!loadEle){
		var loadDivEle = document.createElement('div');
		loadDivEle.style.display = 'block';
		loadDivEle.setAttribute('id','loadDiv');
		loadDivEle.setAttribute('class','shade');
		var loadDivHTML =  ''
			   +  '	  <div class="loading01 text-c red">'
			   +  '	     <div class="loader">'
			   +  '	        <div class="loader-inner ball-clip-rotate-pulse">'
			   +  '	          <div></div>'
			   +  '	          <div></div>'
			   +  '	        </div>'
			   +  '	     </div>'
			   +  '		 <div class="jizai" id="loadingDiv">'+obj+'</div>'
			   +  '	  </div>';
		loadDivEle.innerHTML = loadDivHTML;
		document.getElementsByTagName('body')[0].appendChild(loadDivEle);
	}else{
		document.getElementById("loadingDiv").innerText=obj;
		loadEle.style.display = 'block';
	}
}

/**
 * 关闭等待动画
 */
function closeWaitAnimation(){
	var loadEle = document.getElementById('loadDiv');
	if(loadEle){
		loadEle.style.display = 'none';
	}
}

/**
 * 获取组合方式
 * @param arr 需要进行组合的数组
 * @param num 每次组合的长度
 * @returns 组合方式
 */
function C(arr, num) {

    var r=[];

    (function f(t,a,n){
	
        if (n==0) return r.push(t);
        
        for (var i=0,l=a.length; i<=l-n; i++){
        	f(t.concat(a[i]), a.slice(i+1), n-1);
        }
        
    })([],arr,num);
    
    return r;
}

/**
 * 
 * @param {}
 *            url 必须有
 * @param {}
 *            obj 请求参数 按照对象的形式 可为空
 * @param {}
 *            type 默认是POST 可为空
 * @param {}
 *            dataType 默认是json 可为空
 * @param {}
 *            successFun 请求成功回调的函数必须有
 * @param {}
 *            errorFun 请求失败回调的函数
 *            
 * @param loadAnimation 
 * 				val:true or false 是否开启动画
 * @author yw
 */
function jsonAjax(url, obj, successFun, errorFun, type, dataType,loadAnimation,isAsync) {
	if (url == undefined || url == null) {
		console.log("url不可以不填写");
		return;
	}
	if (!typeof successFun == 'function' || !typeof errorFun == 'function') {
		console.log("successFun 或者 errorFun  不是一个函数");
		return;
	}
	if (errorFun != undefined) {
		if (!typeof errorFun == 'function') {
			console.log("errorFun 不是一个函数");
			return;
		}
	}
	if (type == null || type == undefined || type == "") {
		type = 'POST';
	}
	if (dataType == null || dataType == undefined || dataType == "") {
		dataType = 'json';
	}
	
	if (loadAnimation === null || loadAnimation === undefined || loadAnimation === "") {
		loadAnimation = true;
	}
	
	if (isAsync === null || isAsync === undefined || isAsync === "") {
		isAsync = true;
	}

	if(loadAnimation){ openWaitAnimation()};

	$.ajax({
		url : url,
		data : obj,
		type : type,
		cache:false,
		async: isAsync,
		timeout : 30000,
		dataType : dataType,
		success : function(res) {
			isLogin(res,successFun);
		},
		error : function(res) {
			errorFun(res);
		},
		complete : function(XHR, TR) {
			if(loadAnimation){
				// 关闭等待动画
				closeWaitAnimation();
			}
			if (TR == 'timeout') {// 超时
				tipInfo({
					status:'fail',
					content:'Time out,please refresh.'
				});
			} else if (XHR.status == '500' || TR == 'error') {// 异常
				tipInfo({
					status:'fail',
					content:'Server error.'
				});
			}
		}
	});

}

jQuery.extend({
	/**
	 * 
	 * @param {} url 必须有
	 * @param {} param 请求参数 按照对象的形式 可为空
	 * @param {} type 默认是POST 可为空
	 * @param {} timeout 超时时间
	 * @param {} contentType 数据格式
	 * @param {} dataType 默认是JSON 可为空
	 * @param {} successFun 请求成功回调的函数必须有
	 * @param {} errorFun 请求失败回调的函数
	 * @param openWaitingAnimation val:true or false 是否开启动画
	 */
	ajaxEp:function(obj){
		var 
			url = obj.url,
			param = obj.param,
			timeout = obj.timeout,
			successFun = obj.success,
			contentType = obj.contentType,
			errorFun = obj.error,
			type = obj.type,
			dataType = obj.dataType,
			loadAnimation = obj.openWaitingAnimation,
			isAsync = obj.async;
		if (url == undefined || url == null) {
			return;
		}
		if(!param){
			param = {};
		}
		if (!typeof successFun == 'function' || !typeof errorFun == 'function') {
			return;
		}
		if(!errorFun){
			errorFun = function(){};
		}
		if (errorFun != undefined) {
			if (!typeof errorFun == 'function') {
				return;
			}
		}
		if (type == null || type == undefined || type == "") {
			type = 'POST';
		}
		if (dataType == null || dataType == undefined || dataType == "") {
			dataType = 'json';
		}
		if (timeout == null || timeout == undefined || timeout == "") {
			timeout = 10000;
		}
		if (contentType == null || contentType == undefined || contentType == "") {
			contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
		}
		if (loadAnimation === null || loadAnimation === undefined || loadAnimation === "") {
			loadAnimation = true;
		}
		if (isAsync === null || isAsync === undefined || isAsync === "") {
			isAsync = true;
		}
		if(loadAnimation) openWaitAnimation();
		$.ajax({
			url : url,
			data : param,
			type : type,
			cache:false,
			async: isAsync,
			timeout : timeout,
			contentType:contentType,
			dataType : dataType,
			success : function(res) {
				isLogin(res,successFun);
			},
			error : function(res) {
				errorFun(res);
			},
			complete : function(XHR, TR) {
				// 关闭等待动画
				closeWaitAnimation();
				if (TR == 'timeout') {// 超时
					tipInfo({
						status:'fail',
						content:'Time out,please refresh.'
					});
				} else if (XHR.status == '500' || TR == 'error') {// 异常
					tipInfo({
						status:'fail',
						content:'Server error.'
					});
				}
			}
		});
	},
	/**
	 * 上传文件
	 * @param obj.xhr XMLHttpRequest 对象
	 * @param openWaitingAnimation val:true or false 是否开启动画
	 */
	ajaxFile:function(obj){
		var file = obj.file;
		var maxSize = obj.maxSize;
		if(!file || !maxSize) return;
		var url = obj.url;
		var successFun = obj.success;
		var fileType = obj.fileType;
		// 获取文件类型
		var type = file.type;
		// 判断是否指定类型
		var typePass = false;
		if(fileType && fileType instanceof Array && fileType.length>0){
			for(var i=0;i<fileType.length;++i){
				if(type.split('/')[1]===fileType[i]){
					typePass = true;
					break;
				}
			}
		}else{
			typePass = true;
		}
		if(!typePass) {
			tipInfo({
				status:'fail',
				content:'类型不符合'
			});
			return;
		}
		// 判断大小是否超过最大限制
		var size = file.size;
		if(size>maxSize){
			tipInfo({
				status:'fail',
				content:'文件大小不能超过'+maxSize/1024/1024+'M'
			});
		    return;
		}
		// 是否开启动画
		var openWaitingAnimation = obj.openWaitingAnimation;
		if(openWaitingAnimation === undefined || openWaitingAnimation === null){
			loadAnimation = true;
		}else{
			loadAnimation = openWaitingAnimation
		}
		// 上传至服务器
		var formData = new FormData();
		formData.append('file', file);
		// 开启等待动画
		if(loadAnimation) openWaitAnimation();
		var param = {
				url : url,
				type : 'post',
				data : formData,
				dataType : 'json',
				cache : false,
				contentType : false,
				processData : false,
				success : function(res) {
					isLogin(res,successFun);
				},
				complete : function(XHR, TR) {
					// 关闭等待动画
					closeWaitAnimation();
					if (TR == 'timeout') {// 超时
						tipInfo({
							status:'fail',
							content:'Time out,please refresh.'
						});
					} else if (XHR.status == '500' || TR == 'error') {// 异常
						tipInfo({
							status:'fail',
							content:'Server error.'
						});
					}
				}
			}
		// XMLHttpRequest对象
		var xhrParam = obj.xhr;
		if(xhrParam){
			param.xhr = xhrParam;
		}
		$.ajax(param);
	}
});

function isLogin(res, successFun) {
	if (res.msg == "10001" || res.respCode == "10001" && res.respMessge == "会话过期") {
		clearLocalStorage();//清空缓存
		location.href = '/'+language+'/exclude/forward/login.do';
		return;
	}
	successFun(res);
}

/**
 * 获取localStorage
 * @param key
 */
function getLocalStorage(key){
	return localStorage.getItem(key);
}

/**
 * 设置localStorage
 * @param key
 * @param value
 */
function setLocalStorage(key,value){
	localStorage.setItem(key,value);
}

/**
 * 根据key删除localStorage
 * @param key
 */
function removeLocalStorage(key){
	localStorage.removeItem(key);
}

/**
 * 清空localStorage
 */
function clearLocalStorage(){
	localStorage.clear();
}

/**
 * 获取localStorage
 * @param key
 */
function getSessionStorage(key){
	return sessionStorage.getItem(key);
}

/**
 * 设置localStorage
 * @param key
 * @param value
 */
function setSessionStorage(key,value){
	sessionStorage.setItem(key,value);
}

/**
 * 根据key删除localStorage
 * @param key
 */
function removeSessionStorage(key){
	sessionStorage.removeItem(key);
}

/**
 * 清空localStorage
 */
function clearSessionStorage(){
	sessionStorage.clear();
}

/**
 * 提示信息
 * @param obj.status 状态 success-成功,fail-失败,normal-无状态
 * @param obj.title 提示的标题
 * @param obj.content 提示的内容
 * @param obj.hideCloseBtn 是否隐藏关闭框,默认显示
 * @returns
 */
function tipInfo(obj){
	var status = obj.status,
		title = obj.title,
		content = obj.content,
		hideCloseBtn = obj.hideCloseBtn;
	if(!title){
		title = '提示';
	}
	var tipEle = document.getElementById('judgeTipDiv');
	if(!tipEle){
		var tipDiv = document.createElement('div');
		tipDiv.style.display = 'none';
		tipDiv.setAttribute('id','judgeTipDiv');
		tipDiv.setAttribute('class','shade');
		tipDiv.innerHTML = 
		'<div class="tanchu" style="height:auto;">'+
			'<div class="tanchu-bt">'+
				'<span id="judgeTipTitle"></span>'+
				'<a id="judegTipCloseBtn" class="tanchu-close text-c" title="close" onclick="javascript:document.getElementById(\'judgeTipDiv\').style.display=\'none\'">'+
				'<i class="fa fa-close" aria-hidden="true"></i></a>'+
			'</div>'+
			'<div class="tanchu-nr text-c">'+
				'<p class="">'+
					'<i aria-hidden="true" id="judgeStatus"></i>'+
				'</p>'+
				'<p class="pad-t10" id="judgeTipContent"></p>'+
			'</div>'+
		'</div>';
		document.getElementsByTagName('body')[0].appendChild(tipDiv);
		tipEle = document.getElementById('judgeTipDiv');
	}
	document.getElementById('judgeTipTitle').innerHTML = title;
	document.getElementById('judgeTipContent').innerHTML = content;
	if(hideCloseBtn===true){
		document.getElementById('judegTipCloseBtn').style.display = 'none';
	}else{
		document.getElementById('judegTipCloseBtn').style.display = 'block';
	}
	var judgeStatusEle = document.getElementById('judgeStatus');
	if(status=='success'){
		judgeStatusEle.setAttribute('class','fa fa-3x fa-smile-o green');
	}else if(status=='fail'){
		judgeStatusEle.setAttribute('class','fa fa-3x fa-frown-o red');
	}else{
		judgeStatusEle.setAttribute('class','fa fa-3x fa-meh-o yellow');
	}
	tipEle.style.display = 'block';
}

function showEmplyDiv(str,obj){
	var emplyDiv=document.getElementById("emplyDiv");
	if(emplyDiv){
		emplyDiv.style.display="block";
	}else{
		emplyDiv = document.createElement('div');
		emplyDiv.setAttribute('id','mplyDiv');
		emplyDiv.setAttribute('class','clear col-ccc text-c pad-t20 sea-fruit');
		emplyDiv.innerHTML = '<p class="pad-t10"><i class="fa fa-5x fa-frown-o" aria-hidden="true"></i></p>'
			+'<p class="font16 pad-t10">'+str+'</p>';
		$(obj).append(emplyDiv);
		//document.getElementsByTagName('body')[0].appendChild(emplyDiv);
	}
}

function hideEmplyDiv(){
	var empEle = document.getElementById('emplyDiv');
	if(empEle){
		empEle.style.display = 'none';
	}
}

/**
 * 弹出图片
 * @param imgEle
 * @returns
 */
function showPicPopup(imgEle,event){
	// 阻止冒泡
    var e = event;
    if (e && e.stopPropagation) {
    	e.stopPropagation();
    } else if (window.event) {
    	window.event.cancelBubble = true;
    }
	var tipEle = document.getElementById('picPopup');
	if(!tipEle){
		var tipDiv = document.createElement('div');
		tipDiv.style.display = 'none';
		tipDiv.setAttribute('id','picPopup');
		tipDiv.setAttribute('class','shade');
		tipDiv.innerHTML = 
			'<div class="tanchu3">'+
				'<div class="tanchu3-nr text-c" id="imgEleDIV">'+
				'</div>'+
			'</div>';
		document.getElementsByTagName('body')[0].appendChild(tipDiv);
		tipEle = document.getElementById('picPopup');
	}
	if(window.attachEvent) {
		tipEle.attachEvent('click', function(){turnoff('picPopup')});            
		imgEle.attachEvent('click', function(){turnoff('picPopup')});            
	} else {    
		tipEle.addEventListener('click', function(){turnoff('picPopup')},false);
		imgEle.addEventListener('click', function(){turnoff('picPopup')},false);
	}
	document.getElementById('imgEleDIV').innerHTML='';
	imgEle.style.maxWidth = screen.width+'px';
	imgEle.style.maxHeight = screen.height/2+'px';
	imgEle.style.width = '100%';
	document.getElementById('imgEleDIV').append(imgEle);
	document.getElementById('picPopup').style.display = 'block';
}

/**
 * 弹出确认框
 * @returns
 */
function showConfimTip(title,content,confirmFun){
	var div = document.getElementById("successdiv");
	if(!div){
		var confirmdiv = document.createElement('div');
		confirmdiv.setAttribute('id','successdiv');
		confirmdiv.setAttribute('class','shade');
		confirmdiv.innerHTML=
		  '<div class="tanchu tanchu1" style="height:auto; margin-top:-100px;">'+
		    '<div class="tanchu-bt"><span id="confirmTitle">'+title+'</span><a class="tanchu-close text-c" title="关闭" onclick="javascript:turnoff(\'successdiv\')"><i class="fa fa-close" aria-hidden="true"></i></a></div>'+
		    '<div class="tanchu-nr text-c">'+
		      '<p class="pad-t5" id="confirmContent">'+content+'</p>'+
		       '<div class="tanchu-xyan text-c" style=" padding-bottom:0px;position:relative;top:10px">'+
		           '<input name="confirm" type="button" value="确定" class="btn btn04 font14 mar-l10 bg-red" />'+
		           '<input name="" type="button" onclick="turnoff(\'successdiv\')" value="取消" class="btn btn04 font14 mar-l10 bg-999" />'+
		       '</div>'+
		    '</div>'+
		  '</div>';
		document.getElementsByTagName('body')[0].appendChild(confirmdiv);
		$("input[name='confirm']").bind("click",confirmFun);
		div =document.getElementById("successdiv");
	}
	document.getElementById("confirmTitle").innerHTML = title;
	document.getElementById("confirmContent").innerHTML = content;
	div.style.display = 'block';
}
/**
 * 隐藏审核提示
 * @returns
 */
function hideJudegTip(){
	var tipEle = document.getElementById('judgeTipDiv');
	if(tipEle){
		tipEle.style.display = 'none';
	}
}

//验证身份证是否正确
function validateIdCard(idCard) {
	// 15位和18位身份证号码的正则表达式
	var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
	// 如果通过该验证，说明身份证格式正确，但准确性还需计算
	if (regIdCard.test(idCard)) {
		if (idCard.length == 18) {
			var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10,
					5, 8, 4, 2); // 将前17位加权因子保存在数组里
			var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
			var idCardWiSum = 0; // 用来保存前17位各自乖以加权因子后的总和
			for (var i = 0; i < 17; i++) {
				idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
			}

			var idCardMod = idCardWiSum % 11;// 计算出校验码所在数组的位置
			var idCardLast = idCard.substring(17);// 得到最后一位身份证号码

			// 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
			if (idCardMod == 2) {
				if (idCardLast == "X" || idCardLast == "x") {
					return true;
				} else {
					return false;
				}
			} else {
				// 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
				if (idCardLast == idCardY[idCardMod]) {
					return true;
				} else {
					return false;
				}
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function currErrorArray(chineseError,englishError,twError){
	if(language=="chinese"){
		return chineseError;
	}else if(language=="english"){
		return englishError;
	}else if(language=="TW"){
		return twError;
	}
	
}

//点击关闭层
function turnoff(obj){
	var div=document.getElementById(obj);
	if(div!=undefined&&div!=null&&div!=""){
		div.style.display="none";
	}
  }
//点击显示层
function elementDisplay(objid){
 var obj=document.getElementById(objid);{
  obj.style.display='inline-block';
  }
 }
//点击关闭层
function turnoffByCss(obj){
	var div=$(obj).parent();
	if(div!=undefined&&div!=null&&div!=""){
		div[0].style.display="none";
	}
  }


/**
 * 生成翻页的HTML代码
 * @param count 总数据长度
 * @param obj 加载数据的参数
 * @param loadFn 加载数据的函数
 * @param sign id标识
 */
function pageNumber(count,obj,loadFn,sign,isShowJumpPage){
	var page = obj.pageNo;
	var pageSize = obj.pageSize;
	var pageTurnId = '#'+sign+'PageTurn';
	var pageLeftId = '#'+sign+'PageLeft';
	var pageRightId = '#'+sign+'PageRight';
	var pageNumberOfMoreId = '#'+sign+"PageNumberOfMore";
	var pageNumberOfId = '#'+sign+"PageNumberOf";
	// 最大页数
	var maxPage = (count-(count%pageSize))/pageSize+(count%pageSize==0?0:1);
	// 所有页码区间
	var allSection = [];
	// 计算区间的最大下标
	var maxSectionIndex = maxPage<=10?1:((maxPage-maxPage%7)/7+(maxPage%7==0?0:1));
	for(var i=1;i<=maxSectionIndex;++i){
		var arr = [];
		if(i!=maxSectionIndex){
			for(var j=1;j<=7;++j){
				arr.push(j+(i-1)*7);
			};
			var maxValue = arr[arr.length-1];
			if((maxValue+1)==maxPage){
				arr.push(maxPage);
				allSection.push(arr);
				break;
			}else if((maxValue+2)==maxPage){
				arr.push(maxPage-1);
				arr.push(maxPage);
				allSection.push(arr);
				break;
			}else if((maxValue+3)==maxPage){
				arr.push(maxValue+1);
				arr.push(maxPage-1);
				arr.push(maxPage);
				allSection.push(arr);
				break;
			}else{
				arr.push('...');
				arr.push(maxPage-1);
				arr.push(maxPage);
			}
		}else{
			for(var k=(i-1)*7+1;k<=maxPage;++k){
				arr.push(k);
			}
		}
		allSection.push(arr);
	}
	// 判断当前页码在哪个区间
	var currSection;
	for(var i=0;i<allSection.length;++i){
		for(var j=0;j<allSection[i].length;j++){
			if(i!=allSection.length-1 && j<7){
				if(page == allSection[i][j]){
					currSection = allSection[i];
					break;
				}
			}else{
				if(page == allSection[i][j]){
					currSection = allSection[i];
					break;
				}
			}
		}
	}
	// 遍历生成翻页的HTML元素
	$(pageTurnId).hide();
	$(pageTurnId).append('<a id="'+pageLeftId.replace('#','')+'" class="btn-fy suspendPointer"><i class="fa fa-chevron-left"></i></a>');
	var id,pageText;
	for(var i=0;i<currSection.length;++i){
		pageText = currSection[i];
		
		if(pageText=='...') id = pageNumberOfMoreId.replace('#','');
		
		else id = pageNumberOfId.replace('#','')+pageText;
		
		$(pageTurnId).append(
			'<a id='+id+' class="btn-fy suspendPointer">'+pageText+'</a>'
		);
	}
	$(pageTurnId).append('<a id="'+pageRightId.replace('#','')+'" class="btn-fy suspendPointer"><i class="fa fa-chevron-right"></i></a>');
	if(isShowJumpPage){
		$(pageTurnId).append(
			'<input type="number" id="indexPageText" min="1" max="'+maxPage+'" value="'+page+'" style="width:60px;font-size:14px;line-height:22px;border:1px solid #eee;margin-left:20px;text-align:center"/>'+
			'<span href="#" id="jumpPageBtn" style="font-size:12px;line-height:15px;margin-left:5px;cursor:pointer">GO</span>'
		);
	}
	$(pageNumberOfId+page).addClass('active');
	// 判断当前页是否为第一页或者最后最后一页,第一页则禁用"<"按钮,最后一页则禁用">"按钮
	if(page==1) $(pageLeftId).addClass('disabled');
	if(page==maxPage) $(pageRightId).addClass('disabled');
	$(pageTurnId).show();
	if(isShowJumpPage){
		//添加跳转事件
		$(pageTurnId).find('#jumpPageBtn').unbind('click').bind('click',function(){
			var jumpPageNo= $("#indexPageText").val();
			if(jumpPageNo==""||jumpPageNo<1||jumpPageNo>maxPage){
				tipInfo({
					status:'fail',
					content:'跳转页码不正确!'
				});
				return ;
			}
			// 修改页码
			obj.pageNo =jumpPageNo;
			// 加载数据
			loadFn(obj);
		});
	}
	// 添加单击事件
	$(pageTurnId).find('a').unbind('click').bind('click',function(){
		var $ths = $(this),
			index = $ths.index(),
			text = String($ths.html());
		switch(text){
		case '<i class="fa fa-chevron-left"></i>':
			// 获取当前选中元素
			var clickText = $ths.parent().find('a.active').text();
			text = Number(clickText)-1;
			break;
		case '...':
			// 获取左侧元素
			var leftText = $ths.parent().find('a').eq(index-1).text();
			text = Number(leftText)+1;
			break;
		case '<i class="fa fa-chevron-right"></i>':
			// 获取当前选中元素
			var clickText = $ths.parent().find('a.active').text();
			text = Number(clickText)+1;
			break;
		}
		// 修改页码
		obj.pageNo = text;
		// 加载数据
		loadFn(obj);
	});
};

//加载省市区街道
function initAddr(){
	 var $town = $('.advArea select[name="town"]');
	  /* var defaultcode='350203003';*/
	  var defaultname=''; 
	  var townFormat = function(info){
	  	$town.empty();
	  	$town.append('<option value=""> - 请选择 - </option>');
	  	if(info['code']%1e4&&info['code']<7e5){	//是否为“区”且不是港澳台地区
	  		$.ajax({
	  			url:'/chinese/town/'+info['code']+'.json',
	  			dataType:'json',
	  			async:false,
	  			success:function(town){
	  				$town.show();
	  				for(i in town){
	  					   if(defaultname==town[i]){
	  					      $town.append('<option value="'+i+'" selected="selected">'+town[i]+'</option>');
	  					   }else{
	  					     $town.append('<option value="'+i+'">'+town[i]+'</option>');
	  					   }
	  						
	  				}
	  			}
	  		});
	  	}
	  };
	  $('.advArea').citys({
	  	province:'',
	  	city:'',
	  	area:'',
	  	required: false,
	  	nodata: '',    
	  	onChange:function(info){
	  		 townFormat(info);
	  	}
	  },function(api){
	  	/*var info = api.getInfo();
	  	townFormat(info);*/
	  });
}

/**
 * 加载省市区,不包含街道
 * @returns
 */
function initAddrExclusiveStreet(){
	$('.advArea').citys({
	  	province:'',
	  	city:'',
	  	area:'',
	  	required: false,
	  	nodata: ''
	 });
}

/**
 * 获取屏幕滚动的距离
 * @returns [x,y]
 */
function getPageScroll() {
	  var xScroll, yScroll;
	  if (self.pageYOffset) {
	    yScroll = self.pageYOffset;
	    xScroll = self.pageXOffset;
	  } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
	    yScroll = document.documentElement.scrollTop;
	    xScroll = document.documentElement.scrollLeft;
	  } else if (document.body) {// all other Explorers
	    yScroll = document.body.scrollTop;
	    xScroll = document.body.scrollLeft;  
	  }
	  arrayPageScroll = new Array(xScroll,yScroll);
	  return arrayPageScroll;
};

//div的id      二维码宽度和高度     url
function createQrcode(id,url){
	$("#"+id).qrcode({width: 180,height: 180,text: ""+url+""});
}

//防止不能自动识别：
//从 canvas 提取图片 image 
function convertCanvasToImage(id) { 
	//新Image对象，可以理解为DOM 
	var image = new Image(); 
	// canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持 
	// 指定格式 PNG 
	var paycanvas=document.getElementsByTagName('canvas')[0]; 
	image.src = paycanvas.toDataURL("image/png"); 
	$("#"+id).html(image);
} 
//判断是否微信登陆
function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}

//查找字符中某个字符第n次出现的位置
function findCharIndex(str,cha,num){
    var x=str.indexOf(cha);
    for(var i=0;i<num-1;i++){
        x=str.indexOf(cha,x+1);
    }
    return x;
}

//点击店铺名店铺详情信息
function showShopDetail(shopName,addr,imgs){
	$(".shopName").text(shopName);
	if(addr!=null){
		var addrList=addr.split("*");
		if(addrList[0]==addrList[1]){
			addr=addr.replace(addrList[0],"");
		}
	}
	$(".addrDetail").text(addr.substring(0,findCharIndex(addr,"*",3)).replace(/\*/g,"").replace(/&/g,""));
	$(".imgs").html("");
	if(imgs!="null"){
		var imgList=imgs.split(","),str="";
		for (var i = 0; i < imgList.length; i++) {
			str+='<img src="'+imagePath+imgList[i]+'"/>';//onclick="showPicPopup(this.cloneNode(true),event)"
		}
		$(".imgs").html(str);
	}
	$("#diandiv").show();
}
//加入详情弹出框
function appendDetailDiv(){
	var html='<div class="shade" id="diandiv" style="display: ;">';
	html+='  <div class="dian-xq">';
	html+='		<p class="pos-a dian-close text-c" onclick="javascript:turnoff(\'diandiv\')"><i class="fa fa-close" aria-hidden="true"></i></p>';
	html+='		<div class="bor-b3 pad-b10">';
	html+=' 		 <p class="dis-in width48"><b>店铺名称：</b><span class="shopName"></span></p>';
	html+='  		<p class="dis-in width48"><b>详细地址：</b><span class="addrDetail"></span></p>';
	html+='		</div>';
	html+='		<p class="dian-xq-img imgs">';
	html+='		</p>';
	html+='	</div>';
	html+='</div>';
	$("body").append(html);
}

/**
 * 验证码倒计时
 * @param obj.btnEle    验证码按钮      
 * @param obj.time(sec) 倒计时的时间(秒)
 * @param obj.endFn	    倒计时结束后触发的方法(可以为空)
 * @returns
 */
function verificationCodeInterval(obj){
	var btnEle = obj.btnEle,
		time = obj.time,
		endFn = obj.endFn,
		$btn = $(btnEle);
	if(endFn === null || typeof endFn != 'function'){
		endFn = function(){};
	}
	$btn.addClass('disabled');
	textOrVal(time);
	var codeInterval = setInterval(function() {
		var time = Number(textOrVal());
		time--;
		if(time<0){
			clearInterval(codeInterval);
			$btn.removeClass('disabled');
			textOrVal('获取验证码');
			endFn();
		}else{
			textOrVal(time);
		}
	}, 1000);
	
	/**
	 * 获取或者修改按钮的值
	 */
	function textOrVal(val){
		var tagName = $btn[0].tagName;
		if(val||val===0){
			// 修改值
			if(tagName === 'INPUT'){
				$btn.val(val);
			}else{
				$btn.text(val);
			}
		}else{
			// 获取值
			if(tagName === 'INPUT'){
				return $btn.val();
			}else{
				return $btn.text();
			}
		}
	}
	
}