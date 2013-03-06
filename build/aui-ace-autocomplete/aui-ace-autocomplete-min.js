AUI.add("aui-ace-autocomplete-base",function(d){var h=d.Lang,c=d.Array,i=d.Do,p=d.DOM,e="exec",m="fillMode",n="host",b="insertText",g="processor",a=1,k=0,l=-1,j=0,o="ace-autocomplete-base";var f=function(){};f.prototype={initializer:function(){var q=this;q._editorCommands=[];d.after(this._bindUIACBase,this,"renderUI");var r=q.get(g);if(r&&!r.get(n)){r.set(n,q);}},_addSuggestion:function(s){var q=this;var r=q._getEditor();var t=q.get(g).getSuggestion(q._matchParams.match,s);if(this.get(m)===f.FILL_MODE_OVERWRITE){r.removeWordLeft();}r.insert(t);r.focus();q.fire("addSuggestion",t);return new i.Halt(null);},_bindUIACBase:function(){var q=this;q.publish("cursorChange",{defaultFn:q._defaultCursorChangeFn});var r=q._getEditor();r.on("change",d.bind(q._onEditorChange,q));r.commands.addCommand({name:"showAutoComplete",bindKey:d.merge(q.get("showListKey"),{sender:"editor|cli"}),exec:function(u,t,v){var s=r.getCursorPosition();q._processAutoComplete(s.row,s.column);}});q._onEditorChangeCursorFn=d.bind(q._onEditorChangeCursor,q);r.getSelection().on("changeCursor",q._onEditorChangeCursorFn);q.on("destroy",q._destroyUIACBase,q);},_defaultCursorChangeFn:function(q){var w=this;var t=w._getEditor();var r=t.getCursorPosition();var x=r.row;var s=r.column;var u=w._matchParams;if(x!==u.row||s<u.match.start){w.fire("cursorOut");}else{var y=t.getSession().getLine(x);var v=y.substring(u.match.start,s);if(!w.get(g).getMatch(v)){w.fire("match");}}},_destroyUIACBase:function(){var q=this;var r=q._getEditor();r.commands.removeCommand("showAutoComplete");r.getSelection().removeListener("changeCursor",q._onEditorChangeCursorFn);q._removeAutoCompleteCommands();},_getEditor:function(){var q=this;return q.get("host").getEditor();},_handleEnter:function(s){var q=this;if(s==="\n"||s==="\t"){var r=q._getSelectedEntry();return q._addSuggestion(r);}},_onEditorChange:function(v){var q=this;var w=v.data;var x=w.action;if(x===b||x==="removeText"){var t=w.range;var u=t.start.column;var s=t.end.row;var r=t.start.row;if(x===b&&r===s){q._processAutoComplete(r,u+1);}q.fire(x,{column:u,dataRange:t,endRow:s,startRow:r});}},_onEditorChangeCursor:function(r){var q=this;q.fire("cursorChange",q._getEditor().getCursorPosition());},_onResultsError:function(r){var q=this;q.fire("resultsError",r);},_onResultsSuccess:function(r){var q=this;q.set("results",r);},_overwriteCommands:function(){var r=this;var s=r._getEditor();var q=s.commands.commands;r._editorCommands.push(i.before(r._handleEnter,s,"onTextInput",this),i.before(r._handleKey,q["golinedown"],e,this,40),i.before(r._handleKey,q["golineup"],e,this,38),i.before(r._handleKey,q["gotoend"],e,this,35),i.before(r._handleKey,q["gotolineend"],e,this,35),i.before(r._handleKey,q["gotolinestart"],e,this,36),i.before(r._handleKey,q["gotopagedown"],e,this,34),i.before(r._handleKey,q["gotopageup"],e,this,33),i.before(r._handleKey,q["gotostart"],e,this,36));},_processAutoComplete:function(x,s){var w=this;var r=s;var u=w._getEditor();var y=u.getSession().getLine(x);y=y.substring(0,s);var q=w.get(g);var t=q.getMatch(y);var v;if(h.isObject(t)){v=u.renderer.textToScreenCoordinates(x,s);v.pageX+=p.docScrollX();v.pageY+=p.docScrollY();w._matchParams={column:s,match:t,row:x};q.getResults(t,d.bind(w._onResultsSuccess,w),d.bind(w._onResultsError,w));}w.fire("match",{column:s,coords:v,line:y,match:t,row:x});},_removeAutoCompleteCommands:function(){var q=this;(new d.EventHandle(q._editorCommands)).detach();q._editorCommands.length=0;},_validateFillMode:function(q){return(q===f.FILL_MODE_OVERWRITE||q===f.FILL_MODE_INSERT);}};f.FILL_MODE_INSERT=a;f.FILL_MODE_OVERWRITE=k;f.NAME=o;f.NS=o;f.ATTRS={fillMode:{validator:"_validateFillMode",value:f.FILL_MODE_OVERWRITE},processor:{validator:function(q){return h.isObject(q)||h.isFunction(q);}},showListKey:{validator:h.isObject,value:{mac:"Alt-Space",win:"Ctrl-Space"}}};d.AceEditor.AutoCompleteBase=f;},"@VERSION@",{requires:["aui-ace-editor"]});AUI.add("aui-ace-autocomplete-list",function(k){var Q=k.Lang,o=k.Array,x=k.Do,e=k.getClassName,M="data-index",y="ace-autocomplete-list",b="container",q=".",c="empty",i="",z="entry",t="highlighted",E="list",p="loading",C="offsetHeight",B="previous",u="region",N="results",v="selected",a=" ",P="visible",j="ace-autocomplete",g=e(j,z),J=e(j,z,b),s=e(j,z,b,t),n=e(j,z,c),L=e(j,z,p),D=e(j,z,p),d=e(j,N),I=q+J,l=I+q+v,O=l+a+q+g,m=40,h=35,K=34,r=33,f=36,G=38,F=5,H=20;var w=k.Component.create({NAME:y,NS:y,ATTRS:{emptyMessage:{validator:Q.isString,value:"No suggestions"},host:{validator:Q.isObject},listNode:{value:null},loadingMessage:{validator:Q.isString,value:"Loading"},results:{validator:Q.isArray},selectedEntry:{getter:"_getSelectedEntry"}},AUGMENTS:[k.AceEditor.AutoCompleteBase,k.WidgetAutohide],CSS_PREFIX:j,EXTENDS:k.OverlayBase,HTML_PARSER:{listNode:q+d},prototype:{bindUI:function(){var A=this;A.on("addSuggestion",A.hide,A);A.on("cursorChange",A._onCursorChange,A);A.on("cursorOut",A.hide,A);A.on("insertText",A._onInsertText,A);A.on("match",A._onMatch,A);A.on("removeText",A._onRemoveText,A);A.on("resultsChange",A._onResultsChange,A);A.on("resultsError",A._setEmptyResults,A);A.on("showLoadingMessage",A._onShowLoadingMessage,A);A.on("visibleChange",A._onVisibleChange,A);},renderUI:function(){var A=this;var R=A.get("listNode");if(!R){R=A._createListNode();}R.delegate("click",A._handleResultListClick,I,A);R.delegate("mouseenter",A._onMouseEnter,I,A);R.delegate("mouseleave",A._onMouseLeave,I);A._autoCompleteResultsList=R;},_createListNode:function(){var A=this;var R=k.Node.create(A.TPL_LIST);A.get("contentBox").append(R);return R;},_getEntriesPerPage:function(){var A=this;var S=A._entriesPerPage;if(!S){var R=A._autoCompleteResultsList;var T=R.one(I).get(C);var U=R.get(C);S=Math.floor(U/T);A._entriesPerPage=S;}return S;},_getSelectedEntry:function(){var A=this;var R;var S=A._autoCompleteResultsList.one(O);if(S){R=S.text();}return R;},_handleArrows:function(W){var A=this;var V;if(W===G){V=B;}else{if(W===m){V="next";}}if(V){var T=A._autoCompleteResultsList;
var S=T.one(l);if(S){var U=S[V](I);if(U){S.removeClass(v);U.addClass(v);var X=T.get(u);var R=U.get(u);if(V===B){if(R.top<X.top){U.scrollIntoView(true);}else{if(R.top>X.bottom){U.scrollIntoView();}}}else{if(R.top+R.height>X.bottom){U.scrollIntoView();}else{if(R.top+R.height<X.top){U.scrollIntoView(true);}}}}}return new x.Halt(null);}},_handleKey:function(S,U,T){var R=this;var A;if(R.get(P)){if(T===G||T===m){A=R._handleArrows(T);}else{if(T===r||T===K){A=R._handlePageUpDown(T);}else{if(T===h||T===f){A=R._handleStartEnd(T);}}}}return A;},_handlePageUpDown:function(Y){var W=this;var T=W._autoCompleteResultsList;var X=W._getEntriesPerPage();var V=T.one(l);var A=Q.toInt(V.attr(M));var U;var Z=i;var R=false;if(Y===r){U=A-X;R=true;}else{if(Y===K){U=A+X;Z=":last-child";}}var S=T.one(I+"["+M+'="'+U+'"]');if(!S){S=T.one(I+Z);}if(V!==S){V.removeClass(v);S.addClass(v);S.scrollIntoView(R);}return new x.Halt(null);},_handleResultListClick:function(T){var A=this;var U=T.currentTarget;var R=A._autoCompleteResultsList.one(l);if(U!==R){R.removeClass(v);U.addClass(v);}var S=U.text();A._addSuggestion(S);A.fire("entrySelected",{content:S});},_handleStartEnd:function(V){var A=this;var T;var U=false;var S=A._autoCompleteResultsList;if(V===h){T=S.one(I+":last-child");}else{if(V===f){T=S.one(I);U=true;}}var R=S.one(l);if(T!==R){R.removeClass(v);T.addClass(v);T.scrollIntoView(U);}return new x.Halt(null);},_onCursorChange:function(R){var A=this;if(!A.get(P)){R.preventDefault();}},_onInsertText:function(R){var A=this;if(R.startRow!==R.endRow&&A.get(P)){A.hide();}},_onMatch:function(R){var A=this;if(R.match){var S=R.coords;A.set("xy",[S.pageX+F,S.pageY+H]);}else{if(A.get(P)){A.hide();}}},_onMouseEnter:function(A){A.currentTarget.addClass(s);},_onMouseLeave:function(A){A.currentTarget.removeClass(s);},_onRemoveText:function(R){var A=this;if(A.get(P)){A.hide();}},_onResultsChange:function(V){var A=this;var R=A._autoCompleteResultsList;R.empty();var T=V.newVal;var U=A.TPL_ENTRY;o.each(T,function(X,W){R.appendChild(Q.sub(U,{index:W,value:X}));});var S=R.one(I);if(S){S.addClass(v);if(!A.get(P)){A.show();}}else{if(A.get(P)){A.hide();}}},_onShowLoadingMessage:function(S){var A=this;var R=A._autoCompleteResultsList;R.empty();R.appendChild(Q.sub(A.TPL_LOADING,{label:A.get("loadingMessage")}));if(!A.get(P)){A.show();}},_onVisibleChange:function(R){var A=this;if(R.newVal){A._overwriteCommands();}else{A._removeAutoCompleteCommands();}},_setEmptyResults:function(){var A=this;A.set("results",[]);},TPL_ENTRY:'<li class="'+J+'" data-index="{index}">'+'<span class="'+g+'">{value}</span>'+"</li>",TPL_LIST:'<ul class="'+d+'"/>',TPL_LOADING:'<li class="'+J+'">'+'<span class="aui-icon-loading '+L+'">{label}</span>'+"</li>",TPL_RESULTS_EMPTY:'<li class="'+J+'">'+'<span class="'+n+'">{label}</span>'+"</li>"}});k.AceEditor.AutoCompleteList=w;k.AceEditor.AutoComplete=w;},"@VERSION@",{skinnable:true,requires:["aui-overlay-base","widget-autohide","aui-ace-autocomplete-base"]});AUI.add("aui-ace-autocomplete-plugin",function(a){var b=a.Plugin;function c(d){if(!d.render&&d.render!==false){d.render=true;}c.superclass.constructor.apply(this,arguments);}a.extend(c,a.AceEditor.AutoCompleteList,{},{CSS_PREFIX:"aui-ace-autocomplete",NAME:"aui-ace-autocomplete-plugin",NS:"aui-ace-autocomplete-plugin"});b.AceAutoComplete=c;b.AceAutoCompleteList=c;},"@VERSION@",{requires:["plugin","aui-ace-autocomplete-list"]});AUI.add("aui-ace-autocomplete-freemarker",function(l){var d=l.Lang,r=l.Array,p=l.Object,h=["flush","recover","fallback","local","break","lt","case","global","if","compress","escape","assign","elseif","noescape","setting","list","else","switch","include","recurse","rt","ftl","macro","stop","nt","visit","attempt","nested","import","default","return","t","function"],i=l.AceEditor.AutoCompleteBase,a=0,e=1,s=/<#[\w.]*>?$/,k=/\$\{[\w., ()"]*\}?$/,b=-1,q=0,c="all",n=".",m="",f="responseData",j="variables",g="aui-ace-autocomplete-freemarker";var o=l.Component.create({NAME:g,NS:g,ATTRS:{host:{validator:d.isObject},variables:{validator:d.isObject}},EXTENDS:l.Base,prototype:{initializer:function(u){var t=this;t._tstree=new l.TernarySearchTree();},getMatch:function(w){var u=this;var v;var t;if((t=w.lastIndexOf("<"))>=0){w=w.substring(t);if(s.test(w)){v={content:w.substring(2),start:t,type:a};}}else{if((t=w.lastIndexOf("$"))>=0){w=w.substring(t);if(k.test(w)){v={content:w.substring(2),start:t,type:e};}}}return v;},getResults:function(u,A,z){var B=this;var v=B._tstree;var y=u.type;if(y===a){var x=h;var w=u.content;if(w.length){if(B._lastTSTLoad!==a){B._addDirectives();}x=v.prefixSearch(w,true);}A(x);}else{if(y===e){var t=B._getVariableMatches(u.content);A(t);}}},getSuggestion:function(x,y){var u=this;var t=y||m;if(y){var w=u.get("host").get("fillMode");if(w===i.FILL_MODE_INSERT){var z=x.type;if(z===a){if(x.content&&y.indexOf(x.content)===0){t=y.substring(x.content.length);}}else{if(z===e){var A=x.content.split(n);var v=A[A.length-1];if(v&&y.indexOf(v)===0){t=y.substring(v.length);}}}}}return t;},_addData:function(v){var t=this;var u=t._tstree;u.empty();r.each(v,function(x,w){u.add(x);});},_addDirectives:function(){var t=this;t._addData(h);t._lastTSTLoad=a;},_getVariableMatches:function(y){var A=this;var B=y.split(n);var t=A.get(j);var z=B[B.length-1];B.length-=1;var u;if(B.length>0){for(var v=0;v<B.length;v++){u=B[v];if(d.isObject(t)){t=t[u];}}}var w=[];if(d.isObject(t)){r.each(p.keys(t),function(D,C){w.push(D);});if(z){var x=A._tstree;x.empty();r.each(w,function(D,C){x.add(D);});w=x.prefixSearch(z,true);A._lastTSTLoad=e;}}return w;}}});o.DIRECTIVES=h;l.AceEditor.AutoCompleteFreemarker=o;},"@VERSION@",{requires:["aui-ace-autocomplete-base","aui-search-ternary-search-tree"]});AUI.add("aui-ace-autocomplete",function(a){},"@VERSION@",{use:["aui-ace-autocomplete-base","aui-ace-autocomplete-list","aui-ace-autocomplete-plugin"]});