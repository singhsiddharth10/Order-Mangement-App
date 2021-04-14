package com.higradius.assignment1;

import java.sql.Connection;
import java.sql.DriverManager;

//Establishing connection between mysql and java using jdbc
public class DatabaseConnector {
	//JDBC Driver Name
	static final String jdbcDriver = "com.mysql.jdbc.Driver";
	//Database Url
	static final String dbUrl = "jdbc:mysql://localhost:3306/infinity_war";
	//Database Credentials
	static final String user = "root";
	static final String pass = "ROOT";
	
	private static java.sql.Connection conn;
	
	public static Connection getConnection() throws Exception{
		try {
			//Registering the Driver
			Class.forName(jdbcDriver);
			//Open a connection
			conn = DriverManager.getConnection(dbUrl,user,pass);
			
			//Returning the connection
			return conn;
		}catch(Exception e) {
			//Handling Exception
			e.printStackTrace();
		}
		return null;
	}

	

}
