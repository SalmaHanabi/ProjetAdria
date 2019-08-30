package com.chequierAdria.Controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RefreshScope
@RestController
public class ChequierAdriaService 
{
	@Value("${spring.datasource.url}")
	private String url;
	@Value("${spring.datasource.username}")
	private String username;
	@Value("${spring.datasource.password}")
	private String password;
	@Value("${spring.datasource.driverClassName}")
	private String driver;
	@Value("${spring.jpa.show-sql}")
	private String sql;
	@Value("${spring.jpa.hibernate.ddl-auto}")
	private String ddl;
	@Value("${spring.jpa.properties.hibernate.dialect}")
	private String dialect;

	@GetMapping("/myConfig")
	public Map<String,Object> myConfig()
	{
		Map<String,Object> params=new HashMap<String, Object>();
		params.put("url",url);
		params.put("username",username);
		params.put("password",password);
		params.put("driver",driver);
		params.put("sql",sql);
		params.put("ddl",ddl);
		params.put("dialect",dialect);
		params.put("threadName",Thread.currentThread().getName());
		return params;
	}
}
