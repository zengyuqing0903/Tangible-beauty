import { get, post } from './http';

const api = {

    login: p => post('users/login', p),
    recommend:p=>get('featured/recommend',p),
    gourmet:p=>get('featured/gourmet',p),
    outfit:p=>get('featured/outfit',p),
    travel:p=>get('featured/travel',p),
    fitness:p=>get('featured/fitness',p),
    technology:p=>get('featured/technology',p),
    natural:p=>get('featured/natural',p),
    browse:p=>get('featured/browse',p),
    likenum:p=>get('featured/likenum',p),
    collectnum:p=>get('featured/collectnum',p),
    commentnum:p=>get('comment/commentnum',p),
    getcomment:p=>get('comment/getcomment',p),
    search:p=>get('featured/search',p),
    //我的页面
    mine:p=>get('/mine/me',p),

    isfollow:p=>get('featured/isattention',p),
    islike:p=>get('featured/islike',p),



    headimg: p => post('image/head',p),

    // // lxc
    mailbox: p => get('mailbox',p),
    showmail: p => get('mailbox/showmail',p),
    mine: p => get("mine",p),
    sharenum : p => get("mine/sharenum",p),
    favorite : p => get('mine/favorite',p),
    recyclebin : p => post('mine/recyclebin/deletebin',p),
    changename : p => post('mine/changename',p),
    collec: p => get("mailbox/collect",p),
    delcollect:p => post("mine/delcollect",p),
    deletemail:p => post("mailbox/deletemail",p),
    recyclepletter:p=> get('mine/recyclepletter',p),
    restore:p => post('mine/recyclebin/restore',p),
    changepwd:p => post('mine/changepwd',p),
    getoldpwd: p => get('mine/getoldpwd',p),
    headimg:p => post('image/head',p),
    changehead:p=>post('image/changehead',p),
    searchmail : p => get('mailbox/searchmail',p),
    setgrade:p=>post('mine/setgrade',p),
    getgrade:p=>get('mine/getgrade',p),
    attention:p=>post('mine/attention',p),
    delattention:p=>post('mine/delattention',p),
    getfans:p=>get('mine/fans',p),
    getattention:p=>get('mine/attentions',p),
    attentionlist:p=>get('mine/attentionlist',p),
    fanslist:p=>get('mine/fanslist',p),
    myself:p=>get('mine/myself',p),
    openlist:p=>get('mine/openlist',p),

    sendlist:p=>get('mine/sendlist',p),
    awenotice:p=>get('public/awenotice',p),//点赞通知
    feedback:p=>post('mine/feedback',p),

    // zym
    theme: p=> get('together/theme',p),
    themetitle:p=>get('together/theme/showtitle',p),
    themeContent: p=>get('together/theme/showtheme',p),
    member: p=>get('together/theme/showtheme/member',p),
    wrdelect: p=>post('together/theme/delletter',p),
    addtheme:p=>post('together/theme/addtheme',p),
    thdelect:p=>post('together/theme/deltheme',p),
    mbdelect:p=>post('together/theme/deltmember',p),
    addletter:p=>post('together/theme/writeletter',p),
    showletter:p=>get('together/theme/show',p),
    changeletter:p=>post('together/theme/edit',p),
    addimage:p => post('image/theme',p),
    insertTImg:p => post('image/insertTimg',p),//插入图片
    showTImg:p => get('image/showTimg',p),//展示图片
    delInsertTimg:p => post('image/delInsertTimg',p),//删除图片
    InsertTmus:p => post('music/insertMusic',p),//插入音乐
    showTmus:p => get('music/presentMusic',p),//展示音乐
    delInsertTmus:p => post('music/delmusic',p),//删除音乐
    changeWtback:p=>post('together/changebg',p),//更换背景
    addmember:p=>post('together/addmember',p),//邀请成员
    addFirstMember:p=>post('together/theme/addFirstMember',p),


    getmessage:p=>get('together/getmessage',p),
    getown:p=>get('/together/getown',p),
    confirmMessage:p=>post('/together/confirmMessage',p),

    //Login
    login_Vcode: p => post('users/verification', p),//登录验证码
    register_Vcode: p => post('users/verification', p),//注册验证码
    register: p => post('users/register', p),//注册
    getLetter: p => get('private/getletter',p),//获取信件
    getToUList:p =>get('private/getlist',p),//获取收件人列表
    delPrivateLetter : p=> post('private/getletter/pdelete',p),//删除信件
    reName : p=> post('private/changetoNick',p),//重命名
    getContent : p=> get('showletter/show',p),//展示信件内容
    writeLetter : p =>post('private/writeletter',p),//新建信件
    editLetter : p=> post('showletter/edit',p),//编辑信件
    addAddressee : p=> post('private/addlist',p),//添加收信人
    delAddressee : p=> post('private/dellist',p),//删除收信人
    notice :p=> get('mine/notice',p),//消息通知
    changeBack : p=>post('private/changeback',p),//更换背景
    selBack : p=>get('private/getback',p),//选择背景
    postMusic: p=>post('music/insertMp3',p),//上传音乐
    showMusic: p=>get('music/showmusic',p),//获取音乐
    delMusic : p=>post('music/delMp3',p),//删除音乐
    postBgImg : p=>post('image/choosebg',p),//上传自定义背景
    showBgImg : p=>get('image/showpbg',p),//获取自定义背景
    delCustom : p=>post('image/delbgimg',p),//删除自定义背景
    getHomeData : p=>get('image/homeImage',p),
    changeHomeBg : p=>post('image/changeHomeBack',p),//修改首页背景图
    changeSignature : p=>post('mine/changeSignature',p),//修改个性签名
    WritePub:p=>post('public/writeOpen',p),//书写公开信件
    showPub:p=>get('public/getOletter',p),//展示公开信件
    showPubList:p=>get('public/getOlist',p),//公开信件列表
    getMyPub:p=>get('public/perOlist',p),//显示个人公开写
    changePubImg:p=>post('public/modifyObg',p),//修改公开写背景
    DeletePubLetter:p=>post('public/delOletter',p),//删除公开信
    isVip:p=>get('public/isVip',p),
    EditPubLetter:p=>post('public/amendLetter',p),//编辑公开信
    addLikes:p=>get('public/addLikes',p),
    cancleLikes:p=>get('public/cancelLikes',p),//取消点赞
    getUserinfo : p=>get('public/designuser',p),//获取用户信息
    getOpenList : p=>get('public/deslist',p),
    getId: p=>get('public/userid',p),//获取uid
    getLikeNum:p=>get('public/Likenum',p),//获取点赞数
    sign :p=>post('signIn/sign',p),//签到
    getSign : p=>get('signIn/getsign',p),//获取签到情况
    sign :p=>post('signIn/sign',p),//签到
    getSign : p=>get('signIn/getsign',p),//获取签到情况
    getSignId: p=>get('public/aweuid',p),//获取点赞ID
    // getpid:p => get('private/getpd',p)

    getsendletter:p=>get('mailbox/getsendletter',p),//获取发送信件信息
    sendletter:p=>post('mailbox/sendletter',p),//发送信件
    searchUname:p=>get('/together/searchUname',p),   
}


export default api;

// 调用
// this.$api.login(表单).then(res => {
//     // 获取数据成功后的其他操作
//     …………
// }) 

// http://localhost:8000/v1/user/login
