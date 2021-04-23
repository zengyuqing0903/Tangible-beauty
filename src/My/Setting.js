import React, { Component } from 'react'
import {Icon,List,Switch, WhiteSpace } from 'antd-mobile'
import '../css/My.css'
import { createForm } from 'rc-form';
import {Link} from 'react-router-dom'
const Item = List.Item;

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            checked1: true,
        };
    }
    render() {
        const {getFieldProps} = this.props.form;
        return (
            <div className='my-set'>
                {/* 标题栏 */}
                <div className="col-tab">
                    设置
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
                    onClick={()=>console.log("setting to my")}
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
                
                {/* 选项 */}
                <List style={{marginTop:"1em"}}>
                    <WhiteSpace size="xs" />
                    {/* 按钮 */}
                    <List.Item
                    extra={<Switch
                        {...getFieldProps('Switch1', {
                        initialValue: this.state.checked1,
                        valuePropName: 'checked',
                        })}
                        onClick={(checked) => {
                        this.props.form.setFieldsValue({
                            Switch1: checked,
                        });
                        }}
                    />}
                    >消息通知</List.Item>
                </List>
                <WhiteSpace size="xs" />
                <List>
                    <Link to='/changepsw'><Item arrow="horizontal" onClick={() => {}}>修改密码</Item></Link>
                    <Item extra="1.0.0"  onClick={() => {}}>版本号</Item>
                </List>
                
                {/* 退出登录 */}
                <div className="my-unlogin">
                    <button><Link to="login" style={{
                        color:'white',
                        borderStyle:"none",
                        fontSize:'1.1em'
                    }}>退出登录</Link>
                    </button>
                </div>  
            </div>
        )
    }
}

export default createForm()(Setting);