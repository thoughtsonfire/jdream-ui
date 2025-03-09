import jdCollapse from './src/index'

jdCollapse.install = function (Vue){
    Vue.component(jdCollapse.name, jdCollapse);
}

export default jdCollapse;