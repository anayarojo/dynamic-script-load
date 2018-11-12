var Main = (function(){

    let obj = {};

    obj.run = function(script){
        let url = `js/others/script${script}.js`;
        loadScript(url, function(){
            console.log(`${url}`);
        });
    };

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