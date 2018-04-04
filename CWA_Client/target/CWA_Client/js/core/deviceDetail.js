$(function(){
	// 查询设备详情
	queryDeviceDetail();
})

/**
 * 查询设备详情
 * @returns
 */
function queryDeviceDetail(){
	jsonAjax('/'+language+'/AD/query/deviceDetail.do',{},
	function(res){
		var data = res.data;
		if(data&&data.length>0){
			$('#deviceInfo').empty();
			var dataHTML = '';
			for(var i=0;i<data.length;++i){
				dataHTML += ''
					     +  '<tr>'
					     +  '<td>'+data[i].device_id+'</td>'
					     +  '<td>'+data[i].device_detail+'</td>'
						 +  '</tr>';
			}
			$('#deviceInfo').html(dataHTML);
		}
	},
	function(){});
}