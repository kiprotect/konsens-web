(function(){
    console.log("Hi from analytics!");
    console.log(window.kip.q);
    var kip = window.kip;
    var queue = kip.q.map(processEvent).filter(function(a){return a!==undefined;});
    
    function processQueue(){
        var events = queue;
        queue = [];
        console.log(events);
        sendEvents(events);
    }

    function processEvent(event){
        switch(event[0]){
            case 'create':
                console.log("creating");
                return;
            case 'send':
                return processSend(event);
        }
    }

    function processSend(event){
        switch(event[1]){
            case "pageview":
                console.log("sending page view");
                return {
                    p: window.location.pathname,
                    r: document.referrer,
                    u: navigator.userAgent,
                    s: {
                        w: screen.width,
                        h: screen.height,
                        pr: window.devicePixelRatio,
                    },
                    t: new Date().getTime(),
                };
        }

    }

    function sendEvents(events){
        function reqListener () {
            console.log(this.responseText);
          }          
          var oReq = new XMLHttpRequest();
          oReq.addEventListener("load", reqListener);
          oReq.open("POST", "http://localhost:8000/v1/analytics/collect/0143b3267da2ad2f49fe2be8e613e8aa");
          oReq.setRequestHeader("Content-Type", "text/plain");
          oReq.send(JSON.stringify({items:events}));
          return oReq;
    }
    
    window.kip = function(){
        var processedEvent = processEvent(arguments);
        if (processedEvent !== undefined){
            queue.push(processedEvent);
            processQueue();
        }
    }
}())
