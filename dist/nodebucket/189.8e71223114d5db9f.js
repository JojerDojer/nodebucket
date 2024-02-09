"use strict";(self.webpackChunknodebucket=self.webpackChunknodebucket||[]).push([[189],{2189:(_,c,s)=>{s.r(c),s.d(c,{SecurityModule:()=>Z});var l=s(6814),i=s(95),a=s(2129),u=s(9862),t=s(4769);let p=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-security"]],decls:1,vars:0,template:function(n,r){1&n&&t._UZ(0,"router-outlet")},dependencies:[a.lC],encapsulation:2})}return e})();var m=s(459);let h=(()=>{class e{constructor(o){this.http=o}findEmployeeById(o){return this.http.get("/api/employees/"+o)}static#t=this.\u0275fac=function(n){return new(n||e)(t.LFG(u.eN))};static#e=this.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function f(e,d){if(1&e&&(t.TgZ(0,"div",18),t._uU(1),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.hij(" ",o.errorMessage," ")}}function v(e,d){1&e&&(t.TgZ(0,"span",19),t._uU(1,"Sign In"),t.qZA())}function b(e,d){1&e&&(t.TgZ(0,"div"),t._UZ(1,"span",20),t._uU(2," Loading... "),t.qZA())}const x=[{path:"",component:p,children:[{path:"signin",component:(()=>{class e{constructor(o,n,r,g,C){this.route=o,this.router=n,this.cookieService=r,this.securityService=g,this.fb=C,this.isLoading=!1,this.signinForm=this.fb.group({empId:[null,i.kI.compose([i.kI.required,i.kI.pattern("^[0-9]*$")])]}),this.sessionUser={},this.errorMessage=""}signin(){this.isLoading=!0,console.log("signinForm",this.signinForm.value);const o=this.signinForm.controls.empId.value;if(!o||isNaN(parseInt(o,10)))return this.errorMessage="The employee ID is invalid. Please enter a number.",void(this.isLoading=!1);this.securityService.findEmployeeById(o).subscribe({next:n=>{console.log("employee",n),this.sessionUser=n,this.cookieService.set("session_user",o,1),this.cookieService.set("session_name",`${n.firstName} ${n.lastName}`,1);const r=this.route.snapshot.queryParamMap.get("returnUrl")||"/";this.isLoading=!1,this.router.navigate([r])},error:n=>{this.isLoading=!1,this.errorMessage=n.error.message?n.error.message:n.message}})}static#t=this.\u0275fac=function(n){return new(n||e)(t.Y36(a.gz),t.Y36(a.F0),t.Y36(m.N),t.Y36(h),t.Y36(i.qu))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-signin"]],decls:23,vars:4,consts:[[1,"container"],[1,"row","justify-content-center","sign-in-card"],[1,"text-center","mt-1"],[1,"col-lg-4","col-md-6","col-sm-6","lol"],[1,"card","shadow"],[1,"card-title","text-center","boarder-bottom"],[1,"p-3"],["class","alert alert-danger","role","alert",4,"ngIf"],[1,"card-body"],[3,"formGroup","ngSubmit"],[1,"mb-4"],["for","empId",1,"form-label"],["type","text","id","empId","formControlName","empId",1,"form-control"],[1,"d-grid"],["type","submit",1,"btn","btn-dark","bg-ravenclaw-blue"],["style","font-size: 17px;",4,"ngIf"],[4,"ngIf"],["routerLink","/",1,"text-dark","text-underline-hover"],["role","alert",1,"alert","alert-danger"],[2,"font-size","17px"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"]],template:function(n,r){1&n&&(t.TgZ(0,"div",0),t._UZ(1,"div"),t.TgZ(2,"div",1)(3,"h4",2),t._uU(4,"Sign in to access your own personal NodeBucket!"),t.qZA(),t.TgZ(5,"div",3)(6,"div",4)(7,"div",5)(8,"h2",6),t._uU(9,"Employee Sign In"),t.qZA()(),t.YNc(10,f,2,1,"div",7),t.TgZ(11,"div",8)(12,"form",9),t.NdJ("ngSubmit",function(){return r.signin(),r.signinForm.reset()}),t.TgZ(13,"div",10)(14,"label",11),t._uU(15,"Employee ID:"),t.qZA(),t._UZ(16,"input",12),t.qZA(),t.TgZ(17,"div",13)(18,"button",14),t.YNc(19,v,2,0,"span",15),t.YNc(20,b,3,0,"div",16),t.qZA()()()()(),t.TgZ(21,"a",17),t._uU(22,"Return home"),t.qZA()()()()),2&n&&(t.xp6(10),t.Q6J("ngIf",r.errorMessage),t.xp6(2),t.Q6J("formGroup",r.signinForm),t.xp6(7),t.Q6J("ngIf",!r.isLoading),t.xp6(1),t.Q6J("ngIf",r.isLoading))},dependencies:[l.O5,a.rH,i._Y,i.Fj,i.JJ,i.JL,i.sg,i.u],styles:[".sign-in-card[_ngcontent-%COMP%]{margin:8% auto auto;width:800px;height:500px;background-color:#a6a6a6;border:1px solid #222f5b;border-radius:8px;box-shadow:0 4px 8px #0000001a}.card[_ngcontent-%COMP%]{border-color:#222f5b;width:400px}h2[_ngcontent-%COMP%]{color:#946b2d}label[_ngcontent-%COMP%]{font-size:18px;color:#222f5b}button[_ngcontent-%COMP%]{background-color:#222f5b;color:#fff}a[_ngcontent-%COMP%]{font-size:18px;color:#222f5b}.text-ravenclaw-gold[_ngcontent-%COMP%]{color:#946b2d}.lol[_ngcontent-%COMP%]{width:400px}"]})}return e})(),title:"Nodebucket: Sign In"},{path:"**",component:(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-not-found"]],decls:15,vars:0,consts:[[1,"bg-ravenclaw-silver","tehe"],[1,"lol","mt-5"],[1,"text-center"],[1,"bi","bi-emoji-frown"],[1,"p1","text-center","ravenclaw-brown"],[1,"image-container","d-flex","justify-content-center","mt-5"],["src","../../assets/error-image.jpg",1,"error-image"],[1,"return","mt-3"],[1,"p2","text-center","ravenclaw-brown"],["routerLink","/",1,"ravenclaw-blue","home"]],template:function(n,r){1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"h1",2),t._uU(3,"UH OH! "),t._UZ(4,"i",3),t.qZA(),t.TgZ(5,"p",4),t._uU(6,"As much as we'd like for this page to exist... it doesn't."),t.qZA()(),t.TgZ(7,"div",5),t._UZ(8,"img",6),t.qZA(),t.TgZ(9,"div",7)(10,"p",8),t._uU(11,"Trying accessing something more available like our "),t.TgZ(12,"a",9),t._uU(13,"Home"),t.qZA(),t._uU(14," page!"),t.qZA()()())},dependencies:[a.rH],styles:[".tehe[_ngcontent-%COMP%]{border:3px solid #222f5b;min-height:100vh}h1[_ngcontent-%COMP%]{font-size:60px;font-weight:700;color:#946b2d}.p1[_ngcontent-%COMP%]{font-size:24px}.p2[_ngcontent-%COMP%]{font-size:16px;font-weight:500}.error-image[_ngcontent-%COMP%]{height:450px;width:400px;border:2px solid #222f5b}.home[_ngcontent-%COMP%]:hover{color:#fff}"]})}return e})()}]}];let y=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[a.Bz.forChild(x),a.Bz]})}return e})(),Z=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[l.ez,y,i.u5,i.UX,a.Bz,u.JF]})}return e})()}}]);