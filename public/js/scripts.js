(function () {
    $('#skinsModel').click(function () {
        $.upload({
            url: '/skins/upload',
            fileName: 'file',
            params: {type: 'text'},
            dataType: 'json',
            onSend: function (e) {
                sendNormalMsg('上传中...');
                return true;
            },
            onComplete: function (data) {
                if (data != '') {
                    var statusCode = data.statusCode;
                    var msg = data.msg;

                    switch (statusCode) {
                        case 200 :
                            sendSuccessMsg(msg);
                            setPreviewImg(data.url);
                            break;
                        case 401 :
                            sendErrorMsg(msg);
                            break;
                        case 413 :
                            sendErrorMsg(msg);
                            break;
                        case 415 :
                            sendErrorMsg(msg);
                            break;
                        case 400 :
                            sendErrorMsg(msg);
                            break;
                        case 500 :
                            sendErrorMsg(msg);
                            break;
                        default :
                            sendErrorMsg('未知错误，服务器返回的是啥？');
                    }
                } else {
                    sendErrorMsg('未知错误，你收到的是啥？');
                }
            }
        });
    });

    var msgDiv = $('#msgDiv');

    function sendNormalMsg(msg) {
        msgDiv.removeClass();
        msgDiv.addClass('msg msg-blue');
        msgDiv.text(msg);
    }

    function sendErrorMsg(msg) {
        msgDiv.removeClass();
        msgDiv.addClass('msg msg-red');
        msgDiv.text(msg);
    }

    function sendSuccessMsg(msg) {
        msgDiv.removeClass();
        msgDiv.addClass('msg msg-green');
        msgDiv.text(msg);
    }

    function setPreviewImg(url) {
        $('#preview-img').attr("src", url);
    }
})();