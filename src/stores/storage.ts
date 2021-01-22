import Store from './base'

// https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default class StorageStore extends Store {

    constructor(config){
        super(config)
        this.storage = window.localStorage
    }

    get storageKey(){
        return this.config.storageKey || 'konsens'
    }

    get(filters){
        return JSON.parse(this.storage.getItem(this.storageKey)) || []
    }

    getAttributes(){
        // returns all currently valid attributes, as extracted from events
        const attributes = {}
        for(const event of this.get({})){
            for(const [k,v] of Object.entries(event.at || {})){
                attributes[k] = v
            }
        }
        return attributes
    }

    add(event){
        const events = this.get({})
        // we give the event a unique UUID
        event.id = uuidv4()
        // we set the timestamp of the event, if it is not already set
        if (event.t === undefined)
            event.t = new Date().getTime()
        events.push(event)
        this.set(events)
    }

    set(events){
        this.storage.setItem(this.storageKey, JSON.stringify(events))
    }

    delete(event){
        const existingEvents = this.get()
        const newEvents = []
        for(const existingEvent of existingEvents){
            if (existingEvent.id === event.id)
                continue
            newEvents.push(existingEvent)
        }
        this.set(newEvents)
    }

    clear(){
        this.storage.removeItem(this.storageKey)
    }
}