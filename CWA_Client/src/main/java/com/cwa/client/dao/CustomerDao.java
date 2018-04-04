package com.cwa.client.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import com.cwa.client.dto.CustomerCommissionDto;
import com.cwa.client.dto.CustomerDto;
import com.cwa.client.dto.NoticeDto;
import com.cwa.client.model.Tb_Customer;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 普通用户数据层
 */
public class CustomerDao extends BaseDao<Tb_Customer,CustomerDto> implements Constant{

	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	/**
	 * 查询普通用户
	 * @param customerDto 查询条件
	 * @return
	 */
		
	public List<CustomerDto> queryCustomer(CustomerDto customerDto){
		// 返回结果
		List<CustomerDto> customerList = null;
		StringBuffer sql = new StringBuffer(
				"SELECT A.ID,A.USER_NAME,A.MOBILE,A.USER_STATUS,if(A.w_pwd='',false,true) havaWPWD, "+
				"A.OPEN_DATE,A.OPENID,A.EMAIL,A.REFERRALS_ID,A.COMPANY_ID,"+
				"A.ACCOUNT_ID,A.CERTIFICATE_TYPE,A.ID_NUMBER,"+
				"A.AGENT_ID,A.PASSWORD,A.superior,A.REFERRALS_TYPE,A.t_type,A.partner_id,A.salesman_id,A.salesperson_id,A.notice_id noticeId FROM Tb_Customer A ");
		// 拼接where查询条件
		Map<String,Object> map = packageWhereSQL(customerDto, "A");
		String joinWhereSQL = map.get("sql").toString();
		@SuppressWarnings("unchecked")
		List<Object> params = (List<Object>) map.get("params");
		sql.append(joinWhereSQL);
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"queryCustomer sql:"+sql+";params:"+JSONArray.fromObject(params),LOGLEVEL_INFO,CustomerDao.class);
		try {
			if(params.size()!=0){
				customerList = this.jdbcTemplate.query(sql.toString(), BeanPropertyRowMapper.newInstance(CustomerDto.class),params.toArray());
			}else{
				customerList = this.jdbcTemplate.query(sql.toString(), BeanPropertyRowMapper.newInstance(CustomerDto.class));
			}
		} catch (Exception e) {
			e.printStackTrace();
			logWriteUtil.writeLog(LOGTYPE_DBQUERY,"queryCustomer exception '"+e.getMessage()+"'",LOGLEVEL_ERROR, CustomerDao.class);
			customerList = new ArrayList<CustomerDto>();
			throw e;
		}
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"queryCustomer query size "+customerList.size()+", result " + JSONArray.fromObject(customerList),LOGLEVEL_INFO,CustomerDao.class);
		return customerList;
	}
	
	/**
	 * 查询登录人编号Id
	 * @param accountId 登录账号 tType 登录类型
	 * @return
	 */
	public String queryLoginIdByAccountId(String accountId,String tType){
		String sql = "SELECT A.ID FROM tableName A WHERE A.mobile=? ";
		if(TWO==Integer.parseInt(tType)){
			sql=sql.replace("tableName", "tb_advertiser").replace("ID", "id");
		}else if(THREE==Integer.parseInt(tType)){
			sql=sql.replace("tableName", "tb_partner").replace("ID", "PARTNER_ID");
		}else if(FOUR==Integer.parseInt(tType)){
			sql=sql.replace("tableName", "tb_agent").replace("ID", "AGENT_ID").replace("mobile", "telephone");
		}else if(FIVE==Integer.parseInt(tType)){
			sql=sql.replace("tableName", "tb_salesman").replace("ID", "SALESMAN_ID");
		}else if(SIX==Integer.parseInt(tType)){
			sql=sql.replace("tableName", "tb_salesperson").replace("ID", "SALESPERSON_ID");
		}else{
			sql=sql.replace("tableName", "tb_customer").replace("ID", "account_id");
		}
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sql+";"+"param accountId:"+accountId+"==userType:"+tType, LOGLEVEL_INFO, CustomerCommissionDao.class);
		try {
			SqlRowSet srs = jdbcTemplate.queryForRowSet(sql,accountId);
			srs.next();
			return srs.getString(1);
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}
	
	/**
	 * 查询普通用户
	 * @param customerDto 查询条件
	 * @return
	 */
	public List<CustomerDto> queryCustomer(String accountId){
		// 返回结果
		List<CustomerDto> customerList = null;
		StringBuffer sql = new StringBuffer(
				"SELECT A.ID,A.USER_NAME,A.MOBILE,A.USER_STATUS,"+
				"A.OPEN_DATE,A.OPENID,A.EMAIL,A.REFERRALS_ID,A.COMPANY_ID,"+
				"A.ACCOUNT_ID,A.CERTIFICATE_TYPE,A.ID_NUMBER,"+
				"A.AGENT_ID,A.PASSWORD,A.REFERRALS_TYPE FROM Tb_Customer A where A.account_id=? or A.mobile=? ");
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"queryCustomer sql:"+sql+";params:"+accountId,LOGLEVEL_INFO,CustomerDao.class);
		try {
			customerList = this.jdbcTemplate.query(sql.toString(), BeanPropertyRowMapper.newInstance(CustomerDto.class),accountId,accountId);
		} catch (Exception e) {
			e.printStackTrace();
			logWriteUtil.writeLog(LOGTYPE_DBQUERY,"queryCustomer exception '"+e.getMessage()+"'",LOGLEVEL_ERROR, CustomerDao.class);
			customerList = new ArrayList<CustomerDto>();
			throw e;
		}
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"queryCustomer query size "+customerList.size()+", result " + JSONArray.fromObject(customerList),LOGLEVEL_INFO,CustomerDao.class);
		return customerList;
	}
	
	/**
	 * 根据登录号修改密码
	 * @param tbCustomer
	 * @return
	 */
	public boolean updateCustomerPwdByAccountId(Tb_Customer tbCustomer){
		boolean updateState = false;
		String accountId = tbCustomer.getAccount_id();
		// 创建update语句
		tbCustomer.setAccount_id(null);
		Map<String,Object> mapForUpdate  = packageUpateSQL(tbCustomer,"A");
		@SuppressWarnings("unchecked")
		List<Object> paramsForUpdate = (List<Object>) mapForUpdate.get("params");
		if(paramsForUpdate.size()==0){
			logWriteUtil.writeLog(LOGTYPE_PACKAGESQL,"updateCustomerPwdByMobile package sql fail." ,LOGLEVEL_INFO,CustomerDao.class);
			return updateState;
		}
		// 创建where语句
		CustomerDto customerDto = new CustomerDto();
		customerDto.setAccount_id(accountId);
		customerDto.setOrderWay(null);
		Map<String,Object> mapForWhere  = packageWhereSQL(customerDto,"A");
		@SuppressWarnings("unchecked")
		List<Object> paramsForWhere = (List<Object>) mapForWhere.get("params");
		if(paramsForWhere.size()==0){
			logWriteUtil.writeLog(LOGTYPE_PACKAGESQL,"updateCustomerPwdByMobile package sql fail." ,LOGLEVEL_INFO,CustomerDao.class);
			return updateState;
		}
		StringBuffer packageUpdateSQL = new StringBuffer(mapForUpdate.get("sql").toString());
		StringBuffer packageWhereSQL = new StringBuffer(mapForWhere.get("sql").toString());
		String sql = packageUpdateSQL.append(packageWhereSQL.toString()).toString();
		logWriteUtil.writeLog(LOGTYPE_PACKAGESQL,"updateCustomerPwdByMobile sql is '"+sql+"'." ,LOGLEVEL_INFO,CustomerDao.class);
		List<Object> params = new ArrayList<Object>();
		params.addAll(paramsForUpdate);
		params.addAll(paramsForWhere);
		try {
			int i = this.jdbcTemplate.update(sql, params.toArray());
			if(i==1){
				logWriteUtil.writeLog(LOGTYPE_DBQUERY,"updateCustomerPwdByMobile update password success." ,LOGLEVEL_INFO,CustomerDao.class);
				updateState = true;
			}else{
				logWriteUtil.writeLog(LOGTYPE_DBQUERY,"updateCustomerPwdByMobile update password fail." ,LOGLEVEL_INFO,CustomerDao.class);
				updateState = false;
			}
		} catch (Exception e) {
			logWriteUtil.writeLog(LOGTYPE_DBQUERY,"updateCustomerPwdByMobile update password error,Exception:"+e.getMessage()+"." ,LOGLEVEL_ERROR,CustomerDao.class);
			e.printStackTrace();
			updateState = false;
			throw e;
		}
		return updateState;
	}

	public CustomerDto findCustomerByMobile(String mobileNum) {
		String sql="select ID,USER_NAME,MOBILE,USER_STATUS,OPEN_DATE,OPENID,EMAIL,REFERRALS_ID,PASSWORD,ACCOUNT_ID,CERTIFICATE_TYPE,ID_NUMBER,AGENT_ID,COMPANY_ID from Tb_Customer where MOBILE=?";
		RowMapper<CustomerDto> rowmapper=BeanPropertyRowMapper.newInstance(CustomerDto.class);
		List<CustomerDto> list = getJdbcTemplate().query(sql, rowmapper,mobileNum);
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"findCustomerByMobile success,listSize:"+list.size() ,LOGLEVEL_ERROR,CustomerDao.class);
		return list.size()>0?list.get(0):null;
	}
	
	public Integer insertBackId(final Tb_Customer entity){
		final String sql="INSERT INTO tb_customer"+
										"(USER_NAME,"+
										"MOBILE,"+
										"USER_STATUS,"+
										"OPEN_DATE,"+
										"OPENID,"+
										"EMAIL,"+
										"REFERRALS_ID,"+
										"PASSWORD,"+
										"ACCOUNT_ID,"+
										"CERTIFICATE_TYPE,"+
										"ID_NUMBER,"+
										"partner_id,"+
										"salesman_id,"+
										"AGENT_ID,"+
										"COMPANY_ID,"+
										"salesperson_id,"+
										"superior,"+
										"t_type,"+
										"REFERRALS_TYPE)"+
										"VALUES"+
							"(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		KeyHolder keyHolder = new GeneratedKeyHolder();  
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"insertCustomerBackId entity:"+JSONObject.fromObject(entity) ,LOGLEVEL_ERROR,CustomerDao.class);
		int autoIncId = 0;  
		jdbcTemplate.update(new PreparedStatementCreator() {
			public PreparedStatement createPreparedStatement(Connection con)  
					throws SQLException {  
				PreparedStatement ps = con.prepareStatement(sql,PreparedStatement.RETURN_GENERATED_KEYS);
				ps.setString(1,entity.getUser_name());
				ps.setString(2,entity.getMobile());
				ps.setInt(3,entity.getUser_status());
				ps.setTimestamp(4,entity.getOpen_date());
				ps.setString(5,entity.getOpenid());
				ps.setString(6,entity.getEmail());
				ps.setString(7,entity.getReferrals_id());
				ps.setString(8,entity.getPassword());
				ps.setString(9,entity.getAccount_id());
				ps.setInt(10,entity.getCertificate_type());
				ps.setString(11,entity.getId_number());
				ps.setString(12,entity.getPartner_id());
				ps.setString(13,entity.getSalesman_id());
				ps.setString(14,entity.getAgent_id());
				ps.setString(15,entity.getCompany_id());
				ps.setString(16,entity.getSalesperson_id());
				ps.setInt(17,entity.getSuperior());
				ps.setInt(18,entity.getT_type());
				ps.setInt(19,entity.getReferrals_type());
				
				return ps;  
			}   
	    }, keyHolder);  
	  
	      autoIncId = keyHolder.getKey().intValue();  
	      
	      return autoIncId;  
	}
	
	/**
	 * 更新用户信息
	 * @param whereParam where条件
	 * @param updateAdvertiser update数据
	 */
	@SuppressWarnings("unchecked")
	public void updateUserInfo(CustomerDto whereParam,Tb_Customer updateParam){
		whereParam.setOrderWay(null);
		Map<String,Object> whereMap = packageWhereSQL(whereParam,"A");
		Map<String,Object> updateMap = packageUpateSQL(updateParam,"A");
		String sql = updateMap.get("sql")+whereMap.get("sql").toString();
		List<Object> params = new ArrayList<Object>();
		params.addAll((List<Object>)updateMap.get("params"));
		params.addAll((List<Object>)whereMap.get("params"));
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"updateUserInfo sql is "+sql+",params is "+params+"." ,LOGLEVEL_INFO,AdvertiserDao.class);
		this.jdbcTemplate.update(sql,params.toArray());
	}

	public void updateOpenId(String accountId, String openId) throws Exception{
		String sql="update Tb_Customer set openid=? where account_id=?";
		this.jdbcTemplate.update(sql,openId,accountId);
		logWriteUtil.writeLog("", "update order tb_customer success!sql："+sql+"===accountId:"+accountId+"===openId:"+openId, LOGLEVEL_INFO, AdvertiserDao.class);
	}

	public CustomerDto queryCustomerByOpenid(String openId) {
		String sql="select * from Tb_Customer where openid=?";
		RowMapper<CustomerDto> rowmapper=BeanPropertyRowMapper.newInstance(CustomerDto.class);
		List<CustomerDto> list = getJdbcTemplate().query(sql, rowmapper,openId);
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"findCustomerByOpenId success,listSize:"+list.size() ,LOGLEVEL_ERROR,CustomerDao.class);
		return list.size()>0?list.get(0):null;
	}
	
	public CustomerDto queryCustomerByAccountId(String accountId) {
		String sql="select * from Tb_Customer where account_id=?";
		RowMapper<CustomerDto> rowmapper=BeanPropertyRowMapper.newInstance(CustomerDto.class);
		List<CustomerDto> list = getJdbcTemplate().query(sql, rowmapper,accountId);
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"findCustomerByAccountId success,listSize:"+list.size() ,LOGLEVEL_ERROR,CustomerDao.class);
		return list.size()>0?list.get(0):null;
	}

	public void updateWPWD(String accountId, String pwd) {
		String sql="update Tb_Customer set w_pwd=? where account_id=?";
		this.jdbcTemplate.update(sql,pwd,accountId);
		logWriteUtil.writeLog("", "update order tb_customer success!sql："+sql+"===accountId:"+accountId+"===pwd:"+pwd, LOGLEVEL_INFO, AdvertiserDao.class);
	}

	public List<NoticeDto> findLookNotice(Integer noticeId,String userType) {
		if("1".equals(userType)){//转换用户类型与公告表中相匹配
			userType="6";
		}else if("2".equals(userType)){
			userType="5";
		}
		String sql="select n.*,n.send_date send_date_start from tb_notice n where n.STATE=2 and n.id>? and n.USER_TYPE in(1,?) and now() between n.SEND_DATE and n.FAILURE_DATE order by n.ID asc";
		RowMapper<NoticeDto> rowmapper=BeanPropertyRowMapper.newInstance(NoticeDto.class);
		List<NoticeDto> list = getJdbcTemplate().query(sql, rowmapper,noticeId,userType);
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"findLookNotice success,listSize:"+list.size() ,LOGLEVEL_ERROR,CustomerDao.class);
		return list;
	}

	public void uploadMaxNoticeId(Integer noticeId,String accountId) {
		String sql="update Tb_Customer set notice_id=? where account_id=?";
		this.jdbcTemplate.update(sql,noticeId,accountId);
		logWriteUtil.writeLog("", "update tb_customer success!sql："+sql+"===noticeId:"+noticeId+"===accountId:"+accountId, LOGLEVEL_INFO, AdvertiserDao.class);
	}

	public CustomerDto queryCustomerByUnionId(String unionId) {
		String sql="select * from Tb_Customer where UNION_ID=?";
		RowMapper<CustomerDto> rowmapper=BeanPropertyRowMapper.newInstance(CustomerDto.class);
		List<CustomerDto> list = getJdbcTemplate().query(sql, rowmapper,unionId);
		logWriteUtil.writeLog(LOGTYPE_DBQUERY,"findCustomerByAccountId success,listSize:"+list.size() ,LOGLEVEL_ERROR,CustomerDao.class);
		return list.size()>0?list.get(0):null;
	}
}