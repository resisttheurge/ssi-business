package com.cooksys.model.materialShipper;

import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.cooksys.test.VariableGenerator;

public class MaterialShipperShippingGroup
		implements VariableGenerator<MaterialShipperShippingGroup>, Comparable<MaterialShipperShippingGroup> {

	String drawing;
	String revision;
	String drawingDesc;
	String revisionDate;
	String drawingId;

	ArrayList<MaterialShipperShippingGroupItem> shippingGroupItemList = new ArrayList<MaterialShipperShippingGroupItem>();

	public String getDrawing() {
		return drawing;
	}

	public void setDrawing(String drawing) {
		this.drawing = drawing;
	}

	public String getRevision() {
		return revision;
	}

	public void setRevision(String revision) {
		this.revision = revision;
	}

	public String getDrawingDesc() {
		return drawingDesc;
	}

	public void setDrawingDesc(String drawingDesc) {
		this.drawingDesc = drawingDesc;
	}

	public String getRevisionDate() {
		return revisionDate;
	}

	public void setRevisionDate(String revisionDate) {
		this.revisionDate = revisionDate;
	}

	public String getDrawingId() {
		return drawingId;
	}

	public void setDrawingId(String drawingId) {
		this.drawingId = drawingId;
	}

	public ArrayList<MaterialShipperShippingGroupItem> getShippingGroupItemList() {
		return shippingGroupItemList;
	}

	public void setMarkList(ArrayList<MaterialShipperShippingGroupItem> ShippingGroupItemList) {
		this.shippingGroupItemList = ShippingGroupItemList;
	}

	@Override
	public List<MaterialShipperShippingGroup> generateVariables(Connection connection, ResultSet rawData) {
		// TODO Auto-generated method stu
		return null;
	}
	
	@Override
	public int compareTo(MaterialShipperShippingGroup o) {
		return 0;
	}

}
