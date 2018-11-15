var Dynamic = (function () {
    let obj = {};
    let src = getScriptUrl();

    obj.getBaseUrl = function(){
        if(src == '') return src;
        let pathArray = src.split( '/' );
        let protocol = pathArray[0];
        let host = pathArray[2];
        let url = protocol + '//' + host;
        return url;
    };

    obj.getFunction = function (strScope, strPrefix, strFunction) {
        return new Promise(function(resolve, reject){
            let objScope = window[strScope];
            let strParent = strScope.toSnikeCase();
            if(typeof objScope !== 'undefined') {
                let strName = (`${strPrefix}${strFunction}`).toCamelCase();
                if(typeof objScope[strName] === 'undefined') {
                    //let strUrl = `${window.location.origin}/js/${strParent}/${strFunction}.js`;
                    let strBaseUrl = obj.getBaseUrl();
                    let strUrl = `${strBaseUrl}/js/${strParent}/${strFunction}.js`;
                    obj.loadScript(strUrl, function(){
                        console.info(`Load ─ ${strUrl}`);
                        resolve(objScope[strName]);
                    });
                } else {
                    resolve(objScope[strName]);
                }
            } else {
                reject(`Scope ${strScope} not found`);
            }
        });
    };

    obj.loadScript = function (url, callback) {
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

    function getScriptUrl() {
        let scripts = document.getElementsByTagName('script');
        let index = scripts.length - 1;
        let myScript = scripts[index];
        return myScript.src;
    };

    return obj;
}());
