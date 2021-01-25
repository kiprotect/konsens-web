export function sanitize(event){
    const sanitizedEvent = {}
    for(const [key, value] of Object.entries(event)){
        // we skip private keys...
        if (key.startsWith("_"))
            continue
        if (value instanceof Object)
            sanitizedEvent[key] = sanitize(value)
        else
            sanitizedEvent[key] = value
    }
    return sanitizedEvent
}