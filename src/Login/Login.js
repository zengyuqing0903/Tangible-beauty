import React, { Component } from 'react';
import "../css/Login.css";
import { Button,Modal } from 'antd-mobile';
import {setTokenAll} from '../redux/actions';
import { Toast } from 'antd-mobile';


//手机,邮箱,密码正则表达式
const regTel = /^1\d{10}$/;
const regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{3,})+$/;
const regPwd = /^\w{6,20}$/;//包含英文，数字，下划线，6-20位

const alert = Modal.alert;

export default class Login extends Component {
    constructor(){
        super();
    }
    componentDidMount(){
        //console.log(this.props);
    }
    //跳转到注册页
    Register=()=>{
        this.props.history.push("/register");
    }
    //微信登录
    WXLogin=()=>{
        console.log("wx");
    }
    //qq登录
    QQLogin=()=>{
        console.log("qq");
    }
    //登录
    submit=()=>{
        var info = this.loginInfo.value;
        var pwd = this.pwd.value;
        if(info=="" || pwd==""){
            alert("请输入完整的登录信息")
        }else if(regTel.test(info) && regPwd.test(pwd)){
            //登录接口
            this.$api.login({account: info ,type: 'phone',password: pwd }).then(res => {
                console.log("手机号登录");

                console.log(res);
                if (res.data.status === 0) { 
                    this.$store.dispatch(setTokenAll(res.data.data.token, res.data.data.uid));
                    //登陆成功跳转Home
                    this.props.history.push("/home");
                    //存储消息通知
                    this.$api.notice().then(res=>{
                        //console.log(res.data.data);
                        let notice = [];
                        let data = res.data.data;
                        for(let i=0;i<data.length;i++){
                            //console.log(data[i]);
                            notice.push(data[i]);
                        }
                        var ls = window.localStorage;
                        ls.setItem("notice",JSON.stringify(notice));
                    })      
                } else {
                    Toast.fail('登录失败', 1, null, false)
                }
            })
        }else if(regEmail.test(info) && regPwd.test(pwd)){
            console.log("邮箱登录");
            this.$api.login({account: info ,type: 'email',password: pwd }).then(res => {
                console.log(res);
                if (res.data.status === 0) { 
                    this.$store.dispatch(setTokenAll(res.data.data.token, res.data.data.uid));
                    this.props.history.push("/home");         
                } else {
                    Toast.fail('登录失败', 1, null, false)
                }
            })
        }else if(!regPwd.test(pwd)){
            alert("请输入6-20位的密码(可包含英文,数字,下划线)")
        }else{
            alert("手机号或邮箱格式错误");
        }
    }
    //短信登录
    msg=()=>{
        this.props.history.push("/msgLogin");
    }
    render() {
        return (
            <div>
                <div className="login">
                    <input type="tel" ref={(inp)=>{this.loginInfo=inp}} placeholder="请输入手机号码或邮箱"  />
                    <input type="password" ref={(inp)=>{this.pwd=inp}} style={{marginTop:"20px"}} placeholder="请输入密码" />
                    <div className="l-mid">
                        <span id="forget" onClick={this.Register}>用户注册</span>
                        <span id="duanxin" onClick={this.msg}>短信登陆</span>
                    </div>

                    <Button type="submit" onClick={this.submit} className="subBtn" style={{marginTop:"80px",background:"white",border:"0.5px solid grey",color:"grey"}} activeStyle={{background:"lightgrey"}}>登  录</Button>

                    <div className="l-bottom">
                        <div className="l-img" style={{float:"left"}} onClick={this.QQLogin}>
                            <img src={require("../imgs/Home/qq.png")} />
                        </div>
                        <div className="l-img" style={{float:"right"}} onClick={this.WXLogin}>
                            <img src={require("../imgs/Home/weixin.png")} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
