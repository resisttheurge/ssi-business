package com.cooksys.model.materialShipper;

import static com.cooksys.util.DataUtil.convertRaw;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.cooksys.db.Connector;
import com.cooksys.test.VariableGenerator;

public class MaterialShipper implements VariableGenerator<MaterialShipper> {

	private String jobId;
	private String jobName;
	private String jobNumber;
	private ResultSet zoneList;
	private ArrayList<MaterialShipperDrawing> drawingList = new ArrayList<MaterialShipperDrawing>();
	private ArrayList<MaterialShipperShippingGroup> shippingGroupList = new ArrayList<MaterialShipperShippingGroup>();


	@Override
	public List<MaterialShipper> generateVariables(ResultSet rawData) {

		List<MaterialShipper> result = new ArrayList<MaterialShipper>();

		try {

			while (rawData.next()) {

				MaterialShipper item = new MaterialShipper();
				result.add(item);

				item.jobId = convertRaw(rawData.getString(1));
				item.jobName = convertRaw(rawData.getString(2));
				item.jobNumber = convertRaw(rawData.getString(3)) + "-" + convertRaw(rawData.getString(4)) + "-" + convertRaw(rawData.getString(5));

				ResultSet drawingSet = Connector.executeStoredProcedure(new MaterialShipperDrawing(),
						new String[] { item.jobId });

				ResultSet zoneListSet = Connector.executeStoredProcedure("ZoneList", new String[] { item.jobId});
				HashSet<MaterialShipperZone> zoneBaseSet = new HashSet<MaterialShipperZone>();
				
				while(zoneListSet.next())
				{
					MaterialShipperZone zone = new MaterialShipperZone();
					zone.setNumber(zoneListSet.getString(1));
					zone.setQuantity(String.valueOf(0));
					
					zoneBaseSet.add(zone);
				}
				
				while(drawingSet.next())
				{
					MaterialShipperDrawing drawing = new MaterialShipperDrawing();
					
					drawing.setDrawing(convertRaw(drawingSet.getString(1)));
					drawing.setRevision(convertRaw(drawingSet.getString(2)));
					drawing.setDrawingDesc(convertRaw(drawingSet.getString(3)));
					drawing.setRevisionDate(convertRaw(drawingSet.getDate(4)));					
					drawing.setDrawingId(convertRaw(drawingSet.getString(5)));
							
					ResultSet markSet = Connector.executeStoredProcedure(new MaterialShipperMark(),
							new String[] { drawing.getDrawingId() });
					
					while(markSet.next())
					{
						MaterialShipperMark mark = new MaterialShipperMark();
						
						mark.setMarkId(convertRaw(markSet.getString(1)));
						mark.setMark(convertRaw(markSet.getString(2)));
						mark.setJobDesc(convertRaw(markSet.getString(3)));
						mark.setShop(convertRaw(markSet.getString(4)));
						mark.setRequested(convertRaw(markSet.getString(5)));
						mark.setQuantity(convertRaw(markSet.getString(6)));
						mark.setCompleted(convertRaw(markSet.getString(7)));
						mark.setStatus(convertRaw(markSet.getString(8)));
						
						ResultSet zoneSet = Connector.executeStoredProcedure(new MaterialShipperZone(),
								new String[] { mark.getMarkId() });
						
						HashSet<MaterialShipperZone> cloneZone = (HashSet<MaterialShipperZone>) zoneBaseSet.clone();
						
						
						while(zoneSet.next())
						{
							MaterialShipperZone zone = new MaterialShipperZone();
						
							zone.setNumber(convertRaw(zoneSet.getString(1)));
							zone.setQuantity(convertRaw(zoneSet.getString(2)));
							
							cloneZone.remove(zone);
							cloneZone.add(zone);		
						}
						
						mark.getZoneList().addAll(cloneZone);
						
						Collections.sort(mark.getZoneList());
						
						drawing.getMarkList().add(mark);
					}
					
					item.drawingList.add(drawing);
				}
				
				
				
				ResultSet shippingGroupSet = Connector.executeStoredProcedure("MaterialShipperShippingGroup",
						new String[] { item.jobId });

				while(shippingGroupSet.next())
				{
					MaterialShipperShippingGroup shippingGroup = new MaterialShipperShippingGroup();
					
					shippingGroup.setDrawing(convertRaw(shippingGroupSet.getString(1)));
					shippingGroup.setRevision(convertRaw(shippingGroupSet.getString(2)));
					shippingGroup.setDrawingDesc(convertRaw(shippingGroupSet.getString(3)));
					shippingGroup.setRevisionDate(convertRaw(shippingGroupSet.getDate(4)));					
					shippingGroup.setDrawingId(convertRaw(shippingGroupSet.getString(5)));
							
					ResultSet markSet = Connector.executeStoredProcedure(new MaterialShipperShippingGroupItem(),
							new String[] { shippingGroup.getDrawingId() });
					
					while(markSet.next())
					{
						MaterialShipperShippingGroupItem shippingGroupItem = new MaterialShipperShippingGroupItem();
						
						shippingGroupItem.setMarkId(convertRaw(markSet.getString(1)));
						shippingGroupItem.setMark(convertRaw(markSet.getString(2)));
						shippingGroupItem.setJobDesc(convertRaw(markSet.getString(3)));
						shippingGroupItem.setShop(convertRaw(markSet.getString(4)));
						shippingGroupItem.setRequested(convertRaw(markSet.getString(5)));
						shippingGroupItem.setQuantity(convertRaw(markSet.getString(6)));
						shippingGroupItem.setCompleted(convertRaw(markSet.getString(7)));
						shippingGroupItem.setStatus(convertRaw(markSet.getString(8)));
						
						ResultSet zoneList = getZoneList(shippingGroupItem);
						
						HashSet<MaterialShipperZone> cloneZone = (HashSet<MaterialShipperZone>) zoneBaseSet.clone();
						
						
						if(zoneList.next())
						{
							MaterialShipperZone zone = new MaterialShipperZone();
						
							zone.setNumber(convertRaw(zoneList.getString(1)));
							zone.setQuantity(convertRaw(zoneList.getString(2)));
							
							cloneZone.remove(zone);
							cloneZone.add(zone);
							
						}
						
						shippingGroupItem.getZoneList().addAll(cloneZone);
						
						Collections.sort(shippingGroupItem.getZoneList());
						
						shippingGroup.getShippingGroupItemList().add(shippingGroupItem);
					}
					
					item.shippingGroupList.add(shippingGroup);
				}
				
				
				//Collections.sort(item.drawingList);
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return result;
	}


	private ResultSet getZoneList(MaterialShipperShippingGroupItem shippingGroupItem) {
		try {
			if(zoneList == null || zoneList.isLast())
				zoneList = Connector.executeStoredProcedure(new MaterialShipperZone(),
					new String[] { shippingGroupItem.getMarkId() });
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return zoneList;
	}


	public String getJobId() {
		return jobId;
	}


	public void setJobId(String jobId) {
		this.jobId = jobId;
	}


	public String getJobName() {
		return jobName;
	}


	public void setJobName(String jobName) {
		this.jobName = jobName;
	}


	public String getJobNumber() {
		return jobNumber;
	}


	public void setJobNumber(String jobNumber) {
		this.jobNumber = jobNumber;
	}


	public ArrayList<MaterialShipperDrawing> getDrawingList() {
		return drawingList;
	}


	public void setDrawingList(ArrayList<MaterialShipperDrawing> drawingList) {
		this.drawingList = drawingList;
	}


	public ArrayList<MaterialShipperShippingGroup> getShippingGroupList() {
		return shippingGroupList;
	}


	public void setShippingGroupList(ArrayList<MaterialShipperShippingGroup> shippingGroupList) {
		this.shippingGroupList = shippingGroupList;
	}
}
