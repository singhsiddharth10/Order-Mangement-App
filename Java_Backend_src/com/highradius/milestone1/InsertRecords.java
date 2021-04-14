package com.highradius.milestone1;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

public class InsertRecords {
	
	public static void insertRecods(PreparedStatement preparedStatement) {
		
		//One Batch Size
		int batch = 5000;
		
		//Counter for counting batch size
		int count = 0;
		
		//For some condition manipulation
		int flag = 0;
		
		//Surrounds by try - catch block to catch the exception that occurs while executing the code inside the block
		try {
			//Reading CSV file and storing it inside a array list
			ArrayList<String> csvFileData = ReadCsvFile.readCsvFile();
			
			//Iterating ArrayList
			for(int i = 0; i < csvFileData.size() - 1; i++) {
				
				//Split the records on the basis of ","
				String[] data = csvFileData.get(i+1).split(",");
				
				//Creating the object of POJO class
				PaymentDetails obj = new PaymentDetails();
				
				//Retrieving all the necessary details from data array
				
				//Retrieving Business Code 
				String businessCode = data[0];
				//Initializing POJO class obj for variable name business code using setter.
				obj.setBusinessCode(businessCode);
				
				//Retrieving Customer Number
				String custNumber = data[1];
				//Initializing POJO class obj for variable name customer number using setter.
				obj.setCustNumber(custNumber);
				
				//Retrieving Customer Name
				String customerName = data[2];
				//Initializing POJO class obj for variable name customer name using setter.
				obj.setCustomerName(customerName);
				
				//Retrieving Clear Date
				//Creating a local variable for string manipulation
				String tempClearDate = data[3];
				
				//Creating LocalDate class object to store date
				Timestamp clearDate = null;
				
				//Checking if the retrieved date is empty or not
				if(tempClearDate.isEmpty()) {
					//if the value is empty then assigning null value
					tempClearDate = null;
					flag = 1;
				}
				else {
					//if the value is not empty then manipulating the tempClearDate to convert it into a correct format.
					clearDate = new Timestamp(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(tempClearDate).getTime());
					//Initializing POJO class obj for variable name clear date using setter.
					obj.setClearDate(clearDate);
					flag = 0;
				}
				
				//manipulating the tempBuisnessYear to convert it into a correct format.
				String tempBuisnessYear = data[4];
				//Initializing POJO class obj for variable name business year using setter.
				
				int buisnessYear = Double.valueOf(tempBuisnessYear).intValue();
				//Initializing POJO class obj for variable name business year using setter.
				obj.setBuisnessYear(buisnessYear);
				
				//manipulating the tempDocId to convert it into a correct format.
				String tempDocId = data[5].replaceAll("[.]\\d*", "");
				long docId = Long.parseLong(tempDocId);
				//Initializing POJO class obj for variable name docId using setter.
				obj.setDocId(docId);
				
				//manipulating the postingDate to convert it into a correct format.
				LocalDate postingDate = LocalDate.parse(data[6],DateTimeFormatter.ISO_LOCAL_DATE);
				//Initializing POJO class obj for variable name postingDate using setter.
				obj.setPostingDate(Date.valueOf(postingDate));
				
				//manipulating the documentCreateDate to convert it into a correct format.
				LocalDate documentCreateDate = LocalDate.parse(data[8],DateTimeFormatter.BASIC_ISO_DATE);
				//Initializing POJO class obj for variable name documentCreateDate using setter.
				obj.setDocumentCreateDate(Date.valueOf(documentCreateDate));
				
				//manipulating the dueIndate to convert it into a correct format.
				String tempDueInDate = data[9].replaceAll("[.]\\d*", "");
				LocalDate dueInDate = LocalDate.parse(tempDueInDate,DateTimeFormatter.BASIC_ISO_DATE);
				//Initializing POJO class obj for variable name dueIndate using setter.
				obj.setDueInDate(Date.valueOf(dueInDate));
				
				//Retrieving Invoice Currency
				String invoiceCurrency = data[10];
				//Initializing POJO class obj for variable name Invoice Currency using setter.
				obj.setInvoiceCurrency(invoiceCurrency);
				
				//Retrieving Document Type
				String documentType = data[11];
				//Initializing POJO class obj for variable name Document Currency using setter.
				obj.setDocumentType(documentType);
				
				//manipulating the Posting Id to convert it into a correct format.
				String tempPostingId = data[12].replaceAll("[.]\\d*", "");
				byte postingId = Byte.parseByte(tempPostingId);
				//Initializing POJO class obj for variable name Posting Id using setter.
				obj.setPostingId(postingId);
				
				//As area business field is null for every record
				String areaBuisness = null;
				//Initializing POJO class obj for variable name Area Business using setter.
				obj.setAreaBuisness(areaBuisness);
				
				//Retrieving totalOpenAmount and parsing it in correct format
				double totalOpenAmount = Double.parseDouble(data[14]);
				//Initializing POJO class obj for variable name Total Open Amount using setter.
				obj.setTotalOpenAmount(totalOpenAmount);
				
				//manipulating the baselineCreateDate to convert it into a correct format.
				String tempBaselineCreateDate = data[15].replaceAll("[.]\\d*", "");
				LocalDate baselineCreateDate = LocalDate.parse(tempBaselineCreateDate,DateTimeFormatter.BASIC_ISO_DATE);
				//Initializing POJO class obj for variable name baseline create date using setter.
				obj.setBaselineCreateDate(Date.valueOf(baselineCreateDate));
				
				//Retrieving custPaymentTerms
				String custPaymentTerms = data[16];
				//Initializing POJO class obj for variable name custPaymentTerms using setter.
				obj.setCustPaymentTerms(custPaymentTerms);
				
				//Retrieving invoiceId after checking some condition
				String tempInvoiceId1 = data[17];
				long invoiceId = 0;
				//Checking if tempInvoiceId is Empty 
				if(tempInvoiceId1.isEmpty())
					//If empty , then assigning it to 0
					invoiceId = 0;
					
				else {
					//If not empty, then manipulating the invoiceId in correct format
					String tempInvoiceId = data[17].replaceAll("[.]\\d*", "");
					invoiceId = Long.parseLong(tempInvoiceId) ;
				}
				//Initializing POJO class obj for variable name invoiceId using setter.
				obj.setInvoiceId(invoiceId);
				
				//Retrieving isOpen 
				byte isOpen = Byte.parseByte(data[18]);
				//Initializing POJO class obj for variable name isOpen using setter.
				obj.setIsOpen(isOpen);
				
				
				//Preparing Statement for batch
				preparedStatement.setString(1, obj.getBusinessCode());
				preparedStatement.setString(2, obj.getCustNumber());
				preparedStatement.setString(3, obj.getCustomerName());
				if(flag == 1)
					preparedStatement.setString(4, tempClearDate);
				else if(flag == 0)
					preparedStatement.setTimestamp(4, obj.getClearDate());
				preparedStatement.setInt(5, obj.getBuisnessYear());
				preparedStatement.setLong(6, obj.getDocId());
				preparedStatement.setDate(7, obj.getPostingDate());
				preparedStatement.setDate(8, obj.getDocumentCreateDate());
				preparedStatement.setDate(9, obj.getDueInDate());
				preparedStatement.setString(10, obj.getInvoiceCurrency().toString());
				preparedStatement.setString(11, obj.getDocumentType());
				preparedStatement.setByte(12,  obj.getPostingId());
				preparedStatement.setString(13, obj.getAreaBuisness());
				preparedStatement.setDouble(14, obj.getTotalOpenAmount());
				preparedStatement.setDate(15, obj.getBaselineCreateDate());
				preparedStatement.setString(16, obj.getCustPaymentTerms());
				preparedStatement.setLong(17, obj.getInvoiceId());
				preparedStatement.setByte(18, obj.getIsOpen());
				
				
				//Batch Created
				preparedStatement.addBatch();
				count++;
				
				if(count % batch == 0) {
					//Executing the batch if the count = 5000
					preparedStatement.executeBatch();
					count = 0;
				}
			
				
			}
			//If there are query left to execute, then it will execute for the last time.
			if(count != 0)
				preparedStatement.executeBatch();
			
			//If all goes well... It will show successful message
			System.out.println("Successfully inserted all records");
			
			
		//Handling Exception
		}catch(SQLException e) {
			e.printStackTrace();
		 
		}
		catch (Exception e) {
			e.printStackTrace();
		}finally{
			//After Executing all the above code, checking whether preparedStatement is null or not. If it is 
			//not null then closing preparedStatement a.
			try{
				if(preparedStatement!=null)
					preparedStatement.close();
			}catch(SQLException se2){
				se2.printStackTrace();
			}
			
		}
		
	}

}
