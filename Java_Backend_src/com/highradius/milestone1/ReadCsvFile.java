package com.highradius.milestone1;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class ReadCsvFile {

	public static ArrayList<String> readCsvFile() {
		//File Path
		String filePath = "C:\\Users\\KIIT\\Desktop\\1829099.csv";
		String line = "";
		//creating Array list for storing all the records
		ArrayList<String> records = new ArrayList<>();
		BufferedReader br = null;
		try {
			//Reading CSV file using bufferReader
			br = new BufferedReader(new FileReader(filePath));
			
			//Adding records in arrayList
			while((line = br.readLine()) != null) {
				
				records.add(line);				
			}
			
			br.close();
			
			//Returning arrayList containing all the records 
			return records;
			
			
		//Handling Exception
		}catch(FileNotFoundException fe) {
			fe.printStackTrace();
		}catch(IOException e) {
			e.printStackTrace();
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			if(br != null) {
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		
		return null;

	}

}
