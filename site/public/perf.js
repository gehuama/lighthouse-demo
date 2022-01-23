(function (ready){
    /**
     * readyState 文档加载状态 
     * https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readyState 
    */
    if(document.readyState === "complete" || document.readyState === "interactive"){
        ready();
    }else{
        document.addEventListener("readystatechange", ()=>{
            if(document.readyState === "complete"){
                ready();
            }
        });
    }
})(function perf(){
    const data = {
        FP: 0, // 首次绘制
        FCP: 0, // 首次内容绘制
        LCP: 0, // 最大内容绘制
        FIP: 0, // 用户首次交互的延迟
        CLS: 0, // 累积布局偏移
    }
    /** 
     * 性能监测对象
     * https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver
     * 
     * {type:"paint", buffered: true}
     * 如果观察者观察到了指定类型的性能条目，就执行回调
     */
    new PerformanceObserver(function(entryList){
        // 性能条目
        let entries = entryList.getEntries();
        entries.forEach(entry => {
            // first-paint 首次绘制
            if(entry.name === "first-paint"){
                // 首次绘制的开始时间
                data.FP = entry.startTime;
                console.log("记录FP", data.FP);
            } else if (entry.name === "first-contentful-paint"){
                data.FCP = entry.startTime;
                console.log("记录FCP", data.FCP);
            }
        })
    }).observe({type:"paint", buffered: true})

    new PerformanceObserver(function(entryList){
        // 性能条目
        let entries = entryList.getEntries();
        entries.forEach(entry => {
            // first-paint 首次绘制
            if(entry.startTime === data.LCP){
                console.log("记录LCP", (data.LCP = entry.startTime))
            }
        })
    }).observe({type:"largest-contentful-paint", buffered: true})
    new PerformanceObserver(function(entryList){
        // 性能条目
        let entries = entryList.getEntries();
        entries.forEach(entry => {
            // 首次用户交互 开始处理的时间 - 开始交互的时间 = 首次交互延迟的时间
            const FID = entry.processingStart - entry.startTime
            console.log("FID", FID, entry,(data.FID = FID));
        })
    }).observe({type:"first-input", buffered: true})

    new PerformanceObserver(function(entryList){
        // 性能条目
        let entries = entryList.getEntries();
        entries.forEach(entry => {
            // 首次用户交互 开始处理的时间 - 开始交互的时间 = 首次交互延迟的时间
            data.CLS += entry.value;
            console.log("CLS", data.CLS);
        })
    }).observe({type:"layout-shift", buffered: true})
});

