package com.cooksys.model.materialShipper;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.cooksys.test.VariableGenerator;

public class MaterialShipperShippingGroupItem implements VariableGenerator<MaterialShipperShippingGroupItem>{

	private String markId;
	private String mark;
	private String jobDesc;
	private String shop;
	private String requested;
	private String quantity;
	private String completed;
	private String status;
	
	ArrayList<MaterialShipperZone> zoneList = new ArrayList<MaterialShipperZone>();
	
	public String getMark() {
		return mark;
	}
	public void setMark(String mark) {
		this.mark = mark;
	}
	public String getJobDesc() {
		return jobDesc;
	}
	public void setJobDesc(String jobDesc) {
		this.jobDesc = jobDesc;
	}
	public String getShop() {
		return shop;
	}
	public void setShop(String shop) {
		this.shop = shop;
	}
	public String getRequested() {
		return requested;
	}
	public void setRequested(String requested) {
		this.requested = requested;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public String getCompleted() {
		return completed;
	}
	public void setCompleted(String completed) {
		this.completed = completed;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getBalance() {
		return String.valueOf(Integer.valueOf(requested) - Integer.valueOf(quantity));
	}
	public ArrayList<MaterialShipperZone> getZoneList() {
		return zoneList;
	}
	public void setZoneList(ArrayList<MaterialShipperZone> zoneList) {
		this.zoneList = zoneList;
	}
	@Override
	public List<MaterialShipperShippingGroupItem> generateVariables(ResultSet rawData) {
		// TODO Auto-generated method stub
		return null;
	}
	public String getMarkId() {
		return markId;
	}
	public void setMarkId(String markId) {
		this.markId = markId;
	}
}
