package com.cooksys.model.shipment;

import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.cooksys.db.Connector;
import com.cooksys.test.VariableGenerator;

import static com.cooksys.util.DataUtil.*;

public class CustomerJob implements VariableGenerator<CustomerJob>
{
	
	String jobId;
	String customer;
	String prefix;
	String label;
	String year;
	
	double totalWeight;
	double entries;
	
	HashMap<String, ArrayList<Shipment>> shipmentByCarrier = new HashMap<String, ArrayList<Shipment>>();
	HashMap<String, Double> subtotalByCarrier = new HashMap<String, Double>();

	@Override
	public List<CustomerJob> generateVariables(Connection connection, ResultSet rawData)
	{

		ArrayList<CustomerJob> result = new ArrayList<CustomerJob>();
		result.add(this);
		
		try
		{
			rawData.next();

			jobId = convertRaw(rawData.getString(1));
			customer = convertRaw(rawData.getString(2));
			prefix = convertRaw(rawData.getString(3));
			year = convertHeaderYear(rawData.getDate(4));
			label = convertRaw(rawData.getString(5));
			
			ResultSet shipmentSet = Connector.executeStoredProcedure(connection, new Shipment(), new String[]{jobId});
			
			while(shipmentSet.next())
			{
				Shipment shipment = new Shipment();
				
				shipment.setNumber(convertRaw(shipmentSet.getString(1)));
				shipment.setShipDate(convertRaw(shipmentSet.getString(2)));
				shipment.setShop(convertRaw(shipmentSet.getString(3)));
				shipment.setShipVia(convertRaw(shipmentSet.getString(4)));
				shipment.setWeight(convertRaw(shipmentSet.getString(5)));
				shipment.setBillOfLading(convertRaw(shipmentSet.getString(6)));
				shipment.setPosted(convertRaw(shipmentSet.getString(7)));
				
				addShipment(shipment);
			}
			
		} catch (Exception e)
		{
			e.printStackTrace();
		}

		return result;

	}

	private void addShipment(Shipment shipment)
	{
		ArrayList<Shipment> temp = shipmentByCarrier.get(shipment.getShipVia());

	    if(temp == null){
	        temp = new ArrayList<Shipment>();

	        shipmentByCarrier.put(shipment.getShipVia(), temp);
	    }
	    
	    temp.add(shipment);
	    subtotalByCarrier.put(shipment.getShipVia(), (subtotalByCarrier.get(shipment.getShipVia()) != null ? subtotalByCarrier.get(shipment.getShipVia()) : 0) + Double.valueOf(shipment.getWeight()));
	    
	    totalWeight += Double.valueOf(shipment.getWeight());
	    entries++;
	    
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

	public String getLabel()
	{
		return label;
	}

	public void setLabel(String label)
	{
		this.label = label;
	}

	public String getYear()
	{
		return year;
	}

	public void setYear(String year)
	{
		this.year = year;
	}

	public String getJobId()
	{
		return jobId;
	}

	public void setJobId(String jobId)
	{
		this.jobId = jobId;
	}

	public HashMap<String, ArrayList<Shipment>> getShipmentByCarrier()
	{
		return shipmentByCarrier;
	}

	public void setShipmentByCarrier(HashMap<String, ArrayList<Shipment>> shipmentByCarrier)
	{
		this.shipmentByCarrier = shipmentByCarrier;
	}

	public HashMap<String, Double> getSubtotalByCarrier()
	{
		return subtotalByCarrier;
	}

	public void setSubtotalByCarrier(HashMap<String, Double> subtotalByCarrier)
	{
		this.subtotalByCarrier = subtotalByCarrier;
	}

	public double getTotalWeight()
	{
		return totalWeight;
	}

	public void setTotalWeight(double totalWeight)
	{
		this.totalWeight = totalWeight;
	}

	public double getAverageWeight()
	{
		return totalWeight / entries;
	}
}
