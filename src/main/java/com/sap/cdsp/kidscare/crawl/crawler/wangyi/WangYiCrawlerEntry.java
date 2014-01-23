package com.sap.cdsp.kidscare.crawl.crawler.wangyi;

import org.apache.log4j.Logger;

import com.sap.cdsp.kidscare.crawl.dao.DAOFactory;
import com.sap.cdsp.kidscare.crawl.dao.WangYiDAO;
import com.sap.cdsp.kidscare.crawl.util.HTTPUtility;

public class WangYiCrawlerEntry implements Runnable{
	private Logger logger = Logger.getLogger(WangYiCrawlerEntry.class.getName());
	private String startUrl = "";

	private String topicCategory = "";
	private WangYiDAO wanYiDAO;
	private HTTPUtility httpUtil;
	
	public WangYiCrawlerEntry(String seedUrl,String category)
	{
		this.topicCategory = category;
		this.startUrl = seedUrl;
		wanYiDAO = DAOFactory.getWangYiDAO();
		
		httpUtil = new HTTPUtility();
	}
	
	@Override
	public void run() {
		try
		{
			while(this.startUrl!=null)
			{
				this.getEntry();
			}
		}
		finally
		{
			wanYiDAO.closeConn();
		}
	}
	
	private void getEntry(){
		
	}

}
