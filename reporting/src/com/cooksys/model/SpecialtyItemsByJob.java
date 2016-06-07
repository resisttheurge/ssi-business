package com.cooksys.model;

import static com.cooksys.util.DataUtil.convertHeaderYear;
import static com.cooksys.util.DataUtil.convertRaw;

import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.cooksys.db.Connector;
import com.cooksys.model.shipment.CustomerJob;
import com.cooksys.test.VariableGenerator;

public class SpecialtyItemsByJob implements VariableGenerator<SpecialtyItemsByJob>
{

	String drawing;
	String title;
	String specialtyItem;

	static String prefix;
	static String label;
	static String year;

	@Override
	public List<SpecialtyItemsByJob> generateVariables(Connection connection, String[] args)
	{

		ResultSet customerHeaderSet = Connector.executeStoredProcedure(connection, new CustomerJob(), args);
		try
		{
			customerHeaderSet.next();

			prefix = convertRaw(customerHeaderSet.getString(3));
			year = convertHeaderYear(customerHeaderSet.getDate(4));
			label = convertRaw(customerHeaderSet.getString(5));

		} catch (Exception e)
		{
			e.printStackTrace();
		}

		return VariableGenerator.super.generateVariables(connection, args);
	}

	@Override
	public List<SpecialtyItemsByJob> generateVariables(Connection connection, ResultSet rawData)
	{
		ArrayList<SpecialtyItemsByJob> itemList = new ArrayList<SpecialtyItemsByJob>();

		try
		{
			while (rawData.next())
			{
				SpecialtyItemsByJob item = new SpecialtyItemsByJob();

				item.setDrawing(convertRaw(rawData.getString(1)));
				item.setTitle(convertRaw(rawData.getString(2)));
				item.setSpecialtyItem(convertRaw(rawData.getString(3)));

				itemList.add(item);
			}
		} catch (Exception e)
		{
			e.printStackTrace();
		}

		return itemList;
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

	public String getSpecialtyItem()
	{
		return specialtyItem;
	}

	public void setSpecialtyItem(String specialtyItem)
	{
		this.specialtyItem = specialtyItem;
	}

	public String getPrefix()
	{
		return prefix;
	}

	public void setPrefix(String prefix)
	{
		SpecialtyItemsByJob.prefix = prefix;
	}

	public String getLabel()
	{
		return label;
	}

	public void setLabel(String label)
	{
		SpecialtyItemsByJob.label = label;
	}

	public String getYear()
	{
		return year;
	}

	public void setYear(String year)
	{
		SpecialtyItemsByJob.year = year;
	}

}
