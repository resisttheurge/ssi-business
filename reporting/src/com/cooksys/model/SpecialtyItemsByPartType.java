package com.cooksys.model;

import static com.cooksys.util.DataUtil.convertHeaderYear;
import static com.cooksys.util.DataUtil.convertRaw;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.cooksys.test.VariableGenerator;

public class SpecialtyItemsByPartType implements VariableGenerator<SpecialtyItemsByPartType>
{
	
	String partType;
	String customer;
	String prefix;
	String year;
	String label;
	String drawing;
	String title;
	

	@Override
	public List<SpecialtyItemsByPartType> generateVariables(ResultSet rawData)
	{
		ArrayList<SpecialtyItemsByPartType> itemList = new ArrayList<SpecialtyItemsByPartType>();
		
		try
		{
			while(rawData.next())
			{
				SpecialtyItemsByPartType item = new SpecialtyItemsByPartType();
				
				item.partType = convertRaw(rawData.getString(1));
				item.customer = convertRaw(rawData.getString(2));
				item.prefix = convertRaw(rawData.getString(3));
				item.year = convertHeaderYear(rawData.getDate(4));
				item.label = convertRaw(rawData.getString(5));
				item.drawing = convertRaw(rawData.getString(6));
				item.title = convertRaw(rawData.getString(7));
				
				itemList.add(item);
			}
			
			
		} catch (Exception e)
		{
			e.printStackTrace();
		}
		
		return itemList;
		
	}


	public String getPartType()
	{
		return partType;
	}


	public void setPartType(String partType)
	{
		this.partType = partType;
	}


	public String getCustomer()
	{
		return customer;
	}


	public void setCustomer(String customer)
	{
		this.customer = customer;
	}


	public String getPrefix()
	{
		return prefix;
	}


	public void setPrefix(String prefix)
	{
		this.prefix = prefix;
	}


	public String getYear()
	{
		return year;
	}


	public void setYear(String year)
	{
		this.year = year;
	}


	public String getLabel()
	{
		return label;
	}


	public void setLabel(String label)
	{
		this.label = label;
	}


	public String getDrawing()
	{
		return drawing;
	}


	public void setDrawing(String drawing)
	{
		this.drawing = drawing;
	}


	public String getTitle()
	{
		return title;
	}


	public void setTitle(String title)
	{
		this.title = title;
	}

}
