package com.highradius.milestone1;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class FetchRecordDemo
 */
@WebServlet("/FetchRecord")

//This Servelet is used to fetch all table data from database
public class FetchRecord extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FetchRecord() {
        super();
        // TODO Auto-generated constructor stub
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		PrintWriter out = response.getWriter();
		//For pagination purpose
		int page = 1;
		int recordsPerPage = 20;
		
		//Retriving data from client side
		if(request.getParameter("page") != null) {
			page = Integer.parseInt(request.getParameter("page"));
			System.out.println("page "+ page);
			
		}
		FetchRecordDao dao = new FetchRecordDao();
		
		//Receiving data from helper class
		List<PaymentDetails> list = dao.viewAllPaymentDetails((page-1)*recordsPerPage, recordsPerPage);
		
		//Sending back the data to the client side
		String json = new Gson().toJson(list);
		out.print(json);
		out.flush();
		
		
		
	}

	

}
