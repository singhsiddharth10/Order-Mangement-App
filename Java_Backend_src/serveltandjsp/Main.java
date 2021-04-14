package serveltandjsp;

import java.util.ArrayList;

public class Main {
	
	public static ArrayList<StudentDetails> getDetails (){
		ArrayList<StudentDetails> recordLists = new ArrayList<>();
		
		StudentDetails obj = new StudentDetails();
		StudentDetails obj1 = new StudentDetails();
		
		obj.setRollNo(1);
		obj.setName("Abc");
		obj.setBranch("IT");
		obj.setSubject1(88);
		obj.setSubject2(79);
		
		recordLists.add(obj);
		
		obj1.setRollNo(2);
		obj1.setName("Xyz");
		obj1.setBranch("ETC");
		obj1.setSubject1(95);
		obj1.setSubject2(84);
		
		recordLists.add(obj1);
		
		return recordLists;
	}

}
