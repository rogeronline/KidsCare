package com.sap.cdsp.kidscare.crawl.crawler.wangyi;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

import org.apache.log4j.Logger;

import com.sap.cdsp.kidscare.crawl.util.CrawlerConfig;

public class WangYiCrawler implements Runnable {
	private Logger logger = Logger.getLogger(WangYiCrawler.class.getName());
	
	 @Override
	    public void run() {
		 try{
			  String filename = CrawlerConfig.getValue("wangyi_config_file");
			  InputStream stream = getClass().getResourceAsStream(filename);
			  BufferedReader in = new BufferedReader(new InputStreamReader(stream));
			  int seedCount = Integer.parseInt(in.readLine());
			  Thread[] thread = new Thread[seedCount];
			  String curr =null;
			  int i = 0;
			  while((curr=in.readLine())!=null){
				  StringTokenizer token = new StringTokenizer(curr);
				  thread[i] = new Thread(new WangYiCrawlerEntry(token.nextToken(),token.nextToken()));
			  }
			 
		 }catch(IOException ex){
			 
		 }
		 
		
	 }

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
