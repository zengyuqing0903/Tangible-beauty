import React, { Component } from 'react'
import { SwipeAction, List } from 'antd-mobile';
import {Link} from 'react-router-dom';
import '../css/LetterBox.css'

const arr=[
    {
        id:'1',
        fm_date:'2019/11/27',
        fm_title:'偷走那瓶橘子汽水',
        fm_content:'***'
    },
    {
        id:'2',
        fm_date:'2019/11/28',
        fm_title:'热爱',
        fm_content:'***'
    }
]

export default class Sharenum extends Component {
    render() {
        return (
            <div>
                <div className="col-tab">
                    分享数
                    <Link to="/home/my" 
                    style={{
                        float:"left",
                        height:"3em",
                        width:"3em",
                        position:"absolute",
                        left:"0",
                        top:"0",
                        zIndex:"1"
                    }}
                    ></Link>
                    <i                           
                    className="iconfont icon-fanhui" 
                    style={{
                        position:"absolute",
                        left:"5%",
                        height:"2%",
                        fontSize:"1.2em"    
                    }}></i>
                </div>
                {/* 滑动列表页 */}
                <List>
                    {arr.map((item,index)=>{
                        return(
                            <SwipeAction
                            style={{ backgroundColor: 'gray' }}
                            autoClose
                            right={[
                                {
                                text: '取消',
                                style: { backgroundColor: '#ddd', color: 'white' },
                                },
                                {
                                text: '删除',
                                style: { backgroundColor: '#F4333C', color: 'white' },
                                },
                            ]}
                            key={index}
                            >
                            <List.Item
                                onClick={e => console.log(e)}
                                className='me-text'
                            >
                                <Link to={`/letter/${item.id}`} style={{
                                    color:'black'
                                }}>
                                <span className="me-date">{item.fm_date}</span>
                                <span className="me-title">{item.fm_title}</span>
                                <span className="me-content">
                                    {item.fm_content}
                                </span>
                                </Link>
                            </List.Item>
                            </SwipeAction>
                        )})}
                </List>
            </div>
        )
    }
}
