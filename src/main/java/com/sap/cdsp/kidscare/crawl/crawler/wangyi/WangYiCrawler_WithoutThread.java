package com.sap.cdsp.kidscare.crawl.crawler.wangyi;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

import org.apache.log4j.Logger;

import com.sap.cdsp.kidscare.crawl.util.CrawlerConfig;

public class WangYiCrawler_WithoutThread {
	private Logger logger = Logger.getLogger(WangYiCrawler.class.getName());
	
	 
	    public void run() {
		 try{
			 logger.info("test_anna");
			  String filename = CrawlerConfig.getValue("wangyi_config_file");
			  InputStream stream = getClass().getResourceAsStream(filename);
			  BufferedReader in = new BufferedReader(new InputStreamReader(stream));
			  int seedCount = Integer.parseInt(in.readLine());
			  //Thread[] thread = new Thread[seedCount];
			  String curr =null;
			  int i = 0;
			  while((curr=in.readLine())!=null){
				  StringTokenizer token = new StringTokenizer(curr);
				  //thread[i] = new Thread(new WangYiCrawlerEntry(token.nextToken(),token.nextToken()));
				  WangYiCrawlerEntry_WithoutThread oWangYiCrawlerEntry_WithoutThread= new WangYiCrawlerEntry_WithoutThread(token.nextToken(),token.nextToken());
				  oWangYiCrawlerEntry_WithoutThread.run();
				  i++;
			  }
			  in.close();
//			  for(Thread t : thread)
//	    		t.start();
			 
		 }catch(IOException e){
			 //logger.error(e.getMessage());
			 e.printStackTrace();
			 
		 }
		 
		
	 }
	 
	 public static void main(String[] args) {
			
		 WangYiCrawler_WithoutThread oWangYiCrawler_WithoutThread=new WangYiCrawler_WithoutThread();
		 oWangYiCrawler_WithoutThread.run();	
				
			
			
		}

	
}
