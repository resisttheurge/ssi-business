package com.cooksys.model;

import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.cooksys.db.Connector;
import com.cooksys.test.VariableGenerator;


public class User implements VariableGenerator<User>{

	private long id;
	private String username;
	private int age;
	
	public int getAge() {
		return age;
	}
	public long getId() {
		return id;
	}
	public String getUsername() {
		return username;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public void setId(long id) {
		this.id = id;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	public static List<User> createUserList() {
		User user1 = createUser(1, "Michael Boren", 12);
		User user2 = createUser(2, "Justin Durbin", 34);
		User user3 = createUser(3, "Blake Ballard", 26);
		List<User> users = new ArrayList<User>();
		users.add(user1);
		users.add(user2);
		users.add(user3);
		return users;
	}

	public static User createUser(long id, String username, int age) {
		User user = new User();
		user.setId(id);
		user.setUsername(username);
		user.setAge(age);
		return user;
	}
	
	@Override
	public List<User> generateVariables(Connection connection, ResultSet rawData)
	{
		return null;
	}
	
	@Override
	public String getStoredProcedureName() {
		// TODO Auto-generated method stub
		return "GetUserSP";
	}
}
