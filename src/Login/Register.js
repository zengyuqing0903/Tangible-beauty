import React, { Component } from 'react'
import "../css/Login.css";
import { Button,Modal,List,InputItem } from 'antd-mobile';
import {setTokenAll} from '../redux/actions';
import { Toast } from 'antd-mobile';

//手机,邮箱,密码正则表达式
const regTel = /^1\d{10}$/;
const regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{3,})+$/;
const regPwd = /^\w{6,20}$/;//包含英文，数字，下划线，6-20位

const alert = Modal.alert;

export default class Register extends Component {
    constructor(){
        super();
        this.state = {
            code : "获取验证码",
            btn : false
        }
    }
    //返回登录
    back=()=>{
        this.props.history.push("/login");
    }
    componentDidMount(){

    }
    submit=()=>{
        var info = this.info.state.value;
        var pwd = this.pwd.state.value;
        var rePwd = this.rePwd.state.value;
        var Vcode = this.Vcode.state.value;
        var name = this.name.state.value;
        if(info=="" || pwd=="" || rePwd=="" || Vcode=="" || name==""){
            alert("请填写完整的注册信息");
        }else if(!regPwd.test(pwd)){
            alert("请输入6-20位的密码(可包含英文,数字,下划线)");
        }else if(pwd != rePwd){
            alert("两次密码不一致！")
        }else if(regTel.test(info) && regPwd.test(pwd)){
            console.log("电话号码注册");
            let timestamp = Date.parse(new Date());
            //注册接口
            this.$api.register({account:info,type:'phone',verification:Vcode,password:pwd,name : name,uday:timestamp}).then(res=>{
                console.log(res);
                if (res.data.status === 0) { 
                    alert("注册成功");        
                } else {
                    Toast.fail('注册失败', 1, null, false)
                }
            })
        }else if(regEmail.test(info) && regPwd.test(pwd)){
            console.log("邮箱注册");
            let timestamp = Date.parse(new Date());
            this.$api.register({account:info,type:'email',verification:Vcode,password:pwd,name : name,uday:timestamp}).then(res=>{
                console.log(res);
                if (res.data.status === 0) { 
                    alert("注册成功");        
                } else {
                    Toast.fail('注册失败', 1, null, false)
                }
            })
        }else{
            alert("电话号码或邮箱格式错误");
        }
    }
    getVcode=()=>{
        var info = this.info.state.value;
        if(info == ""){
            alert("请输入电话号码或邮箱");
        }else if(regTel.test(info) || regEmail.test(info)){
            if(regTel.test(info)){
                console.log('发送手机验证码');
                this.$api.register_Vcode({account:info,type:'phone'}).then(res=>{
                    console.log(res);
                })
            }else{
                console.log('发送邮箱验证码');
                this.$api.register_Vcode({account:info,type:'email'}).then(res=>{
                    console.log(res);
                })
            }
            //重新获取验证码
            var time = 30;
            this.timer = setInterval(() => {
                time = time -1;
                if(time <0){
                    this.setState({
                        code:"获取验证码",
                        btn : false
                    })
                    clearInterval(this.timer);
                }else{
                    var str = "重新获取"+"("+time+")";
                    this.setState({
                        code : str,
                        btn :true
                    })
                }
                
            },1000);
        }else{
            alert("手机号或邮箱格式错误");
        }
            
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    render() {
        return (
            <div>
                <div className="register">
                    <div className="back" onClick={this.back}>
                        <img src={require("../imgs/Home/back.png")} />
                    </div>
                    <div className="re-body">
                        <List renderHeader={() => '注册'}>
                            <InputItem ref={(inp)=>{this.info=inp}} type="text" placeholder="请输入手机号或邮箱">Tel/Email</InputItem>
                            <InputItem ref={(inp)=>{this.pwd=inp}} type="password" placeholder="****" >密码</InputItem>
                            <InputItem ref={(inp)=>{this.rePwd=inp}} type="password" placeholder="再次输入密码" >密码</InputItem>
                            <InputItem ref={(inp)=>{this.Vcode=inp}} type="text" >验证码</InputItem>
                            <InputItem ref={(inp)=>{this.name=inp}} type="text" >昵称</InputItem>
                        </List>
                    </div>
                    <div className="re-Btn">
                        <Button style={{width:"50%",float:"left",background:"grey",color:"white"}}
                            activeStyle={{background:"lightgrey"}}
                            onClick={this.getVcode}
                            disabled={this.state.btn}
                        >{this.state.code}</Button>
                        <Button style={{background:"grey",color:"white",width:"50%",float:"right"}}
                            activeStyle={{background:"lightgrey"}} type="submit" onClick={this.submit}
                        >注册</Button>
                    </div>
                </div>
            </div>
        )
    }
}
