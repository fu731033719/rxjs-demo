
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '/drag', component: '../pages/drag/index' },
        { path: '/abTest', component: '../pages/abTest/index' },
        { path: '/subject', component: '../pages/subject/index' },
        { path: '/diyObservable', component: '../pages/diyObservable/index' },
        { path: '/autoComplete', component: '../pages/autoComplete/index' },
        { path: '/window', component: '../pages/window/index' },
        { path: '/fullDrag', component: '../pages/fullDrag/index' },
        { path: '/operatorTest', component: '../pages/operatorTest/index' }
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: false,
      title: 'init',
      dll: false,
      
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
}
