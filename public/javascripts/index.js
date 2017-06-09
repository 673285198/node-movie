/**
 * Created by lujing on 2017/6/8.
 */

const $signInModal = $('#signin-modal');
const $signInForm = $('#signin-form');
const $signInBtn = $('#signin-btn');

const $signUpModal = $('#signup-modal');
const $signUpForm = $('#signup-form');
const $signUpBtn = $('#signup-btn');
const $userSign = $('#user-sign');

$(() => {

    getCurrentUser();

    $signUpBtn.click(() => {
        signUp();
    });
    $signInBtn.click(() => {
        signIn();
    });

});

function getCurrentUser(){
    $.ajax({
        url:'/user/current-user',
        type:'GET',
        success:function(data){
            let buttons = '';
            if(data.user){
                buttons += '<li><a href="javascript:void(0);">欢迎你 '+data.user.name+'</a></li>' +
                    '<li><a href="javascript:void(0);" onclick="signOut();">退出</a></li>';
            }else{
                buttons += '<li><a href="javascript:void(0);" onclick="toSignIn();">登录</a></li>' +
                    '<li><a onclick="toSignUp();">注册</a></li>';
            }
            $userSign.html(buttons);
        }
    });
}

function toSignIn(){
    $signInModal.modal('show');
}
function toSignUp(){
    $signUpModal.modal('show');
}

function signUp() {
    let user = {
        name: $signUpForm.find('input[name="name"]').val(),
        password: $signUpForm.find('input[name="password"]').val()
    };

    $.ajax({
        url: '/user/signup',
        type: 'POST',
        data: {user: JSON.stringify(user)},
        dataType: 'JSON',
        success: function (data) {
            if (data) {
                if (data.result === 'exist') {
                    alert('该用户已存在，请直接登录');
                } else if (data.result === 'success') {
                    alert('恭喜注册成功');
                    location.reload();
                } else if (data.result === 'fail') {
                    alert('Sorry 注册失败');
                }
            }
        }
    });
}

function signIn() {
    let user = {
        name: $signInForm.find('input[name="name"]').val(),
        password: $signInForm.find('input[name="password"]').val()
    };

    $.ajax({
        url: '/user/signin',
        type: 'POST',
        data: {user: JSON.stringify(user)},
        dataType: 'JSON',
        success: function (data) {
            if (data) {
                if (data.result === 'notexist') {
                    alert('该用户尚未注册');
                    location.reload();
                } else if (data.result === 'wrong') {
                    alert('用户名或密码错误请稍后重试');
                } else if (data.result === 'success'){
                    location.href = '/movie';
                }
            }
        }
    });
}

function signOut(){
    $.ajax({
       url:'/user/signout',
        type:'GET',
        dataType:'JSON',
        success:function(data){
           if(data.result === 'success'){
               getCurrentUser();
           }
        }
    });
}


