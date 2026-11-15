/* ?finished=1 (test only): the Brian story keys read as a finished save from MEMORY; nothing is written to localStorage. doji-player is never touched. */
(function(){if(!/[?&]finished=1\b/.test(location.search))return;var M={
 "doji-ch2":JSON.stringify({done:1,seen:1,c1:1,c2:1,c3:1,kicks:1,kicksOn:true,kSeen2:1,v23esp:1,secrets:[],rh:{met:1,sock:1,wr:1,star:1,align:1,fixed:1,lit:1,on:0,sec:[]},clutch:1,raced:1,rcSeen:1,place:1,arrived:1,found:1,handoff:1}),
 "doji-ch1":JSON.stringify({seen:true,items:[]}),"doji-story":JSON.stringify({brian:1,ch1done:true,chapter:"free"}),"doji-unlocks":JSON.stringify({brian:{t:1}})};
 var g=Storage.prototype.getItem,s=Storage.prototype.setItem,r=Storage.prototype.removeItem;
 Storage.prototype.getItem=function(k){return this===localStorage&&k in M?M[k]:g.apply(this,arguments)};
 Storage.prototype.setItem=function(k,v){if(this===localStorage&&(k in M||k=="doji-world")){M[k]=String(v);return}return s.apply(this,arguments)};
 Storage.prototype.removeItem=function(k){if(this===localStorage&&k in M){return}return r.apply(this,arguments)};window.__dvFinishedTest=1})();
/* Dojiverse shared world (v24). One key, "doji-world"; never writes doji-player (read-only mirror).
   Areas register themselves; links are data, so new places slot in later without touching old ones. See AREAS.md. */
