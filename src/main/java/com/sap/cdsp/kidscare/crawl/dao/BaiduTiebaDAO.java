package com.sap.cdsp.kidscare.crawl.dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.apache.log4j.Logger;

import com.sap.cdsp.kidscare.crawl.model.baidutieba.Topic;

public class BaiduTiebaDAO extends AppDAO {
	
	private static Logger logger = Logger.getLogger(BaiduTiebaDAO.class);
	
	private PreparedStatement pstmt_insertTopic;
	private PreparedStatement pstmt_checkTopicExist;
	
	protected void PrepareSql() {
		try{
			String sql_insertTopic = "insert into \"KIDSCARE_DEV\".\"BAIDUTIEBA_TOPIC\"  values(?,?,?,?,?)";
			String sql_checkTopicExist = "select * from \"KIDSCARE_DEV\".\"BAIDUTIEBA_TOPIC\" where \"CODE\"=?";
			pstmt_insertTopic = conn.prepareStatement(sql_insertTopic);
			pstmt_checkTopicExist = conn.prepareStatement(sql_checkTopicExist);
		}catch(SQLException e){
			//logger.error(e.getMessage());
			e.printStackTrace();
		}
	
		
	
		
	}
	
	public void insertTopic(Topic topic) {
		try {
			String topicCode = null;
			if(topic != null){
				topicCode = topic.getTopicTitle();
				
				//pstmt_checkTopicExist.setString(1, topicCode);

				//if (!pstmt_checkTopicExist.executeQuery().next()) {
					pstmt_insertTopic.setString(1, topic.getTopicTitle());
					pstmt_insertTopic.setInt(2, topic.getTopicReadNum());
					pstmt_insertTopic.setInt(3, topic.getTopicReplyNum());
					pstmt_insertTopic.setString(4,topic.getUserName());
					pstmt_insertTopic.setString(5,topic.getTopicContent());
					
					pstmt_insertTopic.execute();
					logger.info("successfully insert new reply----Code:"+topic.getTopicTitle());
					
				//}
			}

		
				
			
			} catch (SQLException e) {
				e.printStackTrace();
				//logger.error(e.getMessage());
			}
			
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
