(function(){
    console.log("Hi from analytics!");
    console.log(window.kip.q);
    var kip = window.kip;
    var queue = kip.q;
    
    function processQueue(){
        events = queue;
        queue = [];
        sendEvents(queue);
    }

    function sendEvents(events){
        console.log("Sending event...")
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
        queue.push(arguments);
        processQueue();
    }
}())