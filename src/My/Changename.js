import React, { Component } from 'react'
import { Button,WhiteSpace,InputItem,Toast,Modal} from 'antd-mobile'
import {Link} from 'react-router-dom'

const alert = Modal.alert;

export default class Changename extends Component {
    constructor(props){
        super(props);
        this.state = {
            arr: [{}],
            username:'1'
        }
    }
    inputChange = (e) =>{
            this.setState({
                username:e
            })
        // console.log(this.state.username);
    }
    handleChange = () => {
        // console.log(this.state.username);
        this.$api.changename({uname:this.state.username}).then(res => {
            this.props.history.push("/myedit");
            Toast.success('修改成功', 1);
        });
    }
    // 页面拿数据
    render() {
        return (
            <div>
                {/* tag */}
                <div className="col-tab">
                    更改昵称
                    <Link to="/myedit" 
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
                <WhiteSpace size="lg" />
                
                {/* 输入框 */}
                <InputItem
                placeholder="昵称不可超过8个字"
                data-seed="logId"
                autoFocus
                // ref={(inp)=>{this.username=inp}}
                onChange={(e)=>this.inputChange(e)}
                maxLength={8}
                style={{borderBottom:"1px solid grey",paddingBottom:'5px'}}
                ></InputItem>

                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Button style={{
                    color:'black',
                    margin:"0 8vw",
                    border : '1px solid grey'
                }}
                onClick={(e)=>this.handleChange(e)}
                >保存</Button>
            </div>
        )
    }
}
