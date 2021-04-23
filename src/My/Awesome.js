import React, { Component } from 'react'
import '../css/awesome.css';

export default class Awesome extends Component {
    constructor(){
        super();
        this.state={
            myname:'',
            results:[],
        }
    }
    componentDidMount(){
        this.$api.awenotice().then(res=>{
            console.log(res.data)
            if(res.data.status==0){
                this.setState({
                    myname:res.data.myname[0].uname,
                    results:res.data.results
                })
            }
        })   
    }
    back=()=>{
        this.props.history.push('/home/my'); 
    }
    render() {
        return (
            <div style={{}}>
                 <div className="awetop">
                    <img onClick={this.back} id="aweback" src={require("../imgs/public/返回(2).png")} />
                    <span>赞</span>
                </div>
                {
                    this.state.results.reverse().map((item,index)=>(
                        <div className="awebox">
                            <div>
                                <img src={"https://yf.htapi.pub/head/"+item.uimage} style={{
                                            borderRadius:'50%',
                                            height:'55px',
                                            width:'55px',
                                            border:'1px solid #ddd',
                                            marginLeft:'3%',
                                            marginTop:'2%'
                                }}/>
                                <span style={{fontSize:'18px',marginLeft:'3%',color:'#000'}}>{item.uname}</span>
                                <div className="awesame">赞了这封信</div>
                            </div>
                            <div style={{borderTop:'0.5px solid rgb(179, 179, 179)',backgroundColor:'rgb(247, 247, 247)'}}> 
                                <div className="awemy">@{this.state.myname}：</div>
                                <div className="awetit">{item.Otitle}</div>
                                <div className="awecon">{item.Ocontent.substring(0,25)}......</div>
                            </div>
                        </div>
                    )
                    )
                }
            </div>
        )
    }
}
