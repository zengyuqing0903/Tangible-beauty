API文档

## 0.1. 目录 

- [0.1. 目录](#01-目录)    
- [1. 一、登录注册](#1-一登录注册)        
    - [1.0.1. 获取验证码](#101-获取验证码)    
    - [1.1. 用户注册](#11-用户注册)    
    - [1.2. 用户登录](#12-用户登录)
- [2. 二、私密写](#2-二私密写)    
    - [2.1. 获取所有私密信件](#21-获取所有私密信件)    
    - [2.2. 展示收信人列表](#22-展示收信人列表)    
    - [2.3. 书写信件内容](#23-书写信件内容)    
    - [2.4. 删除私密写的信件](#24-删除私密写的信件)    
    - [2.5. 更改收信人昵称](#25-更改收信人昵称)    
    - [2.6. 修改信件内容](#26-修改信件内容)    
    - [2.7. 添加收信人列表](#27-添加收信人列表)    
    - [2.8. 删除收信人昵称](#28-删除收信人昵称)    
    - [2.9. 获取背景图片](#29-获取背景图片)    
    - [2.10. 更换信纸](#210-更换信纸)    
    - [2.11. 上传信纸](#211-上传信纸)
- [3. 三、一起写](#3-三一起写)    
    - [3.1. 获取一起写主题](#31-获取一起写主题)    
    - [3.2. 获取主题详情](#32-获取主题详情)    
    - [3.3. 获取成员](#33-获取成员)    
    - [3.4. 书写主题信件内容](#34-书写主题信件内容)    
    - [3.5. 删除一起写信件](#35-删除一起写信件)    
    - [3.6. 添加主题](#36-添加主题)    
    - [3.7. 删除成员](#37-删除成员)    
    - [3.8. 删除主题](#38-删除主题)    
    - [3.9. 修改一起写信件](#39-修改一起写信件)    
    - [3.10. 展示一起写信件](#310-展示一起写信件)    
    - [3.11. 上传主题图片](#311-上传主题图片)
- [4. 四、信箱](#4-四信箱)    
    - [4.1. 获取信箱内容](#41-获取信箱内容)    
    - [4.2. 展示信箱具体内容](#42-展示信箱具体内容)    
    - [4.3. 点击收藏表示收藏信件](#43-点击收藏表示收藏信件)    
    - [4.4. 删除信箱信件](#44-删除信箱信件)
- [5. 五、我的](#5-五我的)    
    - [5.1. 获取个人信息+写信数](#51-获取个人信息写信数)    
    - [5.2. 获取个人信息中的分享数](#52-获取个人信息中的分享数)    
    - [5.3. 获取回收站信件(来自私密写)](#53-获取回收站信件来自私密写)    
    - [5.4. 彻底删除回收站信件](#54-彻底删除回收站信件)    
    - [5.5. 从回收站中恢复信件](#55-从回收站中恢复信件)    
    - [5.6. 获取收藏信件](#56-获取收藏信件)    
    - [5.7. 取消信件收藏](#57-取消信件收藏)    
    - [5.8. 修改昵称](#58-修改昵称)    
    - [5.9. 获取旧密码](#59-获取旧密码)    
    - [5.10. 修改密码](#510-修改密码)    
    - [5.11. 消息通知](#511-消息通知)    
    - [5.12. 头像上传](#512-头像上传)    
    - [5.13. 更换头像](#513-更换头像)
- [6. 六、私密写和信箱公共](#6-六私密写和信箱公共)    
    - [6.1. 展示信件内容](#61-展示信件内容)


URL : https://yf.htapi.pub/v1


| 错误码 |  错误解释 |
| ----- | -------  |
| 10003 | 参数错误  |
| 10006 | |
| 1045 | 连接数据库失败 |
| 1049 | 连接数据库失败 |
| 1062 | SQL语句错误 |

## 1. 一、登录注册

### 1.0.1. 获取验证码

**请求url**

```
URL : https://yf.htapi.pub/v1/users/verification
```

**请求方式**

```
POST
```

**接收参数**

| 参数    | 说明                |
| ------- | ------------------- |
| account | 手机号/邮箱         |
| type    | 类型  (phone/email) |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

## 1.1. 用户注册

**请求url**

```
URL : https://yf.htapi.pub/v1/users/register
```

**请求方式**

```
POST
```

**接收参数**

| 参数         | 说明                | 类型   |
| ------------ | ------------------- | ------ |
| account      | 手机号/邮箱         | string |
| type         | 类型  (phone/email) | string |
| verification | 验证码              | string |
| password     | 密码                | string |
| name         | 昵称 (可选)         | string |
| uday         | 注册时间            | 时间戳 |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

## 1.2. 用户登录

**请求url**

```
URL : https://yf.htapi.pub/v1/users/login
```

**请求方式**

```
POST
```

**接收参数**

| 参数     | 说明                | 类型   |
| -------- | ------------------- | ------ |
| account  | 手机号/邮箱         | string |
| type     | 类型  (phone/email) | string |
| password | 密码                | string |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

# 2. 二、私密写

## 2.1. 获取所有私密信件

**请求url**

```
URL : https://yf.htapi.pub/v1/private/getletter
```

**请求方式**

```
GET
```

**接收参数**

| 参数  | 说明     | 类型 |
| ----- | -------- | ---- |
| toUid | 收信人id | int  |

**返回参数**

```
{
  status: 0,
  message: 'OK',
  data: [
    RowDataPacket {
      Pid: 1,
      Ptitle: '哈啊啊',
      Pcontent: '哈哈',
      Uid: 1,
      toUid: 1,
      toNick: '致自己',
      isSend: 0,
      Pday: 1574867047089
    }
  ]
}
```

## 2.2. 展示收信人列表

**请求url**

```
URL : https://yf.htapi.pub/v1/private/getlist
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
    RowDataPacket {
       Uimage：用户头像
       Uname：用户名
       toNick：收信人昵称
    }
  ]
}
```

## 2.3. 书写信件内容

**请求url**

```
URL : https://yf.htapi.pub/v1/private/writeletter
```

**请求方式**

```
POST
```

**接收参数**

| 参数       | 说明             | 类型   |
| ---------- | ---------------- | ------ |
| Ptitle     | 信件标题         | string |
| Pcontent   | 信件内容         | string |
| toUid      | 收信人id         | int    |
| toNick     | 收信人称呼       | string |
| Pday       | 创建时间         | 时间戳 |
| ppid       | 背景id           | int    |
| mp3Data    | 音频的base64编码 | string |
| color      | 字体颜色         | vachar |
| fontFamily | 字体样式         | string |
| fontsize   | 字体大小         | string |

**返回参数**

```
{
  status: 0,
  message: 'OK',
}
```

## 2.4. 删除私密写的信件 

**请求url**

```
URL : https://yf.htapi.pub/v1/private/getletter/pdelete
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| Pid  | 信件id | int  |

**返回参数**

```
{
  status: 0,
  message: 'OK',
}
```

## 2.5. 更改收信人昵称

**请求url**

```
URL : https://yf.htapi.pub/v1/private/changetoNick
```

**请求方式**

```
POST
```

**接收参数**

| 参数   | 说明       | 类型   |
| ------ | ---------- | ------ |
| toUid  | 收信人id   | int    |
| toNick | 收信人昵称 | string |

**返回参数**

```
{
  status: 0,
  message: 'OK',
}
```

## 2.6. 修改信件内容

**请求url**

```
URL : https://yf.htapi.pub/v1/showletter/edit
```

**请求方式**

```
POST
```

**接收参数**

| 参数       | 说明             | 类型   |
| ---------- | ---------------- | ------ |
| pid        | 信件id           | int    |
| title      | 信件标题         | string |
| content    | 信件内容         | string |
| pday       | 信件修改后的日期 | 时间戳 |
| color      | 字体颜色         | string |
| fontFamily | 字体样式         | string |
| fontsize   | 字体大小         | string |

**返回参数**

```
{
  status: 0,
  message: 'OK' 
}
```

## 2.7. 添加收信人列表

**请求url**

```
URL : https://yf.htapi.pub/v1/private/addlist
```

**请求方式**

```
POST
```

**接收参数**

| 参数   | 说明       | 类型   |
| ------ | ---------- | ------ |
| toNick | 收信人昵称 | int    |
| pday   | 信件标题   | 时间戳 |

**返回参数**

```
{
  status: 0,
  message: 'OK' 
}
```

## 2.8. 删除收信人昵称

**请求url**

```
URL : https://yf.htapi.pub/v1/private/dellist
```

**请求方式**

```
POST
```

**接收参数**

| 参数   | 说明       | 类型 |
| ------ | ---------- | ---- |
| toNick | 收信人昵称 | int  |

**返回参数**

```
{
  status: 0,
  message: 'OK' 
}
```

## 2.9. 获取背景图片

**请求url**

```
URL : https://yf.htapi.pub/v1/private/getback
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
}
```

## 2.10. 更换信纸

**请求url**

```
URL : https://yf.htapi.pub/v1/private/changeback
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| pid  | 信件id | int  |
| ppid | 信纸id |      |

**返回参数**

```
{
  status: 0,
  message: 'OK' 
}
```

## 2.11. 上传信纸

**请求url**

```
URL : https://yf.htapi.pub/v1/image/paper
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

# 3. 三、一起写

## 3.1. 获取一起写主题

**请求url**

```
URL : https://yf.htapi.pub/v1/together/theme/
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
    RowDataPacket {
      Tid: 1,
      Tname: '哈啊啊',
      Timage: '哈哈',
      isPrivate: 1,
      Uid: 1,
      Tnumber:2,
    }
  ]
}
```

## 3.2. 获取主题详情

**请求url**

```
URL : https://yf.htapi.pub/v1/together/theme/showtheme
```

**示例**

```
http:localhost:8000/v1/together/theme/showtheme?tid=1
```

请求方式

```
GET
```

**接收参数**

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| Tid  | 主题id | int  |

**返回参数**

```
{
  status: 0,
  message: 'OK',
  data: [
    RowDataPacket {
      lid: 1,
      tid: 1,
      tname: '哈啊啊',
      timage: '哈哈',
      ltitle:'啦啦',
      lcontent:'呦呦',
      tday：'2019/9/8'
      uid: 1,
    }
  ]
}
```

## 3.3. 获取成员

**请求url**

```
URL : https://yf.htapi.pub/v1/together/theme/showtheme/member
```

**示例**

```
http://localhost:3000/v1/together/theme/showtheme/member?tid=2
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| Tid  | 主题id | int  |

**返回参数**

```
{
  status: 0,
  message: 'OK',
  data: [
   	 {
      uname:"anwenyue"，
      uid:'2'
    }
  ]
}
```

## 3.4. 书写主题信件内容

**请求url**

```
URL : https://yf.htapi.pub/v1/together/theme/writeletter
```

**请求方式**

```
POST
```

**接收参数**

| 参数     | 说明           | 类型   |
| -------- | -------------- | ------ |
| Ltitle   | 信件标题       | string |
| Lcontent | 信件内容       | string |
| Tday     | 创建日期       | string |
| Tid      | 主题id         | int    |
| imgArr   | 插入图片base64 | string |

**返回参数**

```
{
  status: 0,
  message: 'OK',
}
```

## 3.5. 删除一起写信件

**请求url**

```
URL : https://yf.htapi.pub/v1/together/theme/delletter
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| lid  | 信件id | int  |

**返回参数**

```
{
  status: 0,
  message: 'OK',
}
```

## 3.6. 添加主题

**请求url**

```
URL : https://yf.htapi.pub/v1/together/theme/addtheme
```

**请求方式**

```
POST
```

**接收参数**

| 参数      | 说明     | 类型       |
| --------- | -------- | ---------- |
| tname     | 主题名称 | string     |
| timage    | 主题图片 |            |
| tday      | 创建日期 | 时间戳     |
| isPrivate | 是否公开 | tinyint(2) |

**返回参数**

```
{
  status: 0,
  message: 'OK',
}
```

## 3.7. 删除成员

**请求url**

```
URL : https://yf.htapi.pub/v1/together/theme/deltmember
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| tid  | 主题id | int  |
| uid  | 用户id | int  |

**返回参数**

```
{
  status: 0,
  message: 'OK',
}
```

## 3.8. 删除主题

**请求url**

```
URL : https://yf.htapi.pub/v1/together/theme/deltheme
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| tid  | 主题id | int  |

**返回参数**

```
{
  status: 0,
  message: 'OK',
}
```

## 3.9. 修改一起写信件

**请求url**

```
URL : https://yf.htapi.pub/v1/together/theme/edit
```

**请求方式**

```
POST
```

**接收参数**

| 参数    | 说明             | 类型   |
| ------- | ---------------- | ------ |
| lid     | 信件id           | int    |
| title   | 信件标题         | string |
| content | 信件内容         | string |
| lday    | 信件修改后的日期 | 时间戳 |
| ppid    | 信件背景         | int    |

**返回参数**

```
{
  status: 0,
  message: 'OK',
}
```

## 3.10. 展示一起写信件

**请求url**

```
URL : https://yf.htapi.pub/v1/together/theme/show
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| uid  | 用户id | int  |

**返回参数**

```
{
  status: 0,
  message: 'OK',
  data:[
      {
          uid:用户id
          lid：信件id
          ltitle：信件标题
          lcontent：信件内容
      }
  ]
}
```

## 3.11. 上传主题图片

**请求url**

```
URL : https://yf.htapi.pub/v1/image/theme
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

# 4. 四、信箱

## 4.1. 获取信箱内容

**请求url**

```
URL : https://yf.htapi.pub/v1/mailbox
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
    RowDataPacket {
      Pid: 1,
      Ptitle: '哈啊啊',
      Pcontent: '哈哈',
      Uid: 1,
      Uimage:'',
      Uname:'妈妈',
      toNick: '致自己',
      isSend: 0,
      Pday: 1574867047089,
      Uname:'lxc'
    }
  ]
}
```

## 4.2. 展示信箱具体内容

**请求url**

```
URL : https://yf.htapi.pub/v1/mailbox/showmail
```

**示例**

```
https://yf.htapi.pub/v1/mailbox/showmail?pid=3
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| pid  | 信件id | int  |

**返回参数**

```
{
  status: 0,
  message: 'OK',
  data: [
    RowDataPacket {
      Pid: 3,
      Ptitle: 'uid4',
      Pcontent: 'lulala',
      Uid: 4,
      toUid: 1,
      toNick: '致安文悦',
      isSend: 1,
      Pday: 1569872354698,
      isCollection: 0,
      isDelete: 0
    }
  ]
}
```

## 4.3. 点击收藏表示收藏信件

**请求url**

```
URL : https://yf.htapi.pub/v1/mailbox/collect
```

**示例**

```
https://yf.htapi.pub/v1/mailbox/collect?pid=5
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| pid  | 信件id | int  |

**返回参数**

```
{
  status: 0,
  message: 'OK',
}

```

## 4.4. 删除信箱信件 

**请求url**

```
URL : https://yf.htapi.pub/v1/mailbox/deletemail
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| pid  | 信件id | int  |

**返回参数**

```
{
	status: 0,
	message: 'OK'
}
```

# 5. 五、我的

## 5.1. 获取个人信息+写信数

**请求url**

```
URL : https://yf.htapi.pub/v1/mine
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
    RowDataPacket {
      Uimage:'',
      Uname:'妈妈',
	  Ufraction:12
    }
  ]
}
```

## 5.2. 获取个人信息中的分享数

**请求url**

```
URL : https://yf.htapi.pub/v1/mine/sharenum
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
    RowDataPacket {
     sharenum：2
    }
  ]
}
```

## 5.3. 获取回收站信件(来自私密写)

**请求url**

```
URL : https://yf.htapi.pub/v1/mine/recyclepletter
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
}
```

## 5.4. 彻底删除回收站信件

**请求url**

```
URL : https://yf.htapi.pub/v1/mine/recyclebin/deletebin
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| pid  | 信件id | int  |

**返回参数**

```
{
  status: 0,
  message: 'OK',
}
```

## 5.5. 从回收站中恢复信件 

**请求url**

```
URL : https://yf.htapi.pub/v1/mine/recyclebin/restore
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| pid  | 信件id | int  |

**返回参数**

```
{
  status: 0,
  message: 'OK',
}
```

## 5.6. 获取收藏信件

**请求url**

```
URL : https://yf.htapi.pub/v1/mine/favorite
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
}
```

## 5.7. 取消信件收藏

**请求url**

```
URL : https://yf.htapi.pub/v1/mine/delcollect
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| pid  | 信件id | int  |

**返回参数**

```
 {
 	status: 0,
 	message: 'OK'
 }
```

## 5.8. 修改昵称

**请求url**

```
URL : https://yf.htapi.pub/v1/mine/changename
```

**请求方式**

```
POST
```

**接收参数**

| 参数  | 说明     | 类型   |
| ----- | -------- | ------ |
| uname | 用户名称 | string |

**返回参数**

```
{
  status: 0,
  message: 'OK',
}
```

## 5.9. 获取旧密码

**请求**url

```
URL : https://yf.htapi.pub/v1/mine/getoldpwd
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
          upassword:用户密码
      }
  ]
}
```

## 5.10. 修改密码

**请求url**

```
URL : https://yf.htapi.pub/v1/mine/changepwd
```

**请求方式**

```
POST
```

**接收参数**

| 参数   | 说明       | 类型   |
| ------ | ---------- | ------ |
| newpwd | 用户新密码 | string |

**返回参数**

```
{
  status: 0,
  message: 'OK',
}
```

## 5.11. 消息通知

**请求url**

```
URL : https://yf.htapi.pub/v1/mine/notice
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
          Nid:1,
          Ntitle:'通知'，
          Ncontent：'一封的新版本更新了，据统计80%的用户选择更新版本'，
          Nday：1577993782977
      }
  ]
}
```

## 5.12. 头像上传

**请求url**

```
URL : https://yf.htapi.pub/v1/image/head
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

## 5.13. 更换头像

**请求url**

```
URL : https://yf.htapi.pub/v1/image/changehead
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



# 6. 六、私密写和信箱公共

## 6.1. 展示信件内容

**请求url**

```
URL : https://yf.htapi.pub/v1/showletter/show
```

**示例**

```
https://yf.htapi.pub/v1/showletter/show？pid=5
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| Pid  | 信件id | int  |

**返回参数**

```
{
  status: 0,
  message: 'OK',
  data: [
    RowDataPacket {
      Pid: 1,
      Ptitle: '哈啊啊',
      Pcontent: '哈哈',
      Uid: 1,
      toUid: 1,
      toNick: '致自己',
      isSend: 0,
      Pday: 1574867047089
    }
  ]
}
```



