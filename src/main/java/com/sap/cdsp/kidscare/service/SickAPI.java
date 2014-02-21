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

public class SickAPI extends HttpServlet{

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
		
		
		
		try {
			
			
			String flag = request.getParameter("flag");
			String id = request.getParameter("topicId");
			
			if(flag.equals("1"))
			output = marshaller.toJson(this.getJsonList());
			if(flag.equals("2"))
				output = marshaller.toJson(this.getJsonList2());
			if(flag.equals("3"))
				output = marshaller.toJson(this.getJsonList3(id));
			


			

			
		} catch (Exception ex) {
			writer.write("error");
		}
		if (output != null) {
			response.setContentType("application/json");
			writer.write(output);
		}
		
		
		
	}
	private  ArrayList<Object> getJsonList() {
		ArrayList<Object> returnList = new ArrayList<Object>();
		try 
		{
			Connection conn = DataSource.getConnection();
		    String sql ="select title, sym_keys, sol_keys,topic_id "+
"from SICKTOPIC_KEYWORDS where sequence < 6";  
			
			
				
			
			Statement stmt = conn.createStatement();
			ResultSet rs = null;
			rs = stmt.executeQuery(sql);    
			while (rs.next()) 
			{
				HashMap<String,Object> map = new HashMap<String,Object>();
				
				
				map.put("title", rs.getString(1));
				map.put("sym_key", rs.getString(2));
				map.put("sol_key", rs.getString(3));
				map.put("topic_id", rs.getString(4));
		
				returnList.add(map);
			}
			conn.close();
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		
		return returnList;
	}	
	
	private  ArrayList<Object> getJsonList2() {
		ArrayList<Object> returnList = new ArrayList<Object>();
		try 
		{
			Connection conn = DataSource.getConnection();
		    String sql ="select title, sym_keys, sol_keys,topic_id "+ 
"from SICKTOPIC_KEYWORDS where sequence between 6 and 10";  
			
			
				
			
			Statement stmt = conn.createStatement();
			ResultSet rs = null;
			rs = stmt.executeQuery(sql);    
	            
			while (rs.next()) 
			{
				HashMap<String,Object> map = new HashMap<String,Object>();
				
				
				map.put("title", rs.getString(1));
				map.put("sym_key", rs.getString(2));
				map.put("sol_key", rs.getString(3));
				map.put("topic_id", rs.getString(4));
		
				returnList.add(map);
			}
			conn.close();
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		
		return returnList;
	}	
	
	private  ArrayList<Object> getJsonList3(String id) {
		ArrayList<Object> returnList = new ArrayList<Object>();
		try 
		{
			Connection conn = DataSource.getConnection();
		    String sql ="select content from SICKTOPIC where id = ?";  
			sql = sql.replace("?",id);
			
				
			
			Statement stmt = conn.createStatement();
			ResultSet rs = null;
			rs = stmt.executeQuery(sql);    
	            
			while (rs.next()) 
			{
//				HashMap<String,Object> map = new HashMap<String,Object>();
				
				
//				map.put("title", rs.getString(1));
//				map.put("sym_key", rs.getString(2));
//				map.put("sol_key", rs.getString(3));
//				map.put("topic_id", rs.getString(4));
		
				returnList.add(rs.getString(1));
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
