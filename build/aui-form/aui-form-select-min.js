AUI.add("aui-form-select",function(C){var F=C.Lang,D=F.isArray,H=F.isObject,E=C.ClassNameManager.getClassName,J="select",B=E(J),I='<select {multiple} class="{cssClass}" id="{id}" name="{name}"></select>';var G=C.Component.create({NAME:J,ATTRS:{multiple:{value:false},options:{value:[],setter:"_setOptions"},selectedIndex:{value:-1}},UI_ATTRS:["multiple","options","selectedIndex"],EXTENDS:C.Field,HTML_PARSER:{node:"select"},prototype:{FIELD_TEMPLATE:I,FIELD_TYPE:J,_setOptions:function(K){var A=this;if(!D(K)){K=[K];}return K;},_uiSetMultiple:function(K){var A=this;A.get("node").attr("multiple",K);},_uiSetOptions:function(O){var P=this;var M=[];var K;var R;var Q;var L=0;for(var N=0;N<O.length;N++){K=O[N];R=K.labelText||K;Q=K.value||K;if(K.selected){L=N;}M.push('<option value="'+Q+'">'+R+"</option>");}var A=P.get("node");A.all("option").remove(true);A.append(M.join(""));P.set("selectedIndex",L);},_uiSetSelectedIndex:function(K){var A=this;if(K>-1){A.get("node").attr("selectedIndex",K);}}}});C.Select=G;},"@VERSION@",{requires:["aui-form-field"]});