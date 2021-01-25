import Base from './base'

export default class Complex extends Base {
    
    get type(){
        return 'complex'
    }

    init(){
        console.log(this.config)
    }
}