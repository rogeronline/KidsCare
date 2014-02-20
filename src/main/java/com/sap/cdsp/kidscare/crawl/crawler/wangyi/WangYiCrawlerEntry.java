package com.sap.cdsp.kidscare.crawl.crawler.wangyi;

import java.io.IOException;

import org.apache.log4j.Logger;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.sap.cdsp.kidscare.crawl.dao.DAOFactory;
import com.sap.cdsp.kidscare.crawl.dao.WangYiDAO;
import com.sap.cdsp.kidscare.crawl.model.wangyi.Topic;
import com.sap.cdsp.kidscare.crawl.util.HTTPUtility;

public class WangYiCrawlerEntry implements Runnable  {
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
			if(this.startUrl!=null)
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
		 Document start_doc;
		 Document doc;
		 final String replace_regex = "(/bbs/mmbb/[0-9]*.*$)";
		 Topic newtopic = new Topic();
		 
		 try {
			   newtopic.setTopicTitle(this.topicCategory);
			   httpUtil.setTimeout(10*1000);
			   start_doc = httpUtil.getDocument_jsoup(startUrl, "GBK");
			   Element oElement_hot = start_doc.select("#tie_wrapper .tie-page").first();
//			   Element oElement_hot2 = start_doc.select("#tie_wrapper .tie-tab-bottom-nav").first();
//			   Element oElement_hot3 = start_doc.select ("#tie_wrapper").first();
//			   Element oElement_hot4 = start_doc.getElementById("tie_wrapper");
//			   Element oElement_hot5 = start_doc.getElementsByClass("tie-tab-bottom-nav").first();
//			
			   //Get the read and reply number of the topic:
				 Element oElement_read= oElement_hot.select(".red").first();
				 String read_num = oElement_read.text();
				 newtopic.setTopicReadNum(new Integer(read_num));
				 Element oElement_temp = oElement_hot.after(oElement_read);
				 Element oElement_reply =  oElement_temp.select(".red").first();
				 String reply_num = oElement_reply.text();
				 newtopic.setTopicReplyNum(new Integer(reply_num));
				 oElement_hot = null;
				 oElement_read = null;
				 oElement_temp = null;
				 oElement_reply = null;
				 read_num = null;
				 reply_num = null;
				 
				 
			   Element bottom = start_doc.select("#tie_wrapper .tie-tab-bottom-nav").first();
			   Elements olinks=bottom.select(".tie-page a");
				if(olinks != null){
					for(Element olink : olinks){
						String text2 = olink.text();
						if(text2.startsWith("下一页") || text2.startsWith("末页")){
							continue;
						}
						String link = olink.attr("href");
						startUrl = startUrl.replaceFirst(replace_regex, link);
						logger.info("startUrl ="+startUrl);
						doc = httpUtil.getDocument_jsoup(startUrl, "GBK");
						
						Elements oElemnts = doc.select("#tie_wrapper .tie-item");
						 if(oElemnts != null){
							 for(Element oElement : oElemnts ){
								 Element oElement_info_weibo = oElement.select(".tie-author-column a.info-weibo.js-info-weibo").first();
								 String name =oElement_info_weibo.attr("name");
								 newtopic.setUserName(name);
								 Element oElement_content = oElement.select(".tie-con .tie-con-bd .tie-content").first();
								 String content = oElement_content.text();
								 newtopic.setTopicContent(content);
								 
								 oElement_info_weibo = null;
								 oElement_content = null;
								 name = null;
								 content = null;

								//save into db:
								 wanYiDAO.insertTopic(newtopic);
								 
							 }//end of for
						 }
						 
						 doc = null;
					}//end of for
				}
				
				start_doc = null;
			 
			 
			 
		 }catch(IOException e){
			 //logger.error(e.getMessage());
			 e.printStackTrace();
		 }
		 
		
		 
	}

}
