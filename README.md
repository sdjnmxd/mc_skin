0 0  作为自己的第一个开源项目  还是略有些成就感的。。。终于能为世界做贡献了！

其实就是一个Nodejs写的Minecraft皮肤站，账号系统和MC服务端的CrazyLogin插件配合，采用redis存储session的方式保存登陆状态，可以直接使用游戏内账号登陆皮肤站，并上传皮肤or披风



使用方法：
1.首先你需要nodejs环境
2.把代码clone到本地
3.修改把config/config.simple.js重命名为config.js
4.修改config文件里的设置，譬如mysql、redis、皮肤存放目录等
5.启动它即可
