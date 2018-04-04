package com.cwa.client.dao;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import com.cwa.client.dto.BaseDto;
import com.cwa.client.utils.Constant;
import com.cwa.client.utils.LogWriteUtil;
import com.cwa.client.utils.PageModel;


public abstract  class BaseDao<T,Tp> implements Constant{

	private static final LogWriteUtil logWriteUtil = LogWriteUtil.getSingleton();
	
	/** 设置一些操作的常量 */  
    public static final String SQL_INSERT = "insert";  
    public static final String SQL_UPDATE = "update";  
    public static final String SQL_DELETE = "delete";
    
    
    protected NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    
	protected JdbcTemplate jdbcTemplate;
	protected String table_name;
	private Class<T> entityClass;
	
	private Class<Tp> pClass;
	
	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}
	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	public String getTable_name() {
		return table_name;
	}
	public void setTable_name(String table_name) {
		this.table_name = table_name;
	}
	
	@SuppressWarnings("unchecked")  
    public BaseDao() {  
        ParameterizedType type = (ParameterizedType) getClass().getGenericSuperclass();  
        entityClass = (Class<T>) type.getActualTypeArguments()[0];  
        
        ParameterizedType typep = (ParameterizedType) getClass().getGenericSuperclass();  
        pClass = (Class<Tp>) typep.getActualTypeArguments()[1];
        
        //System.out.println("Dao实现类是：" + entityClass.getName());  
    }
	
	// 组装SQL  
    private String makeSql(String sqlFlag) {  
        StringBuffer sql = new StringBuffer();  
        Field[] fields = entityClass.getDeclaredFields();  
        if (sqlFlag.equals(SQL_INSERT)) {  
            sql.append(" INSERT INTO " + entityClass.getSimpleName());  
            sql.append("(");  
            for (int i = 0; fields != null && i < fields.length; i++) {  
                fields[i].setAccessible(true); // 暴力反射  
                String column = fields[i].getName();  
                sql.append(column).append(",");  
            }  
            sql = sql.deleteCharAt(sql.length() - 1);  
            sql.append(") VALUES (");  
            for (int i = 0; fields != null && i < fields.length; i++) {  
                sql.append("?,");  
            }  
            sql = sql.deleteCharAt(sql.length() - 1);  
            sql.append(")");  
        } else if (sqlFlag.equals(SQL_UPDATE)) {  
            sql.append(" UPDATE " + entityClass.getSimpleName() + " SET ");  
            for (int i = 0; fields != null && i < fields.length; i++) {  
                fields[i].setAccessible(true); // 暴力反射  
                String column = fields[i].getName();  
                
                //System.out.println("column=" + column);  
                
                if (column.equals("id")) { // id 代表主键  
                    continue;  
                }  
                sql.append(column).append("=").append("?,");  
            }  
            sql = sql.deleteCharAt(sql.length() - 1);  
            sql.append(" WHERE id=?");  
        } else if (sqlFlag.equals(SQL_DELETE)) {  
            sql.append(" DELETE FROM " + entityClass.getSimpleName() + " WHERE id=?");  
        }  
        //System.out.println("SQL=" + sql);  
        return sql.toString();  
  
    }
    
    // 设置参数  
    private Object[] setArgs(T entity, String sqlFlag) {  
        Field[] fields = entityClass.getDeclaredFields();  
        if (sqlFlag.equals(SQL_INSERT)) {  
            Object[] args = new Object[fields.length];  
            for (int i = 0; args != null && i < args.length; i++) {  
                try {  
                    fields[i].setAccessible(true); // 暴力反射  
                    args[i] = fields[i].get(entity);  
                    
                    System.out.println("args[i]:"+args[i]);
                    
                } catch (Exception e) {  
                    e.printStackTrace();  
                }  
            }  
            return args;  
        } else if (sqlFlag.equals(SQL_UPDATE)) {  
            Object[] tempArr = new Object[fields.length];  
            for (int i = 0; tempArr != null && i < tempArr.length; i++) {  
                try {  
                    fields[i].setAccessible(true); // 暴力反射  
                    tempArr[i] = fields[i].get(entity);  
                    
                    //System.out.println("tempArr[i]:"+tempArr[i]);
                    
                } catch (Exception e) {  
                    e.printStackTrace();  
                }  
            }  
            Object[] args = new Object[fields.length];  
            System.arraycopy(tempArr, 1, args, 0, tempArr.length - 1); // 数组拷贝  
            args[args.length - 1] = tempArr[0];  
            return args;  
        } else if (sqlFlag.equals(SQL_DELETE)) {  
            Object[] args = new Object[1]; // 长度是1  
            fields[0].setAccessible(true); // 暴力反射  
            try {  
                args[0] = fields[0].get(entity);  
            } catch (Exception e) {  
                e.printStackTrace();  
            }  
            return args;  
        }  
        return null;  
  
    }  
  
    // 设置参数类型（写的不全，只是一些常用的）  
    private int[] setArgTypes(T entity, String sqlFlag) {  
        Field[] fields = entityClass.getDeclaredFields();  
        if (sqlFlag.equals(SQL_INSERT)) {  
            int[] argTypes = new int[fields.length];  
            try {  
                for (int i = 0; argTypes != null && i < argTypes.length; i++) {  
                    fields[i].setAccessible(true); // 暴力反射  
                   if(fields[i].get(entity)==null){
                	   argTypes[i] =Types.NULL;
                	   continue;
                   }
                	   
                   System.out.println("getName:"+fields[i].get(entity).getClass().getName());
                    
                    if (fields[i].get(entity).getClass().getName().equals("java.lang.String")) {  
                        argTypes[i] = Types.VARCHAR;  
                    } else if (fields[i].get(entity).getClass().getName().equals("java.lang.Double")) {  
                        argTypes[i] = Types.DECIMAL;  
                    } else if (fields[i].get(entity).getClass().getName().equals("java.lang.Integer")) {  
                        argTypes[i] = Types.INTEGER;  
                    } else if (fields[i].get(entity).getClass().getName().equals("java.util.Date")) {  
                        argTypes[i] = Types.DATE;  
                    }  else if (fields[i].get(entity).getClass().getName().equals("java.sql.Timestamp")) {  
                        argTypes[i] = Types.TIMESTAMP;
                    } else if (fields[i].get(entity).getClass().getName().equals("java.math.BigDecimal")) {  
                        argTypes[i] = Types.DECIMAL;
                    }
                }  
            } catch (Exception e) {  
                e.printStackTrace();  
            }  
            return argTypes;  
        } else if (sqlFlag.equals(SQL_UPDATE)) {  
            int[] tempArgTypes = new int[fields.length];  
            int[] argTypes = new int[fields.length];  
            try {  
                for (int i = 0; tempArgTypes != null && i < tempArgTypes.length; i++) {  
                    fields[i].setAccessible(true); // 暴力反射  
                    if(fields[i].get(entity)==null){
                 	   argTypes[i] =Types.NULL;
                 	   continue;
                    }
                    //System.out.println("getName:"+fields[i].get(entity).getClass().getName());
                    
                    if (fields[i].get(entity).getClass().getName().equals("java.lang.String")) {  
                        tempArgTypes[i] = Types.VARCHAR;  
                    } else if (fields[i].get(entity).getClass().getName().equals("java.lang.Double")) {  
                        tempArgTypes[i] = Types.DECIMAL;  
                    } else if (fields[i].get(entity).getClass().getName().equals("java.lang.Integer")) {  
                        tempArgTypes[i] = Types.INTEGER;  
                    } else if (fields[i].get(entity).getClass().getName().equals("java.util.Date")) {  
                        tempArgTypes[i] = Types.DATE;  
                    } else if (fields[i].get(entity).getClass().getName().equals("java.sql.Timestamp")) {  
                    	tempArgTypes[i] = Types.TIMESTAMP;
                    } else if (fields[i].get(entity).getClass().getName().equals("java.math.BigDecimal")) {  
                    	tempArgTypes[i] = Types.DECIMAL;
                    }
                    
                    //System.out.println("tempArgTypes[i]:"+tempArgTypes[i]);
                }  
                System.arraycopy(tempArgTypes, 1, argTypes, 0, tempArgTypes.length - 1); // 数组拷贝  
                argTypes[argTypes.length - 1] = tempArgTypes[0];  
  
            } catch (Exception e) {  
                e.printStackTrace();  
            }  
            return argTypes;  
  
        } else if (sqlFlag.equals(SQL_DELETE)) {  
            int[] argTypes = new int[1]; // 长度是1  
            try {  
                fields[0].setAccessible(true); // 暴力反射  
                if (fields[0].get(entity).getClass().getName().equals("java.lang.String")) {  
                    argTypes[0] = Types.VARCHAR;  
                } else if (fields[0].get(entity).getClass().getName().equals("java.lang.Integer")) {  
                    argTypes[0] = Types.INTEGER;  
                }  
  
            } catch (Exception e) {  
                e.printStackTrace();  
            }  
            return argTypes;  
        }  
        return null;  
    }  
    
    
    public int save(T entity) throws Exception {  
        int flag=0;
          try {
     	   String sql = this.makeSql(SQL_INSERT);  
            Object[] args = this.setArgs(entity, SQL_INSERT);  
            int[] argTypes = this.setArgTypes(entity, SQL_INSERT); 
            flag=jdbcTemplate.update(sql.toString(), args, argTypes);  
 	    } catch (Exception e) {
 	    	flag=-1;
 		   throw e;
 	  }
          return flag;
     }  
  
  
    public int update(T entity)throws Exception  {  
    	 int flag=0;
         try {
	    	String sql = this.makeSql(SQL_UPDATE);  
	        Object[] args = this.setArgs(entity, SQL_UPDATE);  
	        int[] argTypes = this.setArgTypes(entity, SQL_UPDATE);  
	        flag=jdbcTemplate.update(sql, args, argTypes); 
         } catch (Exception e) {
  	    	flag=-1;
  		   throw e;
  	  }
         return flag;
    }  
  
   
    public int delete(T entity)throws Exception {  
    	 int flag=0;
    	try {
    		String sql = this.makeSql(SQL_DELETE);  
            Object[] args = this.setArgs(entity, SQL_DELETE);  
            int[] argTypes = this.setArgTypes(entity, SQL_DELETE);  
            flag=jdbcTemplate.update(sql, args, argTypes);
		} catch (Exception e) {
			flag=-1;
			throw e;
		}
    	 return flag;
         
    }  
    
    public T findById(Serializable id) {  
        String sql = "SELECT * FROM " + entityClass.getSimpleName() + " WHERE id=?";  
        RowMapper<T> rowMapper = BeanPropertyRowMapper.newInstance(entityClass);  
        List list=jdbcTemplate.query(sql, rowMapper, id);
        if(null!=list && list.size()>0){
        	return (T)list.get(0); 
        }else{
        	return null;
        }
    }  
  
    public List<T> findAll() {  
        String sql = "SELECT * FROM " + entityClass.getSimpleName();  
        RowMapper<T> rowMapper = BeanPropertyRowMapper.newInstance(entityClass);  
        return jdbcTemplate.query(sql, rowMapper);  
    }  
    
	public PageModel getPageModel(String sql,String sqlNum,HashMap params,int pageNo,int pageSize){
		PageModel pm=new PageModel();
	    pm.setTotalRecords(getTotalNum(sqlNum,params));
	    pm.setPageNo(pageNo);
		pm.setPageSize(pageSize);
		namedParameterJdbcTemplate=new NamedParameterJdbcTemplate(getJdbcTemplate());
		List list = namedParameterJdbcTemplate.query(sql, params,new BeanPropertyRowMapper(pClass));
		pm.setList(list);
		return pm;
	}
	
	private int getTotalNum(String sql,HashMap params)  {  
		 int count = 0;
	     namedParameterJdbcTemplate=new NamedParameterJdbcTemplate(getJdbcTemplate());
	     
	     count=namedParameterJdbcTemplate.queryForObject(sql, params, Integer.class);
	     return count; 
	    } 
	
	/**
	 * 封装where语句
	 * @param tp 已经初始化参数的dto
	 * @param tableAlias 表的别名
	 * @return
	 */
	public Map<String,Object> packageWhereSQL(Tp tp,String tableAlias){
		// 拼装的sql
		StringBuffer whereSQL = new StringBuffer("");
		// 拼装的参数
		List<Object> params = new ArrayList<Object>();
		Field[] fields = tp.getClass().getDeclaredFields();
		try {
			for(Field field : fields){
				// 获取数值类型
				String type = field.getType().getName();
				// 忽略布尔值
				if(type.equals("boolean")||type.equals("java.lang.Boolean")){
					continue;
				}
				// 允许访问值
				field.setAccessible(true);
				Object value = field.get(tp);
				// 空字符忽略
				if(type.equals("char")&&(char)value=='\0'){
					continue;
				}
				// 基本类型为0忽略
				if(type.equals("short")||type.equals("double")
						||
				   type.equals("float")||type.equals("long")
						||
				   type.equals("byte")||type.equals("int")){
					
					if(Double.parseDouble(value.toString())==0){
						continue;
					}
				}
				// 如果为null或者空字符串忽略
				if(value==null || value.toString().trim().equals("")){
					continue;
				}
				// 字段名
				String fieldName = field.getName();
				if(fieldName.equals("serialVersionUID")) continue;
				// 拼接SQL
				if(whereSQL.toString().toLowerCase().contains("where")){
					whereSQL.append("AND "+tableAlias+"."+fieldName+"=? ");
				}else{
					whereSQL.append("WHERE "+tableAlias+"."+fieldName+"=? ");
				}
				params.add(value);
			}
		} catch (Exception e) {
			e.printStackTrace();
			whereSQL.delete(0,whereSQL.length());
			logWriteUtil.writeLog(LOGTYPE_PACKAGESQL,"package 'where sql' exception " + e.getMessage(), LOGLEVEL_ERROR, BaseDao.class);
		}
		// 判断是否含有额外查询条件
		BaseDto bd = (BaseDto) tp.getClass().getSuperclass().cast(tp);// 获取父类BaseDto
		String alias = "A";// 别名
		String startTime = bd.getStartTime();// 查询开始时间
		String endTime = bd.getEndTime();// 查询结束时间
		String timeField = bd.getTimeField();// 时间字段
		String timeFormat = bd.getTimeFormat();// 时间格式
		String orderWay = bd.getOrderWay();// 排序方式
		Integer pageNo = bd.getPageNo();// 显示的页码
		Integer pageSize = bd.getPageSize();// 每页显示的数量
		String whereCondition = bd.getWhereCondition();// 自定义查询条件
		// 判断是否存在where关键字
		boolean existWhere = whereSQL.toString().equals("")?false:true;
		// 判断是否根据开始结束时间作为查询条件
		if(startTime!=null &&!startTime.trim().equals("")){
			if(!existWhere){
				whereSQL.append("WHERE ");
				existWhere = true;
			}else{
				whereSQL.append("AND ");
			}
			whereSQL.append("DATE_FORMAT("+alias+"."+timeField+",'"+timeFormat+"')>=DATE_FORMAT(?,'"+timeFormat+"') ");
			params.add(startTime);
		}
		// 判断是否根据结束时间查询
		if(endTime!=null &&!endTime.trim().equals("")){
			if(!existWhere){
				whereSQL.append("WHERE ");
				existWhere = true;
			}else{
				whereSQL.append("AND ");
			}
			whereSQL.append("DATE_FORMAT("+alias+"."+timeField+",'"+timeFormat+"')<=DATE_FORMAT(?,'"+timeFormat+"') ");
			params.add(endTime);
		}
		// 判断是否有自定义查询条件
		if(whereCondition!=null &&!whereCondition.trim().equals("")){
			if(!existWhere){
				whereSQL.append("WHERE ");
				existWhere = true;
			}else{
				whereSQL.append("AND ");
			}
			whereSQL.append(whereCondition+" ");
		}
		// 排序
		if(orderWay!=null&&!orderWay.trim().equals("")){
			whereSQL.append(orderWay+" ");
		}
		// 判断是否分页
		if(pageNo!=null&&pageNo!=0&&pageSize!=null&&pageSize!=0){
			whereSQL.append("LIMIT ?,? ");
			params.add((pageNo-1)*pageSize);
			params.add(pageSize);
		}
		// 封装返回
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("sql", whereSQL.toString());
		map.put("params", params);
		return map;
	}

	/**
	 * 封装update语句
	 * @param t 已经初始化参数的dto
	 * @param tableAlias 表的别名
	 * @return
	 */
	protected Map<String,Object> packageUpateSQL(T t,String tableAlias){
		// 拼装的sql
		StringBuffer updateSQL = new StringBuffer("");
		// 拼装的参数
		List<Object> params = new ArrayList<Object>();
		Field[] fields = t.getClass().getDeclaredFields();
		try {
			for(Field field : fields){
				// 获取数值类型
				String type = field.getType().getName();
				// 忽略布尔值
				if(type.equals("boolean")||type.equals("java.lang.Boolean")){
					continue;
				}
				// 允许访问值
				field.setAccessible(true);
				Object value = field.get(t);
				// 空字符忽略
				if(type.equals("char")&&(char)value=='\0'){
					continue;
				}
				// 基本类型为0忽略
				if(type.equals("short")||type.equals("double")
						||
				   type.equals("float")||type.equals("long")
						||
				   type.equals("byte")||type.equals("int")){
					
					if(Double.parseDouble(value.toString())==0){
						continue;
					}
				}
				// 如果为null或者空字符串忽略
				if(value==null){
					continue;
				}
				// 字段名
				String fieldName = field.getName();
				// 忽略ID
				if(fieldName.equalsIgnoreCase("id")){
					continue;
				}
				// 拼接SQL
				if(updateSQL.toString().toLowerCase().contains("update")){
					updateSQL.append(", "+tableAlias+"."+fieldName+"=? ");
				}else{
					updateSQL.append("UPDATE "+t.getClass().getSimpleName()+" "+tableAlias+" "+" SET "+tableAlias+"."+fieldName+"=? ");
				}
				params.add(value);
			}
		} catch (Exception e) {
			e.printStackTrace();
			updateSQL.delete(0,updateSQL.length());
			logWriteUtil.writeLog(LOGTYPE_PACKAGESQL,"package 'update sql' exception " + e.getMessage(), LOGLEVEL_ERROR, BaseDao.class);
		}
		// 封装返回
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("sql", updateSQL.toString());
		map.put("params", params);
		return map;
	}
	
	/**
	 * 封装insert语句
	 * @param t 已经初始化参数的dto
	 * @return
	 */
	protected Map<String,Object> packageInsertSQL(T t){
		// 拼装的sql
		StringBuffer insertInto = new StringBuffer("INSERT INTO "+t.getClass().getSimpleName()+" (");
		StringBuffer values = new StringBuffer("VALUES(");
		// 拼装的参数
		List<Object> params = new ArrayList<Object>();
		Field[] fields = t.getClass().getDeclaredFields();
		try {
			for(Field field : fields){
				// 获取数值类型
				String type = field.getType().getName();
				// 忽略布尔值
				if(type.equals("boolean")||type.equals("java.lang.Boolean")){
					continue;
				}
				// 允许访问值
				field.setAccessible(true);
				Object value = field.get(t);
				// 空字符忽略
				if(type.equals("char")&&(char)value=='\0'){
					continue;
				}
				// 基本类型为0忽略
				if(type.equals("short")||type.equals("double")
						||
				   type.equals("float")||type.equals("long")
						||
				   type.equals("byte")||type.equals("int")){
					
					if(Double.parseDouble(value.toString())==0){
						continue;
					}
				}
				// 如果为null或者空字符串忽略
				if(value==null || value.toString().trim().equals("")){
					continue;
				}
				// 字段名
				String fieldName = field.getName();
				// 忽略ID
				if(fieldName.equalsIgnoreCase("id")){
					continue;
				}
				// 拼接SQL
				insertInto.append(fieldName+",");
				values.append("?,");
				params.add(value);
			}
			insertInto.replace(insertInto.length()-1, insertInto.length(), ") ");
			values.replace(values.length()-1, values.length(), ")");
		} catch (Exception e) {
			e.printStackTrace();
			insertInto.delete(0,insertInto.length());
			values.delete(0,values.length());
			logWriteUtil.writeLog(LOGTYPE_PACKAGESQL,"package 'insert sql' exception " + e.getMessage(), LOGLEVEL_ERROR, BaseDao.class);
		}
		// 封装返回
		Map<String,Object> map = new HashMap<String,Object>();
		if(params.size()>0){
			map.put("sql", insertInto.append(values));
		}else{
			map.put("sql", "");
		}
		map.put("params", params);
		return map;
	}
	
	/**
	 * 插入数据
	 * @param entity
	 */
	@SuppressWarnings("unchecked")
	public void insert(T entity){
		Map<String, Object> insertMap = this.packageInsertSQL(entity);
		String sql = insertMap.get("sql").toString();
		List<Object> params = (List<Object>) insertMap.get("params");
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:" + sql + ",params" + params, LOGLEVEL_INFO, BaseDao.class);
		this.jdbcTemplate.update(sql, params.toArray());
	}
	
	/**
	 * 插入数据返回ID
	 * @param entity
	 */
	public int insertReturnId(T entity){
		
		this.insert(entity);
		
		return this.jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
	}
	
	/**
	 * 修改数据---重载
	 * @param entity
	 * @param whereParam
	 */
	@SuppressWarnings("unchecked")
	public void update(T entity,Tp whereParam){
		Map<String,Object> updateMap = this.packageUpateSQL(entity, "A");
		BaseDto bd = (BaseDto) whereParam.getClass().getSuperclass().cast(whereParam);// 获取父类BaseDto
		bd.setOrderWay(null);
		Map<String,Object> whereMap = this.packageWhereSQL(whereParam, "A");
		String sql = updateMap.get("sql").toString()+whereMap.get("sql").toString();
		List<Object> params = new ArrayList<Object>();
		params.addAll((List<Object>)updateMap.get("params"));
		params.addAll((List<Object>)whereMap.get("params"));
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sql+",params"+params, LOGLEVEL_INFO, BaseDao.class);
		this.jdbcTemplate.update(sql,params.toArray());
	}
	
	/**
	 * 根据指定条件删除数据
	 * @param whereParam
	 */
	@SuppressWarnings("unchecked")
	public void deleteByDto(Tp whereParam){
		String tableName = entityClass.getSimpleName();
		StringBuffer sql = new StringBuffer("DELETE A FROM ");
		sql.append(tableName+" A ");
		BaseDto bd = (BaseDto) whereParam.getClass().getSuperclass().cast(whereParam);// 获取父类BaseDto
		bd.setOrderWay(null);
		Map<String,Object> whereMap = this.packageWhereSQL(whereParam, "A");
		sql.append(whereMap.get("sql").toString());
		List<Object> params = new ArrayList<Object>();
		params.addAll((List<Object>)whereMap.get("params"));
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sql+",params"+params, LOGLEVEL_INFO, BaseDao.class);
		this.jdbcTemplate.update(sql.toString(),params.toArray());
	}
	
	/**
	 * 常规查询数据
	 * @param whereParam 查询条件
	 * @param classDao dao的class
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Tp> query(Tp whereParam,Class classDao){
		// 获取父类BaseDto
		BaseDto bd = (BaseDto) whereParam.getClass().getSuperclass().cast(whereParam);
		String alias = "A";// 别名
		StringBuffer sql = new StringBuffer("");
		sql.append("SELECT ");
		Field[] fields = entityClass.getDeclaredFields();
		for(Field field : fields){
			String name = field.getName();
			if(name.equals("serialVersionUID")) continue;
			sql.append(alias+"."+name+",");
		}
		// 判断是否存在自定义查询字段
		String selectField = bd.getSelectField();
		if(selectField!=null&&!selectField.trim().equals("")){
			sql.append(selectField+" ");
		}else{
			// 删除最后个逗号
			sql.delete(sql.length()-1,sql.length());
			sql.append(" ");
		}
		sql.append("FROM "+entityClass.getSimpleName()+" "+alias+" ");
		// 判断是否有关联条件
		String relevanceCondition = bd.getRelevanceCondition();
		if(relevanceCondition!=null&&!relevanceCondition.trim().equals("")){
			sql.append(relevanceCondition+" ");
		}
		// 查询参数
		List<Object> params = new ArrayList<Object>();
		// 拼接where查询条件
		Map<String,Object> whereMap = this.packageWhereSQL(whereParam, alias);
		String whereSQL = whereMap.get("sql").toString();
		params.addAll((List<Object>)whereMap.get("params"));
		sql.append(whereSQL);
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sql+";params:"+params, LOGLEVEL_INFO, classDao);
		// 查询
		List<Tp> list = null;
		try {
			if(params.size()>0){
				list = this.jdbcTemplate.query(sql.toString(), BeanPropertyRowMapper.newInstance(pClass),params.toArray());
			}else{
				list = this.jdbcTemplate.query(sql.toString(), BeanPropertyRowMapper.newInstance(pClass));
			}
		} catch (Exception e) {
			list = new ArrayList<Tp>();
			logWriteUtil.writeLog(LOGTYPE_DBQUERY, "exception:"+e.getMessage(), LOGLEVEL_ERROR, classDao);
		}
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "size:"+list.size(), LOGLEVEL_INFO, classDao);
		return list;
	}
	
	/**
	 * 查询常规数据总量
	 * @param whereParam
	 * @param classDao
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public int queryCount(Tp whereParam,Class classDao){
		// 获取父类BaseDto
		BaseDto bd = (BaseDto) whereParam.getClass().getSuperclass().cast(whereParam);
		String alias = "A";// 别名
		StringBuffer sql = new StringBuffer("SELECT COUNT(1) FROM "+entityClass.getSimpleName()+" "+alias+" ");
		// 判断是否有关联条件
		String relevanceCondition = bd.getRelevanceCondition();
		if(relevanceCondition!=null&&!relevanceCondition.trim().equals("")){
			sql.append(relevanceCondition+" ");
		}
		// 查询参数
		List<Object> params = new ArrayList<Object>();
		bd.setPageNo(null);
		bd.setPageSize(null);
		bd.setOrderWay(null);
		// 判断是否含有额外查询条件
		Map<String,Object> whereMap = this.packageWhereSQL(whereParam, alias);
		String whereSQL = whereMap.get("sql").toString();
		params.addAll((List<Object>)whereMap.get("params"));
		sql.append(whereSQL);
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "sql:"+sql+";params:"+params, LOGLEVEL_INFO, classDao);
		// 查询
		int count = 0;
		try {
			if(params.size()>0){
				count = this.jdbcTemplate.queryForObject(sql.toString(), Integer.class,params.toArray());
			}else{
				count = this.jdbcTemplate.queryForObject(sql.toString(), Integer.class);
			}
		} catch (Exception e) {
			count = 0;
			logWriteUtil.writeLog(LOGTYPE_DBQUERY, "exception:"+e.getMessage(), LOGLEVEL_ERROR, classDao);
		}
		logWriteUtil.writeLog(LOGTYPE_DBQUERY, "count:"+count, LOGLEVEL_INFO, classDao);
		return count;
	}
	
}
