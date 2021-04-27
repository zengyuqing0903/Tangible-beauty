import React, { Component } from 'react'
import "../css/home.css";
import {HashRouter as Router,Link} from 'react-router-dom'
import { NavBar} from 'antd-mobile';
import { Input} from 'antd';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';

const tabs = [
    { title: <Badge >推荐</Badge> },
    { title: <Badge>美食</Badge> },
    { title: <Badge>穿搭</Badge> },
    { title: <Badge>旅行</Badge> },
    { title: <Badge>健身</Badge> },
  ];
export default class Care extends Component {
    constructor(){
        super();
        this.state={
            data:[
                {
                    Cid:1,
                    Cimage:'',
                    Ctitle:"你好李焕英,贾玲瘦成闪电",
                    Chead:'',
                    Cname:"吱呀",
                    Cnum:"1234"
                },
                {
                    Cid:2,
                    Cimage:'',
                    Ctitle:"你好李焕英,贾玲瘦成闪电",
                    Chead:'',
                    Cname:"吱呀"
                },
                {
                    Cid:3,
                    Cimage:'',
                    Ctitle:"你好李焕英,贾玲瘦成闪电",
                    Chead:'',
                    Cname:"吱呀"
                },
                {
                    Cid:4,
                    Cimage:'',
                    Ctitle:"你好李焕英,贾玲瘦成闪电",
                    Chead:'',
                    Cname:"吱呀"
                },
            ]       
        }
    }   
    componentDidMount(){
        this.$api.attentionWorks().then(res=>{
            console.log(res.data)
            this.setState({
                data:res.data.data
            })
        })
    }
    render() {
        //console.log(this.state.toUid);
        return (
            <div>
                {/* 顶部 */}
                <NavBar className='home-back'>
                    <span className='hm-span'>关注</span>
                </NavBar>
                {/* 内容 */}
                <div className="home-body">
                <div style={{ display: 'flex',flexWrap:" wrap" ,alignItems: 'center', justifyContent: 'center', height: '420px'}}>
                                {this.state.data.map((val)=> (                           
                                    // <Link to={"/home/contonent/"+val.pid}>
                                    <Link to={"/content/"+val.pid} style={{color:"white"}}>

                                    <div key={val} className="home-block">  
                                        <img src={"http://localhost:3000/image/"+val.pimage+".jpg"} alt="" className="home-bacimg"/>
                                        <div className='home-down'>
                                            <div className="home-title">{val.ptitle}</div>                            
                                            <div className="home-btm">
                                                <div className="home-btm-left">
                                                    <img src={"http://localhost:3000/head/"+val.uimage+".jpg"} alt="" className="home-btm-left-img"/>
                                                    <span className="home-btm-left-name">{val.uname}</span>
                                                </div>
                                                
                                            </div>                            
                                        </div>
                                                            
                                        {/* <img src={"https://yf.htapi.pub/theme/"+val.Timage} alt="" className="home-bacimg"/> */}
                                    </div>
                                    </Link>
                                ))}
                            </div>
                </div>

                

                
                
            </div>
        )
    }
}
