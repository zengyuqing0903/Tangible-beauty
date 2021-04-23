import React, { Component } from 'react'
import { List,Toast, ActionSheet,Modal,TextareaItem } from 'antd-mobile'
import {Link} from 'react-router-dom'
const alert = Modal.alert;
export default class Letter extends Component {
    constructor(){
        super()
        this.state={
            dataList:[],
            isLike:0,
            arr:[{
                'pid':0,
                "toNick":"寄信人",
                "Ptitle":"小标题",
                "Pcontent":'内容',
                'ppimage':''
            }]
        }
    }
    componentDidMount(){
        this.setState({
            pid:this.props.match.params.id
        })
        console.log(this.props.match.params)//打印文章信息号
        this.$api.showmail({pid:this.props.match.params.id}).then(res => {
            console.log(res.data.data)//打印数据
            this.setState({
                arr:res.data.data
            });
            this.setState({
                isLike:res.data.data[0].isCollection
            })
        }) 
        if(this.state.arr[0].color == null){
            this.state.arr[0].color = 'black'
        }
        console.log(this.state.arr[0].color)
    }
    // 网页copy
    handleCopy = () => {
        const spanText = document.getElementsByClassName('am-modal-alert-content')[0].innerText;
        const oInput = document.createElement('input');
        oInput.value = spanText;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand('Copy'); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        document.body.removeChild(oInput);
    };
    // 收藏
    collec = () => {
        if(this.state.isLike){
            // 后台取消收藏
            this.$api.delcollect({pid:this.props.match.params.id}).then(res => {});
            this.setState({
                isLike:!this.state.isLike
            })
        }else{
            // 后台收藏
            this.$api.collec({pid:this.props.match.params.id}).then(res => {})
            this.setState({
                isLike:!this.state.isLike
            })
        }
    }
    // 删除
    deleEmail =(e)=>{
        this.$api.deletemail({pid:this.props.match.params.id}).then(res => {
            Toast.success('删除成功', 1);
        }) 
        // console.log('删除代码已注释')
    }
    // 分享
    sharemail=()=>{
        // console.log(this.state.pid)//打印文章信息号
        var pid = this.state.pid;
        var shareModel1 = {
            shareQQ: function (pid,type) {
                var param = {
                    pid:pid,
                    type:type
                };
                var s = [];
                for (var i in param) {
                    s.push(i + '=' + encodeURIComponent(param[i] || ''));
                }
                var targetUrl = "https://yf.htapi.pub/v1/private/share?pid="+pid;
                return targetUrl;
            }
        }
        var shareUrl = shareModel1.shareQQ(pid,'edit');
        alert('分享链接', shareUrl, [
            { text: '取消分享', onPress: () => console.log('cancel') },
            { text: '复制链接', onPress: () => {this.handleCopy()
                // am-modal-alert-content
                alert('复制成功','',[
                    {text:'确定',onPress:()=>{console.log('确定')}},
                    {text:'打开链接',onPress:()=>{window.open(shareUrl,'一封','height=640, width=360')}}
                ])
                
            } },
        ]);
    }
    render() {
        return (
            <div className="lt">
                {/* tab */}
                <div className="col-tab" style={{
                    color:'black',
                    backgroundColor: 'whitesmoke'
                }}>
                        {/* {this.state.arr[0].toNick} */}
                    <Link to="/home/letterbox" 
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
                

                {/* 标题 */}
                <div className="hw-title">
                    <span className="hw_title">标题:        {this.state.arr[0].Ptitle}</span>
                </div>
                {/* to */}
                <div className="hw-to">
                    <div style={{padding:"0",margin:"0"}}>
                        to:
                        <span>
                            {this.state.arr[0].toNick}
                        </span>
                    </div>
                </div>
                {/* 内容 */}
                <div className="hw-write">
                    <List>
                        <TextareaItem
                            id="textBox"
                            value={this.state.arr[0].Pcontent}
                            style={{    backgroundImage:"url("+"https://yf.htapi.pub/paper/"+this.state.arr[0].ppimage+")",backgroundSize:"100% 100%",color:this.state.arr[0].color
                            ,fontFamily:this.state.arr[0].fontFamily,fontSize:this.state.arr[0].fontSize+'px',
                            padding:'10px'}}
                            rows={16}
                            count={1000}
                            onClick={()=>{
                                this.setState({
                                    colorState:{display:"none"},
                                    colorTag:false,
                                    musicTag:false,
                                    musicShow:{display:"none"}
                                })
                            }}
                            readOnly='true'
                        />
                    </List>
                </div>

                {/* buttom-choice */}
                <List style={{
                    position:'fixed',
                    bottom:'1.8em',
                    left:'0',
                    width:'100%',
                    height:'2em'
                }}>
                    {/* 收藏 */}
                    <List.Item style={{
                        width:"33.3%",
                        float:'left'
                    }}>
                        <i 
                        className={ this.state.isLike ? 'iconfont icon-collection-b':'iconfont icon-collection'} 
                        onClick={this.collec.bind(this)}
                        style={{
                            paddingLeft:"45%"
                        }}></i>
                    </List.Item>
                    {/* 删除 */}
                    <Link to='/home/letterbox'>
                        <List.Item style={{
                        width:"33.3%",
                        float:'left'
                        }}
                        onClick={(e)=>this.deleEmail(e)}
                        >
                            <i className='iconfont icon-lajixiang' style={{
                                paddingLeft:"45%"
                            }}></i>
                        </List.Item>
                    </Link>
                    <Link>
                        <List.Item style={{
                            width:"33.3%",
                            float:'left'
                        }}
                        onClick={()=>this.sharemail()}                        
                        >
                            <i className='iconfont icon-huifu' style={{
                                paddingLeft:"45%",
                                fontSize:'1.3em'
                            }}></i>
                        </List.Item>
                    </Link>
                </List>
            </div>
        )
    }
}
