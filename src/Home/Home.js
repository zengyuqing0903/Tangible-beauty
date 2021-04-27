import React, { Component } from 'react'
import "../css/home.css";
import {HashRouter as Router,Link} from 'react-router-dom'
import { NavBar} from 'antd-mobile';
import { Input} from 'antd';
import { Tabs, WhiteSpace, Badge,Button,SearchBar,Toast } from 'antd-mobile';

 
const tabs = [
    { title: <Badge >推荐</Badge> },
    { title: <Badge>美食</Badge> },
    { title: <Badge>穿搭</Badge> },
    { title: <Badge>旅行</Badge> },
    { title: <Badge>健身</Badge> },
  ];
const data=[1,2,3];

export default class Home extends Component {
    
    constructor(){
        super();
        this.state={
            data:[
                
            ],
            display:true,
            displayb:false       
        }
    }   
    componentDidMount(){
        this.$api.recommend().then(res=>{
            console.log(res.data);
            if (res.data.status === 0) {
                this.setState({
                    data:res.data.data
                })
            }
        })
    }
    onAttention=(val)=>{
        console.log(val.uid);
        this.$api.isfollow({uid:val.uid}).then(res=>{
            console.log(res.data);
        })
        
    }
    tabClick=(index)=>{
        console.log(index)
        let parms = index.title.props.children;
        console.log(parms)
        switch(parms){
            case '美食':{
                this.$api.gourmet({gourmet:parms}).then(res=>{
                    this.setState({data:res.data.data})
                })
                break;
            }
            case '穿搭':{
                this.$api.outfit({chuanda:parms}).then(res=>{
                    this.setState({data:res.data.data})
                })
                break;
            }case '旅行':{
                this.$api.travel({lvxing:parms}).then(res=>{
                    this.setState({data:res.data.data})
                })
                break;
            }case '健身':{
                this.$api.fitness({jianshen:parms}).then(res=>{
                    this.setState({data:res.data.data})
                })
                break;
            }case '推荐':{
                this.$api.recommend({recommend:parms}).then(res=>{
                    console.log("skksk");
                    this.setState({data:res.data.data})
                })
                break;
            }
            // case '美食':{
            //     this.$api.gourmet({gourmet:parms}).then(res=>{
            //         this.setState({data:res.data.data})
            //     })
            // }
            default:
                break;
        }
        
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
            this.$api.search({tag:this.state.text}).then(res => {
                // console.log(res.data.data)//返回数据
                this.setState({
                    data:res.data.data
                })
                console.log(this.state.data)
                if(this.state.data.length == 0){
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
            data:[]
        })

    }
    // inputChange=(e)=>{
    //     console.log(e.target.value);
    //     this.$api.search({tag:e.target.value}).then(res=>{
    //         this.setState({
    //             data:res.data.data
    //         })
    //         console.log(this.state.data)
    //     })
    // }
    render() {
        //console.log(this.state.toUid);
        return (
            <div>
                {/* 顶部 */}
                <NavBar className='home-back'>
                    <span className='hm-span'>精选</span>
                </NavBar>
                {/* 内容 */}
                <div className="home-body">
                    {/* 搜索栏 */}
                    <SearchBar  
                        maxLength={8} 
                        style={{width:"96%", backgroundColor:' rgb(228, 226, 226)',borderRadius:"13px",margin:"5px 5px 5px 5px"}} 
                        // style={{backgroundColor:'whitesmoke'}}
                        onChange={(e)=>this.inputChange(e)}
                        cancelText='搜索'
                        onCancel={(e)=>this.handleChange(e)}
                        // onSubmit={(e)=>this.onkey(e)}
                        onFocus={(e)=>this.handlehide(e)}
                        onBlur={(e)=>this.handleshow(e)}
                        />
                    {/* <Input 
                        type="text" name="name" 
                        placeholder="请输入要搜索的内容" 
                        
                        onChange={this.inputChange.bind(this)}/>                 */}
                    {/* 导航栏 */}
                    <div style={{backgroundColor: 'rgb(240, 240, 240)'}}>
                        <Tabs tabs={tabs}
                        initialPage={0}
                        onChange={(tab, index) => { this.tabClick(tab) }}
                        onTabClick={(tab, index) => {console.log('onChange', index, tab);}}                       
                        >
                            <div style={{ display: 'flex',flexWrap:" wrap" ,alignItems: 'center', justifyContent: 'center', height: '420px'}}>
                                {this.state.data.map((val)=> (                           
                                    <div key={val} className="home-block"> 
                                        <Link to={"/content/"+val.pid}>
                                            <img src={"http://localhost:3000/image/"+val.pimage+".jpg"} alt="" className="home-bacimg"/>
                                        </Link>                                       
                                        <div className='home-down'>
                                            <div className="home-title">{val.ptitle}</div>                            
                                            <div className="home-btm">
                                                <div className="home-btm-left">
                                                    <img src={"http://localhost:3000/head/"+val.uimage+".jpg"} alt="" className="home-btm-left-img"/>
                                                    <span className="home-btm-left-name">{val.uname}</span>
                                                </div>
                                                <div className="home-btm-right" onClick={()=>{this.onAttention(val)}}>
                                                    <span>关注</span>
                                                </div>
                                            </div>                            
                                        </div>
                      
                                    </div>
                                ))}
                            </div>
                            
                        
                        </Tabs>
                        <WhiteSpace />      
                    </div>
                </div>

                

                
                {/* pencil */}
                {/* <Link to={"/homeWrite/?toNick="+this.state.toType+"&type=create"}>
                    <div className="pencil" onClick={this.toWrite}>

                    </div>
                </Link> */}
            </div>
        )
    }
}
