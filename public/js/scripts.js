var session_token="";
var target_model="";

if (typeof String.prototype.endsWith != 'function') {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}

function fillModelStatus(n1,l,n2){
  if(n1 in l){
    var ll='<a href="#'+l[n1]+'" class="texture-preview">点击查看</a>';
    $('#remove'+n2+'Model').show();
    $('#upload'+n2+'Model').hide();
    $('#'+n2+'model').html("");
    $('#'+n2+'model').append(ll);
  }else{
    $('#'+n2+'model').html("未上传");
    $('#remove'+n2+'Model').hide();
    $('#upload'+n2+'Model').show();
  }
}

$(document).ready(function(){
  refresh=(function(){
    $("#login-error").html('');
    $("#mgr-error").html('');
    $.ajax({
      url: "./data",
      type: "POST",
      data: {"token": session_token},
      dataType: "json",
      success: (function(data,stat){
        if(stat!="success"){
          alert("服务器连接失败，请稍候重试");
          return;
        }
        if('errno' in data){
          alert('刷新数据失败');
          return;
        }
        $("#playername").html(data.player_name);
        $("#playeruuid").html(data.uuid)
        var p=data.model_preference[0]
        $("#preferedmodel").html(p=='slim'?"Alex":"Steve");

        fillModelStatus('slim',data.models,'Alex');
        fillModelStatus('default',data.models,'Steve');
        fillModelStatus('cape',data.models,'Cape');

        $('#loginname').val('');
        $('#pwd').val('');
        $('#currentpwd').val('');
        $('#newpassword').val('');
        $('#mgr-error').html('');
        $("#login-div").slideUp();
        $("#info-div").slideDown();
        $("#img-div").slideUp();
        $("#manage-div").slideDown();
      })
    });
  });

  doLogin=(function(login,pwd){
    //console.log("Ready to login with "+login+"/"+pwd);
    $.ajax({
      url: "./login",
      type: "POST",
      data: {
        "login": login,
        "passwd": pwd
      },
      dataType: "json",
      success: (function(data,stat){
        if(stat!="success"){
          $("#login-error").html("登录失败，请稍候重试");
          return;
        }
        var result=data.errno;
        if(result==0){
          token=data.msg;
          //console.log("Login Success with token: "+token);
          session_token=token;
          setTimeout(refresh,500);
        }else{
          $("#login-error").html("登录失败(密码或用户名错误？)");
        }
      })
    });
  });

  $("#regBtn").click(function(){
    $("#login-error").html('');
    var login=$("#loginname").val();
    var pwd=$("#pwd").val();
    $.ajax({
      url: "./reg",
      type: "POST",
      data: {
        "login": login,
        "passwd": pwd
      },
      dataType: "json",
      success: (function(data,stat){
        if(stat!="success"){
          $("#login-error").html("注册失败，请稍候重试");
          return;
        }
        var result=data.errno;
        var _=["注册成功","用户名已存在","无效的 用户名 或 密码","服务器内部错误","未开放注册"]
        if(result==0){
          //console.log("Register Success, ready to login with "+login+"/"+pwd);
          setTimeout(function(){doLogin(login,pwd);},1000);
        }else{
          $("#login-error").html(_[result]);
        }
      })
    });
  });

  $("#logBtn").click(function(){
    $("#login-error").html('');
    var login=$("#loginname").val();
    var pwd=$("#pwd").val();
    doLogin(login,pwd);
  });

  $("#logout").click(function(){
    $.ajax({
      url: "./logout",
      type: "POST",
      data: {'token': session_token},
      complete: (function(a,b){
        $('#login-error').html('');
        $("#login-div").slideDown();
        $("#info-div").slideUp();
        $("#manage-div").slideUp();
        $("#img-div").slideUp();
        $('#loginname').val('');
        $('#pwd').val('');
      })
    });
  });

  $("#changepasswd").click(function(){
    $('#mgr-error').html('');
    var old_pwd=$("#currentpwd").val();
    var new_pwd=$("#newpassword").val();
    $.ajax({
      url: './update',
      type: "POST",
      data: {
        'token': session_token,
        'new_passwd': new_pwd,
        'current_passwd': old_pwd
      },
      dataType: 'json',
      success: (function(a,b){
        if (a.errno==0){
          $('#mgr-error').html('更改密码成功！');
        }else if(a.errno==3){
          $('#mgr-error').html('新密码太短');
        }else if(a.errno==1){
          $('#mgr-error').html('请填写当前密码');
        }else if(a.errno==2){
          $('#mgr-error').html('密码错误');
        }else{
          $('#mgr-error').html('账户信息更新失败');
        }
      })
    });
  });

  $(document).on('change','#filechoose',function(e){
    e.preventDefault();
    //console.log('changed');
    if(target_model=="")return;
    var f=$('#filechoose')[0].files[0];
    var m=target_model;target_model="";
    if(!f.name.endsWith('.png')){
      alert("只允许上传png格式的图片文件");
      $('#filechoose').val(null);
      return;
    }
    if(f.size>1024*1024){
      alert("文件太大，最高允许：1MB");
      $('#filechoose').val(null);
      return;
    }
    $.ajaxFileUpload({
      url: "./upload",
      secureurl: false,
      fileElementId: "filechoose",
      data: {
        "token": session_token,
        "type": m
      },
      dataType: "json",
      success: function(data,stat){
        //alert(data.msg);
        $('#filechoose').val(null);
        if(data.errno!=0)
          alert("奇怪的错误！ 1");
        else
          setTimeout(refresh,500);
      }
    });
    return false;
  });
  uploadModel=(function(m){
    target_model=m
    $('#filechoose').val(null);
    $('#filechoose').click();
  });
  $('#uploadAlexModel').click(function(){uploadModel('slim')});
  $('#uploadSteveModel').click(function(){uploadModel('default')});
  $('#uploadCapeModel').click(function(){uploadModel('cape')});

  removeModel=(function(modelName){
    //console.log("Model Remove "+modelName);
    var token=$("#token").val()
    $.ajax({
      url: "./upload",
      type: "DELETE",
      data: {
        "type": modelName,
        "token": session_token
      },
      //dataType: "json",
      success: function(data,stat){
        //alert(stat);
        setTimeout(refresh,500);
      }
    });
  });
  $('#removeAlexModel').click(function(){removeModel('slim')});
  $('#removeSteveModel').click(function(){removeModel('default')});
  $('#removeCapeModel').click(function(){removeModel('cape')});

  $('#switchPreferedModel').click(function(){
    var x=$('#preferedmodel').html();
    $.ajax({
      url: "./update",
      type: "POST",
      data: {
        "preference": x=="Alex"?"default|slim":"slim|default",
        "token": session_token
      },
      dataType: "json",
      success: function(data,stat){
        //alert(data.msg);
        if(data.errno!=0)
          alert("奇怪的错误！ 2");
        else
          setTimeout(refresh,500);
      }
    });
  });

  $(document).on('click','.texture-preview',function(e){
    s=e.currentTarget.getAttribute('href').substr(1);
    $("#img-div").slideUp('normal',function(){
      document.getElementById("preview-img").setAttribute("src","./textures/"+s);
      $("#img-div").slideDown('normal');
    });
  });

  $("#deleteaccount").click(function(){
    $('#mgr-error').html('');
    if(confirm('你确定删除你的账户么，此操作不可还原！')){
      $.ajax({
        url: "./reg",
        type: "DELETE",
        data: {
          "pwd": $("#currentpwd").val(),
          "token": session_token
        },
        dataType: "json",
        success: function(data,stat){
          //alert(data.msg);
          if(data.errno==0){
            setTimeout(function(){$('#logout').click();},500);
          }else{
            $('#mgr-error').html('账户未被删除');
          }
        }
      });
    }
  });
});
