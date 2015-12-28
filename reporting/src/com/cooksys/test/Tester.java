package com.cooksys.test;

import static com.cooksys.reports.ReportUtil.LAYOUT_DRAWING;
import static com.cooksys.reports.ReportUtil.ZONE;

import java.awt.Desktop;
import java.io.File;
import java.io.IOException;

public class Tester {

	public static void main(String[] args) throws IOException {

		File file = new File("zone.pdf");
		if (file.exists()) {
			file.delete();
		}
		ZONE.generate(file, "1");
//		LAYOUT_DRAWING.generate(file, "1");
//		Desktop.getDesktop().open(file);
	}

}
