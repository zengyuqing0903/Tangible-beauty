# 目录
- [一、登录](#一登录)   
	- [1.登录](#1登录)
	- [2.获取用户名](#2获取用户名)
- [二、统计](#二统计)
	- [1.获取昨日新注册用户数量](#1获取昨日新注册用户数量)
   	- [2.获取累计注册](#2获取累计注册)    
   	- [3.获取历史数据查询](#3获取历史数据查询)   
   	- [4.获取昨日新增加的写信数](#4获取昨日新增加的写信数)    
   	- [5.获取昨日新增加分享数](#5获取昨日新增加分享数)   
   	- [6.获取累计写信数](#6获取累计写信数)   
   	- [7.信件分析获取历史数据查询](#7信件分析获取历史数据查询)
- [三、管理](#三管理)   
	- [1.展示管理员列表](#1展示管理员列表)    
	- [2.删除管理员](#2删除管理员)   
	- [3.检查添加手机号码](#3检查添加手机号码)    
	- [4.添加管理员](#4添加管理员)    
	- [5.获取用户总数](#5获取用户总数)    
	- [6.获取用户列表](#6获取用户列表)    
	- [7.检查uid是否是主题创建者](#7检查uid是否是主题创建者)  
	- [8.删除用户](#8删除用户)   
	- [9.获取私密写信件列表](#9获取私密写信件列表)    
	- [10.私密写信件列表删除操作](#10私密写信件列表删除操作)    
	- [11.获取私密写信件总数](#11获取私密写信件总数)    
	- [12.获取一起写信件列表](#12获取一起写信件列表)    
	- [13.一起写信件列表删除操作](#13一起写信件列表删除操作)    
	- [14.获取一起写信件总数](#14获取一起写信件总数)  
	- [15.获取信纸数量](#15获取信纸数量)    
	- [16.展示信纸列表](#16展示信纸列表)    
	- [17.添加信纸](#17添加信纸)    
	- [18.删除信纸](#18删除信纸)


# 一、登录

## 1.登录

**请求url**

```
URL : https://yf.htapi.pub/v1/adminlogin/login
```

**请求方式**

```
GET
```

**接收参数**

| 参数     | 说明        |
| -------- | ----------- |
| account  | 手机号/邮箱 |
| password | 密码        |

**返回参数:**

```
{
	status: 0,
	message: "OK"
}
```

## 2.获取用户名

**请求url**

```
URL : https://yf.htapi.pub/v1/adminlogin/getname
```

**请求方式**

```
GET
```

**接收参数**

**返回参数**

```
{
	status: 0,
	message: "OK",
	data:[
        {aname:'maxiaoyanD'}
	]
}
```

# 二、统计

## 1.获取昨日新注册用户数量

**请求url**

```
URL : https://yf.htapi.pub/v1/analy
```

**请求方式**

```
GET
```

**接收参数**

**返回参数**

```
{
	status: 0, 
 	message: 'OK', 
 	data: [ { usernum: 3 } ]     
 } 
```

## 2.获取累计注册

**请求url**

```
URL : https://yf.htapi.pub/v1/analy/totalnum
```

**请求方式**

```
GET
```

**接收参数**
**返回参数**

```
{
	status: 0, 
 	message: 'OK', 
 	data: [ { totalnum: 3 } ]     
 } 
```

## 3.获取历史数据查询

**请求url**

```
URL : https://yf.htapi.pub/v1/analy/userdata
```

**请求方式**

```
GET
```

**接收参数**

**返回参数**

```
{
	status: 0, 
	message: 'OK', 
    data: [
    	{
             Uday:'2019-12-13',
             newregist:1
         } 
    ]     
} 
```

## 4.获取昨日新增加的写信数

**请求url**

```
URL : https://yf.htapi.pub/v1/analy/addpletternum
```

**请求方式**

```
GET
```

**接收参数**

**返回参数**

```
{
	status: 0, 
	message: 'OK', 
	data: [ { newletnum: 1 } ]     
} 
```

## 5.获取昨日新增加分享数

**请求url**

```
URL : https://yf.htapi.pub/v1/analy/shareletternum
```

**请求方式**

```
GET
```
**接收参数**

**返回参数**

```
{
	status: 0, 
	message: 'OK', 
	data: [ { sharenum: 1 } ]     
} 
```

## 6.获取累计写信数

**请求url**

```
URL : https://yf.htapi.pub/v1/analy/totalletnum
```

**请求方式**

```
GET
```

**接收参数**

**返回参数**

```
{
	status: 0, 
	message: 'OK', 
	data: [ { totalletnum: 1 } ]     
} 
```

## 7.信件分析获取历史数据查询

**请求url**

```
URL : https://yf.htapi.pub/v1/analy/letterdata
```

**请求方式**

```
GET
```

**接收参数**

**返回参数**

```
{
	"status":0,
	"data":{
		"p":[
			{"date":"2019-12-12","pidnum":1},
			{"date":"2019-12-13","pidnum":1}],
		"t":[]
	}
} 
```

# 三、管理

## 1.展示管理员列表

**请求url**

```
URL : https://yf.htapi.pub/v1/adminmanager/show
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明     |
| :--- | :------- |
| page | 当前页数 |

**返回参数**

```
{
    status: 0,
    message: "OK",
    data:[
        {
            aid:1,
            aname:'maxiaoyan',
            aphone:'15978613',
            aday:'2019-8-8'
        }
    ]
}
```

## 2.删除管理员

**请求url**

```
URL : https://yf.htapi.pub/v1/adminmanager/deladmin
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明     |
| :--- | :------- |
| aid  | 管理员id |

**返回参数**

```
{
    status: 0,
    message: "OK",
}
```

## 3.检查添加手机号码

**请求url**

```
URL : https://yf.htapi.pub/v1/adminmanager/checkphone
```

**请求方式**

```
GET
```

**接收参数**

| 参数   | 说明   |
| :----- | :----- |
| aphone | 手机号 |

**返回参数**

```
{
    status: 0,
    message: "OK",
}
```

## 4.添加管理员

**请求url**

```
URL : https://yf.htapi.pub/v1/adminmanager/addadmin
```

**请求方式**

```
POST
```

**接收参数**

| 参数      | 说明     |
| :-------- | :------- |
| aphone    | 手机号码 |
| apassword | 密码     |
| aname     | 昵称     |
| aday      | 创建日期 |

**返回参数**

```
{
    status: 0,
    message: "OK",
}
```

## 5.获取用户总数

**请求url**

```
URL : https://yf.htapi.pub/v1/adminmanager/getusers
```

**请求方式**

```
GET
```

**接收参数**

**返回参数**

```
{
	status: 0, 
 	message: 'OK', 
 	data:[
          {
            num：5
           }
       ]  
 } 
```

## 6.获取用户列表

**请求url**

```
URL : https://yf.htapi.pub/v1/adminmanager/userlist
```

**请求方式**

```
GET
```

**接收参数**

**返回参数**

```
{
	status: 0, 
 	message: 'OK', 
 	data:[
          {
            uimage：用户头像
            uid：用户id，
            uname：用户名
            uphone：用户手机号
            uday：注册时间
           }
       ]  
 } 
```

## 7.检查uid是否是主题创建者

**请求url**

```
URL : https://yf.htapi.pub/v1/adminmanager/checkuid
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   |
| :--- | :----- |
| uid  | 用户id |

**返回参数**

```
{
	status: 0, 
 	message: 'OK',   
 } 
```

## 8.删除用户

**请求url**

```
URL : https://yf.htapi.pub/v1/adminmanager/deluser
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明   |
| :--- | :----- |
| uid  | 用户id |
| tid  | 主题id |

**返回参数**

```
{
	status: 0, 
 	message: 'OK', 
 	data:[]  
 } 
```

## 9.获取私密写信件列表

**请求url**

```
URL : https://yf.htapi.pub/v1/adminletman
```

**请求方式**

```
GET
```

**接收参数**

**返回参数**

```
{
	status: 0, 
 	message: 'OK', 
 	data:[
          {
            Pid: 23,
            Ptitle: '快来给他写信吧',
            Pcontent: '他的信箱还没有东西哦',
            Uid: 1,
            toUid: null,
            toNick: '哈哈哈',
            isSend: 0,
            Pday: 1576045963000,
            isCollection: 0,
            isDelete: 0
           }
       ]  
 } 
```

## 10.私密写信件列表删除操作

**请求url**

```
URL : https://yf.htapi.pub/v1/adminletman/delpletter
```

**请求方式**

```
POST
```

**接收参数**

**返回参数**

```
{
	status: 0, 
 	message: 'OK'
 } 
```

## 11.获取私密写信件总数

**请求url**

```
URL : https://yf.htapi.pub/v1/adminletman/totalpid
```

**请求方式**

```
GET
```

**接收参数**

**返回参数**

```
{
	status: 0, 
 	message: 'OK'
 	data:[
        {
            totalpid:2
        }
 	]
 } 
```

## 12.获取一起写信件列表

**请求url**

```
URL : https://yf.htapi.pub/v1/adminletman/tletterlist
```

**请求方式**

```
GET
```

**接收参数**

**返回参数**

```
{
	status: 0, 
	message: 'OK', 
	data:[
		{
			Lid: 2,
			Ltitle: '邀请朋友吧',
			Lcontent: '欢迎来到一起写',
			Uid: 1,
			Lday: 1576045963000,
			isDelete: 0
		}
		]
}
```

## 13.一起写信件列表删除操作

**请求url**

```
URL : https://yf.htapi.pub/v1/adminletman/deltletter
```

**请求方式**

```
POST
```

**接收参数**

**返回参数**

```
{
	status: 0, 
 	message: 'OK'
 } 
```

## 14.获取一起写信件总数

**请求url**

```
URL : https://yf.htapi.pub/v1/adminletman/totallid
```

**请求方式**

```
GET
```

**接收参数**

**返回参数**

```
{
	status: 0, 
 	message: 'OK'
 	data:[
        {
            totallid:2
        }
 	]
 } 
```

## 15.获取信纸数量

**请求url**

```
URL : https://yf.htapi.pub/v1/papermanager/getpaper
```

**请求方式**

```
GET
```

**接收参数**

**返回参数**

```
{
	status: 0, 
 	message: 'OK'
 	data:[
        {
            num:2
        }
 	]
 } 
```

## 16.展示信纸列表

**请求url**

```
URL : https://yf.htapi.pub/v1/papermanager/paperlist
```

**请求方式**

```
GET
```

**接收参数**

**返回参数**

```
{
	status: 0, 
 	message: 'OK'
 	data:[
        {
            ppid：1，
            pimage：'url'
        }
 	]
 } 
```

## 17.添加信纸

**请求url**

```
URL : https://yf.htapi.pub/v1/papermanager/addpaper
```

**请求方式**

```
POST
```

**接收参数**

**返回参数**

```
{
	status: 0, 
 	message: 'OK'
 	data:[
        {
            ppid：1，
            pimage：'url'
        }
 	]
 } 
```

## 18.删除信纸

**请求url**

```
URL : https://yf.htapi.pub/v1/papermanager/delpaper
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明   |
| :--- | :----- |
| ppid | 信纸id |

**返回参数**

```
{
	status: 0, 
 	message: 'OK'
 } 
```

