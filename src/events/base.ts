import EventManager from '../event_manager'

export default class EventType {
    constructor(manager: EventManager, config: Record<string, Any>){
        this.manager = manager
        this.config = config
        this.init()
    }

    notify(type, data){
        // notification, used e.g. by the 'complex' event type to check for new
        // matches when events are generated...
    }

    get name(){
        return this.config.name
    }

    makeEvent(){
        return {
            et: this.name,
            at: {},
        }
    }

    submit(event){
        return this.manager.submit(event)
    }

    get(filters){
        return this.manager.get(filters)
    }

    init(){
        
    }
}