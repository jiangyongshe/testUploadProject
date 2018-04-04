package com.cwa.client.utils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.util.Formatter;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.Cipher;

import org.apache.commons.codec.binary.Base64;
 


public class MD5Util {
	 private final static String[] hexDigits = {"0", "1", "2", "3", "4", "5", "6", "7",
         "8", "9", "a", "b", "c", "d", "e", "f"};
	 
	 /**
		 * 算法常量： SHA1
		 */
		private static final String ALGORITHM_SHA1 = "SHA-1";
		
		/**
		 * 算法常量：SHA1withRSA
		 */
		private static final String BC_PROV_ALGORITHM_SHA1RSA = "SHA1withRSA";
		
 /**
  * 转换字节数组为16进制字串
  * @param b 字节数组
  * @return 16进制字串
  */
 public static String byteArrayToHexString(byte[] b) {
     StringBuilder resultSb = new StringBuilder();
     for (byte aB : b) {
         resultSb.append(byteToHexString(aB));
     }
     return resultSb.toString();
 }

 /**
  * 转换byte到16进制
  * @param b 要转换的byte
  * @return 16进制格式
  */
 private static String byteToHexString(byte b) {
     int n = b;
     if (n < 0) {
         n = 256 + n;
     }
     int d1 = n / 16;
     int d2 = n % 16;
     return hexDigits[d1] + hexDigits[d2];
 }

 /**
	 * BASE64解码
	 * 
	 * @param inputByte
	 *            待解码数据
	 * @return 解码后的数据
	 * @throws IOException
	 */
	public static byte[] base64Decode(byte[] inputByte) throws IOException {
		return Base64.decodeBase64(inputByte);
	}
 /**
	 * BASE64编码
	 * 
	 * @param inputByte
	 *            待编码数据
	 * @return 解码后的数据
	 * @throws IOException
	 */
	public static byte[] base64Encode(byte[] inputByte) throws IOException {
		return Base64.encodeBase64(inputByte);
	}

 /**
  * MD5编码
  * @param origin 原始字符串
  * @return 经过MD5加密之后的结果
  */
 public static String MD5Encode(String origin,String charset) {
     String resultString = null;
     try {
         MessageDigest md = MessageDigest.getInstance("MD5");
         charset=(charset==null?"UTF-8":charset);
         resultString = byteArrayToHexString(md.digest(origin.getBytes(charset)));
         LogWriteUtil.getSingleton().writeLog("", "md5after "+resultString, Constant.LOGLEVEL_INFO, MD5Util.class);
        // logger.info("md5after "+resultString);
     } catch (Exception e) {
         e.printStackTrace();
     }
     return resultString;
 }
 
