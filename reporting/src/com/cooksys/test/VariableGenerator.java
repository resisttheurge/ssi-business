package com.cooksys.test;

import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.cooksys.db.Connector;

public interface VariableGenerator<T> {
	
	public static final SimpleDateFormat mdyFormat = new SimpleDateFormat("MM/dd/yyyy");
	
	public default List<T> generateVariables(String[] args) {
		
		ResultSet set = Connector.executeStoredProcedure(this, args);
		
		return set != null ? generateVariables(set) : new ArrayList<T>();
	}
	
	public default String getStoredProcedureName(String[] argLength)
	{
		return "{call " + getStoredProcedureName() + "(" + String.join(",", Collections.nCopies(argLength != null ? argLength.length : 0, "?")) + ")}";
	}
	
	public default String getStoredProcedureName()
	{
		return getClass().getSimpleName();
	}

	List<T> generateVariables(ResultSet rawData);
}
