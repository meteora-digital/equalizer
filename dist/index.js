var e={d:(t,i)=>{for(var n in i)e.o(i,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:i[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,r(n.key),n)}}function r(e){var t=function(e,t){if("object"!=i(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=i(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==i(t)?t:String(t)}e.d(t,{c:()=>s});var s=function(){function e(){var t=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};for(var n in function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.cache={width:null},this.events={},this.identifiers={},this.timeout={},this.settings={container:null,identifiers:"",rows:!1,throttle:0,debounce:100,mutations:{childList:!0,subtree:!1}},this.settings)Object.hasOwnProperty.call(this.settings,n)&&void 0!==i[n]&&(this.settings[n]=i[n]);this.MutationObserver=new MutationObserver((function(){return t.update()})),this.ResizeObserver=new ResizeObserver((function(e){t.cache.width!==t.settings.container.clientWidth&&(clearTimeout(t.timeout.ResizeObserver),t.timeout.ResizeObserver=setTimeout((function(){t.settings.rows?t.update():t.resize()}),t.settings.debounce))})),this.MutationObserver.observe(this.settings.container,this.settings.mutations),this.update(),this.settings.container&&this.ResizeObserver.observe(this.settings.container)}var t,i;return t=e,i=[{key:"getElementOffset",value:function(e){for(var t=0;e&&e!=this.settings.container;)t+=e.offsetTop,e=e.offsetParent;return t}},{key:"update",value:function(){var e=this;clearTimeout(this.timeout.update),this.timeout.update=setTimeout((function(){if(e.beforeUpdate(),e.settings.identifiers.length){e.identifiers={};var t=[];try{(t=t.concat(e.settings.identifiers.split(","))).forEach((function(t){void 0===e.identifiers[t]&&(e.identifiers[t]={})}))}catch(e){console.log(e)}for(var i in e.identifiers)if(Object.hasOwnProperty.call(e.identifiers,i))for(var n=e.settings.container.querySelectorAll('[data-equalize-watch="'.concat(i,'"]')),r=0;r<n.length;r++){var s=n[r];s.style.height="1px",void 0===e.identifiers[i][e.getElementOffset(s)]&&(e.identifiers[i][e.getElementOffset(s)]=[]),-1===e.identifiers[i][e.getElementOffset(s)].indexOf(s)&&e.identifiers[i][e.getElementOffset(s)].push(s)}}else{e.identifiers[0]={};for(var o=e.settings.container.querySelectorAll("[data-equalize-watch]"),a=0;a<o.length;a++){var f=o[a];f.style.height="1px",void 0===e.identifiers[0][e.getElementOffset(f)]&&(e.identifiers[0][e.getElementOffset(f)]=[]),-1===e.identifiers[0][e.getElementOffset(f)].indexOf(f)&&e.identifiers[0][e.getElementOffset(f)].push(f)}}e.callback("update"),e.resize(0)}),this.settings.throttle)}},{key:"resize",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.settings.throttle;clearTimeout(this.timeout.resize),this.timeout.resize=setTimeout((function(){for(var t in e.beforeResize(),e.cache.width=e.settings.container.clientWidth,e.identifiers)if(Object.hasOwnProperty.call(e.identifiers,t)){var i=e.identifiers[t],n=0;for(var r in i)if(Object.hasOwnProperty.call(i,r)){var s=i[r];!0===e.settings.rows&&(n=0);for(var o=0;o<s.length;o++){var a=s[o];a.style.height="auto",a.offsetHeight>n&&(n=Math.ceil(a.offsetHeight))}if(!0===e.settings.rows)for(var f=0;f<s.length;f++)s[f].style.height=n+"px"}if(!1===e.settings.rows)for(var l in i)if(Object.hasOwnProperty.call(i,l))for(var c=i[l],u=0;u<c.length;u++)c[u].style.height=n+"px"}e.callback("resize")}),t)}},{key:"beforeResize",value:function(){this.callback("beforeResize")}},{key:"beforeUpdate",value:function(){this.callback("beforeUpdate")}},{key:"callback",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.events[e]&&this.events[e].forEach((function(e){return e(t)}))}},{key:"on",value:function(e,t){e&&"on"!=e&&"callback"!=e&&this[e]&&t&&"function"==typeof t&&(null==this.events[e]&&(this.events[e]=[]),this.events[e].push(t))}}],i&&n(t.prototype,i),Object.defineProperty(t,"prototype",{writable:!1}),e}(),o=t.c;export{o as default};