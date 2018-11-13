var Main = (function(){

    let obj = {};

    obj.run = function(fn, ...args){
        getFunction(fn).then(function(func){
            if(func && typeof func == 'function') func(args);
        });
    };

    function getFunction(fn){
        return new Promise(function(resolve, reject){
            let name = `script${fn}`;
            if(typeof obj[name] == 'undefined') {
                let url = `${window.location.origin}/js/others/script${fn}.js`;
                loadScript(url, function(){
                    console.info(`Load ─ ${url}`);
                    resolve(obj[name]);
                });
            } else {
                resolve(obj[name]);    
            } 
        });
    }
    
    function loadScript(url, callback) {
        var script = document.createElement('script');
        if (script.readyState) { // Internet Explorer
            script.onreadystatechange = function () {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    if(callback) callback();
                }
            };
        } else { // Others
            script.onload = function () {
                if(callback) callback();
            };
        }
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    };

    return obj;

}());