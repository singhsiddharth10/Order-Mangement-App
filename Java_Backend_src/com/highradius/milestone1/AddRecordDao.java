package com.highradius.milestone1;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


//This is helper class for AddRecord Servlet
public class AddRecordDao {
	
	// Creating connection and preparedStatement object
	Connection connection;
	PreparedStatement preparedStatement;
	
	
	//Constructor
	public AddRecordDao() {}
	
	//Establishing connection function
	private static Connection getConnection() throws Exception {
		Connection con = DatabaseConector.getConnection();
		return con;
	}
	
	//This function is used to add record in the database
	public void addPaymentDetail(String custNumber, String nameCustomer,long invoiceId, double totalOpenAmount, Date dueInDate, String notes){
		
		//Creating sql query
		String sqlQuery = "INSERT INTO invoice_details (cust_number,name_customer,invoice_id,total_open_amount, doc_id, due_in_date,notes) values (?,?,?,?,?,?,?)";
		
		try {
			
			connection = getConnection();
			preparedStatement = connection.prepareStatement(sqlQuery);
			preparedStatement.setString(1, custNumber);
			preparedStatement.setString(2, nameCustomer);
			preparedStatement.setLong(3, invoiceId );
			preparedStatement.setDouble(4, totalOpenAmount);
			preparedStatement.setLong(5, invoiceId );
			preparedStatement.setDate(6, dueInDate);
			preparedStatement.setString(7, notes);
			//executing update in the table
			preparedStatement.executeUpdate();
			
			//Closing connection
			connection.close();
			preparedStatement.close();
			
			
		//Handling Exception if any
		}catch(Exception e) {
			e.printStackTrace();
			
		}finally {
			try {
				if(preparedStatement != null) {
					preparedStatement.close();
				}
				if(connection != null) {
					connection.close();
				}
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		
	}
}
