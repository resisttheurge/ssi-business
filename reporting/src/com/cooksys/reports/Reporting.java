package com.cooksys.reports;

import java.io.File;
import java.sql.Connection;

import com.cooksys.test.VariableGenerator;

public interface Reporting<T extends VariableGenerator> {
	
	File generate(Connection connection, File f, String... args);
	byte[] generate(Connection connection, String... args);
}
