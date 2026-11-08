'use client'
import { useEffect, useMemo, useRef } from 'react'
export default function AtlasGlobe({focus,locale,onSelect}:{focus:'earth'|'thailand'|'maldives';locale:'en'|'ru';onSelect:(destination:'thailand'|'maldives')=>void}) {
 const frame=useRef<HTMLIFrameElement>(null)
 useEffect(()=>{const receive=(event:MessageEvent)=>{if(event.source===frame.current?.contentWindow && event.data?.type==='atlas-destination' && (event.data.destination==='thailand'||event.data.destination==='maldives')) onSelect(event.data.destination)};window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive)},[onSelect])
 const html=useMemo(()=>`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:transparent}canvas{display:block;touch-action:pan-y}#fallback{position:absolute;inset:0;display:grid;place-items:center;color:#9fe9ff;font:14px sans-serif}.pin{position:absolute;z-index:3;transform:translate(-50%,-50%);width:38px;height:38px;border:2px solid white;border-radius:50%;background:#32dbe8;color:#03283b;cursor:pointer;box-shadow:0 0 18px #50eaff;display:none}.pin span{display:none;position:absolute;bottom:100%;left:50%;transform:translateX(-50%);white-space:nowrap;background:#03283b;color:white;border-radius:8px;padding:7px 10px;font:600 13px sans-serif}.pin:hover span,.pin:focus-visible span{display:block}.pin:focus-visible{outline:3px solid white;outline-offset:4px}</style></head><body><div id="fallback">Loading 3D Earth…</div><button class="pin" id="thailand" aria-label="${locale==='ru'?'Таиланд · Ко Тао':'Thailand · Koh Tao'}">●<span>${locale==='ru'?'Таиланд · Ко Тао':'Thailand · Koh Tao'}</span></button><button class="pin" id="maldives" aria-label="${locale==='ru'?'Мальдивы · Vilu Reef':'Maldives · Vilu Reef'}">●<span>${locale==='ru'?'Мальдивы · Vilu Reef':'Maldives · Vilu Reef'}</span></button><script type="module">
 import * as THREE from 'https://esm.sh/three@0.170.0';
 const root=document.body,scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.1,100);
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;root.appendChild(renderer.domElement);
 const earth=new THREE.Group();scene.add(earth);const tex=new THREE.TextureLoader();
 const sphere=new THREE.Mesh(new THREE.SphereGeometry(1.8,80,64),new THREE.MeshPhongMaterial({map:tex.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'),specular:new THREE.Color('#1b4054'),shininess:18}));earth.add(sphere);
 const atmosphere=new THREE.Mesh(new THREE.SphereGeometry(1.86,64,48),new THREE.MeshBasicMaterial({color:0x50bfff,transparent:true,opacity:.085,side:THREE.BackSide}));earth.add(atmosphere);
 scene.add(new THREE.AmbientLight(0x8dbbdf,1.4));const sun=new THREE.DirectionalLight(0xffffff,2.5);sun.position.set(-4,3,6);scene.add(sun);
 const stars=new THREE.BufferGeometry(),p=[];for(let i=0;i<900;i++){p.push((Math.random()-.5)*80,(Math.random()-.5)*80,-10-Math.random()*25)}stars.setAttribute('position',new THREE.Float32BufferAttribute(p,3));scene.add(new THREE.Points(stars,new THREE.PointsMaterial({color:0xb6d9ff,size:.045})));
 let drag=false,prev=0,desiredY=1.65,desiredX=.15,targetZ=8.2,zoom=8.2;
 const focusMap={earth:[1.65,8.2],thailand:[-1.72,5.3],maldives:[-1.32,5.3]};
 const locations=[{id:'thailand',lat:10.1,lon:99.8},{id:'maldives',lat:2.9,lon:73.0}];
 let opening=false;
 for(const loc of locations){const lat=loc.lat*Math.PI/180,lon=loc.lon*Math.PI/180;loc.pos=new THREE.Vector3(-1.81*Math.cos(lat)*Math.cos(lon),1.81*Math.sin(lat),1.81*Math.cos(lat)*Math.sin(lon));loc.el=document.getElementById(loc.id);loc.el.addEventListener('click',()=>{if(opening)return;opening=true;const world=loc.pos.clone().applyEuler(earth.rotation);desiredY=earth.rotation.y-Math.atan2(world.x,world.z);desiredX=earth.rotation.x;targetZ=4.5;setTimeout(()=>parent.postMessage({type:'atlas-destination',destination:loc.id},'*'),900)})}
 window.addEventListener('message',e=>{if(e.data&&e.data.type==='atlas-focus'){const f=focusMap[e.data.focus]||focusMap.earth;desiredY=f[0];targetZ=f[1]}});
 renderer.domElement.addEventListener('pointerdown',e=>{drag=true;prev=e.clientX;renderer.domElement.setPointerCapture(e.pointerId)});
 renderer.domElement.addEventListener('pointermove',e=>{if(drag){desiredY+=(e.clientX-prev)*.008;prev=e.clientX}});
 renderer.domElement.addEventListener('pointerup',()=>drag=false);renderer.domElement.addEventListener('pointercancel',()=>drag=false);
 renderer.domElement.addEventListener('wheel',e=>{e.preventDefault();targetZ=Math.max(4.5,Math.min(11,targetZ+e.deltaY*.006))},{passive:false});
 function resize(){const w=root.clientWidth,h=root.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()}window.addEventListener('resize',resize);resize();camera.position.z=zoom;
 const initial=focusMap['${focus}'];desiredY=initial[0];targetZ=initial[1];
 document.getElementById('fallback').remove();
 function animate(){requestAnimationFrame(animate);if(!drag&&!opening&&targetZ>6.5)desiredY+=.00045;earth.rotation.y+=(desiredY-earth.rotation.y)*.035;earth.rotation.x+=(desiredX-earth.rotation.x)*.04;zoom+=(targetZ-zoom)*.045;camera.position.z=zoom;earth.updateMatrixWorld();for(const loc of locations){const world=loc.pos.clone().applyMatrix4(earth.matrixWorld),projected=world.clone().project(camera);const visible=world.z>0&&projected.x>-1&&projected.x<1&&projected.y>-1&&projected.y<1;loc.el.style.display=visible?'block':'none';loc.el.style.left=((projected.x+1)*50)+'%';loc.el.style.top=((1-projected.y)*50)+'%'}renderer.render(scene,camera)}animate();
 </script></body></html>`,[focus,locale])
 return <iframe ref={frame} title={locale==='ru'?'Интерактивный 3D-глобус':'Interactive 3D Earth'} srcDoc={html} className='h-full w-full border-0' sandbox='allow-scripts' loading='lazy'/>
}
