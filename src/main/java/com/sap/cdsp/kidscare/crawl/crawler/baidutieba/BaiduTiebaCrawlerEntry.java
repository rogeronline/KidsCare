package com.sap.cdsp.kidscare.crawl.crawler.baidutieba;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.log4j.Logger;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.sap.cdsp.kidscare.crawl.dao.DAOFactory;
import com.sap.cdsp.kidscare.crawl.dao.BaiduTiebaDAO;
import com.sap.cdsp.kidscare.crawl.model.baidutieba.Topic;
import com.sap.cdsp.kidscare.crawl.util.HTTPUtility;

public class BaiduTiebaCrawlerEntry implements Runnable  {
	private Logger logger = Logger.getLogger(BaiduTiebaCrawlerEntry.class.getName());
	private String startUrl = "";

	private String topicCategory = "";
	private BaiduTiebaDAO baiduTiebaDAO;
	private HTTPUtility httpUtil;
	
	public BaiduTiebaCrawlerEntry(String seedUrl,String category)
	{
		this.topicCategory = category;
		this.startUrl = seedUrl;
		baiduTiebaDAO = DAOFactory.getBaiduTiebaDAO();
		
		httpUtil = new HTTPUtility();
	}
	
	@Override
	public void run() {
		try
		{
			if(this.startUrl!=null)
			{
				this.getEntry(startUrl);
			}
		}
		finally
		{
			baiduTiebaDAO.closeConn();
		}
	}
	
	private void getEntry(String p_current_page_url){
		 Document current_main_topic_doc = null;
		 
		 try {
			  current_main_topic_doc = httpUtil.getDocument_jsoup(p_current_page_url, "GBK");
			//get next main topic page info
			   Element next_page_element = current_main_topic_doc.select(".thread_list_bottom.clearfix").first().select(".next").first();
			   String next_page_in_main_topic_url = null;
			   //String current_page_in_main_topic_url = null;
			   if(next_page_element !=null ){
				   next_page_in_main_topic_url=  next_page_element.attr("href");
				   next_page_in_main_topic_url = "http://tieba.baidu.com/" + next_page_in_main_topic_url;
			   }
			   System.out.println("next_page_in_main_topic_url =" + next_page_in_main_topic_url);
			   
			   //get main topic list in current main topic page:
			   Elements main_topic_elements = current_main_topic_doc.select("#thread_list").first().select(".t_con.clearfix");
			   for(Element main_topic_element : main_topic_elements){
				   //get reply main page of this main topic:
				   Element reply_link_element = main_topic_element.select("a").first();
				   String main_topic_title = reply_link_element.attr("title");
//				   if(main_topic_title.equals("【通知】广告专用贴")){
//					   continue;
//				   }
//				   if(main_topic_title.equals("育儿知识,每日一贴总导航")){
//					   continue;
//				   }
				   if(!main_topic_title.contains("奶")){
					   continue;
				   }
				   String reply_url = reply_link_element.attr("href");
				   reply_url = "http://tieba.baidu.com" + reply_url;
				   String reply_num =  main_topic_element.select(".threadlist_rep_num").first().text();
				   int i_reply_num = Integer.valueOf(reply_num);
				   if(i_reply_num< 1){
					   continue;
				   }
				   parseReplyPage(reply_url,main_topic_title,reply_num);
				   reply_link_element = null;
				   main_topic_title = null;
				   reply_url = null;
				   reply_num = null;
			   }//end of for(Element oElement : main_topic_elements){
			   main_topic_elements = null;
			   next_page_element = null;
			   current_main_topic_doc = null;
			   
			   //parse next main topic page:
			   if(next_page_in_main_topic_url != null){
				   getEntry(next_page_in_main_topic_url);
				   next_page_in_main_topic_url = null;
				   
			   }//end of if(next_page_in_main_topic_url != null)
		 }catch(IOException e){
			 logger.error(e.getMessage());
			 
		 }
		 
	}
	
	private void parseReplyPage(String p_current_reply_page_url,String p_title,String p_reply_num){
		try{
			  Topic newtopic = new Topic();
			  httpUtil.setTimeout(10*1000);
			  logger.info("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  reply_url ="+p_current_reply_page_url);
			   
			   Document reply_doc = httpUtil.getDocument_jsoup(p_current_reply_page_url,"GBK");
			   String reply_page_num = reply_doc.select(".l_reply_num").first().text();
			   String sRegx_Page_num =  "共有([0-9]*)页$";
			   String page_num = "";
			   Pattern p = Pattern.compile(sRegx_Page_num, Pattern.CASE_INSENSITIVE);
			   Matcher m = p.matcher(reply_page_num);
			   if (m.find()) {
				   page_num = m.group(1);
		        }
			   int i_reply_page_num = Integer.valueOf(page_num);
			   logger.info("i_reply_page_num =" +i_reply_page_num);
			   for(int i=1; i<=i_reply_page_num; i++){
				   String current_reply_page_url = p_current_reply_page_url + "?pn=" +i;
				   logger.info("**************************************current_reply_page_url =" +current_reply_page_url );
				   Document current_reply_doc = httpUtil.getDocument_jsoup(current_reply_page_url,"GBK");
				   Elements reply_elements = current_reply_doc.select(".l_post ");
				   //elements in reply page:
				   for(Element reply_element : reply_elements){
					   Element element_reply_author = reply_element.select(".p_author .d_name").first();
					   String reply_user = null;
					   if(element_reply_author != null){
						   reply_user = element_reply_author.attr("data-field");
						   String sRegx = "^.*:([0-9]*)";
						   p = Pattern.compile(sRegx, Pattern.CASE_INSENSITIVE);
						   m = p.matcher(reply_user);
						   if (m.find()) {
							   reply_user = m.group(1);
					        }
						   sRegx = null;
					   }else{
						   reply_user = "anonymous";
					   }
					   Element element_reply_content = null;
					   if(p_title.equals("宝宝急需奶粉")){
						   System.out.println("bbbb");
						   System.out.println("2222");
					   }
					   
					   
					   if(reply_element.select(".p_content")!=null && reply_element.select(".p_content").first()!=null ){
						  
						   element_reply_content = reply_element.select(".p_content").first().select(".d_post_content.j_d_post_content ").first(); 
					   }else{
						   System.out.println("aaaaaaaaaaaaaaaaa");
						   element_reply_content  = reply_element.select(".p_content_anonym").first().select(".d_post_content.j_d_post_content ").first();
					   }
					   
					   
					   String reply_content = element_reply_content.text();
					   logger.info(" title =" + p_title + " p_reply_num =" + p_reply_num + " reply_user = "+ reply_user + " reply_content = "+reply_content);
					   newtopic.setTopicTitle(p_title);
					   newtopic.setTopicReplyNum(Integer.valueOf(p_reply_num));
					   newtopic.setUserName(reply_user);
					   newtopic.setTopicContent(reply_content);
					   
					 //save into db:
						 baiduTiebaDAO.insertTopic(newtopic);
					   
					   element_reply_author = null;
					   reply_user = null;
					  
					   p = null;
					   m = null;
					   element_reply_content = null;
					   reply_content = null;
				   }//end of for
				   current_reply_page_url = null;
				   current_reply_doc = null;
				   reply_elements = null;
			   }//end of for(int i=1; i<=i_page_num; i++)
			   
			   newtopic = null;
			   reply_doc = null;
			   reply_page_num = null;
			   sRegx_Page_num = null;
			   page_num = null;
		 
		 }catch(IOException e){
			 //logger.error(e.getMessage());
			 e.printStackTrace();
		 }
	 
		 
		 
	}
		
}

