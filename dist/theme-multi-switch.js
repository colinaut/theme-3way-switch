var g=Object.defineProperty;var b=(h,r,t)=>r in h?g(h,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):h[r]=t;var u=(h,r,t)=>(b(h,typeof r!="symbol"?r+"":r,t),t);class v extends HTMLElement{constructor(){super();u(this,"shadow");this.shadow=this.attachShadow({mode:"open"})}getA(t,e=""){return this.getAttribute(t)||e}getArray(t,e=[]){const a=this.getA(t,"");if(!a)return e;let s=[];try{s=JSON.parse(a)}catch{s=a.split(",")}return Array.isArray(s)?s:e}get layout(){return this.getA("layout","around top")}get themes(){return this.getArray("themes",["light","auto","dark"])}get meta(){return this.getArray("meta-colors",[])}get theme(){return this.getA("theme")||this.themes[1]}set theme(t){this.setAttribute("theme",t)}static get observedAttributes(){return["themes","theme","meta-colors","knob-width","layout"]}connectedCallback(){const t=window.localStorage.getItem("theme");t&&this.themes.indexOf(t)>=0&&(this.theme=t),this.render(),this.addEventListeners()}addEventListeners(){this.shadow.addEventListener("click",t=>{const e=t.target;(e==null?void 0:e.checked)&&e.value!==this.theme&&(this.theme=e.value)},!1),document.addEventListener("theme-switch",t=>{const e=t.detail;e&&e!==this.theme&&this.themes.includes(e)&&(this.theme=e)})}setTheme(t,e){const a=t.themes.indexOf(e);if(a>-1){const s=document.querySelector("html"),l=document.querySelector("meta[name='theme-color']");let n=t.meta[a];if(s&&s.setAttribute("data-theme",e),l&&n){if(n==="auto"){const o=t.themes.indexOf("light"),d=t.themes.indexOf("dark");window.matchMedia("(prefers-color-scheme: dark)").matches&&d>-1?n=t.meta[d]:window.matchMedia("(prefers-color-scheme: light)").matches&&o>-1&&(n=t.meta[o])}l.setAttribute("content",n)}window.localStorage.setItem("theme",e),this.dispatchEvent(new CustomEvent("theme-switch",{detail:e,bubbles:!0,cancelable:!0,composed:!0}))}}attributeChangedCallback(t,e,a){t==="theme"&&a!==e&&this.setTheme(this,a),this.render()}render(){const t=this.themes,e=t.map(i=>`[data-active="${i}"] [part="${i}"]`).join(",")+"{color: var(--theme-switch-highlight, inherit)}",a=t.map((i,m)=>`[data-active="${i}"] .knob { left: ${m/(t.length-1)*100}%; transform: translateX(-${m/(t.length-1)*100}%); }`).join("");let s="1em 0 0",l="top: 0px;";this.layout.includes("bottom")&&(s="0 0 1em",l="bottom: 0px;"),this.themes.length<3&&this.layout.includes("around")&&(s="0");const n=`<style>.wrap{position:relative;display:inline-flex;gap:.3em;align-items:end}.side{height:1.2em;padding:${s}}.mid{position:relative;padding:${s}}label{cursor:pointer;line-height:1;height:100%;display:flex;align-items:center;font-weight:700;font-size:.8em}input{position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;cursor:pointer;opacity:0}.mid .labels{display:flex;position:absolute;width:100%;${l}text-align:center}.mid label{width:100%;display:flex;justify-content:center}.track{background:var(--theme-switch-track,#88888822);height:1em;border:.1em solid var(--theme-switch-track-border,currentColor);border-radius:.2em;padding:0 .1em;position:relative;grid-area:switch;display:flex}.track span{width:calc(var(--theme-switch-knob-width,1) * .9em);flex-shrink:0;bottom:0;position:relative}.knob{left:50%;transform:translateX(-50%);position:absolute;top:0;background:var(--theme-switch-knob,currentColor);transition:all .3s cubic-bezier(.4,0,.2,1);width:calc(var(--theme-switch-knob-width,1) * 1em);height:1em;border-radius:.1em}${a}${e}</style>`;let o=t.map(i=>`<label title="${i}" for="${i}" part="${i}"><slot name="${i}">${i}</slot></label>`);const d=t.map(i=>`<span><input value=${i} type="radio" name="theme" id="${i}" ?checked=${this.theme===i} aria-label="${i} theme" /></span>`);let c=["",""];this.layout.includes("around")&&(c[0]=`<div class="side">${o[0]}</div>`,c[1]=`<div class="side">${o[this.themes.length-1]}</div>`,o.pop(),o.shift());let p=`<div class="wrap" data-active="${this.theme}">${c[0]}<div class="mid"><div class="labels">${o.join("")}</div><div class="track" part="track">${d.join("")}<div class="knob" part="knob"></div></div></div>${c[1]}</div>`;this.shadow.innerHTML=`${n}${p}`}}customElements.define("theme-switch",v);
//# sourceMappingURL=theme-multi-switch.js.map
