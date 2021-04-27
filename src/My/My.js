import React, { Component } from 'react'
import '../css/Login.css'
import {NavLink,Link} from 'react-router-dom'
import '../css/My.css'
import { Tabs,List,WhiteSpace, Badge,Button,SearchBar,Toast,NavBar } from 'antd-mobile'



const tabs = [
    { title: <Badge >作品</Badge> },
    { title: <Badge>收藏</Badge> },
    { title: <Badge>喜欢</Badge> },
  ];
// const data=[1,2,3];

const Item = List.Item;

export default class My extends Component {
    constructor(){
        super();
        this.state={
            arr:[{"Uname":"你的昵称",'pidname':'0'}],
            brr:[{"sharenum":'0'}],
            signature:'',
            fans:'',
            attentions:'',
            data:[{
                mid:'1',
                mtitle:'绝'
            },
            {
                mid:'2',
                mtitle:'绝'
            },
            {
                mid:'3',
                mtitle:'绝'
            },
            {
                mid:'4',
                mtitle:'绝'
            },
            {
                mid:'5',
                mtitle:'绝'
            },
            {
                mid:'6',
                mtitle:'绝'
            }]
        }
    }
    componentDidMount(){
        this.$api.mine().then(res => {
            // console.log("skskp")
            // 获取数据成功后的其他操作
            this.setState({
                arr:res.data.data
            })
            console.log(this.state.arr)
        }) 
        this.$api.compositionlist().then(res=>{
            this.setState({
                data:res.data.data
            })
        })
        
        this.$api.getfans().then(res=>{
            this.setState({fans:res.data.data[0].num})
        })
        this.$api.getattention().then(res=>{
            this.setState({attentions:res.data.data[0].num})
        })
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
    tabClick=(tab)=>{
        console.log(tab);
        let parms = tab.title.props.children;
        switch(parms){
            case '喜欢':{
                this.$api.likelist().then(res=>{
                    this.setState({
                        data:res.data.data
                    }) 
                    console.log(this.state.data);
                })
                break;
            }
            case '收藏':{
                this.$api.collectlist().then(res =>{
                    this.setState({
                        data:res.data.data
                    })

                })
                break;
            }
            case '作品':{
                this.$api.compositionlist().then(res=>{
                    this.setState({
                        data:res.data.data
                    })
                })
                break;
            }
            default:
                break;
        }
        
        
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
                    src={"http://localhost:3000/head/"+this.state.arr[0].uimage+'.jpg'} className="portrait" />
                    </Link>
                    {/* 通知信息-图标 */}
                    <Link to='/setting'><i className="icon-shezhi iconfont"
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
                    <span className="myinfospan"><b>
                        {this.state.arr[0].uname}
                    </b></span>
                    {/* 个签 */}
                    <span className="mysig" onClick={this.toSignature}>
                        {this.state.arr[0].signature}
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
                            <Link to="/attentionlist"><li style={{color:'#000',width:'50%'}}><span>{this.state.attentions}</span>关注</li></Link>
                            <Link to="/fanslist"><li style={{color:'#000',width:'50%'}}><span>{this.state.fans}</span>粉丝</li></Link>
                        </ul>
                    </div>
                </div>
                {/* 最新板块-作品 */}
                <div style={{backgroundColor: 'rgb(240, 240, 240)'}}>
                <WhiteSpace />
                        <Tabs tabs={tabs}
                        initialPage={0}  
                        onChange={(tab, index) => { this.tabClick(tab) }}
                        onTabClick={(tab, index) => {console.log('onChange', index, tab);}}                    
                        >
                            <div style={{ display: 'flex',flexWrap:" wrap" ,alignItems: 'center',  height: '300px',}}>
                            {this.state.data.map((val)=> (   
                                <div key={val} className="mynew-block"> 
                                    <Link to={"/content/"+val.pid}>
                                        <img src={"http://localhost:3000/image/"+val.pimage+".jpg"} className='mynew-bacimg'/>
                                    </Link>
                                    <span className='mynew-title'>
                                        {val.ptitle}
                                    </span>
                                    <div className="home-btm-left">
                                    <img src={"http://localhost:3000/head/"+val.uimage+".jpg"} className='mynew-headimg'/>

                                        <span className="home-btm-left-name">{val.uname}</span>
                                    </div>
                                    {/* <div className='mynew-time'>
                                        {val.uname}
                                    </div> */}
                                    </div>
                                ))}
                            </div>
                        </Tabs>
                        <WhiteSpace />      
                    </div>
            </div>
        </div>
        )
    }
}