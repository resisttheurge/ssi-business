package com.cooksys.model;

import static com.cooksys.util.DataUtil.convertRaw;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.cooksys.test.VariableGenerator;

public class LayoutDrawing implements VariableGenerator<LayoutDrawing> {

	String label;
	String revision;
	String title;
	String shopId;
	String revisionDate;
	String startDate;
	String shopDate;
	String fieldDate;

	
	
	public String getLabel() {
		return label;
	}



	public void setLabel(String label) {
		this.label = label;
	}



	public String getRevision() {
		return revision;
	}



	public void setRevision(String revision) {
		this.revision = revision;
	}



	public String getTitle() {
		return title;
	}



	public void setTitle(String title) {
		this.title = title;
	}



	public String getShopId() {
		return shopId;
	}



	public void setShopId(String shopId) {
		this.shopId = shopId;
	}



	public String getRevisionDate() {
		return revisionDate;
	}



	public void setRevisionDate(String revisionDate) {
		this.revisionDate = revisionDate;
	}



	public String getStartDate() {
		return startDate;
	}



	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}



	public String getShopDate() {
		return shopDate;
	}



	public void setShopDate(String shopDate) {
		this.shopDate = shopDate;
	}



	public String getFieldDate() {
		return fieldDate;
	}



	public void setFieldDate(String fieldDate) {
		this.fieldDate = fieldDate;
	}



	@Override
	public List<LayoutDrawing> generateVariables(ResultSet rawData) {
		
		List<LayoutDrawing> result = new ArrayList<LayoutDrawing>();
		
		try {
			while (rawData.next()) {
				
				LayoutDrawing item = new LayoutDrawing();

				item.label = convertRaw(rawData.getString(1));
				item.revision = convertRaw(rawData.getString(2));
				item.title = convertRaw(rawData.getString(3));
				item.shopId = convertRaw(rawData.getInt(4));
				item.revisionDate = convertRaw(rawData.getDate(5));
				item.startDate = convertRaw(rawData.getDate(6));
				item.shopDate = convertRaw(rawData.getDate(7));
				item.fieldDate = convertRaw(rawData.getDate(8));				
				result.add(item);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}

}
