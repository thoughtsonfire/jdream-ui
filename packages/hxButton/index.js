import hxButton from './src/index'

hxButton.install = function (Vue){
    Vue.component(hxButton.name, hxButton);
}

export default hxButton;
