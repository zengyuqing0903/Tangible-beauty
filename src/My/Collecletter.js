import React, { Component } from 'react'
import { List } from 'antd-mobile'
import {Link} from 'react-router-dom'

export default class Collecletter extends Component {
    constructor(){
        super()
        this.state={
            isLike:0,
            arr:[{
                "toNick":"属性值",
                "Ptitle":"一个小标题奥",
                "Pcontent":'这是内容奥',
                'ppimage':'1234567891234_56.jpg'
            }]
        }
    }
    componentDidMount(){
        // console.log("12312313")

        this.$api.showmail({pid:this.props.match.params.id}).then(res => {
            console.log("12312313")
            this.setState({
                arr:res.data.data
            });
            console.log(this.state.arr)
            // 获取当前状态值
            this.setState({
                isLike:res.data.data[0].isCollection
            })
        }) 
    }
    render() {
        // console.log("12312")
        return (
            <div className="lt">
                {/* tab */}
                <div className="col-tab" style={{
                    color:'black',
                    backgroundColor: 'whitesmoke'
                }}>
                        {this.state.arr[0].toNick}
                    <Link to="/collection" 
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
                <div className="lt-title" style={{
                    backgroundColor: 'rgb(247, 245, 245)',
                    width: '100%',
                    fontSize: '1.7em',
                    padding:'0.5em 0.8em'
                }}><b>{this.state.arr[0].Ptitle}</b></div>
                <hr style={{
                    borderWidth:'0.4px',
                    color:'lightgrey'
                }}/>
                <div className='lt-content'>
                    <img src={"https://yf.htapi.pub/paper/"+this.state.arr[0].ppimage} className="lt-img"/>
                    <span className="lt-span">{this.state.arr[0].Pcontent}</span>
                </div>
            </div>
        )
    }
}
