package com.cwa.client.model;

import java.sql.Timestamp;

public class Tb_Vedio {

	private int id;
	private String name;
	private String pic;
	private String file_name;
	private String file_path;
	private String play_path;
	private int is_marketable;
	private String introduction;
	private String commit_id;
	private Timestamp commit_time;
	private String file_type;
	
	
	public String getFile_type() {
		return file_type;
	}
	public void setFile_type(String file_type) {
		this.file_type = file_type;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPic() {
		return pic;
	}
	public void setPic(String pic) {
		this.pic = pic;
	}
	public String getFile_name() {
		return file_name;
	}
	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}
	public String getFile_path() {
		return file_path;
	}
	public void setFile_path(String file_path) {
		this.file_path = file_path;
	}
	public String getPlay_path() {
		return play_path;
	}
	public void setPlay_path(String play_path) {
		this.play_path = play_path;
	}
	public int getIs_marketable() {
		return is_marketable;
	}
	public void setIs_marketable(int is_marketable) {
		this.is_marketable = is_marketable;
	}
	public String getIntroduction() {
		return introduction;
	}
	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}
	public String getCommit_id() {
		return commit_id;
	}
	public void setCommit_id(String commit_id) {
		this.commit_id = commit_id;
	}
	public Timestamp getCommit_time() {
		return commit_time;
	}
	public void setCommit_time(Timestamp commit_time) {
		this.commit_time = commit_time;
	}
	
	
	
}
