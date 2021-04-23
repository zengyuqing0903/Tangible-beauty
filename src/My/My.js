import React, { Component } from 'react'
import '../css/Login.css'
import {NavLink,Link} from 'react-router-dom'
import '../css/My.css'
import { List,WhiteSpace } from 'antd-mobile'
const Item = List.Item;

export default class My extends Component {
    constructor(){
        super();
        this.state={
            arr:[{"Uname":"你的昵称",'pidname':'0'}],
            brr:[{"sharenum":'0'}],
            signature:'',
            fans:'',
            attentions:''
        }
    }
    componentDidMount(){
        this.$api.mine().then(res => {
            console.log("skskp")
            // 获取数据成功后的其他操作
            this.setState({
                arr:res.data.data
            })
            console.log(this.state.arr)
        }) 
        // this.$api.sharenum().then(res => {
        //     // 获取数据成功后的其他操作
        //     this.setState({
        //         brr:res.data.data
        //     })
        // }) 
        // this.$api.getHomeData().then(res=>{
        //     // console.log(res);
        //     let data = res.data.data;
        //     this.setState({
        //         signature : data[0].signature,
        //     })
        // })
        // this.$api.setgrade().then(res=>{
        //     console.log(res);
        // })
        // this.$api.getfans().then(res=>{
        //     this.setState({fans:res.data.data[0].num})
        // })
        // this.$api.getattention().then(res=>{
        //     this.setState({attentions:res.data.data[0].num})
        // })
    }
    // 跳转个签编辑
    toSignature=()=>{
        this.props.history.push('/mysig');
    }
    toVip=()=>{
        this.props.history.push('/vip');
    }

    toAwesome=()=>{
        this.props.history.push('/awesome');
    }
    render() {
        return (
        <div className="mydiv">
                {/* 个人信息 */}
            <div className='mygd'>
                <div id='my-info'>
                    {/* 背景 */}
                    <img 
                    src={require("../imgs/LetBox/my-bg.png")} 
                    className="myifbg" />
                    {/* 头像 */}
                    <Link to={'/Userinfo/uid='+this.state.arr[0].Uid}>
                    <img 
                    src={"https://yf.htapi.pub/head/"+this.state.arr[0].Uimage} className="portrait" />
                    </Link>
                    {/* 通知信息-图标 */}
                    <Link to='/mymessage'><i className="icon-xinxiang iconfont"
                    style={{
                        position:"absolute",
                        right:"1.3em",
                        top:"0.7em",
                        zIndex:'2',
                        fontSize:'1.7em',
                        color:"black"
                    }}
                    /></Link> 
                    {/* title */}
                    <span className="mytitle">我的</span>
                    {/* 用户名 */}
                    {
                        this.showVipicon()
                    }
                    <span className="myinfospan"><b>
                        {this.state.arr[0].Uname}
                    </b></span>
                    {/* 个签 */}
                    <span className="mysig" onClick={this.toSignature}>
                        {this.state.signature}
                    </span>
                    {/* 编辑用户信息 */}
                    <Link to="/myedit"><i className="icon-bianji iconfont"
                    style={{
                        position:"absolute",
                        right:"8%",
                        top:"52%",
                        zIndex:'2',
                        fontSize:'2em',
                        color:"black"
                    }} /></Link>
                    
                    {/* 选项 */}
                    <div className="myinfodiv">
                        <ul>
                            <li style={{color:'#000'}}><span>{this.state.brr[0].sharenum}</span>分享</li>
                            <Link to="/attentionlist"><li style={{color:'#000'}}><span>{this.state.attentions}</span>关注</li></Link>
                            <Link to="/fanslist"><li style={{color:'#000'}}><span>{this.state.fans}</span>粉丝</li></Link>
                        </ul>
                    </div>
                </div>
            </div>

                {/* 功能 */}
            <div className ='myfun'>
                <List style={{
                    marginTop:'1em'
                }}>
                    <Link to="/invite"><Item extra={
                        <i className="iconfont icon-kaquan" style={{
                            fontSize:"1.0em"
                        }}></i>
                    } onClick={() => {}}>邀请通知</Item></Link>
                    <Item extra={
                        <i className="iconfont icon-huiyuan" ></i>
                    } onClick={this.toVip}>会员中心</Item>
                    <Link to="/myorder"><Item extra={
                        <i className="iconfont icon-weibiaoti-" style={{
                            fontSize:"1.0em"
                        }}></i>
                    } onClick={() => {}}>我的等级</Item></Link>
                    <Link to='/collection' style={{
                            color:'black'
                    }}><Item extra={
                        <i className="iconfont icon-collection" ></i>
                    } onClick={() => {}}>我的收藏</Item></Link>   
                    <Link to='/sharelist' style={{
                            color:'black'
                    }}><Item extra={
                        <i className="iconfont icon-iconfontzhizuobiaozhun023133" ></i>
                    } onClick={() => {}}>我的分享</Item></Link>        
                    <Item extra={
                        <i className="iconfont icon-collection" ></i>
                    } onClick={this.toAwesome}>我的赞</Item>    
                </List>
                
                <WhiteSpace size="lg" />
                <List>
                    <Link to='/recover' style={{
                            color:'black'
                    }}>
                        <Item extra={
                        <i className="iconfont icon-lajixiang" ></i>
                        } onClick={() => {}}>回收站</Item>
                    </Link>
                    
                    <Link to='/setting' style={{color:'black'}}>
                        <Item extra={
                        <i className="iconfont icon-dingbudaohang-zhangh" ></i>
                    } onClick={() => {}}>我的设置</Item></Link>
                    <Link to='/feedback' style={{ color:'black'}}>
                        <Item extra={
                        <i className="iconfont icon-bangzhu1" ></i>
                        } onClick={() => {}}>意见反馈</Item>
                    </Link>
                </List>
            </div>
        </div>
        )
    }
}