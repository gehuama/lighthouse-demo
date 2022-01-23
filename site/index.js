const compression = require("compression");
const express = require("express");
const logger = require("morgan");
const delayConfig = require("./delay-config");
const app = express();

app.use(logger("dev"));
/** 
 * req:请求
 * res: 响应
 * next:下一步 */
app.use((req, res, next)=>{
    let url = req.url
    const delay = delayConfig[url];
    if(delay){
        setTimeout(next, delay); 
    }else{
        next(); 
    }
    
});
// 启用gzip压缩
app.use(compression());
app.use(express.static("public"));
app.listen(80, ()=>{
    console.log("服务器已经在80端口上启动了");
})


