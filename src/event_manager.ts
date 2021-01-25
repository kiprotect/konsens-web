import { uuidv4 } from "utils/uuid"

export default class EventManager {
    constructor(config, eventStore, backend, eventTypes, attributeTypes){
        this.config = config
        this.eventStore = eventStore
        this.eventTypes = eventTypes
        this.attributeTypes = attributeTypes
        this.backend = backend
        this.submitQueue = []
        this.eventHandlers = {}
        this.submitting = false
        this.inTransaction = false

        this.begin()
        this.initEventHandlers()
        this.initAttributes()
        this.commit()

    }

    get store(){
        return this.eventStore
    }

    begin(){
        this.inTransaction = true
    }

    commit(){
        if (this.submitQueue.length > 0)
            this.submitEvents(this.submitQueue)
        this.submitQueue = []
        this.inTransaction = false
    }

    enrichEvent(event){
        const attributes = this.store.getAttributes()
        if (event.at === undefined)
            event.at = {}
        // we add all default attributes to the event
        for(const key of this.config.attributes || []){
            if (attributes[key] !== undefined)
                event.at[key] = attributes[key]
        }
        // we give the event a unique UUID
        event._id = uuidv4()
        // we set the timestamp of the event, if it is not already set
        if (event.t === undefined)
            event.t = new Date().getTime()
        return event
    }

    setAttribute(key, value){
        this.store.setAttribute(key, value)
    }

    getAttributes(){
        return this.store.getAttributes()
    }

    submitEvents(events){
        this.backend.submit(events)
    }

    submit(event){
        // submits a new event to the store
        const enrichedEvent = this.enrichEvent(event)
        this.store.add(enrichedEvent)
        let setSubmitting = false
        if (this.submitting === false){
            setSubmitting = true
            this.submitting = true
        }
        for(const eventHandler of Object.values(this.eventHandlers)){
            // we notify all event handlers of this newly added event
            // more events might be 
            eventHandler.notify('event', enrichedEvent)
        }
        // we add the event to the submit queue
        this.submitQueue.push(enrichedEvent)
        // we submit the new events
        if (setSubmitting){
            this.submitting = false

            // if we're not in a transaction, we immediately submit the event
            // otherwise we wait for the commit() call to submit all events
            // at once, which saves bandwidth and reduces the number of
            // network calls...
            if (!this.inTransaction){
                const submitQueue = this.submitQueue
                this.submitQueue = []
                this.submitEvents(submitQueue)
            }

        }
        return enrichedEvent
    }

    get(filters){
        return this.store.get(filters)
    }

    initAttributes(){
        const attributes = this.getAttributes()
        for(const attribute of this.config.attributes || []){
            const AttributeTypeClass = this.attributeTypes[attribute]
            if (AttributeTypeClass === undefined){
                // there's no type class for this attribute (which might happen)
                continue
            }
            const attributeType = new AttributeTypeClass(this, {})
            this.setAttribute(attribute, attributeType.get(attributes))
        }
    }

    initEventHandlers(){
        const eventHandlers = {}
        for(const eventSpecification of this.config.events){
            const EventTypeClass = this.eventTypes[eventSpecification.type]
            if (EventTypeClass === undefined){
                console.error(`unknown event type: ${eventSpecification.type}`)
                continue
            }
            const eventName = eventSpecification.name
            if (eventName === undefined){
                console.error(`name missing from event specification`)
                continue
            }
            eventHandlers[eventName] = new EventTypeClass(this, eventSpecification)
        }
        this.eventHandlers = eventHandlers
    }
}