module.exports = {
    title: 'Hello JDreamUI',
    description: 'Just playing around',
    base:"/jdream-ui/",
    title:"jdream-ui",
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
 