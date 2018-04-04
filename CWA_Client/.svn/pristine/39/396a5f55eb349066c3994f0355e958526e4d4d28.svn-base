package com.cwa.client.redis;

 



import com.cwa.client.utils.GobalProperties;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class JedisUtilCWAServer {

	//Redis服务器IP
    private static String ADDR = GobalProperties.getGobalConfig().getValueByKey("cwaserver.redis.ip");
    
    //Redis的端口号
    private static int PORT = GobalProperties.getGobalConfig().getIntegerValueByKey("cwaserver.redis.port");
    
    //访问密码
    private static String AUTH = GobalProperties.getGobalConfig().getValueByKey("cwaserver.redis.pwd");
    
    //可用连接实例的最大数目，默认值为8；
    //如果赋值为-1，则表示不限制；如果pool已经分配了maxActive个jedis实例，则此时pool的状态为exhausted(耗尽)。
    private static int MAX_ACTIVE = GobalProperties.getGobalConfig().getIntegerValueByKey("redis.maxactive");
    
    //控制一个pool最多有多少个状态为idle(空闲的)的jedis实例，默认值也是8。
    private static int MAX_IDLE = GobalProperties.getGobalConfig().getIntegerValueByKey("redis.maxidle");
    
    //等待可用连接的最大时间，单位毫秒，默认值为-1，表示永不超时。如果超过等待时间，则直接抛出JedisConnectionException；
    private static int MAX_WAIT = GobalProperties.getGobalConfig().getIntegerValueByKey("redis.maxwait");
    
    private static int TIMEOUT = GobalProperties.getGobalConfig().getIntegerValueByKey("redis.timeout");;
    
    //在borrow一个jedis实例时，是否提前进行validate操作；如果为true，则得到的jedis实例均是可用的；
    private static boolean TEST_ON_BORROW = Boolean.valueOf(GobalProperties.getGobalConfig().getValueByKey("redis.testonborrow"));
    
    private static JedisPool jedisPool = null;
    
    /**
     * 初始化Redis连接池
     */
    static {
        try {
        	if(jedisPool==null){
        		JedisPoolConfig config = new JedisPoolConfig();
                config.setMaxTotal(MAX_ACTIVE);
                config.setMaxIdle(MAX_IDLE);
                config.setMaxWaitMillis(MAX_WAIT);
                config.setTestOnBorrow(TEST_ON_BORROW);
               
               jedisPool = new JedisPool(config, ADDR, PORT, TIMEOUT, AUTH);
        	}
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    /**
     * 获取Jedis实例
     * @return
     */
    public synchronized static Jedis getJedis() {
        try {
            if (jedisPool != null) {
                Jedis resource = jedisPool.getResource();
                return resource;
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    
    
    
}
