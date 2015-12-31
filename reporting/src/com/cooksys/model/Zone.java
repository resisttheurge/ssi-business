package com.cooksys.model;

import static com.cooksys.util.DataUtil.*;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.cooksys.test.VariableGenerator;

public class Zone implements VariableGenerator<Zone> {

	String number;
	String fieldDate;
	String prefix;
	String year;
	String label;
	

	public String getNumber() {
		return number;
	}




	public void setNumber(String number) {
		this.number = number;
	}




	public String getFieldDate() {
		return fieldDate;
	}




	public void setFieldDate(String fieldDate) {
		this.fieldDate = fieldDate;
	}




	public String getPrefix() {
		return prefix;
	}




	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}




	public String getYear() {
		return year;
	}




	public void setYear(String year) {
		this.year = year;
	}




	public String getLabel() {
		return label;
	}




	public void setLabel(String label) {
		this.label = label;
	}




	@Override
	public List<Zone> generateVariables(ResultSet rawData) {
		
		List<Zone> result = new ArrayList<Zone>();
		
		try {
			while (rawData.next()) {
				
				Zone item = new Zone();

				item.number = convertRaw(rawData.getInt(1));
				item.fieldDate =convertRaw(rawData.getDate(2));
				item.prefix = convertRaw(rawData.getString(3));
				item.year = convertHeaderYear(rawData.getDate(4));
				item.label = convertRaw(rawData.getString(5));
				
				result.add(item);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}

}
