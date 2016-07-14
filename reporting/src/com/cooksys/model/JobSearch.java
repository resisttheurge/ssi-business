package com.cooksys.model;

import static com.cooksys.util.DataUtil.convertHeaderYear;
import static com.cooksys.util.DataUtil.convertRaw;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.ResultSet;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

import com.cooksys.test.VariableGenerator;

public class JobSearch implements VariableGenerator<JobSearch>
{

	String prefix;
	String year;
	String label;
	String customer;
	String city;
	String state;
	String country;
	String description;
	String contractPrice;
	String cpSumDisplay;
	@Override
	public List<JobSearch> generateVariables(Connection connection, ResultSet rawData)
	{
		BigDecimal _contractPriceSum = new BigDecimal(0);
		ArrayList<JobSearch> jsList = new ArrayList<JobSearch>();

		DecimalFormat contractPriceFormat = new DecimalFormat("#0.00");
		try
		{


			while (rawData.next())
			{
				JobSearch jobSearch = new JobSearch();

				jobSearch.setPrefix(convertRaw(rawData.getString(1)));
				jobSearch.setYear(convertHeaderYear(rawData.getDate(2)));
				jobSearch.setLabel(convertRaw(rawData.getString(3)));
				jobSearch.setCustomer(convertRaw(rawData.getString(4)));
				jobSearch.setCity(convertRaw(rawData.getString(5)));
				jobSearch.setState(convertRaw(rawData.getString(6)));
				jobSearch.setCountry(convertRaw(rawData.getString(7)));
				jobSearch.setDescription(convertRaw(rawData.getString(8)));
				jobSearch.setContractPrice(contractPriceFormat.format(rawData.getBigDecimal(9).doubleValue()));

				_contractPriceSum = _contractPriceSum.add(rawData.getBigDecimal(9));

				jsList.add(jobSearch);
			}
		} catch (Exception e)
		{
			e.printStackTrace();
		}
		if(jsList.size() > 0) {
			jsList.get(0).cpSumDisplay = contractPriceFormat.format(_contractPriceSum.doubleValue());
		}
		return jsList;
	}

	public String getCpSumDisplay() {
		return cpSumDisplay;
	}

	public void setCpSumDisplay(String cpSumDisplay) {
		this.cpSumDisplay = cpSumDisplay;
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

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
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

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getContractPrice() {
		return contractPrice;
	}

	public void setContractPrice(String contractPrice) {
		this.contractPrice = contractPrice;
	}

}
