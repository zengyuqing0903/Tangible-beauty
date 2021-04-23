import React, { Component } from 'react'
import '../css/My.css'
import {Link} from 'react-router-dom'
import { SwipeAction, List } from 'antd-mobile';

export default class Recover extends Component {
    constructor(){
        super();
        this.state={
            arr:[{'sfsd':'1'}]
        }
    }
    componentDidMount(){
        this.$api.recyclepletter().then(res => {
            // 获取数据成功后的其他操作
            this.setState({
                arr:res.data.data
            })
            console.log(this.state.arr)
        }) 
    }
    // 彻底删除
    deleForever =(pid)=>{
        console.log("pid:"+pid);
        this.$api.recyclebin({pid:pid}).then(res => {});
        let list = this.state.arr;
        for(let i= 0; i < list.length;i++){
            if(list[i].Pid == pid){
                list.splice(i,1);
            }
        }
        this.setState({
            dataList : list
        })
    }
    //恢复到私密写
    recoverTs =(pid) =>{
        console.log("pid:"+pid);

        this.$api.restore({pid:pid}).then(res => {});
        let list = this.state.arr;
        for(let i= 0; i < list.length;i++){
            if(list[i].Pid == pid){
                list.splice(i,1);
            }
        }
        this.setState({
            dataList : list
        })
    }

    render() {
        return (
            <div>
                {/* tab */}
                <div className="col-tab">
                    回收箱
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

                {/* content */}
                <List>
                {this.state.arr.map((item,index)=>{
                    return(
                        <SwipeAction
                        style={{ backgroundColor: 'gray' }}
                        autoClose
                        right={[
                            {
                            text: '恢复',
                            onPress: ()=>this.recoverTs(item.Pid),
                            style: { backgroundColor: '#ddd', color: 'white' },
                            },
                            {
                            text: '丢弃',
                            onPress: ()=>this.deleForever(item.Pid),
                            style: { backgroundColor: '#F4333C', color: 'white' },
                            },
                        ]}
                        >
                            <List.Item className='my-text' onClick={() => {}} 
                            key={index}>
                                <img src={item.img} style={{
                                    borderRadius:'50%',
                                    height:'50%',
                                    width:'15%',
                                    margin:'1em'
                                }} /> 
                                <span className="my-user">{item.toNick}</span>
                                <span className="my-date">{new Date(item.Pday).toLocaleString()}</span>
                                <span className="my-title">{item.Ptitle}</span>
                                <span className="my-content">
                                    {item.Pcontent}
                                </span>
                            </List.Item>
                        </SwipeAction>
                    )})}
                </List>
            </div>
        )
    }
}
