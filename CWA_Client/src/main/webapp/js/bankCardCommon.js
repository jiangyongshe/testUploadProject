// 银行卡信息
var cardData = [];

/**
 * 验证卡号是否是缓存数据
 */
function judgeCardNo(){
	for(var i=0;i<cardData.length;++i){
		if(cardData[i]['bank_card_code'] === $('#cardNo').val().trim()){
			$('#cardInfoId'+cardData[i]['id']).click();
			break;
		}
	}
}

/**
 * 查询是否存在卡号
 */
function cardInfo(){
	$.ajaxEp({
		url:'/'+language+'/customer/queryUserCardInfo.do',
		param:{},
		openWaitingAnimation:false,
		success:function(res){
			var success = res.success,
				list = res.data,
				length = list.length;
			if(success&&list!=null&&length>0){
				cardData = list;
				var $cardInfo = $('#cardInfo');
				for(var i=0;i<cardData.length;++i){
					var data = cardData[i];
					$cardInfo.find('ul').append(
						'<li style="cursor:pointer;" id="cardInfoId'+data['id']+'">'
	              	   +'	<i class="fa fa-caret-right pad-r5" aria-hidden="true"></i>'
	              	   +'	<span>'+data['bank_card_code']+'</span>'
	              	   +'</li>'		
					);
				}
				var $cardNo = $('#cardNo');
				$cardNo.on('mousedown',function(){
					$cardInfo.show();
				});
				// 焦点聚在手机号输入框或者金额输入框时隐藏银行卡提示信息
				$('#mobile,#money').on('focus',function(){
					$cardInfo.hide();
				});
				// 除了点击银行卡输入文本，点击其它其它地方都隐藏提示框
				$(document).on('click',function(e){
					if(e.target !=  $('#cardNo')[0]){
						$cardInfo.hide();
					}
				});
				$cardNo.on('input',function(){
					// 隐藏手机号验证码
					$('#verificationCode').parent().hide();
					// 判断输入的卡号是否是缓存数据
					judgeCardNo();
				});
				$('[id^="cardInfoId"]').on('click',function(){
					for(var i=0;i<cardData.length;++i){
						if(String(cardData[i]['id']) === this.id.replace('cardInfoId','')){
							$('#cardNo').val(cardData[i]['bank_card_code']);
							$('#mobile').val(cardData[i]['mobile']);
							// 显示手机号验证码
							$('#verificationCode').parent().show();
							break;
						}
					}
				});
			}
		}
	});
}

/**
 * 银行卡号验证
 * @param bankno
 */
function checkCard(bankno){
	 if (bankno.length < 16 || bankno.length > 19) {
         return false;
     }
     var num = /^\d*$/;  //全数字
     if (!num.exec(bankno)) {
         return false;
     }
     //开头6位
     var strBin="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
     if (strBin.indexOf(bankno.substring(0, 2))== -1) {
         //$("#banknoInfo").html("银行卡号开头6位不符合规范");
         return false;
     }
     var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）

     var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
     var newArr=new Array();
     for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
         newArr.push(first15Num.substr(i,1));
     }
     var arrJiShu=new Array();  //奇数位*2的积 <9
     var arrJiShu2=new Array(); //奇数位*2的积 >9

     var arrOuShu=new Array();  //偶数位数组
     for(var j=0;j<newArr.length;j++){
         if((j+1)%2==1){//奇数位
             if(parseInt(newArr[j])*2<9)
                 arrJiShu.push(parseInt(newArr[j])*2);
             else
                 arrJiShu2.push(parseInt(newArr[j])*2);
         }
         else //偶数位
             arrOuShu.push(newArr[j]);
     }

     var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
     var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
     for(var h=0;h<arrJiShu2.length;h++){
         jishu_child1.push(parseInt(arrJiShu2[h])%10);
         jishu_child2.push(parseInt(arrJiShu2[h])/10);
     }

     var sumJiShu=0; //奇数位*2 < 9 的数组之和
     var sumOuShu=0; //偶数位数组之和
     var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
     var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
     var sumTotal=0;
     for(var m=0;m<arrJiShu.length;m++){
         sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
     }

     for(var n=0;n<arrOuShu.length;n++){
         sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
     }

     for(var p=0;p<jishu_child1.length;p++){
         sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
         sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
     }
     //计算总和
     sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);

     //计算Luhm值
     var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
     var luhm= 10-k;

     if(lastNum==luhm){
         return true;
     }
     else{
         return false;
     }
}