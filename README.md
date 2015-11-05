0 0  作为自己的第一个开源项目  还是略有些成就感的。。。终于能为世界做贡献了！

其实就是一个Nodejs写的Minecraft皮肤站，无独立的账号系统，而是和服务端的CrazyLogin插件配合，采用redis存储session的方式保存登陆状态，可以直接使用游戏内账号登陆皮肤站，并上传皮肤or披风

特性：
---
1.兼容CrazyLogin插件，可以直接使用Mc服务端CrazyLogin插件的upmhji数据库直接登陆皮肤站(前提是用户信息存储在mysql里，而不是sqlite)
2.支持session，采用redis存储session，可通过config设置session过期时间
3.可设置上传的皮肤&披风存放目录
4.赠送一个前端模板哟！ 纯手写！无需担心皮肤站不好看了！


使用方法
----
 1. 首先你需要的运行环境有：nodejs、mysql、redis
 2. 把代码clone到本地
 3. 把config/config.simple.js重命名为config.js
 4. 修改config文件里的设置，譬如mysql、redis、皮肤存放目录等
 5. 执行一下npm -install  以便安装依赖
 5. 启动它即可

## demo ##
http://skins.mc.miaoowu.com

测试账号：github ； 测试密码：github
