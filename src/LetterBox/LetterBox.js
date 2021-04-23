import React, { Component } from 'react'
import '../css/LetterBox.css'
import { NavBar,SearchBar, List ,Toast} from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class LetterBox extends Component {
    constructor(){
        super();
        this.state={
            arr:[],
            brr:[],
            text:'',
            display:true,
            displayb:false
        }
        this.handleshow = this.handleshow.bind(this)
        this.handlehide = this.handlehide.bind(this)
    }
    componentDidMount(){
        this.$api.mailbox().then(res => {
            // 获取数据成功后的其他操作
            this.setState({
                arr:res.data.data
            })
            // console.log(this.state.arr)
        }) 
    }
    // 获取输入值
    inputChange = (e) =>{
        this.setState({
            text:e
        })
    }
    // 调取后台
    handleChange = (e) => {
        this.setState({
            text:e
        })
        // console.log(this.state.text)
        if(this.state.text == ''){
            Toast.fail('输入不为空', 1);
        }else{
            this.handlehide();
            this.$api.searchmail({ptitle:this.state.text}).then(res => {
                // console.log(res.data.data)//返回数据
                this.setState({
                    brr:res.data.data
                })
                // console.log(this.state.brr)
                if(this.state.brr.length == 0){
                    Toast.fail('换个搜索词试试', 1);
                    this.handleshow()
                }
                this.setState({
                    displayb:true
                })
            });
        }
    }

    // 失去焦点，显示原列表
    handleshow =(e)=> {
        // console.log('失去焦点，显示原列表')
        this.setState({
            display:true,
            displayb:false
        })
        
    }
    // 获得焦点，显示搜索结果
    handlehide=(e)=>{
        // console.log('获得焦点，显示b列表')
        this.setState({
            display:false,
            displayb:true
        })
        this.setState({
            brr:[]
        })

    }
    //获取焦点
    render() {
        return (
            <div>
                {/* tab */}
                <NavBar
                style={{
                    color:'black',
                    backgroundColor: 'whitesmoke'
                }}
                >信箱</NavBar>
                {/* 搜索框 */}
                <SearchBar  
                maxLength={8} 
                style={{backgroundColor:'whitesmoke'}}
                onChange={(e)=>this.inputChange(e)}
                cancelText='搜索'
                onCancel={(e)=>this.handleChange(e)}
                // onSubmit={(e)=>this.onkey(e)}
                onFocus={(e)=>this.handlehide(e)}
                onBlur={(e)=>this.handleshow(e)}
                />
                {/* 列表页 */}

                <List className={this.state.display?"active":"activeno"}>
                    {this.state.arr.map((item,index)=>{
                        return(
                            <List.Item className='lb-text' onClick={() => {}} 
                            key={index}
                            >
                                <Link 
                                to={`/letter/${item.Pid}`} style={{
                                    color:'black'
                                }} key={index}
                                >
                                <img src={"https://yf.htapi.pub/head/" + item.uimage} style={{
                                    borderRadius:'50%',
                                    height:'64px',
                                    width:'64px'
                                }} />
                                <span className="lb-user">{item.Ptitle}</span>
                                
                                <span className="lb-date">{new Date(item.Pday).getFullYear()+'-'+(new Date(item.Pday).getMonth()+1)+'-'+new Date(item.Pday).getDate()}</span>
                                <span className="lb-title">{"来自："+item.uname}</span>
                                <span className="lb-content">
                                    {item.Pcontent}
                                </span>
                                </Link>
                            </List.Item>
                        )
                    })} 
                </List>
                <List  className={this.state.displayb?"active":"activeno"}>
                    {this.state.brr.map((item,index)=>{
                        return(
                            <List.Item className='lb-text' onClick={() => {}} 
                            key={index}
                            >
                                <Link 
                                to={`/letter/${item.Pid}`} style={{
                                    color:'black'
                                }} key={index}
                                >
                                <img src={"https://yf.htapi.pub/head/" + item.uimage} style={{
                                    borderRadius:'50%',
                                    height:'64px',
                                    width:'64px'
                                }} />
                                <span className="lb-user">{item.Ptitle}</span>
                                
                                <span className="lb-date">{new Date(item.Pday).getFullYear()+'-'+(new Date(item.Pday).getMonth()+1)+'-'+new Date(item.Pday).getDate()}</span>
                                <span className="lb-title">{"来自："+item.uname}</span>
                                <span className="lb-content">
                                    {item.Pcontent}
                                </span>
                                </Link>
                            </List.Item>
                        )
                    })} 
                </List>
            </div>
        )
    }
}
