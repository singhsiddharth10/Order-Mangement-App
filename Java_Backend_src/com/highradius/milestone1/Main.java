package com.highradius.milestone1;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.ParseException;
import java.sql.*;



public class Main {
	public static void main(String [] args) {
		//Creating Connection and Statement object
		Statement statement = null;
		Connection conn = null;
		
		try {
			//Establishing the connection 
			conn =  DatabaseConector.getConnection();
			
			statement = conn.createStatement();
			
			conn.setAutoCommit(false);
			
			//Creating sql queries
			String sqlQuery = "INSERT INTO invoice_details(business_code,cust_number,name_customer,clear_date,business_year,doc_id,posting_date,document_create_date,due_in_date,"
					+ "invoice_currency,document_type,posting_id,area_business,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id,isOpen) "
					+ "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			
			//Creating PreparedStatement object for batch process
			PreparedStatement preparedStatement = conn.prepareStatement(sqlQuery);
			
			//Calling insertRecord method for inserting all the records in the database
			InsertRecords.insertRecods(preparedStatement);
			
			//Saving the data
			conn.commit();
			//Closing the connection
			conn.close();
			
			
			
		}catch(IOException e) {
			e.printStackTrace();
		}catch(SQLException e) {
			 e.printStackTrace();
			 
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			//After Executing all the above code, checking whether statement and connection are null or not. If they are
			//not null then closing statement and connection.
			try{
				if(statement!=null)
					statement.close();
			}catch(SQLException se2){
		}
			try{
				if(conn!=null)
					conn.close();
			}catch(SQLException se){
				se.printStackTrace();
			}
			
			System.out.println("Goodbye!");
		}
	}
		
}
