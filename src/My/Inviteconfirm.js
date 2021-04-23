import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import '../css/My.css'
import '../css/inviteMember.css'
const alert = Modal.alert;
export default class Inviteconfirm extends Component {
    constructor(){
        super();
        this.state={
            data:[],
            inviteMessage:'',
            uname:''
        }
    }
    componentDidMount(){
        // console.log(this.props)
        // console.log(this.props.location.state.uname)
        // this.setState({uname:this.props.location.state.uname})
        this.$api.themetitle({tid:this.props.match.params.id}).then(res=>{
            console.log(res.data.data)
        })
        this.$api.getmessage().then(res=>{
            this.setState({inviteMessage:res.data.data[0].inviteMessage})
        })
        console.log(this.props.match.params.id)
        this.$api.getown({tid:this.props.match.params.id}).then(res=>{
            console.log(res.data)
            this.setState({uname:res.data.data[0].uname})
        })
    }
    handleClick=()=>{
        console.log("ok")
        this.$api.confirmMessage({tid:this.props.match.params.id,tag:1}).then(res=>{
            console.log(res)
            Toast.success('加入成功！', 1);   
            this.props.history.push('/invite')
        })
    }
    render() {
        return (
            <div>
                <div className="col-tab">
                    {this.state.uname}
                    <Link to="/invite" 
                    style={{
                        float:"left",
                        height:"3em",
                        width:"3em",
                        position:"absolute",
                        left:"0",
                        top:"0",
                        zIndex:"1"                       
                    }}
                    >
                    <i                           
                    className="iconfont icon-fanhui" 
                    style={{
                        color:'#fff',
                        position:"absolute",
                        left:"5%",
                        top:"2%",
                        fontSize:"1.2em"     
                    }}></i></Link>
                </div>
                    <div className='la'>
                        {this.state.inviteMessage}
                    </div>
                    <Button
                        style={{
                            width:'60%',
                            marginLeft:'20%',
                            marginTop:'15%'
                        }}
                        onClick={() =>
                            alert('确认加入', '', [
                            { text: '取消', onPress: () => console.log('cancel') },
                            { text: '确认', onPress: () =>  this.handleClick() },
                            ])
                        }
                        >
                        确认加入
                    </Button>
            </div>
        )
    }
}
