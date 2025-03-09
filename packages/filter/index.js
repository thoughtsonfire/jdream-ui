import jdFilter from './src/index'

jdFilter.install = function (Vue){
    Vue.component(jdFilter.name, jdFilter);
}

export default jdFilter;