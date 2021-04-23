import React, { Component } from 'react'
import "antd/dist/antd.css"
import "../css/togeCreate.css"
import { ImagePicker, Popover,Modal,List ,Toast} from 'antd-mobile';
import { Input,Button} from 'antd';

const data = [{}];
export default class Addressee extends Component {
    constructor(){
        super();
        this.state = {
            files: [],
            name:''
        }
    }
    onChange = (files, type, index) => {
        
        if(type=='add'){
            // console.log(files, type, index);
            // console.log(files[0].url)
             this.$api.addimage({imgData:files[0].url}).then(res=>{
                console.log(res.data);
                this.setState({
                    name:res.data
                })
        })
        }
        this.setState({
          files,
        });
      }

      addTheme=()=>{
        var title = this.title.state.value;
        var type = this.type.state.value;

        var timestamp = Date.parse(new Date()); 
        if(title == undefined || title ==""){
            alert("请填写昵称");
        }else{
            console.log(this.state.title);
            console.log("ndoweiakls")
            this.$api.addtheme({tname:title,timage:this.state.title,tday:timestamp}).then(res => {                     
                console.log("11")                
                if (res.data.status === 0) { 
                    this.setState({
                        data:res.data.data                   
                    })                    
                    // alert("创建成功~");  
                    Toast.success('经验+5', 1);                
                    console.log(this.state.data);
                }         
            })  
        this.totoge();
        }
    }
    totoge=()=>{
        this.props.history.push("/home");
    }
    
    render() {
        //console.log(this.state.src);
        const { files } = this.state;
 
        return (
            <div>
                <div className="add-top">
                    {/* <span>
                        <img src={require("../imgs/Home/back.png")} style={{width:"25px",height:"25px"}} className="add-back" onClick={this.totoge} />
                        <i className="icon-fanhui iconfont"
                                    style={{   
                                        width:"25px",
                                        height:"25px" ,                                                
                                        fontSize:'1.5em',
                                        position:"fixed",
                                        left:"20px"}}
                                        onClick={this.totoge}/>
                    </span> */}
                    <span className="add-title">
                        创 形
                    </span>
                </div>
                <div className="add-body">
                
                <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 1}
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                    />
                   
                    <Input type="text" name="title"  ref={(inp)=>{this.title=inp}} placeholder="请填写标题奥~" style={{marginTop:"15%"}}/>
                    <Input type="text" name="type"  ref={(inp)=>{this.type=inp}} placeholder="给文文加个标签吧~" style={{marginTop:"10%"}}/>
                  
                    <Button id="add-btn" onClick={this.addTheme}>确 认 发 布</Button>
                </div>
                
            </div>
        )
    }
}
