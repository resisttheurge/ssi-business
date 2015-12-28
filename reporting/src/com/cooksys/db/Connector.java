package com.cooksys.db;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.cooksys.test.VariableGenerator;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;

public class Connector {

	private static Connector instance;
	
	Connection connection;
	Logger log = LoggerFactory.getLogger(Connector.class);
	
	private Connector() {
		getConnection();
	}
	
	private void getConnection() {
		
		if (connection == null) {
			Config conf = ConfigFactory.load().getConfig("database.test");
			
			try {
				Class.forName(conf.getString("driver"));
				connection = DriverManager.getConnection(conf.getString("url"), conf.getString("user"),
						conf.getString("password"));
			} catch (ClassNotFoundException | SQLException e) {
				log.info("Error has occured in Connector", e);
			}
		}

	}

	
	
	public static <T extends VariableGenerator> ResultSet executeStoredProcedure(T type, String[] args) {
		
		instance = instance == null ? getInstance() : instance;
		
		try {
			CallableStatement callableStatement = instance.connection.prepareCall(type.getStoredProcedureName(args));
			
			for(int i = 1; i <= args.length; i++)
				callableStatement.setString(i, args[i - 1]);
			
			return callableStatement.executeQuery();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
				
		return null;
	}

	private static Connector getInstance() {
		return new Connector();
	}

}
