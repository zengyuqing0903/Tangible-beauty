import React, { Component } from 'react'
import { ImagePicker,Button, WingBlank, SegmentedControl } from 'antd-mobile';
import {Link} from 'react-router-dom';

const data = [];

export default class Changeimg extends Component {
    // 上传图片
    // https://www.jianshu.com/p/01754d05b2de

    state = {
        files: data,
        multiple: false,
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }
    render() {
        const { files } = this.state;
        return (
            <div>
                <div className="col-tab">
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
                    <Button style={{
                        height:'9vw',
                        width:'20vw',
                        position:"absolute",
                        right:"5%",
                        top:"18%",
                        color:'black',
                        backgroundColor:'white',
                        lineHeight:"9vw",
                        borderRadius:'5vw'
                    }}
                    >
                        上传
                    </Button>
                </div>
                <ImagePicker
                files={files}
                onChange={this.onChange}
                selectable={files.length < 7}
                />
            </div>
        )
    }
}
