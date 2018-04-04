package com.cwa.client.dto;


import com.cwa.client.model.Tb_Bank_Card_Info;
import com.cwa.client.model.Tb_client_in_out_money;
import com.cwa.client.utils.DateUtils;

 
public class YsWithdrawDto {

	private String timestamp;// 必填 交易起始时间,yyyy-MM-dd HH:mm:ss
	private String subject;//订单说明，选填
	private String bank_name;//银行名称，必填
	private String bank_province;//开户行所在省，必填
	private String bank_city;//开户行所在市，必填
	private String bank_account_no;//银行帐号，必填
	private String bank_account_name;//银行帐号用户名，必填
	private String bank_account_type;//此处必填: corporate :对公账户; prsonal :对私账户，必填
	private String bank_card_type;//此处必填 :debit:借记卡;credit:信用卡 unit:单位结算卡，必填
	private String noticUrl;//异步通知url，必填
	private String cert_type;///收款方证件类型,可以为空，如果此字段不为空，cert_no也不能为空
	private String cert_no;//收款方证件号码,可以为空，

	public  YsWithdrawDto(Tb_client_in_out_money saveInOutMoney, Tb_Bank_Card_Info infoBank)throws Exception {

		this.timestamp=DateUtils.getNowDay(null);
		this.bank_province=infoBank.getBank_code().split(",")[0];
		this.bank_city=infoBank.getBank_code().split(",")[1];
		this.bank_account_no=infoBank.getBank_card_code();
		this.bank_account_name=infoBank.getBank_card_name();
		this.bank_account_type=infoBank.getBank_account_type().toString();
		this.bank_card_type=infoBank.getBank_card_type().toString();
		//this.noticUrl="暂定";
		this.bank_name=infoBank.getOpen_account_bank_name()+this.bank_city+infoBank.getBranch_name();
		this.cert_type=infoBank.getPapers_type()==1?"00":"";
		this.cert_no=infoBank.getPapers_code();
		
	
	 }
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getBank_name() {
		return bank_name;
	}
	public void setBank_name(String bank_name) {
		this.bank_name = bank_name;
	}
	public String getBank_province() {
		return bank_province;
	}
	public void setBank_province(String bank_province) {
		this.bank_province = bank_province;
	}
	public String getBank_city() {
		return bank_city;
	}
	public void setBank_city(String bank_city) {
		this.bank_city = bank_city;
	}
	public String getBank_account_no() {
		return bank_account_no;
	}
	public void setBank_account_no(String bank_account_no) {
		this.bank_account_no = bank_account_no;
	}
	public String getBank_account_name() {
		return bank_account_name;
	}
	public void setBank_account_name(String bank_account_name) {
		this.bank_account_name = bank_account_name;
	}
	
	
	public String getBank_account_type() {
		return bank_account_type;
	}
	public void setBank_account_type(String bank_account_type) {
		this.bank_account_type = bank_account_type;
	}
	public String getBank_card_type() {
		return bank_card_type;
	}
	public void setBank_card_type(String bank_card_type) {
		this.bank_card_type = bank_card_type;
	}
	public String getNoticUrl() {
		return noticUrl;
	}
	public void setNoticUrl(String noticUrl) {
		this.noticUrl = noticUrl;
	}
	public String getCert_type() {
		return cert_type;
	}
	public void setCert_type(String cert_type) {
		this.cert_type = cert_type;
	}
	public String getCert_no() {
		return cert_no;
	}
	public void setCert_no(String cert_no) {
		this.cert_no = cert_no;
	}




}
