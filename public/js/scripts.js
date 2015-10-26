(function () {
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
            onSubmit: function (e) {
                sendMessage('info','上传中...');
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
                            sendMessage('error', msg);
                            break;
                        case 413 :
                            sendMessage('error', msg);
                            break;
                        case 415 :
                            sendMessage('error', msg);
                            break;
                        case 400 :
                            sendMessage('error', msg);
                            break;
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

    var msgDiv = $('#msgDiv');

    function sendMessage(type, msg) {
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
})();

function setPreviewImg(url) {
    $('#preview-img').attr("src", url + '?' + Math.random());
}
