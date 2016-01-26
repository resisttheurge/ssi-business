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
	String shop;
	String revisionDate;
	String startDate;
	String shopDate;
	String fieldDate;
	String drawingType;
	String tagType;

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

	public String getShop() {
		return shop;
	}

	public void setShop(String shop) {
		this.shop = shop;
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

	public String getDrawingType() {
		return drawingType;
	}

	public void setDrawingType(String drawingType) {
		this.drawingType = drawingType;
	}

	public String getTagType() {
		return tagType;
	}

	public void setTagType(String tagType) {
		this.tagType = tagType;
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
				item.shop = convertRaw(rawData.getString(4));
				item.revisionDate = convertRaw(rawData.getDate(5));
				item.startDate = convertRaw(rawData.getDate(6));
				item.shopDate = convertRaw(rawData.getDate(7));
				item.fieldDate = convertRaw(rawData.getDate(8));
				item.drawingType = convertRaw(rawData.getString(9));
				item.tagType = convertRaw(rawData.getString(10));

				result.add(item);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}

}
