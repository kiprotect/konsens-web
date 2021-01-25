import Base from './base'

export default class Language extends Base {
    get(attributes){
        return navigator.language
    }
}