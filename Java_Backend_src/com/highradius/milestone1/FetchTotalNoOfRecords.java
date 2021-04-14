package com.highradius.milestone1;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class FetchTotalNoOfRecords
 */

//this servlet is used to fetch count of total number of records present in database
@WebServlet("/FetchTotalNoOfRecords")
public class FetchTotalNoOfRecords extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FetchTotalNoOfRecords() {
        super();
        // TODO Auto-generated constructor stub
    }
    
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		FetchTotalNoOfRecordsDao dao = new FetchTotalNoOfRecordsDao();
		int totalNoOfRecords = dao.getCountOfRecords();
		
		//Sending data back to client side
		String json = new Gson().toJson(totalNoOfRecords);
		out.print(json);
		out.flush();

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	

}
