package com.cooksys.test;

import static com.cooksys.reports.ReportUtil.*;

import java.awt.Desktop;
import java.io.File;
import java.io.IOException;

public class Tester {

	public static void main(String[] args) throws IOException {

		File file = new File("test.pdf");
		if (file.exists()) {
			file.delete();
		}
		
//		COMPUTER_DRAWING.generate(file, "12942");
//		DETAIL_DRAWING.generate(file, "12942");
//		JOB_SHIPMENT.generate(file, "12942","16");//need bill of lading etc
//		LAYOUT_DRAWING.generate(file, "12942");
//		MANAGEMENT_REVIEW.generate(file, "2015-08-01", "2016-01-11");
//		MATERIAL_SHIPPER.generate(file, "35");
//		PRODUCTION_SCHEDULE.generate(file, "11/29/2015");
//		SHIP_VIA.generate(file, "12942");
//		SHIPMENT.generate(file, "12942");
//		SHIPPING_GROUP_SHIPPER.generate(file, "12942","23844");//need bill of lading etc
//		SPECIALTY_ITEMS_BY_JOB.generate(file, "128");
//		SPECIALTY_ITEMS_BY_PART_TYPE.generate(file, "COVER PLATE SUPPORT DETAILS"); 	//Should job be in rows
//		ZONE.generate(file, "12942");
		
		Desktop.getDesktop().open(file);
	}
}