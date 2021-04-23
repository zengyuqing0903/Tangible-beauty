import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
export default class Invite extends Component {
    constructor(){
        super();
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        this.$api.getmessage().then(res=>{
            this.setState({data:res.data.data})
        })
    }
    onSubmit = (value)=>{
        this.$api.searchUname({uname:value}).then(res=>{
            this.setState({data:res.data.data})
        })
    }
    onCancel = ()=>{
        this.$api.getmessage().then(res=>{
            this.setState({data:res.data.data})
        })
    }
    render() {
        return (
            <div>
                <div className="col-tab">
                    邀请通知
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
                <SearchBar placeholder="请输入要查找人昵称" maxLength={8} onSubmit={this.onSubmit} onCancel={this.onCancel}/>
                {this.state.data.map((item,index)=>{
                    return(
                        <Link to={'/inviteconfirm/'+item.Tid}  style={{color:'#000'}}>
                        <div style={{width:'100%',height:'100px',position:'relative',borderBottom:'1px solid #ddd'}}>
                            <img 
                                src={"https://yf.htapi.pub/head/"+item.Uimage} 
                                style={{
                                    width:'64px',
                                    height:'64px',
                                    borderRadius:'32px',
                                    marginLeft:'15px',
                                    marginTop:'15px',
                                    float:'left',
                                }}
                            />
                            {item.Vip?
                                <span 
                                    style={{
                                        fontSize:'22px',
                                        color:'red',
                                        marginLeft:'15px',
                                        position:'absolute',
                                        top:'10%',
                                    }}
                                >{item.Uname}
                                </span>:
                                <span 
                                    style={{
                                        fontSize:'22px',
                                        marginLeft:'15px',
                                        position:'absolute',
                                        top:'10%',
                                        
                                    }}
                                >{item.Uname}</span>}
                                <span style={{
                                    marginRight:'20px',
                                    marginTop:'15px',
                                    fontSize:'16px',
                                    float:'right'
                                }}>{new Date(item.Iday).getFullYear()+'-'+(new Date(item.Iday).getMonth()+1)+'-'+new Date(item.Iday).getDate()}</span>
                                {item.inviteMessage.length>13?
                                    <span 
                                        style={{
                                            fontSize:'17px',
                                            marginLeft:'15px',
                                            position:'absolute',
                                            bottom:'22%'
                                        }}
                                    >
                                        {item.inviteMessage.substring(0,13)+'...'}
                                    </span>:
                                    <span
                                    style={{
                                        fontSize:'17px',
                                        marginLeft:'15px',
                                        position:'absolute',
                                        bottom:'22%'
                                    }}
                                    >
                                        {item.inviteMessage}
                                    </span>
                                }
                        </div>
                        </Link>
                    )
                })}
            </div>
        )
    }
}
