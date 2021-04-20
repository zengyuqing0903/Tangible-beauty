# 一、登录注册

## 1.0 获取验证码

**请求url**

```
URL : http://localhost:3000/v1/users/verification
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
URL : http://localhost:3000/v1/users/register
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
URL : http://localhost:3000/v1/users/login
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

# 二、精选

## 2.0推荐

**请求url**

```
URL : http://localhost:3000/v1/featured/recommend
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明 | 类型 |      |
| ---- | ---- | ---- | ---- |
|      |      |      |      |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

## 2.1美食

**请求url**

```
URL : http://localhost:3000/v1/featured/gourmet
```

**请求方式**

```
GET
```

**接收参数**

| 参数    | 说明 | 类型   |      |
| ------- | ---- | ------ | ---- |
| gourmet | 美食 | string |      |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

## 2.2穿搭

**请求url**

```
URL : http://localhost:3000/v1/featured/outfit
```

**请求方式**

```
GET
```

**接收参数**

| 参数    | 说明 | 类型   |      |
| ------- | ---- | ------ | ---- |
| chuanda | 穿搭 | string |      |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

## 2.3旅行

**请求url**

```
URL : http://localhost:3000/v1/featured/travel
```

**请求方式**

```
GET
```

**接收参数**

| 参数   | 说明 | 类型   |      |
| ------ | ---- | ------ | ---- |
| lvxing | 美食 | string |      |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

## 2.4健身

**请求url**

```
URL : http://localhost:3000/v1/featured/fitness
```

**请求方式**

```
GET
```

**接收参数**

| 参数     | 说明 | 类型   |      |
| -------- | ---- | ------ | ---- |
| jianshen | 美食 | string |      |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

## 2.5科技

**请求url**

```
URL : http://localhost:3000/v1/featured/technology
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明 | 类型   |      |
| ---- | ---- | ------ | ---- |
| keji | 美食 | string |      |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

## 2.6自然科学

**请求url**

```
URL : http://localhost:3000/v1/featured/natural
```

**请求方式**

```
GET
```

**接收参数**

| 参数  | 说明 | 类型   |      |
| ----- | ---- | ------ | ---- |
| kexue | 科学 | string |      |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

## 2.7浏览界面

**请求url**

```
URL : http://localhost:3000/v1/featured/browse
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明      | 类型   |      |
| ---- | --------- | ------ | ---- |
| pid  | 作品idint | string |      |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

## 2.8查看是否点赞

**请求url**

```
URL : http://localhost:3000/v1/featured/islike
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明 | 类型   |      |
| ---- | ---- | ------ | ---- |
| pid  | 科学 | string |      |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

## 2.9获取点赞数

**请求url**

```
URL : http://localhost:3000/v1/featured/likenum
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型   |      |
| ---- | ------ | ------ | ---- |
| pid  | 作品id | string |      |

**返回参数**

```
{
	status: 0,
	message: "OK"，
	data:{
        num:2
	}
}
```

## 2.10点赞

**请求url**

```
URL : http://localhost:3000/v1/featured/like
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明   | 类型      |      |
| ---- | ------ | --------- | ---- |
| pid  | 视频id | int       |      |
| lday | 日期   | timestamp |      |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

## 2.11取消点赞

**请求url**

```
URL : http://localhost:3000/v1/featured/cancelLikes
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明   | 类型 |      |
| ---- | ------ | ---- | ---- |
| pid  | 视频id | int  |      |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

## 2.12判断是否关注

**请求url**

```
URL : http://localhost:3000/v1/featured/isattention
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明         | 类型 |      |
| ---- | ------------ | ---- | ---- |
| uid  | 视频发布者id | int  |      |

**返回参数**

```
{
	attention:0//0表示没关注，1表示关注
}
```

## 2.13关注

**请求url**

```
URL : http://localhost:3000/v1/featured/attention
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明       | 类型 |      |
| ---- | ---------- | ---- | ---- |
| uid  | 被关注人id | int  |      |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

## 2.14取消关注

**请求url**

```
URL : http://localhost:3000/v1/featured/delattention
```

**请求方式**

```
POST
```

**接收参数**

| 参数   | 说明         | 类型 |      |
| ------ | ------------ | ---- | ---- |
| deluid | 被取消关注id | int  |      |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

## 2.15收藏

**请求url**

```
URL : http://localhost:3000/v1/featured/collect
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明   | 类型 |      |
| ---- | ------ | ---- | ---- |
| pid  | 作品id | int  |      |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

## 2.16取消收藏

**请求url**

```
URL : http://localhost:3000/v1/featured/cancelCollect
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明   | 类型 |      |
| ---- | ------ | ---- | ---- |
| pid  | 作品id | int  |      |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

## 2.17查看是否收藏

**请求url**

```
URL : http://localhost:3000/v1/featured/iscollect
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型 |      |
| ---- | ------ | ---- | ---- |
| pid  | 作品id | int  |      |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

# 

# 三、评论

## 3.1获取评论

**请求url**

```
URL : http://localhost:3000/v1/comment/getcomment
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明         | 类型 |      |
| ---- | ------------ | ---- | ---- |
| pid  | 被取消关注id | int  |      |

**返回参数**

```
{
	status: 0,
	message: "OK"，
	data：[
        uname:'kk',
        uimage:'1545789664.jpg',
        comment:',kkkk'
	]
}
```

## 3.2发布评论

**请求url**

```
URL : http://localhost:3000/v1/comment/postcomment
```

