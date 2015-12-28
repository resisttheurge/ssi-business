package com.cooksys.reports;

import java.io.File;

import com.cooksys.test.VariableGenerator;

public interface Reporting<T extends VariableGenerator> {
	
	File generate(File f, String... args);
	byte[] generate(String... args);
}
