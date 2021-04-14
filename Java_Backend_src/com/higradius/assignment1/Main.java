package com.higradius.assignment1;

//Importing important packages
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Scanner;

//Main class
public class Main {
	
	private static Scanner sc;
	private static Scanner sc2;
	private static Scanner sc3;

	//castDetials function is used to display all the records present in database;
	public static void castDetails(java.sql.Statement statement) {
		String sql;
		//SQL query for fetching all the details from database;
		sql = "SELECT * FROM infinity_war_characters"; 
		ResultSet rs;
		try {
			//Retrieving the data
			rs = statement.executeQuery(sql);
			
			//Creating ArrayList of Pojo class objects, to store all the details that is fetched from the database;
			ArrayList<CastDetails> recordlists = new ArrayList<>();
		
			while(rs.next()) {
				//Creating Pojo class object;
				CastDetails Obj= new CastDetails();
				//Initializing the Pojo class object using setter method;
				Obj.setSerialNo(rs.getInt("SerialNo"));
				Obj.setFirst_Name(rs.getString("FirstName"));
				Obj.setLast_Name(rs.getString("LastName"));
				Obj.setAlias(rs.getString("Alias"));
				Obj.setQuotes(rs.getString("Quotes"));
				recordlists.add(Obj);
			} 
			//Iterating through each object present in recordList.
			for (CastDetails obj : recordlists) {
				//Print each object using getter method.
				System.out.print("SerialNo: "+obj.getSerialNo()+", ");
				System.out.print("First_Name: "+obj.getFirstName()+", ");
				System.out.print("Last_Name: "+obj.getLastName()+", ");
				System.out.print("Alias: "+obj.getAlias()+", ");
				System.out.println("Quotes: "+obj.getQuotes()+", ");
			}
			// Closing the Resultset.
			rs.close();
		} catch(Exception e) {
			//Handling the exception, if occur. 
			e.printStackTrace();
		}
	}
	
	//specificCastDetails function used to get the serial number from the user and display the record accordingly
	public static void specificCastDetails(java.sql.Statement statement) {
		//Taking user input
		System.out.print("\nEnter serial number : \n");
		sc = new Scanner(System.in);
		int serialNumber = sc.nextInt();
		
		String sql;
		//Fetching records on the basis of serial Number.
		sql = "SELECT Alias, Quotes FROM infinity_war_characters WHERE SerialNo = " ;
		
		sql += serialNumber;
		//Creating the ResultSet
		ResultSet rs;
		try {
			//Retrieving the data
			rs = statement.executeQuery(sql);
			//Creating ArrayList of Pojo class objects, to store all the details that is fetched from the database;
			ArrayList<CastDetails> recordlists = new ArrayList<>();
			
			//Checking if resultset is null or not
			if (!rs.isBeforeFirst() ) {    
			    System.out.println("No data Found !!"); 
			} else {
				while(rs.next()) {
					//Creating Pojo class object;
					CastDetails Obj= new CastDetails();
					//Initializing the Pojo class object using setter method;
					Obj.setAlias(rs.getString("Alias"));
					Obj.setQuotes(rs.getString("Quotes"));
					recordlists.add(Obj);
				}
				//Iterating through each object present in recordList.
				for (CastDetails obj : recordlists) {
					//Print each object using getter method.
					System.out.print("Alias: "+obj.getAlias()+", ");
					System.out.println("Quotes: "+obj.getQuotes()+", ");
				}
				
				// Closing the Resultset.
				rs.close();
			}
		}catch(Exception e) {
			//Handling the exception, if occur.
			e.printStackTrace();
		}
	}
	public static void columnSpecificCastDetails(java.sql.Statement statement) {
		//Taking user input
		System.out.print("\nEnter any Column name : \n");
		sc2 = new Scanner(System.in);
		String colName = sc2.nextLine();
		System.out.print("\nEnter any Column value : \n");
		String userInput = sc2.nextLine();
		
		String sql;
		//Fetching records on the basis of serial Number.
		sql = "SELECT * FROM infinity_war_characters WHERE " + colName + "=" + "'" + userInput + "'" ;
		//Creating the ResultSet
		ResultSet rs;
		try {
			//Retrieving the data
			rs = statement.executeQuery(sql);
			//Creating ArrayList of Pojo class objects, to store all the details that is fetched from the database;
			ArrayList<CastDetails> recordlists = new ArrayList<>();
			
			//Checking if resultset is null or not
			if (!rs.isBeforeFirst() ) {    
			    System.out.println("No data Found !!"); 
			} else {
				while(rs.next()) {
					//Creating Pojo class object;
					CastDetails Obj= new CastDetails();
					Obj.setSerialNo(rs.getInt("SerialNo"));
					Obj.setFirst_Name(rs.getString("FirstName"));
					Obj.setLast_Name(rs.getString("LastName"));
					Obj.setAlias(rs.getString("Alias"));
					Obj.setQuotes(rs.getString("Quotes"));
					recordlists.add(Obj);
				}
				//Iterating through each object present in recordList.
				for (CastDetails obj : recordlists) {
					//Print each object using getter method.
					System.out.print("First_Name: "+obj.getFirstName()+", ");
					System.out.print("Last_Name: "+obj.getLastName()+", ");
					System.out.print("SerialNo: "+obj.getSerialNo()+", ");
					System.out.print("Alias: "+obj.getAlias()+", ");
					System.out.println("Quotes: "+obj.getQuotes()+", ");
				}
				
				// Closing the Resultset.
				rs.close();
			}
		}catch(Exception e) {
			//Handling the exception, if occur.
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		
		java.sql.Statement statement = null;
		java.sql.Connection conn = null;
		
		try {
			//Establishing the connection 
			conn =  DatabaseConnector.getConnection();
			statement = conn.createStatement();
			
			while(true) {
				//Providing options to the user.
				System.out.println("\n1. Display table Record \n2. Display table record according to serial number \n3. Search By specific Column Name and Column Value \n4. exit\n");
				
				sc3 = new Scanner(System.in);
				int response = sc3.nextInt();
				if(response == 1) {
					castDetails(statement);
					
				}else if(response == 2) {
					specificCastDetails(statement);
				}else if(response == 3) {
					columnSpecificCastDetails(statement);
				}
				else if(response == 4){
					break;
				}else {
					System.out.println("Invalid Response, Please try again");
				}
				
			}
			//Closing the Statement and Connection
			statement.close();
			conn.close();
		}catch(SQLException se){
			//Handling SQL Exception
			se.printStackTrace();
		}catch(Exception e){
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
		}
		System.out.println("Goodbye!");


	}

}
