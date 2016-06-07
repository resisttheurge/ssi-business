package com.cooksys.model;

import static com.cooksys.util.DataUtil.convertHeaderYear;
import static com.cooksys.util.DataUtil.convertRaw;

import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.cooksys.test.VariableGenerator;

public class ManagementReview implements VariableGenerator<ManagementReview>
{

	String prefix;
	String year;
	String label;
	String customer;
	String city;
	String state;
	String startDate;
	String dueDate;
	String completeDate;
	String status;
	String description;
	
	int onTimeOrders;
	int lateOrders;
	int noStatusOrders;
	
	@Override
	public List<ManagementReview> generateVariables(Connection connection, ResultSet rawData)
	{
		int _onTimeOrders = 0;
		int _lateOrders = 0;
		int _noStatusOrders = 0;

		ArrayList<ManagementReview> mgmtList = new ArrayList<ManagementReview>();

		try
		{


			while (rawData.next())
			{
				ManagementReview mgmtReview = new ManagementReview();
				
				mgmtReview.setPrefix(convertRaw(rawData.getString(1)));
				mgmtReview.setYear(convertHeaderYear(rawData.getDate(2)));
				mgmtReview.setLabel(convertRaw(rawData.getString(3)));
				mgmtReview.setCustomer(convertRaw(rawData.getString(4)));
				mgmtReview.setCity(convertRaw(rawData.getString(5)));
				mgmtReview.setState(convertRaw(rawData.getString(6)));
				mgmtReview.setStartDate(convertRaw(rawData.getDate(7)));
				
				Date dueDate = rawData.getDate(8);
				
				mgmtReview.setDueDate(convertRaw(dueDate));
				
				Date completeDate = rawData.getDate(9);
				
				mgmtReview.setCompleteDate(convertRaw(completeDate));
				mgmtReview.setStatus(convertRaw(rawData.getString(10)));
				mgmtReview.setDescription(convertRaw(rawData.getString(11)));

				if(dueDate == null || completeDate == null)
					_noStatusOrders++;
				else if(dueDate.getTime() >= completeDate.getTime())
					_onTimeOrders++;
				else
					_lateOrders++;

				mgmtList.add(mgmtReview);
			}
		} catch (Exception e)
		{
			e.printStackTrace();
		}
		if(mgmtList.size() > 0) {
			mgmtList.get(0).onTimeOrders = _onTimeOrders;
			mgmtList.get(0).lateOrders = _lateOrders;
			mgmtList.get(0).noStatusOrders = _noStatusOrders;
		}
		return mgmtList;
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

	public String getCustomer()
	{
		return customer;
	}

	public void setCustomer(String customer)
	{
		this.customer = customer;
	}

	public String getCity()
	{
		return city;
	}

	public void setCity(String city)
	{
		this.city = city;
	}

	public String getState()
	{
		return state;
	}

	public void setState(String state)
	{
		this.state = state;
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

	public String getCompleteDate()
	{
		return completeDate;
	}

	public void setCompleteDate(String completeDate)
	{
		this.completeDate = completeDate;
	}

	public String getStatus()
	{
		return status;
	}

	public void setStatus(String status)
	{
		this.status = status;
	}

	public String getDescription()
	{
		return description;
	}

	public void setDescription(String description)
	{
		this.description = description;
	}

	public int getOnTimeOrders()
	{
		return this.onTimeOrders;
	}

	public void setOnTimeOrders(int onTimeOrders)
	{
		this.onTimeOrders = onTimeOrders;
	}

	public int getLateOrders()
	{
		return this.lateOrders;
	}

	public void setLateOrders(int lateOrders)
	{
		this.lateOrders = lateOrders;
	}

	public int getNoStatusOrders()
	{
		return this.noStatusOrders;
	}

	public void setNoStatusOrders(int noStatusOrders)
	{
		this.noStatusOrders = noStatusOrders;
	}

}
