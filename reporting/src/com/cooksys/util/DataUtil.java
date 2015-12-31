package com.cooksys.util;

import static org.apache.commons.lang3.StringEscapeUtils.escapeHtml4;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.google.common.base.Strings;

public class DataUtil {
	private static final SimpleDateFormat mdyFormat = new SimpleDateFormat("MM/dd/yyyy");

	public static String convertRaw(String data){
		return escapeHtml4(Strings.nullToEmpty(data));
	}
	
	public static String convertRaw(int data){
		return convertRaw(String.valueOf(data));
	}
	
	public static String convertRaw(Date data){
		return data == null ? "" : mdyFormat.format(data);
	}
	
	public static String convertHeaderYear(Date data){
		//magic numbers lol read the getYear() javadoc
		return data == null ? "" : String.valueOf(data.getYear() - 100);
	}
}