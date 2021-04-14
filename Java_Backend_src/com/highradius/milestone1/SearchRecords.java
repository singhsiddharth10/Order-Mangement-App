package com.highradius.milestone1;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Servlet implementation class SearchRecords
 */
@WebServlet("/SearchRecords")

//this is webservlet which is used to fetch data from database according to "serachData" parameter 
public class SearchRecords extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SearchRecords() {
        super();
        // TODO Auto-generated constructor stub
    }

	
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
		//Implementing pagination concept
		int page = 1;
		int recordsPerPage = 20;
		long searchData = 0 ;
		
		//retriving data from client side
		if(request.getParameter("page") != null && !request.getParameter("page").isEmpty() ) {
			page = Integer.parseInt(request.getParameter("page"));
			System.out.println("searchData "+ page);
		}
		if(request.getParameter("searchData") != null && !request.getParameter("searchData").isEmpty() ) {
			searchData = Long.parseLong(request.getParameter("searchData"));
			System.out.println("searchData "+ searchData);
		}
		
		SearchDetailsDao obj = new SearchDetailsDao();
		
		//passing the data to helper class and storing the returned data from helper class in the lisr
		List<PaymentDetails> list  = obj.searchPaymentDetails(searchData);
		
		List<PaymentDetails> list1 = null;
		
		int start = (page-1) * recordsPerPage;
		//returning only first 20 records for the first time
		for(int i = start; i < recordsPerPage; i++) {
			list.add(list.get(i));
		}
		
		//sending back the response to the client side
		String json = new Gson().toJson(list1);
		out.print(json);
		out.flush();
		
	}
	

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
}
