export default class EventManager {
    constructor(config, eventStore, backend, eventTypes){
        this.config = config
        this.eventStore = eventStore
        this.eventTypes = eventTypes
        this.backend = backend
        this.eventHandlers = {}
        this.initEventTypes()
    }

    get store(){
        return this.eventStore
    }

    submit(event){
        // submits a new event to the store
    }

    initEventTypes(){
        for(const EventTypeClass of this.eventTypes){
            const eventTypeClass = new EventTypeClass(this)
            this.eventHandlers[eventTypeClass.type] = eventTypeClass
        }
    }
}