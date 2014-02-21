package com.sap.cdsp.kidscare.service;

import java.io.IOException;
import java.io.Writer;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sap.cdsp.kidscare.service.json.GsonJsonMarshaller;
import com.sap.cdsp.kidscare.util.DataSource;

public class BrandPostAPI extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//String path = Contants.getJsonFilePath("cities",request.getSession().getServletContext());
		
		response.setCharacterEncoding("UTF-8");
		Writer writer = response.getWriter();
		String output = null;
		GsonJsonMarshaller marshaller = new GsonJsonMarshaller();
		
		
		String url = request.getRequestURL().toString();
        url = url.replace("http://","");
        String[] urlArray = url.split("/");
		
		
		try {
			
			//GET /posts?type=formula&sort=taste&top=10&skip=10
			if(urlArray.length==4)
			{
			String type = request.getParameter("type");
			String sort = request.getParameter("sort");
			String order = request.getParameter("skip");
			String top = request.getParameter("top");
			output = marshaller.toJson(this.getJsonList(type,sort,order,top));
			}
			// GET /posts/:post_id
			if(urlArray.length==5)
			{
				//SELECT ID,NAME,KEYWORDS_ID,kEYWORD,FLAG_DESC,KEYWORDS_PERCENTAGE,DESC FROM RESULT_MILK_POWDER_DETAIL WHERE MILK_ID = 8;
				output = marshaller.toJson(this.getJsonList2(urlArray[4]));
			}

			
		} catch (Exception ex) {
			writer.write("error");
		}
		if (output != null) {
			response.setContentType("application/json");
			writer.write(output);
		}
		
		
		
	}
	private  HashMap<Object,Object> getJsonList(String type,String sort,String order,String top) {
		HashMap<Object,Object> returnList = new HashMap<Object,Object>();
		try 
		{
			Connection conn = DataSource.getConnection();
		    String sql ="SELECT TOP @1 ID,TITLE,ROW_NUMBER()OVER() AS RANK,VALUE "+
"FROM "+ 
"( "+
"SELECT TOPICID AS ID, T1.CONTENT AS TITLE,  VIEW_COUNT/100000 * 100 AS VALUE "+
"FROM BABYTREE_TOPIC T1 "+
"WHERE VIEW_COUNT <=71231 AND TOPICID NOT IN (2911495,2588386,26805,2435459,24759,146640,139203,1110210) "+
"ORDER BY VIEW_COUNT DESC "+
")";  

			
			sql = sql.replace("@1", top);
			
//			if(order.equals("1"))
//				sql = sql.replace("@2", "ASC");
//			else
//				sql = sql.replace("@2", "DESC");
//			
//			if(sort==null||sort.equals("0")||sort.equals(""))
//				sort = "0";
//			sql = sql.replace("@3", sort);
				
			
			Statement stmt = conn.createStatement();
			ResultSet rs = null;
			rs = stmt.executeQuery(sql);    
	            
			ArrayList<Object> arrayList = new ArrayList<Object>();
			while (rs.next()) 
			{
				HashMap<String,Object> map = new HashMap<String,Object>();
				
				
				map.put("id", rs.getString(1));
				map.put("title", rs.getString(2));
				map.put("rank", rs.getInt(3));
				map.put("value", rs.getInt(4));
		
				arrayList.add(map);
			}
			conn.close();
			returnList.put("results", arrayList);
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		
		return returnList;
	}	
	
	
	
	
	private  HashMap<Object,Object> getJsonList2(String id) {
		HashMap<Object,Object> returnList = new HashMap<Object,Object>();
		try 
		{
			Connection conn = DataSource.getConnection();
				
			String sql ="SELECT TOP 3 T1.TOPICID AS ID ,T1.CONTENT AS TITLE,  T2.ID AS REPLY_ID, T2.CONTENT AS REPLY_CONTENT "+
"FROM BABYTREE_TOPIC T1 INNER JOIN "+
"BABYTREE_MILK T2 ON (T1.TOPICID = T2.TOPICID) "+
"WHERE T1.TOPICID = @1 ";
		
			sql = sql.replace("@1", id);
			
			Statement stmt = conn.createStatement();
			ResultSet rs = null;
			rs = stmt.executeQuery(sql);    
	            
			ArrayList<Object> arrayList = new ArrayList<Object>();
			
			while (rs.next()) 
			{
				
				
				
				returnList.put("id", rs.getString(1));
				returnList.put("title", rs.getString(2));
				
				HashMap<Object,Object> map = new HashMap<Object,Object>();
				map.put("id", rs.getString(3));
				map.put("content",  rs.getInt(4));
				arrayList.add(map);
			    returnList.put("replies", arrayList);
			}
			conn.close();
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		
		return returnList;
	}	
}

