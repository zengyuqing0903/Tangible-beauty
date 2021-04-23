import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import '../css/Myself.css'
import { List } from 'antd-mobile';
export default class Myself extends Component {
    constructor(){
        super();
        this.state={
            myself:[],
            attention:'',
            fans:'',
            open:[]
        }
    }
    componentDidMount(){
        this.$api.myself({uid:this.props.match.params.id}).then(res=>{
            this.setState({myself:res.data.data[0]})
        })
        this.$api.getfans({uid:this.props.match.params.id}).then(res=>{
            this.setState({fans:res.data.data[0].num})
        })
        this.$api.getattention({uid:this.props.match.params.id}).then(res=>{
            this.setState({attention:res.data.data[0].num})
        })
        this.$api.openlist({uid:this.props.match.params.id}).then(res=>{
            this.setState({open:res.data.data})
        })
    }
    render() {
        var signature = this.state.myself.Signature + '';
        console.log(signature.length)
        return (
            <div>
                <div className='top' style={{backgroundImage:`url(`+'https://yf.htapi.pub/homeBack/'+this.state.myself.homeBack+`)`}}>
                    <Link to='/attentionlist'>
                            <i className="icon-fanhui iconfont"
                                style={{                                                                  
                                    fontSize:'1.2em',
                                    width:"10%",
                                    marginTop:'10px',
                                    float:'left',
                                    color:"#grey",
                                }}
                            />
                            </Link>
                    <img src={'https://yf.htapi.pub/head/'+this.state.myself.Uimage} className='touxiang'/>
                    <div className='fan'>
                        <span>关注  {this.state.attention}</span>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <span>粉丝  {this.state.fans}</span>
                    </div>
                    <div className='signature'>个性签名:{signature.length>10?this.state.myself.Signature.substring(0,10)+'...':this.state.myself.Signature}</div>
                </div>
                <div style={{width:'100%',height:'220px',backgroundColor:'#ddd'}}></div>
                <List>
                    {this.state.open.map((item,index)=>{
                        return(
                            <div></div>
                        )
                    })}
                </List>

            </div>
        )
    }
}
