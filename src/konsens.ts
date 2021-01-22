import 'scss/main.scss';

import EventManager from './event_manager'
import EventTypes from './events'
import EventStores from './stores'
import Backends from './backends'

var em, es, be

export function eventManager(){
    return em
}

export function eventStore(){
    return es
}

export function backend(){
    return be
}

export function makeEventStore(config){
    const storeType = config.eventStoreType || 'storage'
    const storeConfig  = config.eventStoreConfig || {key: 'konsens'}
    return new EventStores[storeType](storeConfig)
}

export function makeBackend(config){
    const backendType = config.backendType || 'konsens'
    const backendConfig = config.backendConfig || {}
    return new Backends[backendType](backendConfig)
}

export function initialize(config){
    if (config === undefined){
        if (window.konsensConfig === undefined){
            console.error("No config given, aborting...")
            return
        }
        config = window.konsensConfig
    }
    es = makeEventStore(config)
    be = makeBackend(config)
    em = new EventManager(config, es, be, EventTypes)
}

if (!(window.konsensConfig !== undefined && window.konsensConfig.noAutoLoad))
    initialize()

