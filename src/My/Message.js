import React, { Component } from 'react'
import { SwipeAction, List } from 'antd-mobile';
import {Link,Switch} from 'react-router-dom'
import '../css/My.css'

export default class Message extends Component {
    constructor(){
        super();
        this.state={
            arr:[{'sfsd':'1'}]
        }
    }
    componentDidMount(){
        this.$api.notice().then(res => {
            this.setState({
                arr:res.data.data
            })
            console.log(res.data.data)
            console.log(this.state.arr)
        }) 
    }
    render() {
        return (
            <div>
                {/* tab */}
                <div className="col-tab">
                    我的消息
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
                    onClick={()=>console.log("Message to my")}
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
                {/* 内容 */}
                <List>
                {this.state.arr.map((item,index)=>{
                    return(
                        <SwipeAction
                        style={{ backgroundColor: 'gray' }}
                        autoClose
                        right={[
                            {
                            text: '删除',
                            // onClick: 
                            onPress: ()=>this.deleEmail(item.Pid),
                            style: { backgroundColor: '#F4333C', color: 'white' },
                            },
                        ]}
                        >
                            <List.Item className='me-text' onClick={() => {}} key={index}>
                                <span className="me-title">{item.Ntitle}</span>
                                <span className="me-date">{new Date(item.Nday).toLocaleString()}</span>
                                <span className="me-content">
                                    {item.Ncontent}
                                </span>
                            </List.Item>
                        </SwipeAction>
                    )})}
                </List>
            </div>
        )
    }
}
