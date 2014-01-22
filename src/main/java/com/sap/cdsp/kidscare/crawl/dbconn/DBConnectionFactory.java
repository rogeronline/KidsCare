package com.sap.cdsp.kidscare.crawl.dbconn;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import com.sap.cdsp.kidscare.crawl.util.CrawlerConfig;

public class DBConnectionFactory 
{
	public static Connection getConnection() 
	{
		Connection conn = null;
		try {
			Class.forName("com.sap.db.jdbc.Driver");
			String DB_IP = CrawlerConfig.getValue("hana_DB_IP");
			String DB_PORT = CrawlerConfig.getValue("hana_DB_port"); 
			String DB_user = CrawlerConfig.getValue("hana_DB_user");
			String DB_password = CrawlerConfig.getValue("hana_DB_password");
			
			String url = "jdbc:" + DB_IP + ":" + DB_PORT + "?reconnect=true&user=" + DB_user + "&password=" + DB_password;
			
			conn = DriverManager.getConnection(url);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return conn;
	}
}