(function(){
 var KEY="doji-world",V=1,DOJI_SEC=["gm","duck","bottle","cat404","konami"];
 function rd(k){try{return JSON.parse(localStorage.getItem(k)||"null")}catch(e){return null}}
 function blank(){return {v:V,flags:{},items:{},secrets:{},unlocks:{},visited:{},chars:{}}}
 var W=rd(KEY);if(!W||typeof W!="object"||W.v!==V){var o=W&&typeof W=="object"?W:{};W=blank();for(var k in W)if(o[k]&&typeof o[k]=="object")W[k]=o[k]}
 var test=/[?&](race|finished)=1\b/.test(location.search);
 function save(){if(test)return;try{localStorage.setItem(KEY,JSON.stringify(W))}catch(e){}}
 var DV={KEY:KEY,areas:{},links:[],
  // area: {id, name, page:"index.html"|"chapter2_nyc.html"|..., entries:{name:fn or note}, exits:[areaId...], music:"track", secrets:[ids], quest:fn()->text}
  register:function(a){if(!a||!a.id)return;DV.areas[a.id]=Object.assign(DV.areas[a.id]||{},a);(a.exits||[]).forEach(function(to){DV.link(a.id,to)})},
  link:function(from,to,how){if(!DV.links.some(function(l){return l.from==from&&l.to==to}))DV.links.push({from:from,to:to,how:how||""})},
  visit:function(id){if(!W.visited[id]){W.visited[id]=Date.now();save()}},
  flag:function(k,v){if(v===undefined)return W.flags[k];if(W.flags[k]===v)return v;W.flags[k]=v;save();return v},
  // items are per character ("brian", "doji") or shared ("*")
  give:function(id,who){who=who||"*";var L=W.items[who]=W.items[who]||[];if(L.indexOf(id)<0){L.push(id);save()}},
  has:function(id,who){var a=W.items[who||"*"]||[],b=W.items["*"]||[];return a.indexOf(id)>=0||b.indexOf(id)>=0},
  secret:function(area,id){var L=W.secrets[area]=W.secrets[area]||[];if(L.indexOf(id)<0){L.push(id);save()}},
  secretFound:function(area,id){return (W.secrets[area]||[]).indexOf(id)>=0},
  secretTotals:function(){var n=0,t=0;for(var k in DV.areas){var s=DV.areas[k].secrets||[];t+=s.length;s.forEach(function(id){if(DV.secretFound(k,id))n++})}return {found:n,total:t}},
  unlock:function(id){if(!W.unlocks[id]){W.unlocks[id]=Date.now();save()}},
  unlocked:function(id){return !!W.unlocks[id]||/[?&]unlockall=1/.test(location.search)},
  state:function(){return W},save:save,
  // pull every save into the shared view (read-only on the old keys; doji-player is only READ). v25: per-area keys match the areas below.
  mirror:function(){var c=rd("doji-ch2")||{},p=rd("doji-player")||{},u=rd("doji-unlocks")||{},before=JSON.stringify(W);
   function put(area,ids,allow){var L=W.secrets[area]=W.secrets[area]||[];(ids||[]).forEach(function(id){if((!allow||allow.indexOf(id)>=0)&&L.indexOf(id)<0)L.push(id)})}
   var x18=c.x18||[];
   put("wall-st",c.secrets,["bull","pigeon","tablet","ticker"]);
   put("revhard",(c.rh&&c.rh.sec)||[],["r34","cones","noodle","mug","bell"]);
   put("hq",x18,["hqwin","hqcat","hqrack","hqseq"]);
   put("brian-extras",x18,["gm","konami"]);
   put("doji-street",p.secrets,DOJI_SEC);put("doji-street",W.secrets["doji-street:brian"]||[],DOJI_SEC);
   var bi=W.items.brian=W.items.brian||[];[["kicks",c.kicks],["gloves",c.gloves],["cap",(c.secrets||[]).indexOf("pigeon")>=0],["bull",(c.secrets||[]).indexOf("bull")>=0],["tape",(c.secrets||[]).indexOf("ticker")>=0],["sign247",(c.secrets||[]).indexOf("tablet")>=0]].forEach(function(q){if(q[1]&&bi.indexOf(q[0])<0)bi.push(q[0])});
   var di=W.items.doji=W.items.doji||[];[["hat",p.hatHeld],["surfboard",p.http=="done"],["bucket",p.pier=="done"],["fish",p.clean=="done"]].forEach(function(q){if(q[1]&&di.indexOf(q[0])<0)di.push(q[0])});
   if(c.found)W.flags.brianStoryDone=1;if(u&&u.brian){var ut=typeof u.brian=="object"&&u.brian.t?u.brian.t:1;if(!W.unlocks.brian||W.unlocks.brian===1)W.unlocks.brian=ut}
   if(JSON.stringify(W)!==before)save();return W},
  // one secret count everywhere: per area + the whole Dojiverse
  SEC_AREAS:[["doji-street","DOJI VERSE"],["hq","BASE TOWER"],["wall-st","WALL ST"],["revhard","REVHARD"],["brian-extras","ODDS + ENDS"]],
  areaCount:function(id){var a=DV.areas[id]||{},ids=a.secrets||[],n=0;ids.forEach(function(s){if(DV.secretFound(id,s))n++});return {id:id,n:n,t:ids.length}},
  counts:function(){try{DV.mirror()}catch(e){}var rows=DV.SEC_AREAS.map(function(r){var c=DV.areaCount(r[0]);c.label=r[1];return c}),n=0,t=0;rows.forEach(function(r){n+=r.n;t+=r.t});return {rows:rows,n:n,t:t}},
  pockets:function(){var b=W.chars.brian;return (b&&b.pockets)||null},
  setPockets:function(list){W.chars.brian=W.chars.brian||{};if(JSON.stringify(W.chars.brian.pockets||null)===JSON.stringify(list))return;W.chars.brian.pockets=list;save()}
 };
 // today's areas (story order and travel unchanged; this is the map, not new links)
 [{id:"doji-room",name:"Doji's room",page:"index.html",exits:["doji-street"],music:"room-loop"},
  {id:"doji-street",name:"Doji Verse street",page:"index.html",exits:["doji-room","gap","byte-dock","sol-st"],secrets:DOJI_SEC},
  {id:"gap",name:"The gap (HTTPBASE20)",page:"index.html",exits:["doji-street"]},
  {id:"byte-dock",name:"Byte dock / surf shack",page:"index.html",exits:["doji-street"]},
  {id:"sol-st",name:"SOL St (Halloween / Lamp)",page:"index.html",exits:["doji-street"]},
  {id:"hq",name:"Coinbase HQ (Base Tower 88F)",page:"chapter2_nyc.html",exits:["wall-st"],secrets:["hqwin","hqcat","hqrack","hqseq"]},
  {id:"wall-st",name:"Manhattan / Wall St",page:"chapter2_nyc.html",exits:["hq","cab"],secrets:["bull","pigeon","tablet","ticker"]},
  {id:"cab",name:"Cobie's cab",page:"chapter2_nyc.html",exits:["revhard"]},
  {id:"revhard",name:"Revhard lot + shop",page:"chapter2_nyc.html",exits:["race"],secrets:["r34","cones","noodle","mug","bell"]},
  {id:"race",name:"The Sunrise Run",page:"chapter2_nyc.html",exits:["doji-street"]},
  {id:"brian-extras",name:"Brian's extras (GM sticker on Doji's street, the shell combo anywhere)",page:"chapter2_nyc.html",exits:[],secrets:["gm","konami"]}
 ].forEach(DV.register);
 DV.link("doji-room","hq","Brian's kicks: 5 A taps after the ending");DV.link("revhard","hq","kicks");DV.link("wall-st","hq","kicks");
 try{DV.mirror()}catch(e){}
 window.DV=DV;
})();
