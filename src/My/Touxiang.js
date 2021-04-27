import React, { Component } from 'react'
import { NavBar, Icon, Button } from 'antd-mobile';


export default class Touxiang extends Component {
    constructor() {
        super();
        this.state = {
            arr:[{"Uimage":"1234567891234_56.jpg"}],
            src: ''
        };
    }
    componentDidMount() {
        this.$api.mine().then(res => {
            // 获取数据成功后的其他操作
            this.setState({
                arr:res.data.data
            })
            console.log(this.state.arr[0].uimage)
        })
        if (this.props.location.state) {

            this.setState({
                src: this.props.location.state.src
            });
        }

    }

    changeImg = (e) => {
        let file = e.target.files[0]
        if (file) {
            console.log(file.size);
            if (file.size <= 99999999999999999999) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    this.setState({
                        imgPreview: reader.result,
                        result: true,
                        faceCheck: true
                    })
                    console.log(reader.result);
                    this.props.history.push({pathname:'/cropimg',state:{src:reader.result}})
                 }; 
            } else {
                console.log("文件过大");
            }
        }
        e.target.value = '';
    }

    render() {
        console.log(this.state.arr[0].uimage);
        return (
            <div>
                <NavBar mode="dark" icon={<Icon type="left" onClick={()=>{this.props.history.push('myedit')}}/>} rightContent={<label for="addFile"><b>. . .</b></label>} style={{background:'black',color:'#fff'}}>头 像</NavBar>
                
                <div style={{width:'100%',height:'100vh',background:'white',position:'fixed'}}>
                    <img src={"http://localhost:3000/head/"+this.state.arr[0].uimage+'.jpg'} style={{width:'100%',height:'100vw',position:'fixed',
                            top: '50%',transform: 'translate(0, -50%)'
                    }}/>
                </div>

                <input type="file" accept="image/*" id="addFile" style={{display:'none'}} onChange={this.changeImg}/>

            </div>
        );
      }
}
