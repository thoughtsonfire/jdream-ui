module.exports = {
    title: 'Hello JDreamUI',
    description: 'Just playing around',
    base:"git@github.com:thoughtsonfire/jdream-ui.git",
    themeConfig: {
    nav: [
            { text: '首页', link: '/' },
            { text: '组件', link: '/comps/' },
        ],
    sidebar: {
        '/comps/':[
            '/comps/',
            '/comps/button.md'
        ]
    }
       
     },
    plugins:["demo-container"]
   }
 