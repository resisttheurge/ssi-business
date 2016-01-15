package com.cooksys.reports;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.List;

import com.cooksys.model.LayoutDrawing;
import com.cooksys.model.ManagementReview;
import com.cooksys.model.ProductionSchedule;
import com.cooksys.model.SpecialtyItemsByJob;
import com.cooksys.model.SpecialtyItemsByPartType;
import com.cooksys.model.User;
import com.cooksys.model.Zone;
import com.cooksys.model.materialShipper.MaterialShipper;
import com.cooksys.model.shipment.CustomerJob;
import com.cooksys.test.VariableGenerator;

import pdfGenerator.util.HtmlGenerator;
import pdfGenerator.util.PdfGenerator;

public class ReportUtil<T extends VariableGenerator> implements Reporting<T> {

	public static final ReportUtil<User> TEST_REPORT = new ReportUtil<User>("Test Report", "resources/freemarker_template.html", "users", User.class);
	public static final ReportUtil<LayoutDrawing> LAYOUT_DRAWING = new ReportUtil<LayoutDrawing>("Layout Drawing", "resources/layout_drawing.html", "drawing", LayoutDrawing.class);
	public static final ReportUtil<Zone> ZONE = new ReportUtil<Zone>("Zone", "resources/zone.html", "zone", Zone.class);
	public static final ReportUtil<MaterialShipper> MATERIAL_SHIPPER = new ReportUtil<MaterialShipper>("Material Shipper", "resources/material_shipper.html", "ms", MaterialShipper.class);
	public static final ReportUtil<CustomerJob> SHIP_VIA = new ReportUtil<CustomerJob>("Ship Via", "resources/ship_via.html", "ship", CustomerJob.class);
	public static final ReportUtil<CustomerJob> SHIPMENT = new ReportUtil<CustomerJob>("Shipment", "resources/shipment.html", "ship", CustomerJob.class);
	public static final ReportUtil<ManagementReview> MANAGEMENT_REVIEW = new ReportUtil<ManagementReview>("Management Review", "resources/management_review.html", "mgmt", ManagementReview.class);
	public static final ReportUtil<ProductionSchedule> PRODUCTION_SCHEDULE = new ReportUtil<ProductionSchedule>("Production Schedule", "resources/production_schedule.html", "prod", ProductionSchedule.class);
	public static final ReportUtil<SpecialtyItemsByJob> SPECIALTY_ITEMS_BY_JOB = new ReportUtil<SpecialtyItemsByJob>("Specialty Items By Job", "resources/specialty_items_by_job.html", "job", SpecialtyItemsByJob.class);
	public static final ReportUtil<SpecialtyItemsByPartType> SPECIALTY_ITEMS_BY_PART_TYPE = new ReportUtil<SpecialtyItemsByPartType>("Specialty Items By Part Type", "resources/specialty_items_by_part_type.html", "part", SpecialtyItemsByPartType.class);
	
	private String template;
	private String varName;
	private String reportName;
	private Class<T> model;

	private ReportUtil(String reportName, String template, String varName, Class<T> model) {
		this.template = template;
		this.varName = varName;
		this.reportName = reportName;
		this.model = model;
	};

	private HashMap<String, Object> getVarMap(List<T> varList) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put(varName, varList);
		return map;
	}

	@Override
	public byte[] generate(String... args) {
		
		List varList = null;
		try {
			varList = model.newInstance().generateVariables(args);
		} catch (InstantiationException | IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			String htmlStr = HtmlGenerator.generate(template, getVarMap(varList));
			PdfGenerator.generate(htmlStr, baos);
		} catch (Exception e) {
			System.err.println("Reporting engine failed to generate report for " + reportName);
			e.printStackTrace();
		}
		return baos.toByteArray();
	}

	@Override
	public File generate(File f, String... args) {

		List varList = null;
		try {
			varList = model.newInstance().generateVariables(args);
		} catch (InstantiationException | IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		boolean fileCreateSuccess = true;
		try {
			fileCreateSuccess = f.createNewFile();
		} catch (Exception e) {
			System.err.println("Failed to create file!");
			e.printStackTrace();
		} finally {
			if (!fileCreateSuccess) {
				System.err.println("File already exists!");
				return f;
			}
		}
		try {
			FileOutputStream fos = new FileOutputStream(f);
			String htmlStr = HtmlGenerator.generate(template, getVarMap(varList));
			
			File fun = new File("generatedString.txt");
			fun.delete();
			fun.createNewFile();
			
			new FileOutputStream(fun).write(htmlStr.getBytes());
			
			PdfGenerator.generate(htmlStr, fos);
			
		} catch (Exception e) {
			System.err.println("Reporting engine failed to generate report for " + reportName);
			e.printStackTrace();
		}
		return f;

	}

}
