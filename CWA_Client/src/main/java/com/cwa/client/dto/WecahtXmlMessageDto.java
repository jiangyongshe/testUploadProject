package com.cwa.client.dto;

/** 
* @author 黄英伟: 
* @version 创建时间：2017年8月21日 下午3:45:30 
* 类说明  用来发送微信 信息给用户  发送的格式 xml
* 数据： 
		 <xml>
		 <ToUserName><![CDATA[toUser]]></ToUserName>
		 <FromUserName><![CDATA[fromUser]]></FromUserName>
		 <CreateTime>1348831860</CreateTime>
		 <MsgType><![CDATA[image]]></MsgType>
		 <PicUrl><![CDATA[this is a url]]></PicUrl>
		 <MediaId><![CDATA[media_id]]></MediaId>
		 <MsgId>1234567890123456</MsgId>
		 </xml>
*/


public class WecahtXmlMessageDto {
  
	private String ToUserName;
	private String FromUserName;
	private long CreateTime;
	private String MsgType;
	private String Content;
	private String MsgId;
	public String getToUserName() {
		return ToUserName;
	}
	public void setToUserName(String toUserName) {
		ToUserName = toUserName;
	}
	public String getFromUserName() {
		return FromUserName;
	}
	public void setFromUserName(String fromUserName) {
		FromUserName = fromUserName;
	}
	public long getCreateTime() {
		return CreateTime;
	}
	public void setCreateTime(long createTime) {
		CreateTime = createTime;
	}
	public String getMsgType() {
		return MsgType;
	}
	public void setMsgType(String msgType) {
		MsgType = msgType;
	}
	public String getContent() {
		return Content;
	}
	public void setContent(String content) {
		Content = content;
	}
	public String getMsgId() {
		return MsgId;
	}
	public void setMsgId(String msgId) {
		MsgId = msgId;
	}
	@Override
	public String toString() {
		return "WecahtXmlMessageDto [ToUserName=" + ToUserName + ", FromUserName=" + FromUserName + ", CreateTime="
				+ CreateTime + ", MsgType=" + MsgType + ", Content=" + Content + ", MsgId=" + MsgId + "]";
	}
	
	
	
}
 