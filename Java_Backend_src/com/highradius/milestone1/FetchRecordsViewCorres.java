package com.highradius.milestone1;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class FetchRecordsViewCorres
 */
@WebServlet("/FetchRecordsViewCorres")


//this is a servlet which is used to fetch records from database according to the given condition
public class FetchRecordsViewCorres extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FetchRecordsViewCorres() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		try {
			ArrayList<PaymentDetails> list = new ArrayList<>();
			
			BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
			String json = "";
			FetchRecordsViewCorrDao obj = new FetchRecordsViewCorrDao();
			if(br != null){
				//Reading data from client side
			      json = br.readLine();
			      
			}
			list = obj.viewAllPaymentDetails(json);
//			for(int i = 0; i < list.size(); i++) {
//				System.out.println(list.get(i));
//			}
			
			//Passing response back to the client side
			String jsonObject = new Gson().toJson(list);
			out.print(jsonObject);
			out.flush();
			
			
		}catch(Exception e) {
			  e.printStackTrace();
		}
	}

}
