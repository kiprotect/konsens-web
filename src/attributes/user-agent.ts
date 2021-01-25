import Base from './base'

export default class UserAgent extends Base {
    get(attributes){
        return navigator.userAgent
    }
}