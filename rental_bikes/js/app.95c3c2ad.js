(function(t){function e(e){for(var r,i,o=e[0],u=e[1],s=e[2],d=0,p=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&p.push(a[i][0]),a[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);l&&l(e);while(p.length)p.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var t,e=0;e<c.length;e++){for(var n=c[e],r=!0,o=1;o<n.length;o++){var u=n[o];0!==a[u]&&(r=!1)}r&&(c.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},a={app:0},c=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],u=o.push.bind(o);o.push=e,o=o.slice();for(var s=0;s<o.length;s++)e(o[s]);var l=u;c.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("64a9"),a=n.n(r);a.a},2170:function(t,e,n){},3499:function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},["products"===t.page?n("Products",{attrs:{products:t.products},on:{viewSummary:t.viewSummary}}):t._e(),"summary"===t.page?n("Summary",{attrs:{cart:t.cart},on:{changePage:t.changePage}}):t._e(),"checkout"===t.page?n("Checkout",{on:{changePage:t.changePage}}):t._e()],1)},c=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[n("h1",[t._v("Products")]),n("div",t._l(Object.keys(t.productTypes),(function(e){return n("button",{class:t.currentProductType===e?"selectedProductType":"",on:{click:function(n){return t.changeProductType(e)}}},[t._v("\n      "+t._s(t.productTypes[e])+" \n    ")])})),0),n("div",{staticClass:"productList"},[t._l(t.products,(function(e){return e.product_type===t.currentProductType||"all"===t.currentProductType?n("div",{staticClass:"productDetails",class:e.quantity>0?"selectedProduct":""},[n("h2",[t._v(t._s(e.name))]),n("img",{attrs:{src:e.image,alt:e.name}}),n("h3",[t._v("$ "+t._s(e.price))]),n("div",{staticClass:"quantity"},[n("span",[t._v("Quantity: ")]),n("button",{on:{click:function(n){return t.changeQuantity(e.id,-1)}}},[t._v("-")]),n("span",{staticClass:"lgText"},[t._v(" "+t._s(e.quantity)+" ")]),n("button",{on:{click:function(n){return t.changeQuantity(e.id,1)}}},[t._v("+")])])]):t._e()})),n("br")],2),n("div",{staticClass:"orderInfo"},[t._l(t.warnings,(function(e){return n("h3",{staticClass:"warning"},[t._v(t._s(e))])})),n("h2",{staticClass:"total"},[n("div",[t._v("Total: $ "+t._s(t.total)+"    ")]),n("button",{staticClass:"button_primary",on:{click:t.checkout}},[t._v("Proceed to Checkout")])])],2)])},o=[],u=(n("20d6"),n("ac6a"),{name:"Products",props:{products:Array},data:function(){return{warnings:[],currentProductType:"all",productTypes:{all:"All",bike:"Bikes",accessory:"Accessories",addon:"Add-ons"}}},created:function(){var t=this;this.products.forEach((function(e,n){e.quantity||t.$set(t.products[n],"quantity",0)}))},computed:{total:function(){return this.products.reduce((function(t,e){return e.quantity>0?t+e.quantity*e.price:t}),0).toFixed(2)}},methods:{changeProductType:function(t){this.currentProductType=t},checkout:function(){var t=this.products.filter((function(t){return t.quantity>0}));this.warnings=[],t.some((function(t){return"bike"==t.product_type}))||this.warnings.push("Please Select At Least One Bike."),this.warnings.length||this.$emit("viewSummary",t)},changeQuantity:function(t,e){var n=this.products.findIndex((function(e){return e.id===t})),r=this.products[n];this.$set(r,"quantity",r.quantity+e),r.quantity<0&&this.$set(r,"quantity",0)}}}),s=function(t){var e;return function(){for(var n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];e&&cancelAnimationFrame(e),e=requestAnimationFrame((function(){t.apply(void 0,r)}))}};function l(){var t=document.documentElement,e=document.body,n="scrollTop",r="scrollHeight";return(t[n]||e[n])/((t[r]||e[r])-t.clientHeight)*100}var d=function(){document.documentElement.dataset.scroll=l()};document.addEventListener("scroll",s(d),{passive:!0}),d();var p=u,f=(n("d274"),n("2877")),h=Object(f["a"])(p,i,o,!1,null,"e473f1ca",null),m=h.exports,y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[n("h1",[t._v("Order Summary")]),n("div",{staticClass:"productList"},[t._l(t.cart,(function(e){return n("div",{staticClass:"productDetails"},[n("h3",{staticClass:"productDescription"},[n("img",{attrs:{src:e.image,alt:e.name}}),t._v(" "+t._s(e.name))]),n("h3",{staticClass:"quantity"},[t._v(" Quantity: "+t._s(e.quantity))])])})),n("br")],2),n("h2",[t._v("Total: $ "+t._s(t.total))]),n("button",{staticClass:"button_secondary",on:{click:t.changeOrder}},[t._v("Change Order")]),n("button",{staticClass:"button_primary",on:{click:t.confirmPurchase}},[t._v("Confirm Purchase")])])},v=[],_={name:"Summary",data:function(){return{total:0}},props:{cart:Array},mounted:function(){this.total=this.cart.reduce((function(t,e){return e.quantity>0?t+e.quantity*e.price:t}),0).toFixed(2)},methods:{confirmPurchase:function(){this.$emit("changePage","checkout")},changeOrder:function(){this.$emit("changePage","products")}}},g=_,b=(n("6939"),Object(f["a"])(g,y,v,!1,null,"e6fba192",null)),k=b.exports,x=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},P=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h2",[t._v("Your order has been placed and you will receive a confirmation email shortly. "),n("br"),t._v(" Thank you for choosing Rental Bikes!")])}],w={name:"Checkout"},O=w,C=(n("d3b9"),Object(f["a"])(O,x,P,!1,null,"794a0c8c",null)),T=C.exports,q=n("b435"),A={name:"app",components:{Products:m,Summary:k,Checkout:T},data:function(){return{products:q.products,cart:[],page:"products"}},methods:{viewSummary:function(t){this.cart=t,this.page="summary"},changePage:function(t){this.page=t}}},S=A,$=(n("034f"),Object(f["a"])(S,a,c,!1,null,null,null)),j=$.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(t){return t(j)}}).$mount("#app")},"64a9":function(t,e,n){},6939:function(t,e,n){"use strict";var r=n("91fd"),a=n.n(r);a.a},"91fd":function(t,e,n){},b435:function(t){t.exports=JSON.parse('{"products":[{"id":1,"name":"Adult Male Bike","price":20.5,"image":"http://via.placeholder.com/250x250?text=Adult%20Male%20Bike","product_type":"bike"},{"id":2,"name":"Adult Female Bike","price":20.5,"image":"http://via.placeholder.com/250x250?text=Adult%20Female%20Bike","product_type":"bike"},{"id":3,"name":"Kids Unisex Bike","price":12.75,"image":"http://via.placeholder.com/250x250?text=Kids%20Unisex%20Bike","product_type":"bike"},{"id":4,"name":"Adult Unisex Helmet","price":4,"image":"http://via.placeholder.com/250x250?text=Adult%20Unisex%20Helmet","product_type":"accessory"},{"id":5,"name":"Kids Unisex Helmet","price":3.5,"image":"http://via.placeholder.com/250x250?text=Kids%20Unisex%20Helmet","product_type":"accessory"},{"id":6,"name":"Insurance","price":9.99,"image":"http://via.placeholder.com/250x250?text=Insurance","product_type":"addon"}]}')},d274:function(t,e,n){"use strict";var r=n("2170"),a=n.n(r);a.a},d3b9:function(t,e,n){"use strict";var r=n("3499"),a=n.n(r);a.a}});
//# sourceMappingURL=app.95c3c2ad.js.map