package com.cooksys.test;

import static com.cooksys.reports.ReportUtil.*;
import static com.cooksys.reports.ReportUtil.ZONE;

import java.awt.Desktop;
import java.io.File;
import java.io.IOException;

public class Tester {

	public static void main(String[] args) throws IOException {

		File file = new File("test.pdf");
		if (file.exists()) {
			file.delete();
		}

//		LAYOUT_DRAWING.generate(file, "35");
//		ZONE.generate(file, "1");											//BROKEN
		MATERIAL_SHIPPER.generate(file, "12942");
//		SHIP_VIA.generate(file, "1");										//BROKEN
//		SHIPMENT.generate(file, "1");										//BROKEN
//		MANAGEMENT_REVIEW.generate(file, "2010-09-12", "2015-12-30");		//BROKEN
//		PRODUCTION_SCHEDULE.generate(file, "11/29/2015");
//		SPECIALTY_ITEMS_BY_JOB.generate(file, "1");							//BROKEN
//		SPECIALTY_ITEMS_BY_PART_TYPE.generate(file, "LEADING TROLLEY");		//BROKEN
		Desktop.getDesktop().open(file);
	}

}
