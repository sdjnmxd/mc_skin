jQuery(document).ready(function () {
    //���������  Ȼ���ϱ���
    if(Math.random() * (100 + 1) > 50) {
        $.backstretch("/images/backgrounds/1.jpg")
    } else {
        $.backstretch("/images/backgrounds/2.jpg")
    }
});
