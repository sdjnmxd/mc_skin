jQuery(document).ready(function () {
    //生成随机数  然后上背景
    if(Math.random() * (100 + 1) > 50) {
        $.backstretch("/images/backgrounds/1.jpg")
    } else {
        $.backstretch("/images/backgrounds/2.jpg")
    }
});
