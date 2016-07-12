package com.cooksys.test;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;

import static com.cooksys.reports.ReportUtil.*;

import java.awt.Desktop;
import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Tester {

    public static void main(String[] args) throws IOException, SQLException, ClassNotFoundException {

        Config conf = ConfigFactory.load().getConfig("database.test");

        Class.forName(conf.getString("driver"));
        Connection connection = DriverManager.getConnection(conf.getString("url"), conf.getString("user"),
                conf.getString("password"));

        File file = new File("test.pdf");
        if (file.exists()) {
            file.delete();
        }

//		COMPUTER_DRAWING.generate(connection, file, "12942");
//		DETAIL_DRAWING.generate(connection, file, "12942");
//		JOB_SHIPMENT.generate(connection, file, "12942","16");//need bill of lading etc
//		LAYOUT_DRAWING.generate(connection, file, "12942");
//		MANAGEMENT_REVIEW.generate(connection, file, "2015-08-01", "2016-01-11");
//		MATERIAL_SHIPPER.generate(connection, file, "35");
//		PRODUCTION_SCHEDULE.generate(connection, file, "11/29/2015");
//		SHIP_VIA.generate(connection, file, "12942");
//		SHIPMENT.generate(connection, file, "12942");
//		SHIPPING_GROUP_SHIPPER.generate(connection, file, "12942","23844");//need bill of lading etc
//		SPECIALTY_ITEMS_BY_JOB.generate(connection, file, "128");
//		SPECIALTY_ITEMS_BY_PART_TYPE.generate(connection, file, "COVER PLATE SUPPORT DETAILS"); 	//Should job be in rows
//		ZONE.generate(connection, file, "12942");

        Desktop.getDesktop().open(file);
    }
}