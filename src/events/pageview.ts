import Base from './base'

export default class Pageview extends Base {
    
    get type(){
        return 'pageview'
    }

    init(context){
        const href = window.location.href
        const pageviewEvent = {
            at: {
                href: href,
            },
            et: this.type,
        }
        const events = this.manager.store.get({et: this.type})
        let found = false
        for(const event of events){
            if (event.et == this.type){
                if (event.at.href == href)
                    found = true
                else
                    found = false
            }
        }
        if (found)
            return
        // seems there isn't a pageview event yet, so we add one...
        this.manager.store.add(pageviewEvent)
    }
}