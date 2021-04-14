package com.highradius.milestone1;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.time.LocalDate;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class DeleteRecord
 */

//This servlet is used to delete from database
@WebServlet("/DeleteRecord")
public class DeleteRecord extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeleteRecord() {
        super();
  
    }


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			//Retriving Data from Client Side
			BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
			String json = "";
			//creating dao class object
			DeleteRecorDao obj = new DeleteRecorDao();
			if(br != null){
				//Reading Data line by line and converting it into string
			      json = br.readLine();
			      //Passing necessary parameters to deletePaymentDetail function
			      obj.deletePaymentDetail(json);
			      
			      System.out.print("Records Deleted");
			
			}
		}catch(Exception e) {
			  e.printStackTrace();
		}
	}
}
