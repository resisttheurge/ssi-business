package com.cooksys.db;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.cooksys.test.VariableGenerator;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;

public class Connector {

    private Connector() {

    }

    public static <T extends VariableGenerator> ResultSet executeStoredProcedure(Connection connection, T type, String[] args) {

        try {
            CallableStatement callableStatement = connection.prepareCall(type.getStoredProcedureName(args));

            for (int i = 1; i <= args.length; i++)
                callableStatement.setString(i, args[i - 1]);

            return callableStatement.executeQuery();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return null;
    }

    public static <T extends VariableGenerator> ResultSet executeStoredProcedure(Connection connection, String spName, String[] args) {

        try {
            CallableStatement callableStatement = connection.prepareCall(getStoredProcedureName(spName, args));

            for (int i = 1; i <= args.length; i++)
                callableStatement.setString(i, args[i - 1]);

            return callableStatement.executeQuery();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return null;
    }

    private static String getStoredProcedureName(String sp, String[] argLength) {
        return "{call " + sp + "("
                + String.join(",", Collections.nCopies(argLength != null ? argLength.length : 0, "?")) + ")}";
    }

}
