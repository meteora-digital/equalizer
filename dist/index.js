var t={d:(e,i)=>{for(var s in i)t.o(i,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:i[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{c:()=>i});class i{constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.cache={width:null},this.events={},this.identifiers={},this.timeout={},this.settings={container:null,identifiers:"",rows:!1,throttle:0,debounce:100,mutations:{childList:!0,subtree:!1}};for(const e in this.settings)Object.hasOwnProperty.call(this.settings,e)&&void 0!==t[e]&&(this.settings[e]=t[e]);this.MutationObserver=new MutationObserver((()=>this.update())),this.ResizeObserver=new ResizeObserver((t=>{this.cache.width!==this.settings.container.clientWidth&&(clearTimeout(this.timeout.ResizeObserver),this.timeout.ResizeObserver=setTimeout((()=>{this.settings.rows?this.update():this.resize()}),this.settings.debounce))})),this.MutationObserver.observe(this.settings.container,this.settings.mutations),this.update(),this.settings.container&&this.ResizeObserver.observe(this.settings.container)}getElementOffset(t){let e=0;for(;t&&t!=this.settings.container;)e+=t.offsetTop,t=t.offsetParent;return e}update(){clearTimeout(this.timeout.update),this.timeout.update=setTimeout((()=>{if(this.beforeUpdate(),this.settings.identifiers.length){this.identifiers={};let t=[];try{t=t.concat(this.settings.identifiers.split(",")),t.forEach((t=>{void 0===this.identifiers[t]&&(this.identifiers[t]={})}))}catch(t){console.log(t)}for(const t in this.identifiers)if(Object.hasOwnProperty.call(this.identifiers,t)){let e=this.settings.container.querySelectorAll('[data-equalize-watch="'.concat(t,'"]'));for(let i=0;i<e.length;i++){const s=e[i];s.style.height="1px",void 0===this.identifiers[t][this.getElementOffset(s)]&&(this.identifiers[t][this.getElementOffset(s)]=[]),-1===this.identifiers[t][this.getElementOffset(s)].indexOf(s)&&this.identifiers[t][this.getElementOffset(s)].push(s)}}}else{this.identifiers[0]={};let t=this.settings.container.querySelectorAll("[data-equalize-watch]");for(let e=0;e<t.length;e++){const i=t[e];i.style.height="1px",void 0===this.identifiers[0][this.getElementOffset(i)]&&(this.identifiers[0][this.getElementOffset(i)]=[]),-1===this.identifiers[0][this.getElementOffset(i)].indexOf(i)&&this.identifiers[0][this.getElementOffset(i)].push(i)}}this.callback("update"),this.resize(0)}),this.settings.throttle)}resize(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.settings.throttle;clearTimeout(this.timeout.resize),this.timeout.resize=setTimeout((()=>{this.beforeResize(),this.cache.width=this.settings.container.clientWidth;for(const t in this.identifiers)if(Object.hasOwnProperty.call(this.identifiers,t)){const e=this.identifiers[t];let i=0;for(const t in e)if(Object.hasOwnProperty.call(e,t)){const s=e[t];!0===this.settings.rows&&(i=0);for(let t=0;t<s.length;t++){const e=s[t];e.style.height="auto",e.offsetHeight>i&&(i=Math.ceil(e.offsetHeight))}if(!0===this.settings.rows)for(let t=0;t<s.length;t++)s[t].style.height=i+"px"}if(!1===this.settings.rows)for(const t in e)if(Object.hasOwnProperty.call(e,t)){const s=e[t];for(let t=0;t<s.length;t++)s[t].style.height=i+"px"}}this.callback("resize")}),t)}beforeResize(){this.callback("beforeResize")}beforeUpdate(){this.callback("beforeUpdate")}callback(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.events[t]&&this.events[t].forEach((t=>t(e)))}on(t,e){t&&"on"!=t&&"callback"!=t&&this[t]&&e&&"function"==typeof e&&(null==this.events[t]&&(this.events[t]=[]),this.events[t].push(e))}}var s=e.c;export{s as default};