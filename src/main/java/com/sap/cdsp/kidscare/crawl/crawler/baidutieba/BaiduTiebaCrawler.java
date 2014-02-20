package com.sap.cdsp.kidscare.crawl.crawler.baidutieba;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

import org.apache.log4j.Logger;

import com.sap.cdsp.kidscare.crawl.util.CrawlerConfig;

public class BaiduTiebaCrawler  {
	private Logger logger = Logger.getLogger(BaiduTiebaCrawler.class.getName());
	
	
	    public void run() {
		 try{
			  String filename = CrawlerConfig.getValue("baidutieba_config_file");
			  InputStream stream = getClass().getResourceAsStream(filename);
			  BufferedReader in = new BufferedReader(new InputStreamReader(stream));
			  int seedCount = Integer.parseInt(in.readLine());
			  Thread[] thread = new Thread[seedCount];
			  String curr =null;
			  int i = 0;
			  while((curr=in.readLine())!=null){
				  StringTokenizer token = new StringTokenizer(curr);
				  thread[i] = new Thread(new BaiduTiebaCrawlerEntry(token.nextToken(),token.nextToken()));
				 
				  i++;
			  }
			  in.close();
			  for(Thread t : thread)
	    		t.start();
			 
		 }catch(IOException e){
			 logger.error(e.getMessage());
			 
		 }
		 
		
	 }
	 
	 public static void main(String[] args) {
			
		 BaiduTiebaCrawler oBaiduTiebaCrawler=new BaiduTiebaCrawler();
		 oBaiduTiebaCrawler.run();	
				
			
			
		}

	
}
