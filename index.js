var iframe = document.querySelector("iframe"), canvas = null;
if(iframe == null){
    canvas = document.getElementById("entryCanvas");
}else{
    canvas = iframe.contentWindow.document.getElementById("entryCanvas");
}
if(canvas == null){
    alert("몇 초 후 다시 실행해주세요");
}
var ctx = canvas.getContext("2d"), typ = 1;
if (ctx == null){
    ctx = canvas.getContext("webgl2"); typ = 0;
}
if (ctx.changed){
    alert("이미 화질개선이 완료되었습니다.");
    throw new Error("이미 화질개선이 완료되었습니다.");
}else{
    ctx.changed = true;
}
canvas.style.imageRendering = "pixelated";
const scale = 3;
canvas.width = 640 * scale; canvas.height = 360 * scale;
if (typ){
    ctx.res2 = ctx.setTransform;
    ctx.setTransform = function(){
        this.res2.apply(this, arguments);
        this.scale(scale, scale);
    };
}else{
    ctx.viewport(0, 0, canvas.width, canvas.height);
}
