package com.sap.cdsp.kidscare.crawl.dao;

public class DAOFactory 
{
	
	public static WangYiDAO getWangYiDAO()
	{
		return new WangYiDAO();
	}
	
	public static BaiduTiebaDAO getBaiduTiebaDAO()
	{
		return new BaiduTiebaDAO();
	}
}
