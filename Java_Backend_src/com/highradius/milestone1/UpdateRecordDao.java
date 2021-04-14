package com.highradius.milestone1;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;

//this is the helper class for updaterecord servlet which is used to update records in the database
public class UpdateRecordDao {
	//creating connection and prepared class object
	Connection connection;
	PreparedStatement preparedStatement;
	
	
	public UpdateRecordDao() {}
	
	//establising connection
	private static Connection getConnection() throws Exception {
		Connection con = DatabaseConector.getConnection();
		return con;
	}
	
	public void updatePaymentDetail(long invoiceId, double totalOpenAmount, String notes){
		//sql query for updating the existind data in the database
		String query = "Update invoice_details set total_open_amount = ? , notes = ? where doc_id = ? ";
		
		PaymentDetails obj = null;
		try {
			connection = getConnection();
			preparedStatement = connection.prepareStatement(query);
			preparedStatement.setDouble(1,totalOpenAmount);
			preparedStatement.setString(2, notes);
			preparedStatement.setLong(3, invoiceId);
			//excuting update
			int i = preparedStatement.executeUpdate();
			
			if(i == 1)
				System.out.println("sucess");
			else if(i == 0)
				System.out.println("failed");
			
			//closing the connection
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
		
	}
	
	
	
}
