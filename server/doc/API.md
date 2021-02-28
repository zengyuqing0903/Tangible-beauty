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
URL : http://localhost:3000/v1/featured/chuanda
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
URL : http://localhost:3000/v1/featured/lvxing
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
URL : http://localhost:3000/v1/featured/jianshen
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
URL : http://localhost:3000/v1/featured/keji
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
URL : http://localhost:3000/v1/featured/kexue
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

# 三、浏览页面

