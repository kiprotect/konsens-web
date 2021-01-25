import Base from './base'

export default class Pageview extends Base {
    
    get type(){
        return 'pageview'
    }

    init(){
        const href = window.location.href
        const events = this.get({et: this.name})
        let found = false
        for(const event of events){
            if (event.et == this.name){
                if (event.at.href == href)
                    found = true
                else
                    found = false
            }
        }
        if (found)
            return
        // seems there isn't a pageview event yet, so we add one...
        const pageviewEvent = this.makeEvent()
        pageviewEvent.at.href = href        
        this.submit(pageviewEvent)
    }
}