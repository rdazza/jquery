package edu.upc.eetac.dsa;

import java.util.Date;

public class Game {
	private String id;
	private String description;
	private Date creationdate;
	private String[] userlist;
	private String url;

	public Game(){

	}

	public Game (String id){
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getCreationdate() {
		return creationdate;
	}

	public void setCreationdate(Date creationdate) {
		this.creationdate = creationdate;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String[] getUserlist() {
		return userlist;
	}

	public void setUserlist(String[] userlist) {
		this.userlist = userlist;
	}


} 
