import React from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { NavBar, Icon, Button } from 'antd-mobile';



export default class Cropimg extends React.Component {
    constructor() {
        super();
        this.cropImage = this.cropImage.bind(this);
    }

    cropImage() {
        if (this.cropper.getCroppedCanvas() === 'null') {
            return false
        }
        var img = this.cropper.getCroppedCanvas().toDataURL();

        // console.log(this.cropper.getCroppedCanvas());
        console.log(img)
        this.$api.headimg({src:img}).then(res => {
            console.log(res.data);
            this.$api.changehead({name:res.data}).then(res=>{
                console.log(res);
            })
            this.props.history.push({pathname:'/touxiang',state:{src:img}})
        
        })
    }

    render() {
        console.log(this.props.location)
        return (
            <div>
                <NavBar mode="dark" icon={<Icon type="left" onClick={()=>{this.props.history.push('/touxiang')}}/>} style={{background:'#617ca6',color:'#fff'}}>头 像</NavBar>

                <div style={{width: '100%'}}>
                    <Cropper
                        src={this.props.location.state.src}
                        ref={cropper => {
                            this.cropper = cropper;
                        }}
                        style={{height: 400, width: '100%'}}
                        aspectRatio={1/1}
                    />
                </div>
                <div>
                    <Button
                        type="primary"
                        onClick={this.cropImage}
                        style={{width:'60%',height:'20%',background:'#617ca6',color:'#fff',margin:'0 auto',marginTop:'7%'}}
                        activeStyle={{background:'grey'}}
                    >确认</Button>
                </div>
            </div>
        );
    }
}