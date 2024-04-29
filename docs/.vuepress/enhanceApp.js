import jdreamUI from 'jdream-ui'
import 'jdream-ui/lib/index.css'
export default async({
    Vue
})=>{
    if(typeof process === 'undefined'){
        Vue.use(jdreamUI)
    }
}
