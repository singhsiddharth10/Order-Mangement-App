package com.highradius.milestone1;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Servlet implementation class UpdateRecord
 */
@WebServlet("/UpdateRecord")
//this is servlet which is used to update data in the database.
public class UpdateRecord extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateRecord() {
        super();
        // TODO Auto-generated constructor stub
    }

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 try {
				BufferedReader br =  new BufferedReader(new InputStreamReader(request.getInputStream()));
				 String data = "";
				 long invoiceId = 0;
				 double totalOpenAmount = 0;
				 String notes = null;
				 data = br.readLine();
			     //System.out.println(data);
				 //manipulating data in correct order
			     data=data.substring(1, data.length()-1);
			     String split=",";
			     String[] s=data.split(split);
			      
			      invoiceId = Long.parseLong(s[0]);
			      totalOpenAmount = Double.parseDouble(s[1].substring(1,s[1].length()-1));
			      notes = s[2].substring(1,s[2].length()-1);
			      //System.out.print(invoiceId + "," + totalOpenAmount + "," + notes);
			      
			      UpdateRecordDao obj = new UpdateRecordDao();
			      //passing data to helper class
			      obj.updatePaymentDetail(invoiceId, totalOpenAmount, notes);
				
				 

				}catch(Exception e) {
				e.printStackTrace();
			}
	}

}
