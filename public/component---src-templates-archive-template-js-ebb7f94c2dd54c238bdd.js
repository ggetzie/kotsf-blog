(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{209:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(95),o=a(211),l=a(217),c=(a(100),a(144),a(210)),s=function(e){var t=e.pageContext,a=t.currentPage,n=t.numPages,o=1===a,l=a===n,s=2===a?"/archive/":"/archive/"+(a-1)+"/",m="/archive/"+(a+1);return r.a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center",listStyle:"none",padding:0}},!o&&r.a.createElement(i.Link,{to:""+s,rel:"prev"},"← Previous Page"),Array.from({length:n},function(e,t){return r.a.createElement("li",{key:"pagination-number"+(t+1),style:{margin:0}},r.a.createElement(i.Link,{to:"/archive/"+(0===t?"":t+1),style:{padding:Object(c.a)(.25),textDecoration:"none",color:t+1===a?"#ffffff":"",background:t+1===a?"#007acc":""}},t+1))}),!l&&r.a.createElement(i.Link,{to:m+"/",rel:"next"},"Next Page →"))},m=a(216);a.d(t,"default",function(){return p}),a.d(t,"ArchiveQuery",function(){return d});var p=function(e){var t,a;function n(){return e.apply(this,arguments)||this}return a=e,(t=n).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a,n.prototype.render=function(){var e=this.props.data.allMarkdownRemark.edges;return r.a.createElement(o.a,null,r.a.createElement(m.Helmet,{title:"Archive - "+this.props.data.site.siteMetadata.title}),r.a.createElement(l.a,{posts:e}),r.a.createElement(s,{pageContext:this.props.pageContext}),r.a.createElement("div",null,"See older posts from ",r.a.createElement(i.Link,{to:"/gdarchive"},r.a.createElement("em",null,"That's Debatable"))))},n}(r.a.Component),d="104920622"},210:function(e,t,a){"use strict";a.d(t,"a",function(){return c});var n=a(213),r=a.n(n),i=a(214),o=a.n(i);o.a.overrideStyles=function(){return{".navigation a":{textDecoration:"none"},"a.brand":{textDecoration:"none",color:"inherit"},"a.brand:visited":{color:"inherit"},".navigation ul":{clear:"both",float:"right",listStyle:"none inside",color:"#333",padding:"0",margin:"0 0 1.5rem 0"},"nav.navigation":{marginTop:"1rem"},".dateline":{fontWeight:200,fontSize:"17px",fontStyle:"italic",marginBottom:0}}};var l=new r.a(o.a);var c=l.rhythm;l.scale},211:function(e,t,a){"use strict";var n=a(212),r=a(0),i=a.n(r),o=a(95),l=a(215),c=a(210),s=l.a.div.withConfig({displayName:"layout__Container",componentId:"sc-1dxpb2z-0"})(["display:flex;flex-flow:row;align-items:flex-start;padding:0 ",";margin:40px auto;"],Object(c.a)(1)),m=(l.a.section.withConfig({displayName:"layout__sideNav",componentId:"sc-1dxpb2z-1"})(["width:20%;"]),l.a.div.withConfig({displayName:"layout__Entry",componentId:"sc-1dxpb2z-2"})(["width:65%;margin:"," "," "," ",";"],Object(c.a)(2),Object(c.a)(1),Object(c.a)(1),Object(c.a)(2))),p=(l.a.p.withConfig({displayName:"layout__tagLine",componentId:"sc-1dxpb2z-3"})(["padding:0;color:#003366;letter-spacing:0.7px;margin-top:",";margin-bottom:",";font-size:",";"],Object(c.a)(.1),Object(c.a)(1),Object(c.a)(.9)),l.a.h1.withConfig({displayName:"layout__Brand",componentId:"sc-1dxpb2z-4"})(["padding:0;color:#003366;letter-spacing:0.7px;margin-top:",";margin-bottom:",";font-size:",";"],Object(c.a)(.1),Object(c.a)(.2),Object(c.a)(2.5)));t.a=function(e){var t=e.children,a=n.data;return i.a.createElement(s,null,i.a.createElement(m,null,t),i.a.createElement("sideNav",null,i.a.createElement(p,null,i.a.createElement(o.Link,{className:"brand",to:"/"},a.site.siteMetadata.title)),i.a.createElement("tagLine",null,a.site.siteMetadata.tagline),i.a.createElement("nav",{className:"navigation"},i.a.createElement("ul",null,i.a.createElement("li",null,i.a.createElement(o.Link,{to:"/about/"},"About")),i.a.createElement("li",null,i.a.createElement("a",{href:"/archive"},"Archive")),i.a.createElement("li",null,i.a.createElement(o.Link,{to:"/portfolio/"},"Portfolio")),i.a.createElement("li",null,i.a.createElement(o.Link,{to:"/contact/"},"Contact"))))))}},212:function(e){e.exports={data:{site:{siteMetadata:{title:"KotSF",tagline:"Veni, Vidi, Bloggi"}}}}},217:function(e,t,a){"use strict";var n=a(0),r=a.n(n),i=a(95);t.a=function(e){var t=e.posts;return r.a.createElement("div",{className:"post-list"},t.filter(function(e){return e.node.frontmatter.title.length>0}).map(function(e){var t=e.node;return r.a.createElement("div",{className:"post-preview",key:t.id},r.a.createElement("h3",null,r.a.createElement(i.Link,{to:t.frontmatter.path},t.frontmatter.title)),r.a.createElement("p",{className:"dateline"},t.frontmatter.date),r.a.createElement("p",null,t.excerpt))}))}}}]);
//# sourceMappingURL=component---src-templates-archive-template-js-ebb7f94c2dd54c238bdd.js.map