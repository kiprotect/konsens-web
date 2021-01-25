import { sanitize } from "utils/sanitize"

export default class Base {
    constructor(config){
        this.config = config
    }

    sanitize(event){
        return sanitize(event)
    }

    sanitizeEvents(events){
        const sanitizedEvents = []
        for(const event of events){
            sanitizedEvents.push(this.sanitize(event))
        }
        return sanitizedEvents
    }

    submit(events){
        return this.doSubmit(this.sanitizeEvents(events))
    }
}