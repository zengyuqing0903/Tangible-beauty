import React, { Component } from 'react'
import '../css/home.css';
import { List, TextareaItem,Modal,Button,Toast } from 'antd-mobile';
import { Link } from 'react-router-dom';

const alert = Modal.alert;

export default class Signature extends Component {
    constructor(){
        super();
        this.state = {
            signature :''
        }
    }
    edit = (val)=>{
        this.setState({
            signature : val
        })
    }
    back=()=>{
        this.props.history.push('/home');
    }
    publish=()=>{
        // console.log(this.state.signature);
        this.$api.changeSignature({signature:this.state.signature}).then(res=>{
            console.log(res);
        })
        Toast.success('发布成功', 1);
        // alert('修改个签','修改成功!',[
        //     {text:'确定',onPress:()=>{
        //         this.props.history.push('/home/my');
        //     }}
        // ]);
    }
    render() {
        return (
            <div className="sig-body">
                <div className='sig-top'>
                    <Link
                    style={{
                        color:"white"
                    }}
                    to="/home/my" 
                    id='sig-back' 
                    onClick={this.back}>返回</Link>
                    <span>编辑个签</span>
                    <Link 
                    style={{
                        color:"white"
                    }}
                    to="/home/my"  
                    id='sig-pub' 
                    onClick={this.publish}>发布</Link>
                </div>
                <div className="sig-edit">
                    <List>
                        <TextareaItem
                            value = {this.state.signature}
                            id="signatureValue"
                            rows={5}
                            count={30}
                            style={{backgroundColor:'rgb(241, 240, 240)'}}
                            onChange={this.edit}
                        />
                    </List>
                </div>
            </div>
        )
    }
}
