package com.cooksys.model.shippingGroupShipper;

import java.sql.ResultSet;
import java.util.List;

import com.cooksys.model.materialShipper.MaterialShipperDrawing;
import com.cooksys.test.VariableGenerator;

public class ShipperInfo
		implements VariableGenerator<ShipperInfo>, Comparable<ShipperInfo> {

	String mark;
	String qtyReqd;
	String description;
	String qtyShpd;
	String remarks;

	public String getMark() {
		return mark;
	}

	public void setMark(String mark) {
		this.mark = mark;
	}

	public String getQtyReqd() {
		return qtyReqd;
	}

	public void setQtyReqd(String qtyReqd) {
		this.qtyReqd = qtyReqd;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getQtyShpd() {
		return qtyShpd;
	}

	public void setQtyShpd(String qtyShpd) {
		this.qtyShpd = qtyShpd;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Override
	public List<ShipperInfo> generateVariables(ResultSet rawData) {
		// TODO Auto-generated method stu
		return null;
	}
	
	@Override
	public int compareTo(ShipperInfo o) {
		return 0;
	}

}
