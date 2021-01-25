import Base from './base'
import { currentScript } from 'utils/compat'
import KonsensApi from 'utils/api'

function getKonsensId(script){
    const konsensId = script.getAttribute('data-konsens-id')
    if (konsensId !== null)
        return konsensId
    const regexMatch = /.*\/anonymizers\/([a-f0-9]+)\/konsens.*\.js/.exec(script.src)
    if (regexMatch !== null)
        return regexMatch[1]
    return null
}

function getKonsensApiUrl(script){
    const konsensApiUrl = script.getAttribute('data-konsens-api-url')
    if (konsensApiUrl !== null)
        return konsensApiUrl
    const regexMatch = /(http(?:s)?:\/\/[^/]+)\/v1\/anonymizers\/([a-f0-9]+)\/konsens.*\.js/.exec(script.src)
    if (regexMatch !== null)
        return regexMatch[1]
    return null
}

export default class Konsens extends Base {
    constructor(config){
        const script = currentScript('konsens')
        if (config.id === undefined){
            config.id = getKonsensId(script)
        }
        if (config.url === undefined){
            config.url = getKonsensApiUrl(script)
        }
        super(config)
        this.api = new KonsensApi(config.url, config.id, config.opts || {})
    }

    doSubmit(events){
        for(const event of events){
            const attributes = event.at
            event.at = []
            for(const [key, value] of Object.entries(attributes)){
                event.at.push({[key]: value})
            }
        }
        this.api.submitEvents(events)
        console.log(events)
    }
}