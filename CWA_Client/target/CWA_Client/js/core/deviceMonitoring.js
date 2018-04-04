$(function(){
	// 查询设备监控
	queryDeviceMonitor();
})

/**
 * 查询设备监控
 * @returns
 */
function queryDeviceMonitor(){
	jsonAjax('/'+language+'/AD/query/deviceMonitor.do',{},
			function(res){
				var data = res.data;
				if(data&&data.length>0){
					$('#deviceMonitoringData').empty();
					var dataHTML = '';
					for(var i=0;i<data.length;++i){
						dataHTML += ''
							     +  '<tr>'
							     +  '<td>'+(i+1)+'</td>'
							     +  '<td>'+data[i].device_id+'</td>'
							     +  '<td>'+data[i].begin_time+'-'+data[i].end_time+'</td>'
							     +  '<td>'+data[i].selled_number+'</td>'
							     +  '<td>'+data[i].play_number+'</td>'
							     +  '<td>'+deviceStatusDescribe(data[i].status)+'</td>'
							     +  '<td>'+deviceStatusPic(data[i].status)+'</td>'
								 +  '</tr>';
					}
					$('#deviceMonitoringData').html(dataHTML);
				}
			},
			function(){});
}

/**
 * 设备状态图标
 * @returns
 */
function deviceStatusPic(status){
	switch(status){
	case 0:return '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>';
	case 1:
	case 10:return '<span class="green"><i class="fa fa-2x fa-smile-o" aria-hidden="true"></i></span>';
	case 2:return '<i class="fa fa-hourglass-half" aria-hidden="true"></i>';
	case 3:return '<span class="red"><i class="fa fa-2x fa-frown-o" aria-hidden="true"></i></span>';
	case 4:
	case 12:return '<i class="fa fa-eye-slash" aria-hidden="true"></i>';
	case 5:return '<span class="red"><i class="fa fa-2x fa-frown-o" aria-hidden="true"></i></span>';
	case 6:return '<span class="yellow"><i class="fa fa-2x fa-wrench" aria-hidden="true"></i></span>';
	case 11:return '<i class="fa fa-clock-o" aria-hidden="true"></i>';
	}
}

/**
 * 设备状态描述
 * @returns
 */
function deviceStatusDescribe(status){
	switch(status){
	case 0:return '未知';
	case 1:
	case 10:return '正常';
	case 2:return '安装中';
	case 3:return '异常';
	case 4:
	case 12:return '休眠';
	case 5:return '关闭';
	case 6:return '维修中';
	case 11:return '离线';
	}
}