package com.cooksys.model;

import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import static com.cooksys.util.DataUtil.*;

import com.cooksys.db.Connector;
import com.cooksys.test.VariableGenerator;

import freemarker.template.utility.StringUtil;

public class ProductionSchedule implements VariableGenerator<ProductionSchedule>
{
	String customer;
	String prefix;
	String year;
	String label;
	String startDate;
	String dueDate;
	String engStart;
	String engComp;
	String mechStart;
	String mechComp;
	String eleStart;
	String eleComp;
	String shipStart;
	String shipComp;
	String instStart;
	String instComp;
	String description;
	String city;
	String state;
	
	static String weekEnding;
	
	@Override
	public List<ProductionSchedule> generateVariables(Connection connection, String[] args)
	{
		weekEnding = args[0];
		
		ResultSet set = Connector.executeStoredProcedure(connection, this, new String[]{});
		
		return set != null ? generateVariables(connection, set) : new ArrayList<ProductionSchedule>();
	}
	
	@Override
	public List<ProductionSchedule> generateVariables(Connection connection, ResultSet rawData)
	{
		ArrayList<ProductionSchedule> result = new ArrayList<ProductionSchedule>();
		
		try
		{
			while(rawData.next())
			{
				ProductionSchedule prod = new ProductionSchedule();
				
				prod.setCustomer(StringUtils.substring(convertRaw(rawData.getString(1)), 0, 15));
				prod.setPrefix(convertRaw(rawData.getString(2)));
				prod.setYear(convertHeaderYear(rawData.getDate(3)));
				prod.setLabel(convertRaw(rawData.getString(4)));
				prod.setStartDate(convertRaw(rawData.getDate(5)));
				prod.setDueDate(convertRaw(rawData.getDate(6)));
				prod.setEngStart(convertRaw(rawData.getDate(7)));
				prod.setEngComp(convertRaw(rawData.getDate(8)));
				prod.setMechStart(convertRaw(rawData.getDate(9)));
				prod.setMechComp(convertRaw(rawData.getDate(10)));
				prod.setEleStart(convertRaw(rawData.getDate(11)));
				prod.setEleComp(convertRaw(rawData.getDate(12)));
				prod.setShipStart(convertRaw(rawData.getDate(13)));
				prod.setShipComp(convertRaw(rawData.getDate(14)));
				prod.setInstStart(convertRaw(rawData.getDate(15)));
				prod.setInstComp(convertRaw(rawData.getDate(16)));
				prod.setDescription(convertRaw(rawData.getString(17)));
				prod.setCity(convertRaw(rawData.getString(18)));
				prod.setState(convertRaw(rawData.getString(19)));
				
				result.add(prod);
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		return result;
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

	public String getStartDate()
	{
		return startDate;
	}

	public void setStartDate(String startDate)
	{
		this.startDate = startDate;
	}

	public String getDueDate()
	{
		return dueDate;
	}

	public void setDueDate(String dueDate)
	{
		this.dueDate = dueDate;
	}

	public String getEngStart()
	{
		return engStart;
	}

	public void setEngStart(String engStart)
	{
		this.engStart = engStart;
	}

	public String getEngComp()
	{
		return engComp;
	}

	public void setEngComp(String engComp)
	{
		this.engComp = engComp;
	}

	public String getMechStart()
	{
		return mechStart;
	}

	public void setMechStart(String mechStart)
	{
		this.mechStart = mechStart;
	}

	public String getMechComp()
	{
		return mechComp;
	}

	public void setMechComp(String mechComp)
	{
		this.mechComp = mechComp;
	}

	public String getEleStart()
	{
		return eleStart;
	}

	public void setEleStart(String eleStart)
	{
		this.eleStart = eleStart;
	}

	public String getEleComp()
	{
		return eleComp;
	}

	public void setEleComp(String eleComp)
	{
		this.eleComp = eleComp;
	}

	public String getShipStart()
	{
		return shipStart;
	}

	public void setShipStart(String shipStart)
	{
		this.shipStart = shipStart;
	}

	public String getShipComp()
	{
		return shipComp;
	}

	public void setShipComp(String shipComp)
	{
		this.shipComp = shipComp;
	}

	public String getInstStart()
	{
		return instStart;
	}

	public void setInstStart(String instStart)
	{
		this.instStart = instStart;
	}

	public String getInstComp()
	{
		return instComp;
	}

	public void setInstComp(String instComp)
	{
		this.instComp = instComp;
	}

	public String getDescription()
	{
		return description;
	}

	public void setDescription(String description)
	{
		this.description = description;
	}

	public String getWeekEnding()
	{
		return weekEnding;
	}

	public void setWeekEnding(String weekEnding)
	{
		ProductionSchedule.weekEnding = weekEnding;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

}
