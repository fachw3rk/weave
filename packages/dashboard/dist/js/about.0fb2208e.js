(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"18fe":function(e,t,n){},"2f21":function(e,t,n){"use strict";var s=n("79e5");e.exports=function(e,t){return!!e&&s(function(){t?e.call(null,function(){},1):e.call(null)})}},"48ca":function(e,t,n){"use strict";var s=n("c2a5"),o=n.n(s);o.a},"4c0f":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("p",[e._v("\n    Connected nodes: "+e._s(e.nodes.filter(function(e){return e.isAvailable}).length)+"\n  ")]),n("p",[e._v("\n    Disconnected nodes: "+e._s(e.nodes.filter(function(e){return!e.isAvailable}).length)+"\n  ")]),n("div",{staticClass:"card-container"},e._l(e.nodes,function(t){return n("div",{key:t.id,staticClass:"card",class:{up:t.isAvailable,down:!t.isAvailable}},[n("div",{staticClass:"header"},[n("div",{staticClass:"caption"},[e._v("\n          "+e._s(t.id)+"\n        ")])]),n("div",{staticClass:"body"},[e._v("\n        Services: "+e._s(t.serviceCount)+"\n        "),null!==t.offlineTime?n("span",[e._v("\n          "+e._s(t.offlineTime)+"\n        ")]):e._e()])])}))])},o=[],r=(n("55dd"),n("cadf"),n("551c"),n("097d"),{name:"nodes",sockets:{"$node.connected":function(e){this.getNodes()},"$node.disconnected":function(e){this.getNodes()}},data:function(){return{nodes:[]}},methods:{getNodes:function(){var e=this;this.$socket.emit("call",{actionName:"weave-dashboard.getNodes"},function(t,n){e.nodes=n.sort(function(e,t){return e.id>t.id?1:e.id<t.id?-1:0})})}},mounted:function(){this.getNodes()}}),i=r,c=(n("48ca"),n("2877")),a=Object(c["a"])(i,s,o,!1,null,null,null);a.options.__file="Nodes.vue";t["default"]=a.exports},"55dd":function(e,t,n){"use strict";var s=n("5ca1"),o=n("d8e8"),r=n("4bf8"),i=n("79e5"),c=[].sort,a=[1,2,3];s(s.P+s.F*(i(function(){a.sort(void 0)})||!i(function(){a.sort(null)})||!n("2f21")(c)),"Array",{sort:function(e){return void 0===e?c.call(r(this)):c.call(r(this),o(e))}})},"79cd":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"home"},[s("img",{attrs:{alt:"Vue logo",src:n("cf05")}}),s("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},o=[],r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("h1",[e._v(e._s(e.msg))]),e._m(0),n("h3",[e._v("Installed CLI Plugins")]),e._m(1),n("h3",[e._v("Essential Links")]),e._m(2),n("h3",[e._v("Ecosystem")]),e._m(3)])},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("\n    For a guide and recipes on how to configure / customize this project,"),n("br"),e._v("\n    check out the\n    "),n("a",{attrs:{href:"https://cli.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-cli documentation")]),e._v(".\n  ")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[n("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel",target:"_blank",rel:"noopener"}},[e._v("babel")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[n("a",{attrs:{href:"https://vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Core Docs")])]),n("li",[n("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Forum")])]),n("li",[n("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Community Chat")])]),n("li",[n("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank",rel:"noopener"}},[e._v("Twitter")])]),n("li",[n("a",{attrs:{href:"https://news.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("News")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[n("a",{attrs:{href:"https://router.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-router")])]),n("li",[n("a",{attrs:{href:"https://vuex.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vuex")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/vue-devtools#vue-devtools",target:"_blank",rel:"noopener"}},[e._v("vue-devtools")])]),n("li",[n("a",{attrs:{href:"https://vue-loader.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-loader")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank",rel:"noopener"}},[e._v("awesome-vue")])])])}],c={name:"HelloWorld",props:{msg:String}},a=c,l=(n("ccd1"),n("2877")),u=Object(l["a"])(a,r,i,!1,null,"379548a4",null);u.options.__file="HelloWorld.vue";var v=u.exports,d={name:"home",sockets:{connect:function(){console.log("socket connected")},customEmit:function(e){console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')}},components:{HelloWorld:v},mounted:function(){var e=this;this.sockets.subscribe("$node.connected",function(t){e.msg=t.message})}},f=d,h=Object(l["a"])(f,s,o,!1,null,null,null);h.options.__file="Metrics.vue";t["default"]=h.exports},c2a5:function(e,t,n){},ccd1:function(e,t,n){"use strict";var s=n("18fe"),o=n.n(s);o.a},cf05:function(e,t,n){e.exports=n.p+"img/logo.82b9c7a5.png"},f23e:function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"about"},[n("ul",e._l(e.services,function(t){return n("li",{key:t.name},[e._v("\n            "+e._s(t.name)+"\n        ")])}))])},o=[],r={name:"services",sockets:{"$services.changed":function(e){this.getServices()},"$node.connected":function(e){this.getServices()},"$node.disconnected":function(e){this.getServices()}},data:function(){return{services:[]}},methods:{getServices:function(){var e=this;this.$socket.emit("call",{actionName:"weave-dashboard.getServices"},function(t,n){e.services=n})}},mounted:function(){this.getServices()}},i=r,c=n("2877"),a=Object(c["a"])(i,s,o,!1,null,null,null);a.options.__file="Services.vue";t["default"]=a.exports}}]);
//# sourceMappingURL=about.0fb2208e.js.map