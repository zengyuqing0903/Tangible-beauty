import React, { Component } from 'react'
import {NavLink,Link,Switch} from 'react-router-dom'
import { Button,WhiteSpace,InputItem,List,Toast} from 'antd-mobile'

export default class changepsw extends Component {
    constructor(){
        super();
        this.state={
            oldpwd:'',
            inputoldpwd:'',
            newpwd:''
        }
    }
    componentDidMount(){
        // 获取旧密码
        this.$api.getoldpwd().then(res => {
            console.log("旧密码："+res.data.data[0].upassword)
            this.setState({
                oldpwd:res.data.data[0].upassword
            })
        })
    }
    // 旧密码输入框
    oldChange = (e) =>{
        this.setState({
            inputoldpwd:e
        })
    }
    // 新密码输入框
    newChange = (e) =>{
        this.setState({
            newpwd:e
        })
    }
    // 判断
    submitChange = () => {
        if(this.state.oldpwd == this.state.inputoldpwd){
            if(this.state.newpwd!= ''){
                this.$api.changepwd({newpwd:this.state.newpwd}).then(res => {})
                Toast.success('修改成功', 1);
            }else{
                alert('密码不能为空')
            }
        }else{
            Toast.fail('密码错误', 1);
        }
    }
    render() {
        return (
            <div>
                <div className="col-tab">
                    修改密码
                    <Link to="/setting" 
                    style={{
                        float:"left",
                        height:"3em",
                        width:"3em",
                        position:"absolute",
                        left:"0",
                        top:"0",
                        zIndex:"1"                       
                    }}></Link>
                    <i                           
                    className="iconfont icon-fanhui" 
                    style={{
                        position:"absolute",
                        left:"5%",
                        height:"2%",
                        fontSize:"1.2em"     
                    }}></i>
                </div>
                {/* 输入框 */}
                <List renderHeader={() => '旧密码：'}>
                    <InputItem
                    clear
                    type='password'
                    placeholder="若包含字母，请区分大小写"
                    onChange={(e)=>this.oldChange(e)}
                ></InputItem>
                </List>
                <List renderHeader={() => '新密码：'}>
                    <InputItem
                    clear
                    type='password'
                    placeholder="请输入6-20位的密码(可包含英文,数字,下划线"
                    ref={el => this.autoFocusInst = el}
                    onChange={(e)=>this.newChange(e)}
                ></InputItem>
                </List>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Button
                onClick={(e)=>this.submitChange(e)}
                >确定</Button>
            </div>
        )
    }
}
