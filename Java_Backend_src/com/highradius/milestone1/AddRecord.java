package com.highradius.milestone1;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Servlet implementation class AddRecord
 */
@WebServlet("/AddRecord")


//This Java Servlet is used to add records in the database 
public class AddRecord extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public AddRecord() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		 try {
			//Retriving Data from Client Side
			BufferedReader br =  new BufferedReader(new InputStreamReader(request.getInputStream()));
			String json = "";
			if(br != null){
				//Reading Data line by line and converting it into string
				json = br.readLine();
			   // System.out.println(json);
			 }  
			//Parsing the data and storing in the jsonobject
			JsonObject jsonObject = new JsonParser().parse(json).getAsJsonObject();
			 
			//Retriving all the parameters and storing in local variable
			String custNumber = jsonObject.get("custNumber").getAsString();
			String nameCustomer = jsonObject.get("customerName").getAsString();
			long invoiceId = jsonObject.get("invoiceId").getAsLong();
			double totalOpenAmount = jsonObject.get("totalOpenAmount").getAsDouble();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			String tempDueInDate1 = jsonObject.get("dueInDate").getAsString();
			LocalDate tempdueInDate2 = LocalDate.parse(tempDueInDate1,formatter);
			Date dueInDate = Date.valueOf(tempdueInDate2);
			String notes = jsonObject.get("note").getAsString();
			
			//Creating doa class object;
			AddRecordDao obj = new AddRecordDao();
			
			//Passing all the local variables to the dao class function
			obj.addPaymentDetail(custNumber, nameCustomer, invoiceId, totalOpenAmount, dueInDate, notes);
			
			//If the record get added successfully in the database then tell the client that record is successfully added
			response.getWriter().write("Sucess");
			System.out.print("Record Inserted");
			
			//Catching exception if any
			}catch(Exception e) {
				response.getWriter().write("Failed");
				e.printStackTrace();
			}
		}

	}
