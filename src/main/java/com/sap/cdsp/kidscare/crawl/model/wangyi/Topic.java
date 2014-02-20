package com.sap.cdsp.kidscare.crawl.model.wangyi;



public class Topic {
	
	
	private String topicTitle = "";
	private int topicReadNum = 0;
	private int topicReplyNum= 0;
	private String userName = "";
	private String topicContent = "";
	
	
	
	public String getTopicTitle() {
		return topicTitle;
	}



	public void setTopicTitle(String topicTitle) {
		this.topicTitle = topicTitle;
	}



	public int getTopicReadNum() {
		return topicReadNum;
	}



	public void setTopicReadNum(int topicReadNum) {
		this.topicReadNum = topicReadNum;
	}



	public int getTopicReplyNum() {
		return topicReplyNum;
	}



	public void setTopicReplyNum(int topicReplyNum) {
		this.topicReplyNum = topicReplyNum;
	}



	public String getUserName() {
		return userName;
	}



	public void setUserName(String userName) {
		this.userName = userName;
	}



	public String getTopicContent() {
		return topicContent;
	}



	public void setTopicContent(String topicContent) {
		this.topicContent = topicContent;
	}



	@Override
	public String toString() {
		// TODO Auto-generated method stub
		String topic = "Topic: "+this.topicTitle+" content: "+this.topicContent+" read count: "+this.topicReadNum+" reply count: "+this.topicReplyNum + "userName :" +userName;
		return topic;
	}
	

}
