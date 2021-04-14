package com.highradius.milestone1;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

//This is the helper class for FetchRecord which is used to fetch all the records present in the database with the the help of pagination concept
public class FetchRecordDao {
	
	//Creating conncetion and prepared Statement object
	Connection connection;
	PreparedStatement preparedStatement;
	
	
	public FetchRecordDao() {}
	
	//Establishing connection
	private static Connection getConnection() throws Exception {
		Connection con = DatabaseConector.getConnection();
		return con;
	}
	
	//function is used to fetch data from database 
	public List<PaymentDetails> viewAllPaymentDetails(int offset, int noOfRecords){
		//creating sql query for fetching data from database
		String query = "SELECT cust_number, name_customer,invoice_id,total_open_amount,due_in_date,notes FROM invoice_details limit " + offset + ", " + noOfRecords;
		List<PaymentDetails> list = new ArrayList<PaymentDetails>();
		PaymentDetails obj = null;
		try {
			connection = getConnection();
			preparedStatement = connection.prepareStatement(query);
			ResultSet rs = preparedStatement.executeQuery();
			while(rs.next()){
				//intializing pojo class object using setter
				obj = new PaymentDetails();
				obj.setCustNumber(rs.getString("cust_number"));
				obj.setCustomerName(rs.getString("name_customer"));
				obj.setInvoiceId(rs.getLong("invoice_id"));
				obj.setTotalOpenAmount(rs.getDouble("total_open_amount"));
				obj.setDueInDate(rs.getDate("due_in_date"));
				obj.setNotes(rs.getString("notes"));
				list.add(obj);
			}
			
			
			//closing connection
			preparedStatement.close();
			connection.close();
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
		return list;
		
	}
	
	
	
	

}
