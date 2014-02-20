package com.sap.cdsp.kidscare.util;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Map;

import org.apache.commons.dbcp.BasicDataSource;

public class DataSource {

	private static BasicDataSource ds;

	private static String connectionURL;

	private static String userName;

	private static String password;
	
	private static String defaultSchema;

	public static Connection getConnection() throws SQLException {
		if (ds == null) {
			synchronized (DataSource.class) {
				ds = new BasicDataSource();
				ds.setDriverClassName("com.sap.db.jdbc.Driver");
				if (connectionURL == null || userName == null || password == null) {
					//throw new RuntimeException("Datasource connection information is not initialized");
					myInit();
				}
				ds.setUrl(connectionURL);
				ds.setUsername(userName);
				ds.setPassword(password);
				ds.setValidationQuery("select top 1 1 from \"SYS\".\"CS_TABLES_\"");
				ds.setInitialSize(60); 
				ds.setMaxActive(80);
				ds.setMaxIdle(20);
				ds.setTestOnBorrow(true);
			}
		}
		Connection connection = ds.getConnection();
		if(defaultSchema != null){
			Statement statement = connection.createStatement();
			statement.execute("set schema " + defaultSchema);
		}
		return connection;
	}

	public static void init(Map<Object, Object> map) {
		userName = (String) map.get("javax.persistence.jdbc.user");
		password = (String) map.get("javax.persistence.jdbc.password");
		connectionURL = (String) map.get("javax.persistence.jdbc.url");
		defaultSchema = (String) map.get("liner.schema");
	}
	//TODO: for basf
	public static void myInit() {
		userName = "SYSTEM";
		password = "manager";
		//connectionURL = "jdbc:sap://10.128.80.149:30015?reconnect=true";
		connectionURL = "jdbc:sap://10.58.13.8:30015?reconnect=true";
		defaultSchema = "KIDSCARE_DEV";
	}
	
	public static void close(){
		if(ds != null && !ds.isClosed()){
			try {
				ds.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}finally{
				ds = null;
			}
		}
	}
}
