import React, { Component } from 'react'
import {NavLink,Link,Switch} from 'react-router-dom'
import { List,DatePicker,Picker } from 'antd-mobile'

const colors = [
    {
      label:
      (<div>
        <span>白羊座</span>
      </div>),
      value: '白羊座',
    },
    {
      label:
      (<div>
        <span>金牛座</span>
      </div>),
      value: '金牛座',
    },
    {
      label:
      (<div>
        <span>双子座</span>
      </div>),
      value: '双子座',
    },
      {
        label:
        (<div>
          <span>巨蟹座</span>
        </div>),
        value: '巨蟹座',
      },
      {
        label:
        (<div>
          <span>狮子座</span>
        </div>),
        value: '狮子座',
      },
    {
        label:
        (<div>
          <span>处女座</span>
        </div>),
        value: '处女座',
      },
      {
        label:
        (<div>
          <span>天秤座</span>
        </div>),
        value: '天秤座',
      },
      {
        label:
        (<div>
          <span>天蝎座</span>
        </div>),
        value: '天蝎座',
      },
      {
        label:
        (<div>
          <span>射手座</span>
        </div>),
        value: '射手座',
      },
      {
        label:
        (<div>
          <span>摩羯座</span>
        </div>),
        value: '摩羯座',
      },
      {
        label:
        (<div>
          <span>水瓶座</span>
        </div>),
        value: '水瓶座',
      },
      {
        label:
        (<div>
          <span>双鱼座</span>
        </div>),
        value: '双鱼座',
      },
  ];

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

const sex = [
    {
      label:
      (<div>
        <img src={require("../imgs/public/男.png")} />
      </div>),
      value: '男',
    },
    {
        label:
        (<div>
          <img src={require("../imgs/public/女.png")} />
        </div>),
        value: '女',
      },
]

export default class Myedit extends Component {
    constructor(){
        super();
        this.state={
            arr:[{"Uname":"你的昵称",'pidname':'0',Uimage:'1234567891234_56.jpg'}],
            date :now,
            sex:''
        }
    }
    componentDidMount(){
        this.$api.mine().then(res => {
            // 获取数据成功后的其他操作
            this.setState({
                arr:res.data.data
            })
            // console.log(this.state.arr[0].Uimage)
        })
    }
    onChangeColor = (color) => {
        this.setState({
          colorValue: color,
        });
    }
    onChangeSex = (sex) => {
        this.setState({
          sex : sex, 
        });
    }
    render() {
        // console.log(this.state.arr[0].Uimage)
        return (
            <div>
                {/* tab */}
                <div className="col-tab">
                    编辑资料
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
                {/* 内容 */}
                <Link to="/touxiang"><img src={"http://localhost:3000/head/"+this.state.arr[0].uimage+'.jpg'} className="ed-img"/></Link>
                <List>
                    <List.Item extra={this.state.arr[0].uphone}>账号</List.Item>
                    <Link to="/changename"><List.Item extra={this.state.arr[0].uname} arrow="horizontal" onClick={() => {}}>
                        昵称
                    </List.Item></Link>

                    <DatePicker
                    mode="date"
                    title="Select Date"
                    extra="Optional"
                    value={this.state.date}
                    onChange={date => this.setState({ date })}
                    >
                    <List.Item arrow="horizontal">生日</List.Item>
                    </DatePicker>
                    
                    <Picker
                    data={colors}
                    value={this.state.colorValue}
                    cols={1}
                    onChange={this.onChangeColor}
                    >
                    <List.Item arrow="horizontal">星座</List.Item>
                    </Picker>

                    <Picker
                    data={sex}
                    value={this.state.sex}
                    cols={1}
                    onChange={this.onChangeSex}
                    >
                    <List.Item arrow="horizontal">性别</List.Item>
                    </Picker>

                </List>
            </div>
        )
    }
}
