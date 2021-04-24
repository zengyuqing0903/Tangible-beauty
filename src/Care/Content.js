import React, { Component } from 'react'
import "../css/contonent.css";

import { NavBar} from 'antd-mobile';
import { Input} from 'antd';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';

export default class Content extends Component {
    constructor(){
        super();
        this.state={
            data:[
                {
                    Tid:1,
                    Cimage:'',
                    Ctitle:"你好李焕英,贾玲瘦成闪电",
                    Ctime:"2021-4-19",
                    Cname:"吱呀",
                    
                },
            ],
            cnum:"1234",
            lnum:0,
            snum:0,
            com:[]
        }
    }
    componentDidMount(){
        var pid =this.props.match.params.id;
        this.$api.browse({pid:pid}).then(res=>{
            this.setState({data:res.data.data})
            console.log(this.state);
        })
        this.$api.commentnum({pid:pid}).then(res=>{

            this.setState({
                cnum:res.data.data[0].num
            })
            console.log(this.state.cnum)
        })
        this.$api.likenum({pid:pid}).then(res=>{
            console.log(res.data[0].num);
            this.setState({
                lnum:res.data[0].num
            })
        })
        this.$api.collectnum({pid:pid}).then(res=>{
            this.setState({
                snum:res.data[0].num
            })
        })
        //获取评论
        this.$api.getcomment({pid:pid}).then(res=>{
            this.setState({
                com:res.data.data
            })
            console.log(this.state.com)
        })
    }
    totoge=()=>{
        this.props.history.push("/home");
    }
    render() {
        return (
            <div>
                {/* 顶部 */}
                <NavBar className='cont-back'>
                    <span>
                        {/* <img src={require("../imgs/Home/back.png")} style={{width:"25px",height:"25px"}} className="add-back" onClick={this.totoge} /> */}
                        <i className="icon-fanhui iconfont"
                                    style={{   
                                        color:'rgba(107, 109, 112, 0.719)',                                                                                
                                        fontSize:'1.0em',
                                        position:"fixed",
                                        top:"20px",
                                        left:"20px"}}
                                        onClick={this.totoge}/>
                    </span>
                    <span className='cont-span'>正文</span>
                </NavBar>
                {/* 内容 */}
                <div className="cont-body">
                    <div className='cont-block'>
                        <div className='cont-title'>
                            <img src={"http://localhost:3000/head/"+this.state.data[0].uimage+".jpg"} alt="" className="cont-touimg"/>
                            <span className='cont-name'>{this.state.data[0].uname}</span>
                            <span className='cont-time'>{this.state.data[0].pday}</span>
                        </div>
                        <img src={"http://localhost:3000/image/"+this.state.data[0].pimage+".jpg"} alt="" className="cont-img"/>
                        <div className='cont-cont'>{this.state.data[0].ptitle}</div>
                    </div>
                    <div className='cont-bottom'>
                        <ul className='cont-bot1'>
                            <li className='cont-zan'>赞<span style={{width:'10px'}}>{this.state.lnum}</span></li>
                            <li className='cont-comment'>评论<span>{this.state.cnum}</span></li>
                            <li className='cont-shoucang'>收藏<span className="sc">{this.state.snum}</span></li>
                        </ul>
                    </div>
                </div>
                {/* 最底下*/}
                <ul className='cont-btmtab'>                
                        <li className='cont-tab'>赞</li>
                        <li className='cont-tab'>评论</li>
                        <li className='cont-tab'>收藏</li>              
                </ul>

            </div>
        )
    }
}
