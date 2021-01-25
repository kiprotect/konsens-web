import Store from './base'

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

    setAttribute(key, value){
        const attributes = this.getAttributes()
        if (value === undefined)
            delete attributes[key]
        else
            attributes[key] = value
        this.storage.setItem(this.storageKey+'-attributes', JSON.stringify(attributes))
    }

    getAttributes(){
        return JSON.parse(this.storage.getItem(this.storageKey+'-attributes')) || {}
    }

    add(event){
        const events = this.get({})
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