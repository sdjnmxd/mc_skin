(function () {
    $("#login_btn").on('click', function () {
        var username = $("#username").val();
        var password = $("#password").val();

        sendMessage('info', '正在登陆...', 8);

        if (username == '' || password == '') {
            sendMessage('error', '用户名或密码不能为空', 3);
            return
        }

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
                sendMessage('error', msg);
            }
        });
    });
})();

(function () {
    $('#logout').click(function () {
        sendMessage('success', '已退出登陆,即将跳转到登录页...');
        setTimeout(function () {
            location.href = "/member/logout";
        }, 2000);
    });

    $('#skinsModelUpload').click(function () {
        upload('skin');
    });

    $('#capeModelUpload').click(function () {
        upload('cape');
    });

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

                            sendMessage('success', msg, 10);
                            setPreviewImg(data.url);
                            urlDiv.html(data.typeUrl);

                            break;
                        case 401 :
                        case 413 :
                        case 415 :
                        case 400 :
                        case 500 :
                            sendMessage('error', msg, 10);
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

function sendMessage(type, msg, time) {
    if (time == undefined) {
        time = 3000;
    } else {
        time = time * 1000;
    }
    var msgDiv = $('#msgDiv');

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
    setTimeout(function () {
        msgDiv.text('');
    }, time)
}

function setPreviewImg(url) {
    $('#img-div').show();
    $('#preview-img').attr("src", url + '?' + Math.random());
}
