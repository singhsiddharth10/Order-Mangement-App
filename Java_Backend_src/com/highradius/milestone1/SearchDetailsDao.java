package com.highradius.milestone1;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


//this is a helper class of serachdetails which is used to fetch data from table according to "searchData" parameter
public class SearchDetailsDao {
	//Creating connection and preparedStatement object
	Connection connection;
	PreparedStatement preparedStatement;
	
	
	public SearchDetailsDao() {}
	
	//establishing connection from database
	private static Connection getConnection() throws Exception {
		Connection con = DatabaseConector.getConnection();
		return con;
	}
	
	public List<PaymentDetails> searchPaymentDetails(long searchData){
		
		//sql query for fetching data with respect to "searchData" parameter
		String query = "SELECT cust_number, name_customer,invoice_id,total_open_amount,due_in_date FROM invoice_details WHERE doc_id LIKE '"+searchData+"%'" ;
		List<PaymentDetails> list = new ArrayList<PaymentDetails>();
		PaymentDetails obj = null;
		try {
			connection = getConnection();
			preparedStatement = connection.prepareStatement(query);
			ResultSet rs = preparedStatement.executeQuery();
			while(rs.next()){
				//initializing pojo class using setter
				obj = new PaymentDetails();
				obj.setCustNumber(rs.getString("cust_number"));
				obj.setCustomerName(rs.getString("name_customer"));
				obj.setInvoiceId(rs.getLong("invoice_id"));
				obj.setTotalOpenAmount(rs.getDouble("total_open_amount"));
				obj.setDueInDate(rs.getDate("due_in_date"));
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
