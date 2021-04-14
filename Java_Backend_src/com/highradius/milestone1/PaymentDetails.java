package com.highradius.milestone1;

import java.sql.Date;
import java.sql.Timestamp;

//Creating POJO class name as Payment Details
public class PaymentDetails {
	
	//Creating all necessary details
	private String businessCode;
	private String custNumber;
	private String customerName;
	private Timestamp clearDate;
	private int buisnessYear;
	private long docId;
	private Date postingDate;
	private Date documentCreateDate;
	private Date dueInDate;
	private String invoiceCurrency;
	private String documentType;
	private byte postingId;
	private String areaBuisness;
	private double totalOpenAmount;
	private Date baselineCreateDate;
	private String custPaymentTerms;
	private long invoiceId;
	private byte isOpen;
	private String notes;
	
	
	//Default Constructor
	PaymentDetails(){}
	
	//Creating all setters and getters
	public String getBusinessCode() {
		return businessCode;
	}
	public void setBusinessCode(String businessCode) {
		this.businessCode = businessCode;
	}
	public String getCustNumber() {
		return custNumber;
	}
	public void setCustNumber(String custNumber) {
		this.custNumber = custNumber;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public Timestamp getClearDate() {
		return clearDate;
	}
	public void setClearDate(Timestamp clearDate) {
		this.clearDate = clearDate;
	}
	public int getBuisnessYear() {
		return buisnessYear;
	}
	public void setBuisnessYear(int buisnessYear) {
		this.buisnessYear = buisnessYear;
	}
	public long getDocId() {
		return docId;
	}
	public void setDocId(long docId) {
		this.docId = docId;
	}
	public Date getPostingDate() {
		return postingDate;
	}
	public void setPostingDate(Date postingDate) {
		this.postingDate = postingDate;
	}
	public Date getDocumentCreateDate() {
		return documentCreateDate;
	}
	public void setDocumentCreateDate(Date documentCreateDate) {
		this.documentCreateDate = documentCreateDate;
	}
	public Date getDueInDate() {
		return dueInDate;
	}
	public void setDueInDate(Date dueInDate) {
		this.dueInDate = dueInDate;
	}
	public String getInvoiceCurrency() {
		return invoiceCurrency;
	}
	public void setInvoiceCurrency(String invoiceCurrency) {
		this.invoiceCurrency = invoiceCurrency;
	}
	public String getDocumentType() {
		return documentType;
	}
	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}
	public byte getPostingId() {
		return postingId;
	}
	public void setPostingId(byte postingId) {
		this.postingId = postingId;
	}
	public String getAreaBuisness() {
		return areaBuisness;
	}
	public void setAreaBuisness(String areaBuisness) {
		this.areaBuisness = areaBuisness;
	}
	public double getTotalOpenAmount() {
		return totalOpenAmount;
	}
	public void setTotalOpenAmount(double totalOpenAmount) {
		this.totalOpenAmount = totalOpenAmount;
	}
	public Date getBaselineCreateDate() {
		return baselineCreateDate;
	}
	public void setBaselineCreateDate(Date baselineCreateDate) {
		this.baselineCreateDate = baselineCreateDate;
	}
	public String getCustPaymentTerms() {
		return custPaymentTerms;
	}
	public void setCustPaymentTerms(String custPaymentTerms) {
		this.custPaymentTerms = custPaymentTerms;
	}
	public long getInvoiceId() {
		return invoiceId;
	}
	public void setInvoiceId(long invoiceId) {
		this.invoiceId = invoiceId;
	}
	public byte getIsOpen() {
		return isOpen;
	}
	public void setIsOpen(byte isOpen) {
		this.isOpen = isOpen;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	

}
