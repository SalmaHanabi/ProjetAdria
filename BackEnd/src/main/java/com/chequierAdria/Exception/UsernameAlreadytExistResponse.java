package com.chequierAdria.Exception;


public class UsernameAlreadytExistResponse 
{
	private String username;
	public UsernameAlreadytExistResponse(String username)
	{
		this.username=username;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
}
