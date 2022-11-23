var g=Object.defineProperty;var u=(n,a,e)=>a in n?g(n,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[a]=e;var c=(n,a,e)=>(u(n,typeof a!="symbol"?a+"":a,e),e);class p extends HTMLElement{constructor(){super();c(this,"shadow");c(this,"active",this.themes.length===3?1:0);this.shadow=this.attachShadow({mode:"open"})}getA(e,t=""){return this.getAttribute(e)||t}getArray(e,t=[]){const i=this.getA(e,"");if(!i)return t;let h=[];try{h=JSON.parse(i)}catch{h=i.split(",")}return Array.isArray(h)?h:t}get knobWidth(){return Number(this.getA("knob-width","1"))}get themes(){return this.getArray("themes",["light","auto","dark"])}get metaColors(){return this.getArray("meta-colors",[])}get theme(){return this.getA("theme")||this.themes[1]}set theme(e){this.setAttribute("theme",e)}static get observedAttributes(){return["themes","theme","meta-colors","knob-width"]}connectedCallback(){const e=window.localStorage.getItem("theme");if(e){const t=this.themes.indexOf(e);t>=0&&this.setTheme(this,t)}else{const t=this.themes.indexOf(this.theme);t>=0&&this.setTheme(this,t)}this.render(),this.addEventListeners()}addEventListeners(){this.shadow.addEventListener("click",e=>{this.eventListeners(this,e)},!1),document.addEventListener("theme-switch",e=>{const t=e.detail;t&&t!==this.theme&&this.themes.includes(t)&&(console.log("theme-switch event received",t),this.setTheme(this,this.themes.indexOf(t)))})}eventListeners(e,t){const i=t.target,h=Number(i.value);(i==null?void 0:i.checked)&&h!==this.active&&e.setTheme(e,h)}setTheme(e,t){const i=document.querySelector("html"),h=document.querySelector("meta[name='theme-color']"),r=e.themes[t],l=e.metaColors[t];console.log("\u{1F680} ~ file: main.ts ~ line 111 ~ ThemeSwitch ~ setTheme ~ theme",t,r),i&&i.setAttribute("data-theme",r),h&&l&&h.setAttribute("content",l),window.localStorage.setItem("theme",r),e.active=t,e.theme=r,this.dispatchEvent(new CustomEvent("theme-switch",{detail:r,bubbles:!0,cancelable:!0,composed:!0}))}attributeChangedCallback(e,t,i){if(console.log("changed",e,t,i),e==="theme"&&i!==t){const h=this.themes.indexOf(i);h>=0&&(this.active=h,this.render())}}render(){const e=this.themes,t=e.map((o,s)=>`<label title="${e[s]}" for="label${s}" part="label${s}"><slot name="label${s}">${o}</slot></label>`),i=t.filter((o,s)=>s>0&&s<t.length-1),h=e.map((o,s)=>`<span><input value=${s} type="radio" name="theme" id="label${s}" ?checked=${this.active===s} aria-label="${o} theme" /></span>`),r=e.map((o,s)=>`[data-active="${s}"] [part="label${s}"]`).join(",")+"{color: var(--theme-switch-highlight, inherit)}",l=e.map((o,s)=>`[data-active="${s}"] .knob { left: ${s/(e.length-1)*100}%; transform: translateX(-${s/(e.length-1)*100}%); }`).join(""),m=this.knobWidth-.2,d=`<style>.wrap{position:relative;display:inline-flex;gap:.3em;align-items:end}.side{height:1.2em}.mid{position:relative;padding-top:1em}label{cursor:pointer;line-height:1;height:100%;display:flex;align-items:center;font-weight:700;font-size:.8em}input{position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;cursor:pointer;opacity:0}.mid .labels{display:flex;justify-content:center;gap:.5em;position:absolute;width:100%;top:0;text-align:center}.track{background:var(--theme-switch-track,#88888822);height:1em;border:.1em solid var(--theme-switch-track-border,currentColor);border-radius:.2em;padding:0 .1em;position:relative;grid-area:switch;width:${m*e.length}}.track span{width:${m};bottom:0;position:relative}.knob{left:50%;transform:translateX(-50%);position:absolute;top:0;background:var(--theme-switch-knob,currentColor);transition:all .3s cubic-bezier(.4,0,.2,1);width:${this.knobWidth};border-radius:.1em}${l}${r}</style>`,b=`<div class="wrap" data-active="${this.active}"><div class="side">${t[0]}</div><div class="mid"><div class="labels">${i.join("")}</div><div class="track" part="track">${h.join("")}<div class="knob" part="knob"></div></div></div><div class="side">${t[this.themes.length-1]}</div></div>`;this.shadow.innerHTML=`${d}${b}`}}customElements.define("theme-switch",p);
//# sourceMappingURL=theme-3way-switch.js.map
