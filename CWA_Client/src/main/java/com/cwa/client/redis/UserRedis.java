package com.cwa.client.redis;

import java.io.Serializable;

public interface UserRedis {

	
	void delete(String uid);
	
	void sendMessage(String channel, Serializable message); 
	
	String get(String key);
	
	Object getObj(String key);
	
	void set(String key,Object value);

	void set(String key,Object value,long time);
	
	void evict(final String key);
}
