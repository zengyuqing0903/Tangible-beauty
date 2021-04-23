import React, { Component } from 'react'
import "../css/contonent.css";

import { NavBar} from 'antd-mobile';
import { Input} from 'antd';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
export default class Contonent extends Component {
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
                    Cnum:"1234"
                },
                
               
            ]       
        }
    }
    totoge=()=>{
        this.props.history.push("/home/care");
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
                            <img src={require("../imgs/WriteTogether/toge2.jpg")} alt="" className="cont-touimg"/>
                            <span className='cont-name'>吱呀</span>
                            <span className='cont-time'>2021-4-19</span>
                        </div>
                        <img src={require("../imgs/WriteTogether/toge2.jpg")} alt="" className="cont-img"/>
                        <div className='cont-cont'>你好</div>
                    </div>
                    <div className='cont-bottom'>
                        <ul className='cont-bot1'>
                            <li className='cont-zan'>赞</li>
                            <li className='cont-comment'>评论</li>
                            <li className='cont-shoucang'>收藏</li>
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
