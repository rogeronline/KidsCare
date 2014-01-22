package com.sap.cdsp.kidscare.crawl.dao;

import java.sql.Connection;
import java.sql.SQLException;

import com.sap.cdsp.kidscare.crawl.dbconn.DBConnectionFactory;

public abstract class AppDAO 
{
	protected Connection conn;

	public AppDAO()
	{
		conn = DBConnectionFactory.getConnection();
		PrepareSql();
	}
	
	protected abstract void PrepareSql();
	
	public void closeConn()
	{
		try 
		{
			if( conn != null && !conn.isClosed() )
			{
				conn.close();
				conn = null;
			}
		} 
		catch (SQLException e) 
		{
			e.printStackTrace();
		}
	}
}