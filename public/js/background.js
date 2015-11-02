jQuery(document).ready(function () {
    var randomNum = Math.round(Math.random() * (4 + 1));
    console.log(Math.round(randomNum));
    $.backstretch("/images/backgrounds/" + randomNum + ".jpg")
});
