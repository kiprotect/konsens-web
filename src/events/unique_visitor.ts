import Base from './base'

export default class UniqueVisitor extends Base {
    
    get type(){
        return 'unique-visitor'
    }

    init(context){
        // initializes the event
        console.log("Initializing unique visitor event...")
        const href = window.location.href
        const uniqueVisitorEvent = {
            at: {
                ua: navigator.userAgent,
                language: navigator.language,
            },
            et: this.type,
        }
        const events = this.manager.store.get({et: this.type})
        let found = false
        for(const event of events){
            if (event.et == this.type){
                found = true
                break
            }
        }
        if (found)
            return
        // seems there isn't a unique visitor event yet, so we add one...
        this.manager.store.add(uniqueVisitorEvent)
    }
}