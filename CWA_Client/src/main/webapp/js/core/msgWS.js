// 消息webSocket
var msgWS;
//连接webSocket的url
var msgWSUrl = 'ws://localhost:8080/MsgWebSocket';
if(window.location.href.indexOf('https')>-1){
	msgWSUrl = 'wss://localhost:8080/MsgWebSocket';
}
// 连接失败次数
var msgWSOffNum = 0;
// 重新连接的次数
var wsMaxReconn = 3;
// 连接间隔
var wsInterval = [60,120,180];
// 连接消息WebSocket
function connectMsgWS(){
	//判断当前浏览器是否支持WebSocket
	if ('WebSocket' in window) {  
		msgWS = new WebSocket(msgWSUrl);  
	} else if ('MozWebSocket' in window) {
		msgWS = new MozWebSocket(msgWSUrl);
	} else {
		// 弹出提示
		tipInfo({
			status:'fail',
			title:'Tip',
			content:'Your browser does not support WebSocket!'
		});
		return;
	}
	
	//连接成功建立的回调方法
	msgWS.onopen = function(){
		// 失败次数归零
		msgWSOffNum = 0;
		// 心跳
//		msgWSHeartBeat();
	};
	
	//接收到消息的回调方法
	msgWS.onmessage = function(event){
		console.log(event);
	};
	
	// 断开连接的回调方法
	msgWS.onclose = function(e) {  
		msgWSOffNum++;
		if(msgWSOffNum<=wsMaxReconn){
			setInterval(function() {
				connectMsgWS();//重新连接
			}, wsInterval[msgWSOffNum-1]*1000);
    	}else{
    		tipInfo({
    			status:'fail',
    			title:'Tip',
    			content:'WebSocket disconnect!'
    		});
    	}
    };  
	
	// 出错的回调方法
    msgWS.onerror = function(e) {
        if(msgWS!=null) msgWS.close();
    };
}

/**
 * msgWS 心跳监听
 * @returns
 */
function msgWSHeartBeat(){
	// TODO
	var heartbeatJson = getHeartBeatJson();
	
    if(msgWS!=null&&msgWS) msgWS.send(heartbeatJson);
    
    setTimeout(msgWSHeartBeat,5000);
}

/**
 * 心跳参数
 * @returns
 */
function getHeartBeatJson(){
	
}

// 启动webSocket
connectMsgWS();