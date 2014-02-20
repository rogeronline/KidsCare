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

public class BrandsAPI extends HttpServlet {
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

		//GET /brands?type=formula&sort=taste&order=1&top=10
		String type = request.getParameter("type");
		String sort = request.getParameter("sort");
		String order = request.getParameter("order");
		String top = request.getParameter("top");
		
		try {
			output = marshaller.toJson(this.getJsonList(type,sort,order,top));
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
				
			String sql = 
					"SELECT TOP @1 ID,NAME,RANK,VOTE_UP,VOTE_DOWN,MAX_KEYWORD "+
"FROM RESULT_BRAND_LIST "+ 
"WHERE KEYWORDS_ID = @3 "+// --(不上火)
"ORDER BY RANK @2";
			
			sql = sql.replace("@1", top);
			
			if(order.equals("1"))
				sql = sql.replace("@2", "ASC");
			else
				sql = sql.replace("@2", "DESC");
			
			sql = sql.replace("@3", sort);
				
			
			Statement stmt = conn.createStatement();
			ResultSet rs = null;
			rs = stmt.executeQuery(sql);    
	            
			ArrayList<Object> arrayList = new ArrayList<Object>();
			while (rs.next()) 
			{
				HashMap<String,Object> map = new HashMap<String,Object>();
				
				
				map.put("id", rs.getString(1));
				map.put("name", rs.getString(2));
				map.put("rank", rs.getInt(3));
				map.put("vote_up", rs.getInt(4));
				map.put("vote_down", rs.getInt(5));
				map.put("keywords", rs.getString(6));
		
				arrayList.add(map);
			}
			conn.close();
			returnList.put("keywords", arrayList);
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		
		return returnList;
	}	
}
