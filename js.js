var seekBtn = document.querySelector('#seek').querySelector('input')
var magnifyingGlass = document.querySelector('#seek').querySelector('img')
var passpord = document.querySelector('.login').querySelectorAll('input')
var panda = document.querySelector('#panda')
var close = document.querySelector('.close')
var barrier = document.querySelector('.barrier')
var loginBtn = document.querySelector('.loginBtn')
var body = document.querySelector('body')
var loginBtn1 = document.querySelector('#loginBtn');
var ring = document.querySelector('.ring')
var loginAfter = document.querySelector('.loginAfter')
var portrait_Photo = document.querySelector('.portrait').querySelector('img')
var home_pageBtn = document.querySelector('#home_page')
var userId
// 禁止选中文字
document.addEventListener('selectstart',function(e){
    e.preventDefault();
})

// 查找按钮
seekBtn.addEventListener('focus',function(){
     this.style.borderColor = '#007fff';
     magnifyingGlass.src = 'img/放大镜蓝.png';
     this.placeholder = '文章/小册/标签/用户'
})
seekBtn.addEventListener('blur',function(){
     this.style.borderColor = '#97979733';
     magnifyingGlass.src = 'img/放大镜.png';
     this.placeholder = '探索掘金'
})

//账号密码登录
for(var i = 0;i<passpord.length;i++){
    if(i === 0){
        passpord[i].addEventListener('focus',function(){
            this.style.borderColor = '#007fff';
            panda.src = 'img/熊猫头点击.png';
            panda.style.top = '-81'+'px';
        })
    }
    if(i === 1){
        passpord[i].addEventListener('focus',function(){
            this.style.borderColor = '#007fff';
            panda.src = 'img/熊猫头闭眼.png';
            panda.style.top = '-83'+'px';
        })
    }
    passpord[i].addEventListener('blur',function(){
        this.style.borderColor = '#97979733';
        panda.src = 'img/熊猫头初始.png';
        panda.style.top = '-90'+'px';
    })  
}

// 显示登陆
loginBtn.addEventListener('click',function(){
    barrier.style.display = 'block';
    body.style.overflow = 'hidden';
})

// 关闭登录
close.addEventListener('click',function(){
    barrier.style.display = 'none'
    body.style.overflow = ''
})

