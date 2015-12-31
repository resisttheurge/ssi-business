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

//		LAYOUT_DRAWING.generate(file, "1");
//		ZONE.generate(file, "1");
//		MATERIAL_SHIPPER.generate(file, "1");
//		SHIP_VIA.generate(file, "1");
//		SHIPMENT.generate(file, "1");
//		MANAGEMENT_REVIEW.generate(file, "2010-09-12", "2015-12-30");
//		PRODUCTION_SCHEDULE.generate(file, "11/29/2015");
//		SPECIALTY_ITEMS_BY_JOB.generate(file, "1");
//		SPECIALTY_ITEMS_BY_PART_TYPE.generate(file, "LEADING TROLLEY");
		Desktop.getDesktop().open(file);
	}

}