 public static String getSHA1(String str){
		String sha1str=null;
		try {
			if(str!=null&&!"".equals( str)){
				
				  MessageDigest digest = MessageDigest.getInstance("SHA-1");
				  digest.reset();
				  digest.update(str.getBytes("UTF-8"));
				  Formatter formatter = new Formatter();
			        for (byte b : digest.digest())
			        {
			            formatter.format("%02x", b);
			        }
			        sha1str= formatter.toString();
			        formatter.close();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		  LogWriteUtil.getSingleton().writeLog("", "getSHA1 after "+str, Constant.LOGLEVEL_INFO, MD5Util.class);
		return sha1str;
	}
 
 
 /**
  * share256加密
  * @param str
  * @return
  */
 	public static  String getHash256(String str){
 		try {
 			 
 			MessageDigest digest = MessageDigest.getInstance("SHA-256");
 	         byte[] hash = digest.digest(str.getBytes("UTF-8"));
 				StringBuffer sb = new StringBuffer();
 				for (byte b : hash) {
 					int i = b & 0xff;
 					if (i < 0xf) {
 						sb.append(0);
 					}
 					sb.append(Integer.toHexString(i));
 				}
 				str=sb.toString();
 				sb=null;
 		} catch (Exception e) {
 			e.printStackTrace();
 		}
 		return str;
 	}
 	
 	
 	/**
	 * 软签名
	 * 
	 * @param privateKey
	 *            私钥
	 * @param data
	 *            待签名数据
	 * @param signMethod
	 *            签名方法
	 * @return 结果
	 * @throws Exception
	 */
	public static byte[] signBySoft(PrivateKey privateKey, byte[] data)
			throws Exception {
		byte[] result = null;
		Signature st = Signature.getInstance(BC_PROV_ALGORITHM_SHA1RSA, "BC");
		st.initSign(privateKey);
		st.update(data);
		result = st.sign();
		return result;
	}

	/**
	 * 软验证签名
	 * 
	 * @param publicKey
	 *            公钥
	 * @param signData
	 *            签名数据
	 * @param srcData
	 *            摘要
	 * @param validateMethod
	 *            签名方法.
	 * @return
	 * @throws Exception
	 */
	public static boolean validateSignBySoft(PublicKey publicKey,
			byte[] signData, byte[] srcData) throws Exception {
		Signature st = Signature.getInstance(BC_PROV_ALGORITHM_SHA1RSA, "BC");
		st.initVerify(publicKey);
		st.update(srcData);
		return st.verify(signData);
	}

	
	/**
	 * sha1计算.
	 * 
	 * @param datas
	 *            待计算的数据
	 * @return 计算结果
	 */
	public static byte[] sha1(byte[] data) {
		MessageDigest md = null;
		byte[] sha1Byte=null;
		try {
			md = MessageDigest.getInstance(ALGORITHM_SHA1);
			md.reset();
			md.update(data);
			sha1Byte=md.digest();
		} catch (Exception e) {
			sha1Byte=null;
			LogWriteUtil.getSingleton().writeLog("", " SHA1计算失败, Exception: "+e.getMessage(), Constant.LOGLEVEL_ERROR, MD5Util.class);
			 
			 e.printStackTrace();
		}
		return sha1Byte;
	}
	
	/**
	 * sha1计算
	 * 
	 * @param datas
	 *            待计算的数据
	 * @param encoding
	 *            字符集编码
	 * @return
	 */
	public static byte[] sha1(String datas, String encoding) {
		try {
			return sha1(datas.getBytes(encoding));
		} catch (UnsupportedEncodingException e) {
			LogWriteUtil.getSingleton().writeLog("", " SHA1计算失败, Exception: "+e.getMessage(), Constant.LOGLEVEL_ERROR, MD5Util.class);
			 return null;
		}
	}
	/**
	 * sha1计算后进行16进制转换
	 * 
	 * @param data
	 *            待计算的数据
	 * @param encoding
	 *            编码
	 * @return 计算结果
	 */
	public static byte[] sha1X16(String data, String encoding) {
		byte[] bytes = sha1(data, encoding);
		StringBuilder sha1StrBuff = new StringBuilder();
		for (int i = 0; i < bytes.length; i++) {
			if (Integer.toHexString(0xFF & bytes[i]).length() == 1) {
				sha1StrBuff.append("0").append(
						Integer.toHexString(0xFF & bytes[i]));
			} else {
				sha1StrBuff.append(Integer.toHexString(0xFF & bytes[i]));
			}
		}
		try {
			return sha1StrBuff.toString().getBytes(encoding);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			return null;
		}
	}
	/**
	 * 对数据通过公钥进行加密，并进行base64计算
	 * 
	 * @param dataString
	 *            待处理数据
	 * @param encoding
	 *            字符编码
	 * @param key
	 *            公钥
	 * @return
	 */
	public static String EncryptData(String dataString, String encoding,
			PublicKey key) {
		/** 使用公钥对密码加密 **/
		byte[] data = null;
		try {
			data = encryptedPin(key, dataString.getBytes(encoding));
			return new String(base64Encode(data), encoding);
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}
	
	/**
	 * 使用网关公钥对持卡人密码进行加密，并返回byte[]类型
	 * 
	 * @param publicKey
	 * @param plainPin
	 * @return
	 * @throws Exception
	 */
	public static byte[] encryptedPin(PublicKey publicKey, byte[] plainPin)
			throws Exception {
		try {
			// y
			// Cipher cipher = Cipher.getInstance("DES",
			// new org.bouncycastle.jce.provider.BouncyCastleProvider());

			// 本土的
//			Cipher cipher = CliperInstance.getInstance();
			Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding","BC");
			cipher.init(Cipher.ENCRYPT_MODE, publicKey);
			int blockSize = cipher.getBlockSize();
			int outputSize = cipher.getOutputSize(plainPin.length);
			int leavedSize = plainPin.length % blockSize;
			int blocksSize = leavedSize != 0 ? plainPin.length / blockSize + 1
					: plainPin.length / blockSize;
			byte[] raw = new byte[outputSize * blocksSize];
			int i = 0;
			while (plainPin.length - i * blockSize > 0) {
				if (plainPin.length - i * blockSize > blockSize) {
					cipher.doFinal(plainPin, i * blockSize, blockSize, raw, i
							* outputSize);
				} else {
					cipher.doFinal(plainPin, i * blockSize, plainPin.length - i
							* blockSize, raw, i * outputSize);
				}
				i++;
			}
			return raw;
			
			/*Cipher cipher = CliperInstance.getInstance();
			cipher.init(Cipher.ENCRYPT_MODE, publicKey);
			byte[] output = cipher.doFinal(plainPin);
			return output;*/
			
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}
	
	/**
	 * 解析应答字符串，生成应答要素
	 * 
	 * @param str
	 *            需要解析的字符串
	 * @return 解析的结果map
	 * @throws UnsupportedEncodingException
	 */
	public static Map<String, String> parseQString(String str)
			throws UnsupportedEncodingException {

		Map<String, String> map = new HashMap<String, String>();
		int len = str.length();
		StringBuilder temp = new StringBuilder();
		char curChar;
		String key = null;
		boolean isKey = true;
		boolean isOpen = false;//值里有嵌套
		char openName = 0;
		if(len>0){
			for (int i = 0; i < len; i++) {// 遍历整个带解析的字符串
				curChar = str.charAt(i);// 取当前字符
				if (isKey) {// 如果当前生成的是key
					
					if (curChar == '=') {// 如果读取到=分隔符 
						key = temp.toString();
						temp.setLength(0);
						isKey = false;
					} else {
						temp.append(curChar);
					}
				} else  {// 如果当前生成的是value
					if(isOpen){
						if(curChar == openName){
							isOpen = false;
						}
						
					}else{//如果没开启嵌套
						if(curChar == '{'){//如果碰到，就开启嵌套
							isOpen = true;
							openName ='}';
						}
						if(curChar == '['){
							isOpen = true;
							openName =']';
						}
					}
					if (curChar == '&' && !isOpen) {// 如果读取到&分割符,同时这个分割符不是值域，这时将map里添加
						putKeyValueToMap(temp, isKey, key, map);
						temp.setLength(0);
						isKey = true;
					}else{
						temp.append(curChar);
					}
				}
				
			}
			putKeyValueToMap(temp, isKey, key, map);
		}
		return map;
	}

	private static void putKeyValueToMap(StringBuilder temp, boolean isKey,
			String key, Map<String, String> map)
			throws UnsupportedEncodingException {
		if (isKey) {
			key = temp.toString();
			if (key.length() == 0) {
				throw new RuntimeException("QString format illegal");
			}
			map.put(key, "");
		} else {
			if (key.length() == 0) {
				throw new RuntimeException("QString format illegal");
			}
			map.put(key, temp.toString());
		}
	}
	
	/**
	 * 通过私钥解密
	 * 
	 * @param dataString
	 *            base64过的数据
	 * @param encoding
	 *            编码
	 * @param key
	 *            私钥
	 * @return 解密后的数据
	 */
	public static String decryptedData(String dataString, String encoding,
			PrivateKey key) {
		byte[] data = null;
		try {
			data = decryptedPin(key, dataString.getBytes(encoding));
			return new String(data, encoding);
		} catch (Exception e) {
			 e.printStackTrace();
			return "";
		}
	}
	/**
	 * 
	 * @param privateKey
	 * @param cryptPin
	 * @return
	 * @throws Exception
	 */
	public static byte[] decryptedPin(PrivateKey privateKey, byte[] cryptPin)
			throws Exception {

		try {
			/** 生成PIN Block **/
			byte[] pinBlock = base64Decode(cryptPin);
			// 本土的
//			Cipher cipher = CliperInstance.getInstance();
			Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding","BC");
			cipher.init(Cipher.DECRYPT_MODE, privateKey);
			int blockSize = cipher.getBlockSize();
			int outputSize = cipher.getOutputSize(pinBlock.length);
			int leavedSize = pinBlock.length % blockSize;
			int blocksSize = leavedSize != 0 ? pinBlock.length / blockSize + 1
					: pinBlock.length / blockSize;
			byte[] pinData = new byte[outputSize * blocksSize];
			int i = 0;
			while (pinBlock.length - i * blockSize > 0) {
				if (pinBlock.length - i * blockSize > blockSize) {
					cipher.doFinal(pinBlock, i * blockSize, blockSize, pinData,
							i * outputSize);
				} else {
					cipher.doFinal(pinBlock, i * blockSize, pinBlock.length - i
							* blockSize, pinData, i * outputSize);
				}
				i++;
			}
			return pinData;
		} catch (Exception e) {
			 
			LogWriteUtil.getSingleton().writeLog("", " 解密失败, Exception: "+e.getMessage(), Constant.LOGLEVEL_ERROR, MD5Util.class);
			
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * URLEncode 编码解密
	 * @param srcstr
	 * @param charSet
	 * @return
	 */
	public static String getDecode(String srcstr,String charSet){
		String enStr=null;
		try {
			charSet=charSet==null?"UTF-8":charSet;
			enStr=URLDecoder.decode(srcstr, charSet);
		} catch (Exception e) {
			enStr=null;
			 e.printStackTrace();
		}
		return enStr;
	}
	/**
	 * URLEncode 编码加密
	 * @param srcstr
	 * @param charSet
	 * @return
	 */
	public static String getEncode(String srcstr,String charSet){
		String enStr=null;
		try {
			charSet=charSet==null?"UTF-8":charSet;
			enStr=URLEncoder.encode(srcstr,charSet);
		} catch (Exception e) {
			enStr=null;
			 e.printStackTrace();
		}
		return enStr;
	}
	
 /*	public static void main(String [] arg){
 		try {
 			String src="attach=2&bank_type=CFT&charset=UTF-8&device_info=web&fee_type=CNY&is_subscribe=N&mch_id=7551000001&nonce_str=1480666393361&openid=oywgtuBVP5JHri51LugAiZW-av8A&out_trade_no=GOLDWINCHAT1480666369410&out_transaction_id=4000132001201612021527680439&pay_result=0&result_code=0&sign_type=MD5&status=0&sub_appid=wxce38685bc050ef82&sub_is_subscribe=N&sub_openid=oHmbkt-jDEhV_8DUCM_cHcJJVm_w&time_end=20161202161312&total_fee=1&trade_type=pay.weixin.jspay&transaction_id=7551000001201612024175389233&version=2.0&key=9d101c97133837e13dde2d32a5054abb";
			System.out.println(MD5Encode(src, null));
 			
		} catch (Exception e) {
			// TODO: handle exception
		}
 	}
*/
}
