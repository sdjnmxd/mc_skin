//Login页面
(function () {
    //因为非标准表格提交  所以手动监听了回车键的keyDown事件
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            $('#login_btn').click();
        }
    });

    var usernameDiv = $("#username");
    var passwordDiv = $("#password");

    //监听两个输入框的blur事件
    usernameDiv.on('blur', function () {
        checkTextInput.apply(this, arguments);
    });
    passwordDiv.on('blur', function () {
        checkTextInput.apply(this, arguments);
    });

    //检查输入框输入状态
    function checkTextInput() {
        if ($(this).val() == '') {
            setTextInputStatus($(this), 'error');
        } else {
            setTextInputStatus($(this), 'success');
        }
    }

    //设置输入框的状态
    function setTextInputStatus(who, type) {
        if (type == 'success') {
            $(who).addClass('input-success');
            $(who).removeClass('input-error')
        } else if (type == 'error') {
            $(who).removeClass('input-success');
            $(who).addClass('input-error');
        }
    }


    $("#login_btn").on('click', function () {
        var username = usernameDiv.val();
        var password = passwordDiv.val();

        sendMessage('info', '正在登陆...');

        //判断非空  写的太罗嗦
        if (username == '' || password == '') {
            sendMessage('error', '用户名或密码不能为空');
            checkTextInput.apply(usernameDiv, arguments);
            checkTextInput.apply(passwordDiv, arguments);
            return
        }

        //ajax提交数据
        $.ajax({
            url: "/member/login",
            type: 'post',
            data: {
                username: username,
                password: password
            },
            success: function (result) {
                var msg = result.msg;
                sendMessage('success', msg);
                setTimeout(function () {
                    location.href = "/member/home";
                }, 2000);

            },
            error: function (result) {
                var msg = result.responseJSON.msg;
                setTextInputStatus(usernameDiv, 'error');
                setTextInputStatus(passwordDiv, 'error');
                sendMessage('error', msg);
            }
        });
    });
})();

//Home页面
(function () {
    //退出按钮click事件
    $('#logout').click(function () {
        sendMessage('success', '已退出登陆,即将跳转到登录页...');
        setTimeout(function () {
            location.href = "/member/logout";
        }, 2000);
    });

    //监听两个上传按钮的点击事件
    $('#skinsModelUpload').click(function () {
        upload('skin');
    });
    $('#capeModelUpload').click(function () {
        upload('cape');
    });

    //ajax上传文件
    function upload(type) {
        $.upload({
            url: '/upload',
            fileName: 'miaoowuSkins',
            params: {uploadType: type},
            dataType: 'json',
            onSubmit: function () {
                sendMessage('info', '上传中...');
                return true;
            },
            onComplete: function (data) {
                if (data != '') {
                    var statusCode = data.statusCode;
                    var msg = data.msg;

                    switch (statusCode) {
                        case 200 :
                            var urlDiv;

                            switch (type) {
                                case 'skin' :
                                    urlDiv = $('#skinsModel');
                                    break;
                                case 'cape' :
                                    urlDiv = $('#capeModel');
                                    break;
                            }

                            sendMessage('success', msg);
                            setPreviewImg(data.url);
                            urlDiv.html(data.typeUrl);

                            break;
                        case 401 :
                        case 413 :
                        case 415 :
                        case 400 :
                        case 500 :
                            sendMessage('error', msg);
                            break;
                        default :
                            sendMessage('error', '未知错误，服务器返回的是啥？');
                    }
                } else {
                    sendMessage('error', '未知错误，你收到的是啥？');
                }
            }
        });
    }
})();

//发送提示信息
function sendMessage(type, msg) {
    var msgDiv = $('#msgDiv');
    msgDiv.text('');

    msgDiv.removeClass();
    switch (type) {
        case 'info' :
            msgDiv.addClass('msg msg-blue');
            break;
        case 'success' :
            msgDiv.addClass('msg msg-green');
            break;
        case 'error' :
            msgDiv.addClass('msg msg-red');
            break;
    }

    msgDiv.text(msg);
}

//设置预览图
function setPreviewImg(url) {
    $('#img-div').show();
    $('#preview-img').attr("src", url + '?' + Math.random());
}

console.log(' Minecraft皮肤站 \n @2015 Icefox. 版权所有 \n 个人博客：http://mxd.moe | 微博：@今天93有妹子了么');
