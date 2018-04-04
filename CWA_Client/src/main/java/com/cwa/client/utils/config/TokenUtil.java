package com.cwa.client.utils.config;


import java.io.IOException;

import com.cwa.client.utils.RegUtil;


/**
 * Key Util: 1> according file name|size ..., generate a key;
 * 			 2> the key should be unique.
 */
public class TokenUtil {

	/**
	 * 生成Token， A(hashcode>0)|B + |name的Hash值| +_+size的值
	 * @param name
	 * @param size
	 * @return
	 * @throws Exception
	 */
	public static String generateToken(String basePath,String token)
			throws IOException {
		if (RegUtil.getUtil().isNull(token))
			return "";
		///int code = name.hashCode();
		try {
			///String token = (code > 0 ? "A" : "B") + Math.abs(code) + "_" + size.trim();
			/** TODO: store your token, here just create a file */
			IoUtil.storeToken(basePath,token);
			
			return token;
		} catch (Exception e) {
			throw new IOException(e);
		}
	}
	
	public static void main(String [] args){
		try {
			System.out.println(generateToken("","10000"));
			
			System.out.println(generateToken("","100000"));
			
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
}
