
class Analytics {
    constructor(events){
        this.queue = []
        this.url = "https://api.kiprotect.com"
        events.map(event => this.submit(event, false))
        this.processQueue()
    }

    processQueue(){
        var events = this.queue
        this.queue = []
        this.sendEvents(events)
    }

    submit(event, process = true){
        const result = this.processEvent(event)
        if (result !== undefined){
            this.queue.push(result)
            if (process)
                this.processQueue()
        }
    }
    
    processEvent(event){
        switch(event[0]){
            case 'create':
                console.log(event)
                this.id = event[1]
                if (event[2] !== undefined)
                    this.url = event[2]
                return
            case 'send':
                return this.processSend(event)
        }
    }
    
    processSend(event){
        switch(event[1]){
            case "pageview":
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
                }
        }
    
    }
    
    sendEvents(events){
        function reqListener () {
            console.log(this.responseText)
          }          
          var oReq = new XMLHttpRequest()
          oReq.addEventListener("load", reqListener)
          oReq.open("POST", this.url+"/v1/analytics/collect/"+this.id)
          oReq.setRequestHeader("Content-Type", "text/plain")
          oReq.send(JSON.stringify({items:events}))
          return oReq
    }
    
}

export default function(kip){
    const analytics = new Analytics(kip.q || [])    
    return (...args) => analytics.submit(args)
}