//验证是否有账号在登录
window.onload = function(){
    var xhr1 = new XMLHttpRequest();
    var num = localStorage.getItem('userId')
    xhr1.open('GET','http://47.100.42.144:3389/user/isLogin?userId='+num,true);
    xhr1.send();
    xhr1.onreadystatechange = function(){   
        if(xhr1.readyState === 4){
            if(xhr1.status === 200){  
                let info = JSON.parse(xhr1.responseText)
                if(info.data.message == '已登录') {
                    console.log('1');
                   barrier.style.display = 'none'
                   body.style.overflow = ''
                   loginBtn.style.display = 'none'
                   loginAfter.style.display = 'block'
                   loginAfter.style.top = '11px'
                    
                   //获取用户信息 
                    var info_box_portrait = document.querySelector('.major_area_top').querySelector('img')
                    var info_box_name = document.querySelector('.info_box').querySelector('h1')
                    var info_box_introduction = document.querySelector('.info_box').querySelectorAll('a')
                    var xhr3 = new XMLHttpRequest()
                    xhr3.open('GET','http://47.100.42.144:3389/user/getUserInfo?userId=86',true)                   
                    xhr3.send()
                    xhr3.onreadystatechange = function(){              
                        if(xhr3.readyState === 4){
                            if(xhr3.status === 200){                               
                                let info1 = JSON.parse(xhr3.responseText)
                                info_box_portrait.src='http://47.100.42.144:3389/user/'+info1.data.avatar
                                portrait_Photo.src='http://47.100.42.144:3389/user/'+info1.data.avatar
                                info_box_name.innerHTML = info1.data.nickname
                                console.log();
                                if(info1.data.introduction!=''){
                                    info_box_introduction[0].innerHTML = info1.data.introduction
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


// 登录账号验证
var xhr = new XMLHttpRequest();
loginBtn1.onclick = function(){
    var username= passpord[0].value
    var password= passpord[1].value
    xhr.open("POST", "http://47.100.42.144:3389/user/login", true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send("username="+username+"&password="+password)
    xhr.onreadystatechange = function(){              
          if(xhr.readyState === 4){
              if(xhr.status === 200){
                  let info = JSON.parse(xhr.responseText)
                  userId = info.data.userId
                  if(info.data.message === '登录成功'){
                    barrier.style.display = 'none'
                    body.style.overflow = ''
                    loginBtn.style.display = 'none'
                    loginAfter.style.display = 'block'
                    loginAfter.style.top = '11px'
                    localStorage.setItem('userId',info.data.userId)

                  }else{
                      alert('账号或密码错误，请重新输入')
                      passpord[0].value = ''
                      passpord[1].value = ''
                      passpord[0].placeholder ='邮箱、手机号（国际号码加区号）'
                      passpord[1].placeholder ='请输入密码'
                  }
              }
          }
    }
}

//消息
ring.addEventListener('mouseover',function(){
    this.src = 'img/消息蓝.png'
})
ring.addEventListener('mouseout',function(){
    this.src = 'img/消息.png'
})

//获取个人功能
var portrait = document.querySelector('.portrait')
var personal = document.querySelector('.function')
console.log(personal);
console.log(portrait);
portrait.addEventListener('click',function(e){
    personal.style.display = 'block'
    e.stopPropagation()
    document.onclick = function(e){
    if(e.target.nodeName!='IMG'){
        personal.style.display = 'none'
      }
    }
}) 

//退出登录
var logout = document.querySelector('.logout')
logout.addEventListener('click',function(){
    var flag = confirm('确定登出吗？每一片贫瘠的土地都需要坚定的挖掘者！');
    if(flag){
        var xhr2 = new XMLHttpRequest();
        xhr2.open('POST','http://47.100.42.144:3389/user/logout',true)
        xhr2.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr2.send("userId=86")
        xhr2.onreadystatechange = function(){              
            if(xhr2.readyState === 4){
                if(xhr2.status === 200){
                    loginBtn.style.display = 'block'
                    loginAfter.style.display = 'none'
                    localStorage.removeItem('userId')
                }
            }
        }
    }
})

//进入个人页面
var functionBtn = document.querySelector('.function').querySelector('ul').querySelectorAll('li')
var personal_page = document.querySelector('.personal_page')
var home_page = document.querySelector('.home_page')
functionBtn[1].onclick = function(){
    personal_page.style.display = ''
    home_page.style.display = 'none'
    home_pageBtn.className = ''
}

//返回首页
home_pageBtn.onclick = function(){
    personal_page.style.display = 'none'
    home_page.style.display = ''
    home_pageBtn.className = 'blue'
}


//个人页面个人简介变化
var icc = document.querySelector('.it_can_change')
var iccFlag = 1
var changeInfo = ["你有哪些爱好？",'你的武器库有哪些武（ji）器（shu）','你的信仰是什么','你的人生格言是什么']
var timerChange = setInterval(function(){
    if(iccFlag == changeInfo.length){
        iccFlag=0
    }
     icc.innerHTML = changeInfo[iccFlag]
     iccFlag++
},6000)

//个人页面 文章赞切换浏览
var mabn = document.querySelector('.major_area_bottom_nav').querySelectorAll('span')
for(var i = 0;i<mabn.length;i++){
    mabn[i].onclick = function(){
        for(var i = 0;i<mabn.length;i++){
            mabn[i].className = ''
        }
        this.className = 'underlineBlue'
    }
}


var morePanelNav = document.querySelector('.major_area_bottom_nav').querySelectorAll('span')
var morePanel = document.querySelectorAll('.more_panel')
console.log(morePanel);
//点击进入赞文章
morePanelNav[1].addEventListener('click',function(e){
    for(var i = 0; i < morePanel.length ;i++){
        morePanelNav[i].className = ''
        morePanel[i].style.display = 'none'
    }
    morePanel[0].style.display = ''
    e.stopPropagation()
    document.onclick = function(e){
        if(e.target.id!='assit'){
            morePanel[0].style.display = 'none'
          }
        }
}) 


//点击进入收藏文章
morePanelNav[2].onclick = function(e){
    for(var i = 0; i < morePanel.length ;i++){
        morePanelNav[i].className = ''
        morePanel[i].style.display = 'none'
    }
    morePanel[1].style.display = ''
    e.stopPropagation()
    document.onclick = function(e){
        if(e.target.id!='assit'){
            morePanel[1].style.display = 'none'
          }
        }
}




//获取文章列表
var xhr4 = new XMLHttpRequest()
xhr4.open('GET','http://47.100.42.144:3389/user/getUserWriteArticles?userId='+userId,true)
xhr4.send()
xhr4.onreadystatechange = function(){              
    if(xhr4.readyState === 4){
        if(xhr4.status === 200){
            var info3 = JSON.parse(xhr4.responseText);
            if(info3.data.message == "该用户暂无文章"){
                var artical_list = document.querySelector('.artical_list').querySelector('span')
                artical_list.innerHTML = '列表为空'
            }
        }
    }
}
//获取用户写的文章列表
var xhr5 = new XMLHttpRequest()
xhr5.open('GET','http://47.100.42.144:3389/user/getUserWriteArticles?userId='+userId,true)
xhr5.send()
xhr5.onreadystatechange = function(){              
    if(xhr5.readyState === 4){
        if(xhr5.status === 200){
            var info3 = JSON.parse(xhr5.responseText);
            console.log(info3);
        }
    }
}
