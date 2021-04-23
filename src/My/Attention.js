import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { NavBar,Modal, List ,Button} from 'antd-mobile';
import '../css/list.css'
const alert = Modal.alert;
export default class Attention extends Component {
    constructor(){
        super();
        this.state={
            data:[],
        }
    }
    componentDidMount(){
        let url = window.location.hash;
        let uid = url.split('?')[1];
        // console.log(uid);
        if(uid){
            this.$api.attentionlist({uid : uid}).then(res=>{
                let list =  res.data.data;
                this.setState({data:list})
            })
        }else{
            this.$api.attentionlist().then(res=>{
                let list =  res.data.data;
                this.setState({data:list})
            })
        }
    }
    onAttention=(index,item,e)=>{
        e.stopPropagation();
        let list =  this.state.data;
        console.log(index);
        for(var i=0;i<list.length;i++){
            if(list[i].Uid = index.Uid){
                console.log(list[i]);
                if(list[i].attention){
                    alert('取消关注?','',[
                        {
                            text:'取消',
                            onPress:()=>{
                                console.log('取消')
                        }},
                        {
                            text:'确认',
                            onPress:()=>{
                                this.$api.delattention({deluid:list[i].Uid}).then(res=>{
                                    console.log('取消关注')
                                    this.$api.attentionlist().then(res=>{
                                        this.setState({data:res.data.data})
                                    })
                                })
                            }
                        }
                    ])
                    break;
                }else{
                    this.$api.delattention({deluid:list[i].Uid}).then(res=>{
                        console.log('取消关注');
                        this.$api.attentionlist().then(res=>{
                            this.setState({data:res.data.data})
                        })
                    })
                    break;
                }
                
            }
        }
    }
    back=()=>{
        let url = window.location.hash;
        console.log(url.split('?')[1]);
        let id = url.split('?')[1];
        if( id != undefined){
            this.props.history.push('/Userinfo?uid='+id);
        }else{
            this.props.history.push('/home/my');
        }
    }
    render() {
        return (
            <div>
                <div style={{
                    height:'50px',
                    width:'100%',
                    backgroundColor:'#fff',
                    boxShadow:'2px 2px 2px #888888',
                    fontSize:'18px',
                    textAlign:'center',
                    lineHeight:'50px',
                    }}>
                        {/* <Link to='/home/my'> */}
                         <i className="icon-fanhui iconfont"
                            style={{                                                                  
                                fontSize:'1.2em',
                                width:"10%",
                                float:'left',
                                color:"grey",
                            }}
                            onClick={this.back}
                        />
                        {/* </Link> */}
                        关注列表
                        
                </div>
                <div style={{width:'100%',height:'10px',backgroundColor:'#ddd'}}></div>
                <List>
                    {this.state.data.map((item,index)=>{
                        return(
                            <Link to={'/Userinfo?uid='+item.Uid}>
                            <List.Item 
                            className='items'
                            onClick={()=>{console.log("无")}} 
                            key={index}
                            extra={<Button 
                                type="ghost" 
                                size="small" 
                                onClick={this.onAttention.bind(index,item,this)} 
                                className='attention' 
                                inline 
                                activeStyle={{color:'grey'}}
                                >
                            {item.attention?'互相关注':'已关注'}</Button>}
                            >

                                <List.Item.Brief>
                                    <img src={"https://yf.htapi.pub/head/" + item.Uimage} style={{
                                    borderRadius:'50%',
                                    height:'64px',
                                    width:'64px',
                                    border:'1px solid #ddd'
                                }} />
                                <span className={item.Vip?'vipName':'name'}>{item.Uname}</span>
                                <span className='signature'>{item.Signature.length>=15?item.Signature.substring(0,15)+'...':item.Signature}</span>
                                </List.Item.Brief>
                                
                            </List.Item>
                            </Link>
                        )
                    })} 
                </List>

            </div>
        )
    }
}
