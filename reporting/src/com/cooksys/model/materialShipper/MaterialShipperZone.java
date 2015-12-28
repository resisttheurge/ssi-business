package com.cooksys.model.materialShipper;

import java.sql.ResultSet;
import java.util.List;

import com.cooksys.test.VariableGenerator;

public class MaterialShipperZone implements VariableGenerator<MaterialShipperZone>, Comparable<MaterialShipperZone>{

	String number;
	String quantity;
	
	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	@Override
	public List<MaterialShipperZone> generateVariables(ResultSet rawData) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int compareTo(MaterialShipperZone o) {
		if(Integer.valueOf(number) > Integer.valueOf(o.getNumber()))
			return 1;
		return -1;
	}

}
