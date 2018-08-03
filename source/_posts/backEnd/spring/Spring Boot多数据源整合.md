---
layout: spring
title: Spring Boot多数据源整合
date: 2018-07-19 17:48:20
tags: spring
categories: java Program
---

# 如何用Spring Boot 整合 MyBatis 连接多种数据源 & Spring Data Jpa 如何连接多种数据源

> 引入依赖项公用

```xml
dependencies {
	compile('org.mybatis.spring.boot:mybatis-spring-boot-starter:1.3.1')
	compile('org.springframework.boot:spring-boot-starter-web')
	runtime('mysql:mysql-connector-java')
	runtime('com.microsoft.sqlserver:mssql-jdbc')
	testCompile('org.springframework.boot:spring-boot-starter-test')
}
```
***
## 配置数据源公用
> 新建数据源配置类

```java
@Configuration
public class DataSourceProperties {

	@Bean("mysqlDataSource")
	@ConfigurationProperties(prefix = "datasource.mysql")

	@Primary
	public DataSource mysqlDataSource() {
		return DataSourceBuilder.create().build();
	}

	@Bean("mssqlDataSource")
	@ConfigurationProperties(prefix = "datasource.mssql")
	public DataSource mssqlDataSource(){
		return DataSourceBuilder.create().build();
	}

}
```
***

## application.properties配置数据源
```xml
datasource.mysql.url=jdbc:mysql://xx?serverTimezone=Asia/Shanghai&characterEncoding=utf8
datasource.mysql.username=xx
datasource.mysql.password=xx
datasource.mysql.driver-class-name=com.mysql.jdbc.Driver
datasource.mssql.url=jdbc:sqlserver://xx;databasename=xx
datasource.mssql.username=xx
datasource.mssql.password=xx
datasource.mssql.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver
```
***

## MyBatis配置


### mssql配置 
```java
@Configuration
@EnableTransactionManagement
@MapperScan(basePackages = "指定mssql repository包名", sqlSessionFactoryRef = "mssqlSessionFactory")
public class MssqlConfig {
	@Autowired
	@Qualifier("mssqlDataSource")
	private DataSource mssqlDataSource;

	@Bean(name = "mssqlTransactionManager")
	public DataSourceTransactionManager dataSourceTransactionManager() {
		return new DataSourceTransactionManager(mssqlDataSource);
	}

	@Bean(name = "mssqlSessionFactory")
	public SqlSessionFactory clusterSqlSessionFactory() throws Exception {
		final SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
		sessionFactory.setDataSource(mssqlDataSource);
		sessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:config/mybatis/mapper/*.xml"));
		return sessionFactory.getObject();
	}

}
```

### mysql配置
```java
@Configuration
@EnableTransactionManagement
@MapperScan(basePackages = "指定mysql repository包名", sqlSessionFactoryRef = "mysqlSessionFactory")
public class MySqlConfig {
	@Autowired
	@Qualifier("mysqlDataSource")
	private DataSource mysqlDataSource;
	
	@Bean(name = "mysqlTransactionManager")
	@Primary
	public DataSourceTransactionManager dataSourceTransactionManager() {
		return new DataSourceTransactionManager(mysqlDataSource);
	}

	@Bean(name = "mysqlSessionFactory")
	@Primary
	public SqlSessionFactory clusterSqlSessionFactory() throws Exception {
		final SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
		sessionFactory.setDataSource(mysqlDataSource);
		sessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:config/mybatis/mapper/*.xml"));
		return sessionFactory.getObject();
	}
}
```

## Spring Data Jpa配置

### mssql配置

