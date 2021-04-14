package com.highradius.milestone1;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;


//Helper class for DeleteRecord Servlet
public class DeleteRecorDao {
	// Creating connection and preparedStatement object
	Connection connection;
	PreparedStatement preparedStatement;
	
	
	public DeleteRecorDao() {}
	//Establishing connection function
	private static Connection getConnection() throws Exception {
		Connection con = DatabaseConector.getConnection();
		return con;
	}
	//this function is used to delete records from database
	public void deletePaymentDetail(String json){
		
		//Creating sql query
		String sqlQuery = "DELETE from invoice_details where doc_id = ?" ;
		try {
			connection = getConnection();
			preparedStatement = connection.prepareStatement(sqlQuery);
			//Manipulating the data in the correct order
			json=json.substring(1, json.length()-1);
			String splitDelimeter=",";
		    String[] arr = json.split(splitDelimeter);
		    
		    for(int i=0;i<arr.length;i++) {
		    	  long invoiceId = Long.parseLong(arr[i]);
		    	  System.out.println(invoiceId);
		    	  preparedStatement.setLong(1,invoiceId);
		    	  preparedStatement.addBatch();
		      }
		    //excuting batch
		    preparedStatement.executeBatch();
			
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
		
	}

	

}
