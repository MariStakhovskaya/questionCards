(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1:function(e,t,a){e.exports={mainBlock:"App_mainBlock__2HF24",headerContainer:"App_headerContainer__36XDH",headerMenu:"App_headerMenu__2TLMj",formBlock:"App_formBlock__1zaAh",formBlockInput:"App_formBlockInput__2Z6wr",footerBlock:"App_footerBlock__1vnFk",defaultButton:"App_defaultButton__12b8P",defaultInput:"App_defaultInput__2Pgcg",loader:"App_loader__2oKrW",error:"App_error__28HgU",checkEmail:"App_checkEmail__3xmvW"}},11:function(e,t,a){e.exports={wrapper:"Error404_wrapper__7uBMp",image:"Error404_image__1wi3k",errorText:"Error404_errorText__GwB2m",back:"Error404_back__23Oqk"}},33:function(e,t,a){e.exports=a.p+"static/media/Ellipsis.6cf03e7b.gif"},34:function(e,t,a){e.exports=a.p+"static/media/404.1340f194.png"},35:function(e,t,a){e.exports=a.p+"static/media/4698238.068caec9.png"},37:function(e,t,a){e.exports=a(72)},44:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(29),o=a.n(c),l=(a(44),a(1)),u=a.n(l),i=a(6);var s=function(){return r.a.createElement("div",{className:u.a.headerContainer},r.a.createElement("nav",{className:u.a.headerMenu},r.a.createElement(i.b,{to:"/login"},"Login"),r.a.createElement(i.b,{to:"/profile"},"Profile"),r.a.createElement(i.b,{to:"/registration"},"Registration"),r.a.createElement(i.b,{to:"/forgot"},"ForgotPassword"),r.a.createElement(i.b,{to:"/reset"},"Reset")))},m=a(5),d=a(30),f=a.n(d).a.create({baseURL:"https://neko-back.herokuapp.com/2.0/",withCredentials:!0}),p=function(e){return f.post("/auth/login",Object(m.a)({},e))},E=function(){return f.post("/auth/me",{})},g=function(){return f.delete("auth/me")},v=function(e,t){return f.post("auth/register",{email:e,password:t})},b=function(e,t){return f.put("auth/me",{name:e,avatar:t})},h=function(e){return f.post("/auth/forgot",{email:e,from:"<maryia.jegorova@gmail.com>",message:"<div style=\"background-color: #d0eca1; padding: 20px; border-radius: 15px\">This is a password recovery link: <a href='https://MariStakhovskaya.github.io/questionCards#/reset/$token$'>>link</a></div>"})},O=function(e,t){return f.post("/auth/set-new-password",{password:e,token:t})},j={userData:{_id:"",email:"",name:"",avatar:"",publicCardPacksCount:0,isAdmin:!1,verified:!1,rememberMe:!1,error:""}},k=function(e){return{type:"login/SET_USER",payload:{userData:e}}},N={isLoggedIn:!1,error:""},I=function(e){return{type:"login/IS-LOGGED-IN",isLoggedIn:e}},_=function(e){return{type:"login/SET_ERROR",error:e}},w=function(e){return function(t){t(C("loading")),p(e).then(function(e){t(I(!0)),console.log(e.data),t(k(e.data)),t(C("succeeded"))}).catch(function(e){var a=e.response?e.response.data.error:e.message+", more details in the console";t(_(a)),t(C("failed"))})}},S={isInitialized:!1,status:"idle"},C=function(e){return{type:"APP/SET-STATUS",status:e}},T=function(){return function(e){E().then(function(t){200===t.status&&(e(k(t.data)),e(I(!0)))}).finally(function(){e({type:"APP/SET-IS-INITIALIZED",isInitialized:!0})})}},B=a(4),y=a(33),A=a.n(y);var P=function(){return r.a.createElement("div",{className:"preloader"},r.a.createElement("img",{className:u.a.loader,src:A.a,alt:"preloader"}))},R=a(2),D=a(3),F=r.a.memo(function(e){var t=Object(n.useState)(!1),a=Object(D.a)(t,2),c=a[0],o=a[1],l=Object(n.useState)(e.value),u=Object(D.a)(l,2),i=u[0],s=u[1];return c?r.a.createElement("input",{value:e.value,onChange:function(t){e.onChange(t.currentTarget.value)},autoFocus:!0,onBlur:function(){o(!1),s(i)}}):r.a.createElement("span",{onDoubleClick:function(){o(!0),e.onChange(i)}},e.value)}),L=r.a.memo(function(){Object(n.useEffect)(function(){},[]);var e=Object(B.c)(function(e){return e.profile.userData.name}),t=Object(B.c)(function(e){return e.profile.userData.avatar}),a=Object(B.c)(function(e){return e.login.isLoggedIn}),c=Object(B.c)(function(e){return e.app.status}),o=Object(n.useState)(e),l=Object(D.a)(o,2),u=l[0],i=l[1],s=Object(n.useState)(t),m=Object(D.a)(s,2),d=m[0],f=m[1],p=Object(B.b)();return a?r.a.createElement("div",{className:"Profile"},"loading"===c&&r.a.createElement(P,null),r.a.createElement("img",{src:d,alt:""}),r.a.createElement("br",null),"avatar url:  ",r.a.createElement(F,{value:d,onChange:f}),r.a.createElement("br",null),"name: ",r.a.createElement(F,{value:u,onChange:i}),r.a.createElement("button",{onClick:function(){p(function(e,t){return function(a){a(C("loading")),b(e,t).then(function(e){var t,n;console.log(e.data.updatedUser),a((t=e.data.updatedUser.name,n=e.data.updatedUser.avatar,{type:"UPDATE-USER-DATA",payload:{name:t,avatar:n}})),a(C("succeeded"))})}}(u,d))}},"save"),r.a.createElement("br",null),r.a.createElement("button",{onClick:function(){p(function(e){e(C("loading")),g().then(function(t){e(I(!1)),e(C("succeeded"))})})}},"Logout")):r.a.createElement(R.a,{to:"/login"})});var U=function(){Object(n.useEffect)(function(){},[]);var e=Object(n.useState)("maria.stachovski.de@gmail.com"),t=Object(D.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)("12341234M"),l=Object(D.a)(o,2),s=l[0],m=l[1],d=Object(n.useState)(!1),f=Object(D.a)(d,2),p=f[0],E=f[1],g=Object(B.b)(),v=Object(B.c)(function(e){return e.login.isLoggedIn}),b=Object(B.c)(function(e){return e.login.error}),h=Object(B.c)(function(e){return e.app.status});return r.a.createElement("div",{className:u.a.formBlock},r.a.createElement("div",{className:u.a.titleFormBlock},r.a.createElement("h4",null,"Cards Project"),r.a.createElement("h4",null,"Login")),"loading"===h&&r.a.createElement(P,null),r.a.createElement("div",{className:u.a.formBlockInput},r.a.createElement("input",{className:u.a.defaultInput,value:a,onChange:function(e){c(e.currentTarget.value)}}),r.a.createElement("input",{className:u.a.defaultInput,type:"password",value:s,onChange:function(e){m(e.currentTarget.value)}}),r.a.createElement("div",{className:u.a.error},b),r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"RememberMe",onChange:function(e){E(e.currentTarget.checked)}}),"RememberMe"),r.a.createElement("button",{className:u.a.defaultButton,onClick:function(){g(w({email:a,password:s,rememberMe:p}))}},"Login")),r.a.createElement("div",{className:u.a.footerFormBlock},r.a.createElement("div",null,r.a.createElement(i.b,{to:"/forgot"},"ForgotPassword")),r.a.createElement("div",null,"Don't have an account?"),r.a.createElement("div",null,"Sign up")),v&&r.a.createElement(R.a,{to:"/profile"}))},x=function(e,t){return function(a){v(e,t).then(function(e){console.log(e.data.addedUser),a(I(!0))}).catch(function(e){var t=e.response?e.response.data.error:e.message+", more details in the console";console.log(t),a(_(t))})}};var M=function(){var e=Object(B.b)(),t=Object(n.useState)(""),a=Object(D.a)(t,2),c=a[0],o=a[1],l=Object(n.useState)(""),i=Object(D.a)(l,2),s=i[0],m=i[1],d=Object(n.useState)(""),f=Object(D.a)(d,2),p=f[0],E=f[1],g=Object(B.c)(function(e){return e.login.isLoggedIn}),v=Object(B.c)(function(e){return e.login.error});return r.a.createElement("div",{className:u.a.formBlock},r.a.createElement("div",{className:u.a.titleFormBlock},r.a.createElement("h5",null,"Cards Project"),r.a.createElement("h5",null,"Registration")),r.a.createElement("div",null," email:",r.a.createElement("input",{className:u.a.defaultInput,value:c,onChange:function(e){o(e.currentTarget.value)}}),"password: ",r.a.createElement("input",{className:u.a.defaultInput,value:s,onChange:function(e){m(e.currentTarget.value)}}),"password: ",r.a.createElement("input",{className:u.a.defaultInput,value:p,onChange:function(e){E(e.currentTarget.value)}}),r.a.createElement("div",{className:u.a.error},v||""),r.a.createElement("button",{className:u.a.defaultButton,onClick:function(){e(s!=p?_("Password is not correct"):x(c,s))}},"Register")),r.a.createElement("div",{className:u.a.footerFormBlock}),g&&r.a.createElement(R.a,{to:"/login"}))},z={password:""},G=function(e,t){return function(a){O(e,t).then(function(e){console.log(e.data)})}};var W=function(){var e=Object(n.useState)(""),t=Object(D.a)(e,2),a=t[0],c=t[1],o=Object(B.b)(),l=Object(R.h)().token;return r.a.createElement("div",{className:u.a.formBlock},r.a.createElement("div",{className:u.a.titleFormBlock},r.a.createElement("h5",null,"Cards Project"),r.a.createElement("h5",null,"Create new password")),r.a.createElement("div",null," New password:",r.a.createElement("input",{className:u.a.defaultInput,value:a,onChange:function(e){c(e.currentTarget.value)}}),r.a.createElement("div",null,"Create new password and we will send you further instructions to email "),r.a.createElement("button",{className:u.a.defaultButton,onClick:function(){l&&o(G(a,l))}},"Create new password")),r.a.createElement("div",{className:u.a.footerFormBlock}))},H=a(34),Z=a.n(H),q=a(11),J=a.n(q);var $=function(){return r.a.createElement("div",{className:J.a.wrapper},r.a.createElement("div",{className:J.a.image},r.a.createElement("img",{src:Z.a,alt:"cat"})),r.a.createElement("div",{className:J.a.errorText},"Oops, This page does not exist"),r.a.createElement("button",null,"  ",r.a.createElement(i.c,{to:"/profile",className:J.a.back},"go to homepage")))},K={email:"",isSendInstruction:!1},X=function(e){return function(t){t(C("loading")),h(e).then(function(e){t({type:"IS-SEND-INSTRUCTION",payload:{isSendInstruction:!0}}),t(C("succeeded")),console.log(e.data)}).catch(function(e){var a=e.response?e.response.data.error:e.message+", more details in the console";t(_(a)),t(C("failed"))})}},Q=a(35),V=a.n(Q);var Y=function(){var e=Object(n.useState)(""),t=Object(D.a)(e,2),a=t[0],c=t[1],o=Object(B.c)(function(e){return e.forgot.isSendInstruction}),l=Object(B.c)(function(e){return e.login.error}),s=Object(B.b)();return r.a.createElement("div",null,o?r.a.createElement("div",{className:u.a.formBlock},r.a.createElement("div",{className:u.a.titleFormBlock},r.a.createElement("h4",null,"Cards Project"),r.a.createElement("h4",null,"Check Email"),r.a.createElement("div",null,r.a.createElement("img",{className:u.a.checkEmail,src:V.a}))),r.a.createElement("div",{className:u.a.footerFormBlock},r.a.createElement("div",null,"We\u2019ve sent an Email with instructions to ",a))):r.a.createElement("div",{className:u.a.formBlock},r.a.createElement("div",{className:u.a.titleFormBlock},r.a.createElement("h4",null,"Cards Project"),r.a.createElement("h4",null,"Forgot your password?")),r.a.createElement("div",null," email:",r.a.createElement("input",{className:u.a.defaultInput,value:a,onChange:function(e){c(e.currentTarget.value)}}),r.a.createElement("div",null,"Enter your email address and we will send you further instructions"),r.a.createElement("div",{className:u.a.error},l),r.a.createElement("button",{className:u.a.defaultButton,onClick:function(){s(X(a))}},"Send instruction")),o&&r.a.createElement(R.a,{to:"/check"}),r.a.createElement("div",{className:u.a.footerFormBlock},r.a.createElement("div",null,"Did you remember your password?"),r.a.createElement("div",null,r.a.createElement(i.b,{to:"/login"}," Try logging in")))))},ee=function(){return r.a.createElement(R.d,null,r.a.createElement(R.b,{path:"/",element:r.a.createElement(L,null)}),r.a.createElement(R.b,{path:"login",element:r.a.createElement(U,null)}),r.a.createElement(R.b,{path:"profile",element:r.a.createElement(L,null)}),r.a.createElement(R.b,{path:"registration",element:r.a.createElement(M,null)}),r.a.createElement(R.b,{path:"forgot",element:r.a.createElement(Y,null)}),r.a.createElement(R.b,{path:"reset/:token",element:r.a.createElement(W,null)}),r.a.createElement(R.b,{path:"404",element:r.a.createElement($,null)}),r.a.createElement(R.b,{path:"*",element:r.a.createElement(R.a,{to:"/404"})}))};var te=function(){var e=Object(B.b)(),t=Object(B.c)(function(e){return e.app.isInitialized});return Object(B.c)(function(e){return e.login.isLoggedIn}),Object(n.useEffect)(function(){e(T())},[]),t?r.a.createElement("div",{className:u.a.mainBlock},r.a.createElement(s,null),r.a.createElement(ee,null),r.a.createElement("footer",{className:u.a.footerBlock},"@2022 cards training project")):r.a.createElement(P,null)},ae=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,73)).then(function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,c=t.getLCP,o=t.getTTFB;a(e),n(e),r(e),c(e),o(e)})},ne=a(13),re=a(36),ce={},oe=Object(ne.b)({app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/SET-IS-INITIALIZED":return Object(m.a)({},e,{isInitialized:t.isInitialized});case"APP/SET-STATUS":return Object(m.a)({},e,{status:t.status});default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ce;switch((arguments.length>1?arguments[1]:void 0).type){case"":default:return e}},login:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"login/IS-LOGGED-IN":return Object(m.a)({},e,{isLoggedIn:t.isLoggedIn});case"login/SET_ERROR":return Object(m.a)({},e,{error:t.error});default:return e}},profile:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"login/SET_USER":return Object(m.a)({},e,t.payload);case"UPDATE-USER-DATA":return Object(m.a)({},e,{userData:Object(m.a)({},e.userData,t.payload)});default:return e}},reset:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CREATE-NEW-PASSWORD":return Object(m.a)({},e,t.payload);default:return e}},forgot:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FORGOT-PASSWORD":case"IS-SEND-INSTRUCTION":return Object(m.a)({},e,t.payload);default:return e}}}),le=Object(ne.c)(oe,Object(ne.a)(re.a));window.store=le,o.a.createRoot(document.getElementById("root")).render(r.a.createElement(i.a,null,r.a.createElement(B.a,{store:le},r.a.createElement(te,null)))),ae()}},[[37,1,2]]]);
//# sourceMappingURL=main.25ecb636.chunk.js.map