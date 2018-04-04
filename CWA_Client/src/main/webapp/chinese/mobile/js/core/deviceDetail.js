var chineseError=["修改成功","信息填写不完整","电子邮箱格式错误","手机号格式错误","两次输入密码不一致"];
var englishError=["register success"];
var twError=[];
var currError=[];
var page=1,pageSize=15;
$(function(){
	$("#headerTitle").text("设备详情");
	currError=currErrorArray(chineseError,englishError,twError);
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
			var listDom=document.getElementById("dataList");
			for(var i=0;i<data.length;++i){
				
				var str='<p class="">设备编号：'+data[i].device_id+'</p>';
				str+='<p class="">设备描述：'+data[i].device_detail+'</p>';

				var liDom=document.createElement("li");
				liDom.innerHTML=str;

				listDom.appendChild(liDom);//加在列表的后面,上拉加载
			}
		}
	},
	function(){});
}
