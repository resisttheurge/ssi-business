package com.cooksys.model.shippingGroupShipper;

import static com.cooksys.util.DataUtil.convertHeaderYear;
import static com.cooksys.util.DataUtil.convertRaw;

import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.cooksys.db.Connector;
import com.cooksys.model.materialShipper.MaterialShipperDrawing;
import com.cooksys.test.VariableGenerator;

public class ShippingGroupShipper implements VariableGenerator<ShippingGroupShipper> {

	String contact;
	String address;
	String city;
	String state;
	String zip;
	String country;
	String prefix;
	String year;
	String label;
	String dateReq;
	String shipperNumber;
	String shipVia;
	String jobId;
	String shippingGroupId;
	String billOfLading;
	String dateShipped;
	String proNo;
	String shop;
	String requestedBy;
	String preparedBy;

	private ArrayList<ShipperInfo> shipperInfo = new ArrayList<ShipperInfo>();

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

	public String getDateReq() {
		return dateReq;
	}

	public void setDateReq(String dateReq) {
		this.dateReq = dateReq;
	}

	public String getShipperNumber() {
		return shipperNumber;
	}

	public void setShipperNumber(String shipperNumber) {
		this.shipperNumber = shipperNumber;
	}

	public ArrayList<ShipperInfo> getShipperInfo() {
		return shipperInfo;
	}

	public void setShipperInfo(ArrayList<ShipperInfo> shipperInfo) {
		this.shipperInfo = shipperInfo;
	}

	public String getShipVia() {
		return shipVia;
	}

	public void setShipVia(String shipVia) {
		this.shipVia = shipVia;
	}

	public String getJobId() {
		return jobId;
	}

	public void setJobId(String jobId) {
		this.jobId = jobId;
	}

	public String getShippingGroupId() {
		return shippingGroupId;
	}

	public void setShippingGroupId(String shippingGroupId) {
		this.shippingGroupId = shippingGroupId;
	}

	public String getBillOfLading() {
		return billOfLading;
	}

	public void setBillOfLading(String billOfLading) {
		this.billOfLading = billOfLading;
	}

	public String getDateShipped() {
		return dateShipped;
	}

	public void setDateShipped(String dateShipped) {
		this.dateShipped = dateShipped;
	}

	public String getProNo() {
		return proNo;
	}

	public void setProNo(String proNo) {
		this.proNo = proNo;
	}
	public String getShop() {
		return shop;
	}

	public void setShop(String shop) {
		this.shop = shop;
	}

	public String getRequestedBy() {
		return requestedBy;
	}

	public void setRequestedBy(String requestedBy) {
		this.requestedBy = requestedBy;
	}

	public String getPreparedBy() {
		return preparedBy;
	}

	public void setPreparedBy(String preparedBy) {
		this.preparedBy = preparedBy;
	}

	@Override
	public List<ShippingGroupShipper> generateVariables(Connection connection, ResultSet rawData) {
		ArrayList<ShippingGroupShipper> result = new ArrayList<ShippingGroupShipper>();

		try {
			while (rawData.next()) {
				ShippingGroupShipper item = new ShippingGroupShipper();
				result.add(item);

				item.contact = convertRaw(rawData.getString(1));
				item.address = convertRaw(rawData.getString(2));
				item.city = convertRaw(rawData.getString(3));
				item.state = convertRaw(rawData.getString(4));
				item.zip = convertRaw(rawData.getString(5));
				item.country = convertRaw(rawData.getString(6));
				item.prefix = convertRaw(rawData.getString(7));
				item.year = convertHeaderYear(rawData.getDate(8));
				item.label = convertRaw(rawData.getString(9));
				item.dateReq = convertRaw(rawData.getDate(10));
				item.shipperNumber = convertRaw(rawData.getString(11));
				item.shipVia = convertRaw(rawData.getString(12));
				item.jobId = convertRaw(rawData.getString(13));
				item.shippingGroupId = convertRaw(rawData.getString(14));
				item.billOfLading = convertRaw(rawData.getString(15));
				item.dateShipped = convertRaw(rawData.getString(16));
				item.proNo = convertRaw(rawData.getString(17));
				item.shop = convertRaw(rawData.getString(18));
				item.requestedBy = convertRaw(rawData.getString(19));
				item.preparedBy = convertRaw(rawData.getString(20));

				ResultSet shipperInfoSet = Connector.executeStoredProcedure(connection, new ShipperInfo(),
						new String[] { item.shippingGroupId });

				while (shipperInfoSet.next()) {
					ShipperInfo shipperInfo = new ShipperInfo();

					shipperInfo.setMark(convertRaw(shipperInfoSet.getString(1)));
					shipperInfo.setQtyReqd(convertRaw(shipperInfoSet.getString(2)));
					shipperInfo.setDescription(convertRaw(shipperInfoSet.getString(3)));
					shipperInfo.setQtyShpd(convertRaw(shipperInfoSet.getString(4)));
					shipperInfo.setRemarks(convertRaw(shipperInfoSet.getString(5)));

					item.getShipperInfo().add(shipperInfo);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;

	}
}
