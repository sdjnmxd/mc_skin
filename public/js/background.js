jQuery(document).ready(function () {
    var randomNum = Math.round(Math.random() * (4 + 1));
    $.backstretch("/images/backgrounds/" + randomNum + ".jpg")
});
