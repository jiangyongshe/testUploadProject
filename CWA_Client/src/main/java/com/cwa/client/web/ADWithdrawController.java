package com.cwa.client.web;

import java.sql.Timestamp;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.support.RequestContext;

import com.cwa.client.dao.ADCommissionDao;
import com.cwa.client.dto.BankCardInfoDto;
import com.cwa.client.dto.CustomerDto;
import com.cwa.client.dto.RuturnMessageDto;
import com.cwa.client.model.Tb_Bank_Card_Info;
import com.cwa.client.service.WithdrawService;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.DateUtils;
import com.cwa.client.utils.RegUtil;
import com.cwa.client.utils.RespCodeEnum;
import com.cwa.client.utils.ipUtil;

import net.sf.json.JSONObject;

/**
 * 广告出金
 * @author HZK
 */
@Controller
@RequestMapping("/*/AD/")
public class ADWithdrawController extends BaseController<GobalRespParameter> implements Constant{
	
	@Resource
	private WithdrawService withdrawService;
	
	@Resource
	private ADCommissionDao adCommissionDao;
	
	/**
	 * 出金
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("/withdraw.do")
	public void withdraw(HttpServletRequest req, HttpServletResponse res) throws Exception{
		withdrawService.withdraw(req, res,USERTYPE_CUSTOMER_ADVERTISER);
	}
	

	/**
	 * 绑卡
	 * @param req
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping(value="/bankCard.do",method=RequestMethod.POST)
	public void bankCard(HttpServletRequest req, HttpServletResponse res,BankCardInfoDto dto) throws Exception{
		RuturnMessageDto parameter=new RuturnMessageDto();
		parameter.setSuccess(false);
		RequestContext reqCt= new RequestContext(req);// 语言包
		//获取请求参数并判断是否为空getPageModel
		try {
			writeLog("", "bankCard.do  data:"+JSONObject.fromObject(dto), LOGLEVEL_INFO, AdVideoController.class);
			CustomerDto sessionUser = (CustomerDto)req.getSession().getAttribute(SESSION_USER);
			String userType = req.getSession().getAttribute(SESSION_USER_TYPE).toString();
			String cardCode="";
			if(!RegUtil.getUtil().isNull(dto.getBank_card_code())&&RegUtil.getUtil().isBankCard(dto.getBank_card_code())){
				cardCode=dto.getBank_card_code();
			}else{
				parameter.setMsg(RespCodeEnum.wallet_withOut_error4.getCode());
				parameter.setData(reqCt.getMessage("withdraw.banka.cardError"));
				writeJSON(res, parameter);
				parameter=null;
				return;
			}
			List<Tb_Bank_Card_Info> list1 = adCommissionDao.queryBankCardInfo(null,cardCode,THREE,ZERO);
			if(list1.size()>0){
				for (Tb_Bank_Card_Info cardInfo : list1) {
					if(cardInfo.getStatus()==ONE){
						parameter.setMsg(RespCodeEnum.wallet_withOut_error6.getCode());
						parameter.setData(reqCt.getMessage("withdraw.banka.cardBanded"));
						writeJSON(res, parameter);
						parameter=null;
						return;
					}
				}
			}
			List<Tb_Bank_Card_Info> list = adCommissionDao.queryBankCardInfo(sessionUser.getAccount_id(),null,THREE,changeUserType(userType));
			Tb_Bank_Card_Info cardDto = list.size()>0?list.get(0):null;
			if(cardDto==null){
				Tb_Bank_Card_Info entity = new Tb_Bank_Card_Info();
				entity.setAccount_id(Integer.parseInt(userType)==TWO?sessionUser.getAccount_id():sessionUser.getLogin_id());
				entity.setAccount_type(changeUserType(userType));//用户类型
				entity.setAudit_datetime(new Timestamp(DateUtils.string2UtilTime("2001-01-01 00:00:00.0", DateUtils.DATE_FORMAT_DEFAULT).getTime()));
				entity.setAudit_id("");
				entity.setBank_card_code(cardCode);
				entity.setBank_card_name(dto.getBank_card_name());
				entity.setBank_code(dto.getBank_code());
				entity.setBranch_name(dto.getBranch_name());
				//entity.setCard_type(dto.getCard_type());
				entity.setCard_type(THREE);
				entity.setCommit_account_id(sessionUser.getAccount_id());
				entity.setCommit_datetime(new Timestamp(System.currentTimeMillis()));
				entity.setIp(ipUtil.getIpAddress(req));
				entity.setMobile(dto.getMobile());
				entity.setOpen_account_bank_name(dto.getOpen_account_bank_name());
				entity.setPapers_code(dto.getPapers_code());
				entity.setPapers_type(dto.getPapers_type());
				entity.setStatus(ONE);
				entity.setBank_account_type(ONE);
				entity.setBank_card_type(ONE);
				withdrawService.commissionBankCardInfo(entity);
			}else{
				/*cardDto.setAccount_id(sessionUser.getAccount_id());
				cardDto.setAccount_type(FIVE);
				cardDto.setBank_card_code(cardCode);
				cardDto.setBank_card_name(dto.getBank_card_name());
				cardDto.setBank_code(dto.getBank_code());
				cardDto.setBranch_name(dto.getBranch_name());
				cardDto.setCard_type(dto.getCard_type());
				cardDto.setCommit_account_id(sessionUser.getAccount_id());
				cardDto.setCommit_datetime(new Timestamp(System.currentTimeMillis()));
				cardDto.setIp(ipUtil.getIpAddress(req));
				cardDto.setMobile(dto.getMobile());
				cardDto.setOpen_account_bank_name(dto.getOpen_account_bank_name());
				cardDto.setPapers_code(dto.getPapers_code());
				cardDto.setPapers_type(dto.getPapers_type());
				cardDto.setBank_account_type(ONE);
				cardDto.setBank_card_type(ONE);*/
				if(cardDto.getStatus()!=ONE){
					cardDto.setAccount_type(changeUserType(userType));//用户类型
					cardDto.setAudit_datetime(new Timestamp(DateUtils.string2UtilTime("2001-01-01 00:00:00.0", DateUtils.DATE_FORMAT_DEFAULT).getTime()));
					cardDto.setAudit_id("");
					cardDto.setStatus(ONE);
					cardDto.setCommit_account_id(sessionUser.getAccount_id());
					cardDto.setCommit_datetime(new Timestamp(System.currentTimeMillis()));
					cardDto.setBank_card_code(cardCode);
					cardDto.setBank_card_name(dto.getBank_card_name());
					cardDto.setBranch_name(dto.getBranch_name());
					cardDto.setCard_type(dto.getCard_type()==null?cardDto.getCard_type():dto.getCard_type());
					cardDto.setOpen_account_bank_name(dto.getOpen_account_bank_name());
					cardDto.setPapers_code(dto.getPapers_code());
					cardDto.setPapers_type(dto.getPapers_type());
					cardDto.setIp(ipUtil.getIpAddress(req));
					cardDto.setMobile(dto.getMobile());
				}
				withdrawService.commissionBankCardInfoUpdate(cardDto);
			}
			parameter.setSuccess(true);
			parameter.setMsg(RespCodeEnum.SUCCESS.getCode());
		} catch (Exception e) {
			parameter.setMsg(RespCodeEnum.global_unknow_expiration.getCode());
			parameter.setData(reqCt.getMessage("common.exception.unknow"));
			e.printStackTrace();
		}
		writeJSON(res, parameter);
		parameter=null;
	}
	
	/**
	 * 
	 * @param userType 2：店主3：合作商 4：代理 5：业务员 6 销售员
	 * @return 5：店主7：合作商 4：代理 3：业务员 8 销售员
	 */
	public static int changeUserType(String userType){
		int iUsertype=SIX;
		switch (userType) {
		case "2":
			iUsertype=FIVE;
			break;
		case "3":
			iUsertype=SEVEN;
			break;
		case "4":
			iUsertype=FOUR;
			break;
		case "5":
			iUsertype=THREE;
			break;
		case "6":
			iUsertype=EIGHT;
			break;
		default:
			iUsertype=SIX;
			break;
		}
		return iUsertype;
	}
}