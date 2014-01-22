package com.sap.cdsp.kidscare.crawl.util;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class CrawlerConfig 
{
	
	private Properties props;
	private static CrawlerConfig crawlerConfig; 

	
	private CrawlerConfig(){}
	
	public Properties getProps() {
		return props;
	}
	
	public String getPropValue(String key)
	{
		return props.getProperty(key);
	}
	
	public static String getValue(String key)
	{
		getInstance();
		return crawlerConfig.getPropValue(key);
	}
	
	public static CrawlerConfig getInstance(){
		try{
			if(crawlerConfig == null || crawlerConfig.getProps() == null || crawlerConfig.getProps().size() == 0){
				crawlerConfig = new CrawlerConfig();
				crawlerConfig.initial();
			}
			
			return crawlerConfig;
		}
		catch(IOException e){
			throw new RuntimeException("Create crawler config instance fail!!", e);
		}
		
	}
	
	private void initial() throws IOException{
		props = new Properties();
		// Get Properties file from jar file inside
		InputStream propIn = CrawlerConfig.class.getResourceAsStream("/config.properties");
		if(propIn == null){
			// Get Properties file outside jar file
			System.out.println("Load prop outside");
			propIn = new FileInputStream("./config.properties");
		}
		props.load(propIn);
		
	}
	

}
