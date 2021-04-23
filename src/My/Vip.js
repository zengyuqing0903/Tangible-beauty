import React, { Component } from 'react';
import {Link,Switch} from 'react-router-dom'
import "../css/Vip.css";

export default class Vip extends Component {
    constructor(){
        super();
        this.state={
            display:'none',
            pay:false,
            back:""
        }
    }
    componentDidMount(){
        var urlinfo = window.location.hash;
        // console.log(urlinfo);
        let arr = urlinfo.split("?");
        // console.log(arr[1]);
        if(arr[1] != undefined){
            this.setState({
                back : arr[1]
            })
        }
    }
    pay=()=>{
        if(!this.state.pay){
            this.setState({
                display:'block',
                pay:true
            })
        }else{
            this.setState({
                display:'none',
                pay:false
            })
        }
    }
    back=()=>{
        console.log(this.state.back)
        if(this.state.back == ''){
            this.props.history.push('/home/my');
        }else if(this.state.back.indexOf('Oid')>=0){
            this.props.history.push('/pubBack?'+this.state.back);
        }else if(this.state.back.indexOf('pid')>=0){
            this.props.history.push('/back?'+this.state.back);
        }
    }
    render() {
        return (
            <div>
                {/* tab */}
                <div className="col-tab">
                    会员中心
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
                {/* <div className="v-top">
                    <img onClick={this.back} id="v-back" src={require("../imgs/public/返回(2).png")} />
                    <span>会员中心</span>
                </div> */}
                <div className="v-mid">
                    <div className="v-li" onClick={this.pay}>
                        <img src={require("../imgs/public/笑脸.png")} />
                        <p>￥ 5.00/月</p>
                    </div>
                    <div className="v-li" onClick={this.pay}>
                        <img src={require("../imgs/public/星星眼.png")} />
                        <p>￥ 10.00/季</p>
                    </div>
                    <div className="v-li" onClick={this.pay}>
                        <img src={require("../imgs/public/献吻.png")} />
                        <p>￥ 25.00/年</p>
                    </div>
                </div>
                <div className="v-bot">
                    <ul>
                        <li>
                            <div className="v-img">
                                <img src={require("../imgs/public/vip.png")} />
                            </div>
                            <p style={{color:'black'}}>黄V身份</p>
                            <p style={{color:'grey',fontSize:'13px'}}>点亮黄V后缀</p>
                        </li>
                        <li>
                            <div className="v-img">
                                <img src={require("../imgs/public/图片(1).png")} />
                            </div>
                            <p style={{color:'black'}}>所有信纸免费使用</p>
                            <p style={{color:'grey',fontSize:'13px'}}>唯美信纸不定期更新</p>
                        </li>
                        <li>
                            <div className="v-img">
                                <img src={require("../imgs/public/字体设置.png")} />
                            </div>
                            <p style={{color:'black'}}>字体设置</p>
                            <p style={{color:'grey',fontSize:'13px'}}>多种字体任意使用</p>
                        </li>
                        <li>
                            <div className="v-img">
                                <img src={require("../imgs/public/i.png")} />
                            </div>
                            <p style={{color:'black'}}>未来版本所有功能</p>
                            <p style={{color:'grey',fontSize:'13px'}}>技术小哥努力开发中</p>
                        </li>
                        <li>
                            <div className="v-img">
                                <img src={require("../imgs/public/鸡腿.png")} />
                            </div>
                            <p style={{color:'black'}}>给vip小可爱的鸡腿</p>
                            <p style={{color:'grey',fontSize:'13px'}}>鸡腿在手，动力我有</p>
                        </li>
                    </ul>
                </div>
                <div className="v-pay" style={{display:this.state.display}}>
                    <div className="v-payWay">
                        <div className="pay-top">
                            <p>选择支付方式</p>
                            <img id="pay-close" src={require("../imgs/public/关闭.png")} onClick={this.pay} />
                        </div>
                        <div className="pay-mid">
                            <div>
                                <img src={require("../imgs/public/微信(1).png")} />
                                <p>微信支付</p>
                            </div>
                            <div>
                                <img src={require("../imgs/public/支付宝(1).png")} />
                                <p>支付宝</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
