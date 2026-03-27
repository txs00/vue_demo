!function (win, doc) {
    var d = doc.documentElement;
    function change() {
        d.style.fontSize = d.clientWidth / 7.5 + 'px';
    }
    win.addEventListener('resize', change, false);
    change();
}(window, document);
// window.onresize = function(){
//     document.documentElement.style.fontSize = document.documentElement.offsetWidth / 12 +'px';
//   }
/*
document.documentElement.style.fontSize 是得到<html>标签并为它设置font-size样式字体大小，因为REM计算的规则是依赖根元素也就是<html>元素的字体大小
document.documentElement.offsetWidth  是获取整个视口的宽度
*/
