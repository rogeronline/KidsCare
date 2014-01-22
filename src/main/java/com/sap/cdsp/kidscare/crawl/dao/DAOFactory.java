package com.sap.cdsp.kidscare.crawl.dao;

public class DAOFactory 
{
	
	public static WangYiDAO getWangYiDAO()
	{
		return new WangYiDAO();
	}
}
