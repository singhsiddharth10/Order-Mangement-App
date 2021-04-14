package com.highradius.milestone1;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


//This is the helper class for fetchrecordviewcorres which is used to fetch table record according with some condition

public class FetchRecordsViewCorrDao {
	//creating connection and stament object
	Connection connection;
	Statement stmt;
	
	
	
	public FetchRecordsViewCorrDao() {}
	
	//establishing connection
	private static Connection getConnection() throws Exception {
		Connection con = DatabaseConector.getConnection();
		return con;
	}
	
	public ArrayList<PaymentDetails> viewAllPaymentDetails(String json){
		//creating sql query
		String query = "SELECT cust_number,name_customer,invoice_id,total_open_amount,document_create_date,due_in_date,invoice_currency FROM invoice_details where doc_id = ";
		ArrayList<PaymentDetails> list = new ArrayList<PaymentDetails>();
		PaymentDetails obj = null;
		try {
			connection = getConnection();
			stmt = connection.createStatement();
			//Manipulation data to correct format
			json=json.substring(1, json.length()-1);
			String splitDelimeter=",";
		    String[] arr = json.split(splitDelimeter);
		    int len;
		    
		    //only first 50 records will be send to client side
		    if(arr.length >= 50)
		    	len = 50;
		    else
		    	len = arr.length;
		    for(int i=0;i<len;i++) {
		    	  long invoiceId = Long.parseLong(arr[i]);
		    	  System.out.println(invoiceId);
		    	  ResultSet rs = stmt.executeQuery(query + invoiceId);
		    	  while(rs.next()){
		    		  //initializing pojo class obj using setter
					obj = new PaymentDetails();
					obj.setCustNumber(rs.getString("cust_number"));
					obj.setCustomerName(rs.getString("name_customer"));
					obj.setInvoiceId(rs.getLong("invoice_id"));
					obj.setTotalOpenAmount(rs.getDouble("total_open_amount"));
					obj.setDocumentCreateDate(rs.getDate("document_create_date"));
					obj.setDueInDate(rs.getDate("due_in_date"));
					obj.setInvoiceCurrency(rs.getString("invoice_currency"));
					list.add(obj);
		    	  }
		    	 
		    	  
		    }
		    
		    //closing connection
		    stmt.close();
		    connection.close();
		    
		    return list;
		    
		   
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
		return list;
		
	}

}
