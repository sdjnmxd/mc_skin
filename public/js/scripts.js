var session_token = "";
var target_model = "";

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

function fillModelStatus(n1, l, n2) {
    if (n1 in l) {
        var ll = '<a href="#' + l[n1] + '" class="texture-preview">点击查看</a>';
        $('#remove' + n2 + 'Model').show();
        $('#upload' + n2 + 'Model').hide();
        $('#' + n2 + 'model').html("");
        $('#' + n2 + 'model').append(ll);
    } else {
        $('#' + n2 + 'model').html("未上传");
        $('#remove' + n2 + 'Model').hide();
        $('#upload' + n2 + 'Model').show();
    }
}

$(document).ready(function () {
    $(document).on('change', '#filechoose', function (e) {
        e.preventDefault();
        //console.log('changed');
        if (target_model == "")return;
        var f = $('#filechoose')[0].files[0];
        var m = target_model;
        target_model = "";
        if (!f.name.endsWith('.png')) {
            alert("只允许上传png格式的图片文件");
            $('#filechoose').val(null);
            return;
        }
        if (f.size > 1024 * 1024) {
            alert("文件太大，最高允许：1MB");
            $('#filechoose').val(null);
            return;
        }
        $.ajaxFileUpload({
            url: "../skins/upload",
            secureurl: false,
            fileElementId: "filechoose",
            data: {
                "token": session_token,
                "type": m
            },
            success: function (data, stat) {
                //alert(data.msg);
                $('#filechoose').val(null);
                if (data.errno != 0)
                    alert("奇怪的错误！ 1");
                else
                    setTimeout(refresh, 500);
            }
        });
        return false;
    });
    uploadModel = (function (m) {
        target_model = m
        $('#filechoose').val(null);
        $('#filechoose').click();
    });
    $('#uploadAlexModel').click(function () {
        uploadModel('slim')
    });
    $('#uploadSteveModel').click(function () {
        uploadModel('default')
    });
    $('#uploadCapeModel').click(function () {
        uploadModel('cape')
    });

    removeModel = (function (modelName) {
        //console.log("Model Remove "+modelName);
        var token = $("#token").val()
        $.ajax({
            url: "./upload",
            type: "DELETE",
            data: {
                "type": modelName,
                "token": session_token
            },
            //dataType: "json",
            success: function (data, stat) {
                //alert(stat);
                setTimeout(refresh, 500);
            }
        });
    });
    $('#removeAlexModel').click(function () {
        removeModel('slim')
    });
    $('#removeSteveModel').click(function () {
        removeModel('default')
    });
    $('#removeCapeModel').click(function () {
        removeModel('cape')
    });

    $('#switchPreferedModel').click(function () {
        var x = $('#preferedmodel').html();
        $.ajax({
            url: "./update",
            type: "POST",
            data: {
                "preference": x == "Alex" ? "default|slim" : "slim|default",
                "token": session_token
            },
            dataType: "json",
            success: function (data, stat) {
                //alert(data.msg);
                if (data.errno != 0)
                    alert("奇怪的错误！ 2");
                else
                    setTimeout(refresh, 500);
            }
        });
    });

    $(document).on('click', '.texture-preview', function (e) {
        s = e.currentTarget.getAttribute('href').substr(1);
        $("#img-div").slideUp('normal', function () {
            document.getElementById("preview-img").setAttribute("src", "./textures/" + s);
            $("#img-div").slideDown('normal');
        });
    });
});
