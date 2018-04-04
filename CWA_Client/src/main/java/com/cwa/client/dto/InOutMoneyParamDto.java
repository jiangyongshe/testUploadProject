package com.cwa.client.dto;

public class InOutMoneyParamDto extends BaseDto{

	private Integer id;
	private String account_id;// 登录账户
	private Integer in_out_type;// 出入金类型(1=出金、2=入金、3=赠金)
	private Integer account_type;// 账户类型（1：总公司，2：分公司，3：业务员，4：代理，5：广告商，6：客户）
	private String startTime;// 开始时间
	private String endTime;// 结束时间
	public String getAccount_id() {
		return account_id;
	}
	public void setAccount_id(String account_id) {
		this.account_id = account_id;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getIn_out_type() {
		return in_out_type;
	}
	public void setIn_out_type(Integer in_out_type) {
		this.in_out_type = in_out_type;
	}
	public Integer getAccount_type() {
		return account_type;
	}
	public void setAccount_type(Integer account_type) {
		this.account_type = account_type;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
}
