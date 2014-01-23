package com.sap.cdsp.kidscare.crawl.util;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.rmi.RemoteException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.Credentials;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.params.ClientPNames;
import org.apache.http.conn.params.ConnRoutePNames;
import org.apache.http.cookie.Cookie;
import org.apache.http.cookie.CookieOrigin;
import org.apache.http.cookie.CookieSpec;
import org.apache.http.cookie.CookieSpecFactory;
import org.apache.http.cookie.MalformedCookieException;
import org.apache.http.impl.client.AbstractHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.cookie.BrowserCompatSpec;
import org.apache.http.params.CoreConnectionPNames;
import org.apache.http.params.HttpParams;
import org.apache.http.util.EntityUtils;
import org.jsoup.Jsoup;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class HTTPUtility 
{
	private DefaultHttpClient httpClient;
	private DocumentBuilderFactory factory;
	
	public HTTPUtility()
	{
		this.httpClient = new DefaultHttpClient();
		
		String proxySet = CrawlerConfig.getValue("proxySet");
		if(Boolean.valueOf(proxySet))
		{
			String proxyHost = CrawlerConfig.getValue("proxyHost");
			String proxyPort = CrawlerConfig.getValue("proxyPort");
			int port = Integer.parseInt(proxyPort);
			
		    HttpHost proxy = new HttpHost(proxyHost, port);
		    httpClient.getParams().setParameter(ConnRoutePNames.DEFAULT_PROXY, proxy);
		}
		
		String proxyCredentialsSet = CrawlerConfig.getValue("proxyCredentialsSet");
		if(Boolean.valueOf(proxyCredentialsSet))
		{
			String Credentials_username = CrawlerConfig.getValue("Credentials_username");
			String Credentials_password = CrawlerConfig.getValue("Credentials_password");
			Credentials defaultcreds = new UsernamePasswordCredentials(Credentials_username,Credentials_password);
	        httpClient.getCredentialsProvider().setCredentials(AuthScope.ANY, defaultcreds);
		}
		
		/*
		 * solve cookie rejected
		 */
		CookieSpecFactory csf = new CookieSpecFactory() {
			public CookieSpec newInstance(HttpParams params) {
				return new BrowserCompatSpec() {
					@Override
					public void validate(Cookie cookie, CookieOrigin origin)
							throws MalformedCookieException {
						// Oh, I am easy
					}
				};
			}
		};
		((AbstractHttpClient) httpClient).getCookieSpecs().register("easy", csf);
		httpClient.getParams().setParameter(ClientPNames.COOKIE_POLICY, "easy");
		
		
		/*
		 * 为创建document准备
		 */
		factory = DocumentBuilderFactory.newInstance();
	}
	
	public void setTimeout(int timeout)
	{
		httpClient.getParams().setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, timeout);
	}
	
	public String crawlDataForPage(String reqUrl) throws IOException
	{
		return crawlDataForPage(reqUrl , "UTF-8");
	}
    
    public String crawlDataForPage(String reqUrl, String encoding) throws IOException
    {
		HttpUriRequest request = new HttpGet(reqUrl);
		HttpResponse httpResponse = httpClient.execute(request);
		HttpEntity httpEntity = httpResponse.getEntity();

		if (httpEntity != null) {
			// return code == 200 means OK, then we get the data from the
			// httpResponse
			if ((httpResponse.getStatusLine().getStatusCode()) != 200) {
				throw new RemoteException("Http Server retCode = "
						+ httpResponse.getStatusLine().getStatusCode());
			}
			return new String(EntityUtils.toByteArray(httpEntity), encoding);
		}
		return null;
    }
    
    public org.w3c.dom.Document getDocument_w3c(String url) throws IOException, ParserConfigurationException, SAXException
    {
    	return getDocument_w3c(url , "UTF-8");
    }
    
    public org.w3c.dom.Document getDocument_w3c(String url, String encoding) throws IOException, ParserConfigurationException, SAXException
    {
		String content = crawlDataForPage(url, encoding);
		if (content == null)
			return null;

		DocumentBuilder builder;
		org.w3c.dom.Document doc = null;
		builder = factory.newDocumentBuilder();
		doc = builder.parse(new InputSource(new ByteArrayInputStream(content
				.getBytes(encoding))));
		return doc;
    }
    
    public org.jsoup.nodes.Document getDocument_jsoup(String url) throws IOException
    {
    	return getDocument_jsoup(url , "UTF-8");
    }
    
    public org.jsoup.nodes.Document getDocument_jsoup(String url , String encoding) throws IOException
    {
    	String content = crawlDataForPage(url,encoding);
    	if(content == null)
    		return null;
    	return Jsoup.parse(content);
    }
}
