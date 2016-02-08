package com.cooksys.model.jobShipment;

import static com.cooksys.util.DataUtil.convertHeaderYear;
import static com.cooksys.util.DataUtil.convertRaw;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.cooksys.db.Connector;
import com.cooksys.test.VariableGenerator;

public class JobShipment implements VariableGenerator<JobShipment> {

	String prefix;
	String year;
	String label;
	String shipmentNumber;
	String weight;
	String shipFrom;
	String contact;
	String address;
	String city;
	String state;
	String zip;
	String country;
	String shipmentId;
	String shipVia;
	String billOfLading;
	String date;

	private ArrayList<JobShipmentInfo> jobShipmentInfo = new ArrayList<JobShipmentInfo>();

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

	public String getShipmentNumber() {
		return shipmentNumber;
	}

	public void setShipmentNumber(String shipmentNumber) {
		this.shipmentNumber = shipmentNumber;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	public String getShipFrom() {
		return shipFrom;
	}

	public void setShipFrom(String shipFrom) {
		this.shipFrom = shipFrom;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
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

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getShipmentId() {
		return shipmentId;
	}

	public void setShipmentId(String shipmentId) {
		this.shipmentId = shipmentId;
	}

	public String getShipVia() {
		return shipVia;
	}

	public void setShipVia(String shipVia) {
		this.shipVia = shipVia;
	}

	public String getBillOfLading() {
		return billOfLading;
	}

	public void setBillOfLading(String billOfLading) {
		this.billOfLading = billOfLading;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public ArrayList<JobShipmentInfo> getJobShipmentInfo() {
		return jobShipmentInfo;
	}

	public void setJobShipmentInfo(ArrayList<JobShipmentInfo> jobShipmentInfo) {
		this.jobShipmentInfo = jobShipmentInfo;
	}

	@Override
	public List<JobShipment> generateVariables(ResultSet rawData) {
		ArrayList<JobShipment> result = new ArrayList<JobShipment>();

		try {
			while (rawData.next()) {
				JobShipment item = new JobShipment();
				result.add(item);

				item.prefix = convertRaw(rawData.getString(1));
				item.year = convertHeaderYear(rawData.getDate(2));
				item.label = convertRaw(rawData.getString(3));
				item.shipmentNumber = convertRaw(rawData.getString(4));
				item.weight = convertRaw(rawData.getString(5));
				item.shipFrom = convertRaw(rawData.getString(6));
				item.contact = convertRaw(rawData.getString(7));
				item.address = convertRaw(rawData.getString(8));
				item.city = convertRaw(rawData.getString(9));
				item.state = convertRaw(rawData.getString(10));
				item.zip = convertRaw(rawData.getString(11));
				item.country = convertRaw(rawData.getString(12));
				item.shipmentId = convertRaw(rawData.getString(13));
				item.shipVia = convertRaw(rawData.getString(14));
				item.billOfLading = convertRaw(rawData.getString(15));
				item.date = convertRaw(rawData.getString(16));

				ResultSet jobShipmentInfoSet = Connector.executeStoredProcedure(new JobShipmentInfo(),
						new String[] { item.shipmentId });

				while (jobShipmentInfoSet.next()) {
					JobShipmentInfo jobShipmentInfo = new JobShipmentInfo();

					jobShipmentInfo.setMark(convertRaw(jobShipmentInfoSet.getString(1)));

					if (jobShipmentInfo.getMark().equals("")) {
						jobShipmentInfo.setMark(convertRaw(jobShipmentInfoSet.getString(2)));
					}

					jobShipmentInfo.setDescription(convertRaw(jobShipmentInfoSet.getString(3)));
					jobShipmentInfo.setQtyReqd(convertRaw(jobShipmentInfoSet.getString(4)));
					jobShipmentInfo.setQtyShpd(convertRaw(jobShipmentInfoSet.getString(5)));

					item.getJobShipmentInfo().add(jobShipmentInfo);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;

	}
}
