package com.cooksys.model.shipment;

import java.sql.Connection;
import java.sql.ResultSet;
import java.util.List;

import com.cooksys.test.VariableGenerator;

public class Shipment implements VariableGenerator<Shipment>{
	
	String number;
	String shipDate;
	String shop;
	String shipVia;
	String weight;
	String billOfLading;
	String posted;
	
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getShipDate() {
		return shipDate;
	}
	public void setShipDate(String shipDate) {
		this.shipDate = shipDate;
	}
	public String getShop() {
		return shop;
	}
	public void setShop(String shop) {
		this.shop = shop;
	}
	public String getShipVia() {
		return shipVia;
	}
	public void setShipVia(String shipVia) {
		this.shipVia = shipVia;
	}
	public String getWeight() {
		return weight;
	}
	public void setWeight(String weight) {
		this.weight = weight;
	}
	public String getBillOfLading() {
		return billOfLading;
	}
	public void setBillOfLading(String billOfLading) {
		this.billOfLading = billOfLading;
	}
	public String getPosted() {
		return posted;
	}
	public void setPosted(String posted) {
		this.posted = posted;
	}
	@Override
	public List<Shipment> generateVariables(Connection connection, ResultSet rawData)
	{
		// TODO Auto-generated method stub
		return null;
	}
	

}
