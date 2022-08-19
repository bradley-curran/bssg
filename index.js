#!/usr/bin/env node
"use strict";var T=Object.create;var u=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var S=Object.getOwnPropertyNames;var C=Object.getPrototypeOf,q=Object.prototype.hasOwnProperty;var v=(t,r,e,s)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of S(r))!q.call(t,o)&&o!==e&&u(t,o,{get:()=>r[o],enumerable:!(s=x(r,o))||s.enumerable});return t};var M=(t,r,e)=>(e=t!=null?T(C(t)):{},v(r||!t||!t.__esModule?u(e,"default",{value:t,enumerable:!0}):e,t));var k=require("fs/promises"),$=M(require("./node_modules/toml/index.js"));var a=require("fs/promises"),L=t=>`cp (${t.inputFile} -> ${t.outputFile})`,N=async t=>(0,a.cp)(t.inputFile,t.outputFile),c={description:L,step:N};var l=require("fs/promises"),R=t=>`mkdir (${t.path})`,B=async t=>(0,l.mkdir)(t.path),m={description:R,step:B};var f=require("fs/promises"),J=t=>`rm (${t.path})`,E=async t=>(0,f.rm)(t.path,{recursive:!0,force:!0}),d={description:J,step:E};var i=require("fs/promises"),g=require("./node_modules/less/index.js"),K=t=>`transformless (${t.inputFile} -> ${t.outputFile})`,_=async t=>{let r=await(0,i.readFile)(t.inputFile),e=await(0,g.render)(r.toString());return(0,i.writeFile)(t.outputFile,e.css)},F={description:K,step:_};var n=require("fs/promises"),y=require("./node_modules/pug/lib/index.js"),j=require("./node_modules/unified/index.js"),z=require("./node_modules/remark-parse/index.js"),A=require("./node_modules/remark-rehype/index.js"),D=require("./node_modules/rehype-stringify/index.js"),G=require("./node_modules/pretty/index.js"),H=t=>`transformmarkdown (extends: ${t.extends}, ${t.inputFile} -> ${t.outputFile})`,I=async t=>{let r=j().use(z).use(A).use(D),e=await(0,n.readFile)(t.inputFile),o=(await r.process(e.toString())).contents,b=(0,y.compileFile)(t.extends)().replace("BLOCK_CONTENT",o),O=G(b);return(0,n.writeFile)(t.outputFile,O)},P={description:H,step:I};var w=require("./node_modules/pug/lib/index.js"),p=require("fs/promises"),Q=require("./node_modules/pretty/index.js"),U=async t=>{if(t){let r=await(0,p.readFile)(t);return JSON.parse(r.toString())}return{}},V=t=>`transformpug (localsFile: ${t.localsFile}, ${t.inputFile} -> ${t.outputFile})`,W=async t=>{let r=await U(t.localsFile),e=(0,w.compileFile)(t.inputFile)(r),s=Q(e);return(0,p.writeFile)(t.outputFile,s)},h={description:V,step:W};var X={cp:c,mkdir:m,rm:d,transformless:F,transformmarkdown:P,transformpug:h},Y=async()=>{let t=await(0,k.readFile)("bssg.toml"),r=$.parse(t.toString()),e=JSON.parse(JSON.stringify(r));if(!e.hasOwnProperty("bssg"))throw new Error("bssg.toml does not have a 'bssg' top-level key");return e},Z=async t=>{for(let r of t.build.steps){let e=X[r.step];console.log(`start: ${e.description(r)}`),await e.step(r),console.log(`done:  ${e.description(r)}`)}console.log("bssg build complete")};Y().then(Z).catch(t=>console.log(t));
//# sourceMappingURL=index.js.map
