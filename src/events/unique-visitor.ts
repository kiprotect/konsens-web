import Base from './base'

export default class UniqueVisitor extends Base {
    
    get type(){
        return 'unique-visitor'
    }

    init(){
        const events = this.get({et: this.name})
        let found = false
        for(const event of events){
            if (event.et == this.name){
                found = true
                break
            }
        }
        if (found)
            return
        // seems there isn't a unique visitor event yet, so we add one...
        this.submit(this.makeEvent())
    }
}