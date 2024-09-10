import{_ as R,c as A,r as I,g as M,e as v}from"../../index-pGlV8HnW.js";const s=window.Vue.createElementVNode,n=window.Vue.resolveComponent,e=window.Vue.createVNode,t=window.Vue.withCtx,h=window.Vue.unref,x=window.Vue.openBlock,P=window.Vue.createBlock,z=window.Vue.createCommentVNode,O=window.Vue.withModifiers,b=window.Vue.createTextVNode,S=window.Vue.createElementBlock,U=window.Vue.pushScopeId,T=window.Vue.popScopeId,p=m=>(U("data-v-4f030454"),m=m(),T(),m),q={class:"container"},H={class:"login-box"},W=p(()=>s("h3",{class:"title"},"Perfree",-1)),j={class:"login-code"},F=["src"],K=p(()=>s("span",null,"注 册",-1)),D={class:"login-bottom-box"},G={class:"register-box"},J=p(()=>s("div",{class:"forget-password-box"},[s("a",{href:"javascript:;"},"忘记密码?")],-1)),L=p(()=>s("div",{class:"login-footer"},[s("span",null,"Copyright © 2018-2024 All Rights Reserved. ")],-1)),Q=window.ElementPlus.ElMessage,X=window.ElementPlus.ElMessageBox,Y=window.VueRouter.useRouter,Z=window.Vue.computed,c=window.Vue.ref,$={__name:"RegisterView",setup(m){const y=Y(),g=c();let f=c(!1);A();const o=c({userName:"",account:"",password:"",email:"",rememberMe:!1,code:"",uuid:""}),C=Z(()=>({userName:[{required:!0,message:"请输入昵称",trigger:"blur"},{min:2,max:20,message:"昵称必须在2-20字之间",trigger:"blur"}],account:[{required:!0,message:"请输入账户",trigger:"blur"},{min:5,max:16,message:"账户必须在5-16字之间",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:5,max:16,message:"密码必须在5-16字之间",trigger:"blur"}],code:[{required:!0,trigger:"blur",message:"验证码不能为空"}],email:[{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}]}));let w=c("");const V=c(!1),k=()=>{g.value.validate(i=>{i&&I(o.value).then(l=>{l.code===200?X.confirm("注册成功,前往登录~","提示",{confirmButtonText:"确认",showCancelButton:!1,type:"success"}).then(()=>{y.replace("/login")}).catch(()=>{}):(Q.error(l.msg),o.value.code="",V.value=!1,_())}).catch(()=>{})})},_=()=>{M().then(i=>{w.value="data:image/gif;base64,"+i.data.img,o.value.uuid=i.data.uuid})};return(()=>{f.value=v("WEB_OPEN_CAPTCHA")?v("WEB_OPEN_CAPTCHA").value==="ON":!0,f.value&&_()})(),(i,l)=>{const u=n("font-awesome-icon"),d=n("el-input"),r=n("el-form-item"),N=n("el-button"),E=n("router-link"),B=n("el-form");return x(),S("div",q,[s("div",H,[e(B,{ref_key:"registerRef",ref:g,model:o.value,rules:C.value,class:"login-form"},{default:t(()=>[W,e(r,{prop:"userName"},{default:t(()=>[e(d,{modelValue:o.value.userName,"onUpdate:modelValue":l[0]||(l[0]=a=>o.value.userName=a),type:"text",size:"large","auto-complete":"off",placeholder:"请输入昵称",autocomplete:"off",readonly:"",onfocus:"this.removeAttribute('readonly');"},{prefix:t(()=>[e(u,{icon:"fa-solid fa-chalkboard-user "})]),_:1},8,["modelValue"])]),_:1}),e(r,{prop:"account"},{default:t(()=>[e(d,{modelValue:o.value.account,"onUpdate:modelValue":l[1]||(l[1]=a=>o.value.account=a),type:"text",size:"large","auto-complete":"off",placeholder:"请输入账户",autocomplete:"off",readonly:"",onfocus:"this.removeAttribute('readonly');"},{prefix:t(()=>[e(u,{icon:"fa-solid fa-user "})]),_:1},8,["modelValue"])]),_:1}),e(r,{prop:"password"},{default:t(()=>[e(d,{modelValue:o.value.password,"onUpdate:modelValue":l[2]||(l[2]=a=>o.value.password=a),type:"password",size:"large","auto-complete":"off",placeholder:"请输入密码",readonly:"",onfocus:"this.removeAttribute('readonly');"},{prefix:t(()=>[e(u,{icon:"fa-solid fa-lock "})]),_:1},8,["modelValue"])]),_:1}),e(r,{prop:"email"},{default:t(()=>[e(d,{modelValue:o.value.email,"onUpdate:modelValue":l[3]||(l[3]=a=>o.value.email=a),type:"text",size:"large","auto-complete":"off",placeholder:"请输入邮箱地址"},{prefix:t(()=>[e(u,{icon:"fa-solid fa-mail-bulk"})]),_:1},8,["modelValue"])]),_:1}),h(f)?(x(),P(r,{key:0,prop:"code"},{default:t(()=>[e(d,{modelValue:o.value.code,"onUpdate:modelValue":l[4]||(l[4]=a=>o.value.code=a),"auto-complete":"off",placeholder:"请输入验证码",size:"large",style:{width:"63%"}},{prefix:t(()=>[e(u,{icon:"fa-solid fa-fax  "})]),_:1},8,["modelValue"]),s("div",j,[s("img",{src:h(w),onClick:_,class:"login-code-img",alt:""},null,8,F)])]),_:1})):z("",!0),e(r,{style:{width:"100%","margin-top":"20px"}},{default:t(()=>[e(N,{loading:V.value,size:"large",type:"primary",style:{width:"100%"},onClick:O(k,["prevent"])},{default:t(()=>[K]),_:1},8,["loading"]),s("div",D,[s("div",G,[b(" 已有账号? "),e(E,{class:"link-type",to:"/login"},{default:t(()=>[b("前往登录")]),_:1})]),J])]),_:1})]),_:1},8,["model","rules"])]),L])}}},te=R($,[["__scopeId","data-v-4f030454"]]);export{te as default};