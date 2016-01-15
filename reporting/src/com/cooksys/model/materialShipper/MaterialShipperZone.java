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
		if(Integer.valueOf(number) == Integer.valueOf(o.getNumber()))
			return 0;
		else if(Integer.valueOf(number) > Integer.valueOf(o.getNumber()))
			return 1;
		else
			return -1;
	}

	@Override
	public int hashCode()
	{
		final int prime = 31;
		int result = 1;
		result = prime * result + ((number == null) ? 0 : number.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj)
	{
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MaterialShipperZone other = (MaterialShipperZone) obj;
		if (number == null)
		{
			if (other.number != null)
				return false;
		} else if (!number.equals(other.number))
			return false;
		return true;
	}

}