```java
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef="entityManagerFactorySecondary",
		transactionManagerRef="transactionManagerSecondary",
		basePackages= { "指定mssql repository包名" })
public class MSSqlConfig {
	@Autowired
	@Qualifier("mssqlDataSource")
	private DataSource mssqlDataSource;

	@Bean(name = "entityManagerSecondary")
	public EntityManager entityManager(EntityManagerFactoryBuilder builder) {
		return entityManagerFactorySecondary(builder).getObject().createEntityManager();
	}

	@Bean(name = "entityManagerFactorySecondary")
	public LocalContainerEntityManagerFactoryBean entityManagerFactorySecondary (EntityManagerFactoryBuilder builder) {
		return builder.dataSource(mssqlDataSource).properties(getVendorProperties(mssqlDataSource))
		//设置实体类所在位置
		.packages("指定实体路径")
		.persistenceUnit("mssqlPersistenceUnit")
		.build();
	}

	@Autowired
	private JpaProperties jpaProperties;

	private Map getVendorProperties(DataSource dataSource) {
		return jpaProperties.getHibernateProperties(dataSource);
	}

	@Bean(name = "transactionManagerSecondary")
	PlatformTransactionManager transactionManagerSecondary(EntityManagerFactoryBuilder builder) {
		return new JpaTransactionManager(entityManagerFactorySecondary(builder).getObject());
	}

}
```


### Mysql配置
```java
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef = "entityManagerFactoryPrimary",
		transactionManagerRef = "transactionManagerPrimary",basePackages = {"指定mysql repository包名"})
public class MySqlConfig {
	
	@Autowired
	@Qualifier("mysqlDataSource")
	private DataSource mysqlDataSource;

	@Primary
	@Bean(name = "entityManagerPrimary")
	public EntityManager entityManager(EntityManagerFactoryBuilder builder) {
	return entityManagerFactoryPrimary(builder).getObject().createEntityManager();
	}
	@Primary
	@Bean(name = "entityManagerFactoryPrimary")
	public LocalContainerEntityManagerFactoryBean entityManagerFactoryPrimary(EntityManagerFactoryBuilder builder) {
		return builder.dataSource(mysqlDataSource).properties(getVendorProperties(mysqlDataSource))
		//设置实体类所在位置
			.packages("指定实体路径")
			.persistenceUnit("mysqlPersistenceUnit")
			.build();
	}
	@Autowired
	private JpaProperties jpaProperties;
	
	private Map getVendorProperties(DataSource dataSource) {
		return jpaProperties.getHibernateProperties(dataSource);
	}

	@Primary
	@Bean(name = "transactionManagerPrimary")
	public PlatformTransactionManager transactionManagerPrimary(EntityManagerFactoryBuilder builder) {
		return new JpaTransactionManager(entityManagerFactoryPrimary(builder).getObject());
	}

}
```


## 关键注解的解析
> 1. @Configuration

相当于传统的xml配置文件，项目中如果需要依赖第三方的xml文件，仍然建议通过此配置类作为项目的配置主类，通过@ImportResource注解加载xml配置文件。

> 2. @Bean

该注解告诉Spring这个方法将会返回一个对象，该对象要注册为Spring应用上下文中的bean

> 3. @ConfigurationProperties

读取配置文件信息，读取并自动封装成实体类。这样在代码里使用更加方便。@Value需要单独建立xxxProperties进行映射，效果差不多

> 4. @Primary

当系统里面出现多个数据源的时候，需要进行人为指定主数据源

> 5. @EnableTransactionManagement

Spring Boot使用事务非常简单，使用该注解开启事务支持，然后在访问数据库的Service方法上添加注解@Transactional便可。

> 6. @MapperScan

在数据持久层使用MyBatis时候，使用该注解配置扫描Mapper位置

> 7. @Autowired

使用该注解进行自动注入，但是Spring 容器中匹配候选Bean数目必须有且仅有一个。当找不到一个匹配的时候，Spring容器会抛出异常

> 8. @Qualifier

在当使用@Autowired产生歧义的时候，可以使用该注解指定对应的name来消除歧义

> 9. EnableJpaRepositories

该注解开启对Spring Data JPA Repository的支持

通过以上的配置，项目就可以同时访问多种数据源了。

赶紧记下，别待会儿忘了












