package com.highradius.milestone1;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


//this is the helper class for fetchtotalnoofrecords servlet which is used to get the count of total no of records present in data 
public class FetchTotalNoOfRecordsDao {
	//Creating connection and preparedStatement object
	Connection connection;
	PreparedStatement stmt;
	
	private int totalNoOfRecords;
	
	
	public FetchTotalNoOfRecordsDao() {}
	
	//Establishing connection from the databse
	private static Connection getConnection() throws Exception {
		Connection con = DatabaseConector.getConnection();
		return con;
	}
	
	public int getCountOfRecords(){
		
		//sql query for count total no of records present in the database
		String query = "SELECT COUNT(*) AS TOTAL FROM invoice_details ";
		
		try {
			connection = getConnection();
			stmt = connection.prepareStatement(query);
			ResultSet rs = stmt.executeQuery(query);
			rs.next();
			totalNoOfRecords = rs.getInt("TOTAL");
			
			//closing connection
			connection.close();
			stmt.close();
			return totalNoOfRecords;
			
		}catch(Exception e) {
			e.printStackTrace();
			
		}finally {
			try {
				if(stmt != null) {
					stmt.close();
				}
				if(connection != null) {
					connection.close();
				}
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		return 0;
		
	}

	
	

}
