import React, { Component } from 'react'
import '../css/My.css'
import {Link,Switch} from 'react-router-dom'
import { List,WhiteSpace,TextareaItem,InputItem,Toast} from 'antd-mobile'
const Item = List.Item;

export default class Feedback extends Component {
    constructor(props){
        super(props);
        this.state = {
            feedback:''
        }
    }
    contentChange=(val)=>{
        this.setState({
            feedback : val
        })
    }
    numberChange=()=>{}
    handleChange = () => {
        console.log(this.state.feedback);
        this.$api.feedback({feedback:this.state.feedback}).then(res => {
            this.props.history.push("/my");
            Toast.success('提交成功', 1);
        });
    }
    render() {
        return (
            <div>
                {/* tab */}
                <div className="col-tab">
                    意见反馈
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
                    <Item>问题和意见</Item>
                    <TextareaItem
                        value={this.state.feedback}
                        onChange={this.contentChange}
                        style={{backgroundImage:"url("+this.state.back+")",backgroundSize:"100% 447px",color:this.state.fontColor}}
                        rows={8}
                        count={100}
                        placeholder='请填写10个字以上的问题描述以便我们提供更好的帮助'
                        />
                    <Item style={{
                        fontSize:'1.3em'
                    }}>联系电话</Item>
                    <InputItem placeholder='选填，便于我们与你联系'
                    style={{
                        borderStyle:'none'
                    }}
                    ></InputItem>
                </List>
                <div className="my-unlogin">
                    <button style={{
                        color:'white',
                        borderStyle:"none",
                        fontSize:'1.1em'
                    }}
                    onClick={(e)=>this.handleChange(e)}
                    >提交
                    </button>
                </div>  
            </div>
        )
    }
}
