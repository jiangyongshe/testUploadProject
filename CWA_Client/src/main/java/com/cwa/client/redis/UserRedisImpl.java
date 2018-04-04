package com.cwa.client.redis;

import java.io.Serializable;

import javax.annotation.Resource;

import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import com.cwa.client.utils.RegUtil;


@Repository("userRedis")
public class UserRedisImpl implements UserRedis{

	@Resource
	private RedisTemplate<Serializable, Serializable> redisTemplate;

	
	@Override
	public void delete(final String uid) {
		redisTemplate.execute(new RedisCallback<Object>() {
			public Object doInRedis(RedisConnection connection) {
				connection.del(redisTemplate.getStringSerializer().serialize(
						"user.uid." + uid));
				return null;
			}
		});
	}
	
	@Override
    public void sendMessage(String channel, Serializable message) {
        redisTemplate.convertAndSend(channel, message);
    }
	
	@Override
    public String get(final String key) {
        return redisTemplate.execute(new RedisCallback<String>() {
            public String doInRedis(RedisConnection connection){
                try {
                    return connection.get(key.getBytes())==null?"":new String(connection.get(key.getBytes()),"utf-8");
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return "";
            }
        });
    }
	@Override
    public Object getObj(final String key) {
        return redisTemplate.execute(new RedisCallback<Object>() {
            public Object doInRedis(RedisConnection connection){
                try {
                    return RegUtil.getUtil().byteToObj(connection.get(key.getBytes()));
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return null;
            }
        });
    }
	@Override
    public void set(final String key,final Object value,final long time) {
        redisTemplate.execute(new RedisCallback<Object>() {
            public Object doInRedis(RedisConnection connection){
                try {
                    connection.set(key.getBytes(),RegUtil.getUtil().objToByte(value));
                    if(time>0){
                    	connection.expire(key.getBytes(), time);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return null;
            }
        });
    }
	@Override
    public void set(final String key,final Object value) {
        redisTemplate.execute(new RedisCallback<Object>() {
            public Object doInRedis(RedisConnection connection){
                try {
                    connection.set(key.getBytes(),RegUtil.getUtil().objToByte(value));
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return null;
            }
        });
    }
	@Override  
    public void evict(final String key) {  
        redisTemplate.execute(new RedisCallback<Long>() {  
            public Long doInRedis(RedisConnection connection){  
	            try {
	            	 return connection.del(key.getBytes());  
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
            	return null;
            }  
        });  
    }
}