**请求方式**

```
POST
```

**接收参数**

| 参数    | 说明     | 类型      |      |
| ------- | -------- | --------- | ---- |
| pid     | 作品id   | int       |      |
| touid   | 发布者id | int       |      |
| comment | 评论内容 | text      |      |
| comday  | 评论日期 | timestamp |      |

**返回参数**

```
{
	status: 0,
	message: "OK"
}
```

## 3.3评论数

**请求url**

```
URL : http://localhost:3000/v1/comment/commentnum
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型 |      |
| ---- | ------ | ---- | ---- |
| pid  | 视频id | int  |      |

**返回参数**

```
{
	status: 0,
	message: "OK",
	data:[
        num:5
	]
}
```

# 四、消息

# 五、个人中心

## 5.0获取个人中心

**请求url**

```
URL : http://localhost:3000/v1/mine/
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明 | 类型 |      |
| ---- | ---- | ---- | ---- |
|      |      |      |      |

**返回参数**

```
{
	status: 0,
	message: "OK",
}
```

## 5.1修改昵称

**请求url**

```
URL : http://localhost:3000/v1/mine/changename
```

**请求方式**

```
POST
```

**接收参数**

| 参数  | 说明           | 类型 |      |
| ----- | -------------- | ---- | ---- |
| uname | 修改后的用户名 |      |      |

**返回参数**

```
{
	status: 0,
	message: "OK",
}
```

## 5.2获取旧密码

**请求url**

```
URL : http://localhost:3000/v1/mine/getoldpwd
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明 | 类型 |      |
| ---- | ---- | ---- | ---- |
|      |      |      |      |

**返回参数**

```
{
	status: 0,
	message: "OK",
	data:[
        upassword:'1564889'
	]
}
```

## 5.3修改密码

**请求url**

```
URL : http://localhost:3000/v1/mine/changepwd
```

**请求方式**

```
POST
```

**接收参数**

| 参数   | 说明   | 类型 |      |
| ------ | ------ | ---- | ---- |
| newpwd | 新密码 |      |      |

**返回参数**

```
{
	status: 0,
	message: "OK",
}
```

## 5.4获取粉丝数

**请求url**

```
URL : http://localhost:3000/v1/mine/fans
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型 |      |
| ---- | ------ | ---- | ---- |
| uid  | 用户id | int  |      |

**返回参数**

```
{
	status: 0,
	message: "OK",
	data:[
        num:5
	]
}
```

## 5.5获取关注数

**请求url**

```
URL : http://localhost:3000/v1/mine/attentions
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型 |      |
| ---- | ------ | ---- | ---- |
| uid  | 用户id | int  |      |

**返回参数**

```
{
	status: 0,
	message: "OK",
	data:[
        num:6
	]
}
```

## 5.6查看关注列表

**请求url**

```
URL : http://localhost:3000/v1/mine/attentionlist
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型 |      |
| ---- | ------ | ---- | ---- |
| uid  | 用户id | int  |      |

**返回参数**

```
{
	status: 0,
	message: "OK",
}
```

## 5.7查看粉丝列表

**请求url**

```
URL : http://localhost:3000/v1/mine/fanslist
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型 |      |
| ---- | ------ | ---- | ---- |
| uid  | 用户id | int  |      |

**返回参数**

```
{
	status: 0,
	message: "OK",
}
```

## 5.8获取他人信息

**请求url**

```
URL : http://localhost:3000/v1/mine/myself
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型 |      |
| ---- | ------ | ---- | ---- |
| uid  | 用户id | int  |      |

**返回参数**

```
{
	status: 0,
	message: "OK",
}
```

## 5.9查看收藏列表

**请求url**

```
URL : http://localhost:3000/v1/mine/collectlist
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明 | 类型 |      |
| ---- | ---- | ---- | ---- |
|      |      |      |      |

**返回参数**

```
{
	status: 0,
	message: "OK",
	data:[
        
	]
}
```

## 5.10查看作品列表

**请求url**

```
URL : http://localhost:3000/v1/mine/compositionlist
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明 | 类型 |      |
| ---- | ---- | ---- | ---- |
|      |      |      |      |

**返回参数**

```
{
	status: 0,
	message: "OK",
	data:[
        
	]
}
```

## 5.11查看喜欢列表

**请求url**

```
URL : http://localhost:3000/v1/mine/likelist
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明 | 类型 |      |
| ---- | ---- | ---- | ---- |
|      |      |      |      |

**返回参数**

```
{
	status: 0,
	message: "OK",
	data:[
        
	]
}
```

## 5.12上传头像

**请求url**

```
URL : http://localhost:3000/v1/mine/head
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明 | 类型 |      |
| ---- | ---- | ---- | ---- |
|      |      |      |      |

**返回参数**

```
{
	status: 0,
	message: "OK",
	data:[
        
	]
}
```

## 5.13改变头像

**请求url**

```
URL : http://localhost:3000/v1/mine/changehead
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明 | 类型 |      |
| ---- | ---- | ---- | ---- |
| name |      |      |      |

**返回参数**

```
{
	status: 0,
	message: "OK",
	data:[
        
	]
}
```

# 六、发布作品

## 6.0

**请求url**

```
URL : http://localhost:3000/v1/mine/changehead
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明 | 类型 |      |
| ---- | ---- | ---- | ---- |
| name |      |      |      |

**返回参数**

```
{
	status: 0,
	message: "OK",
	data:[
        
	]
}
```

# 

