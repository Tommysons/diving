'use client'
import { useMemo } from 'react'
export default function AtlasGlobe({focus}:{focus:'earth'|'thailand'|'maldives'}) {
 const html=useMemo(()=>`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:transparent}canvas{display:block;touch-action:pan-y}#fallback{position:absolute;inset:0;display:grid;place-items:center;color:#9fe9ff;font:14px sans-serif}</style></head><body><div id="fallback">Loading 3D Earth…</div><script type="module">
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
 window.addEventListener('message',e=>{if(e.data&&e.data.type==='atlas-focus'){const f=focusMap[e.data.focus]||focusMap.earth;desiredY=f[0];targetZ=f[1]}});
 renderer.domElement.addEventListener('pointerdown',e=>{drag=true;prev=e.clientX;renderer.domElement.setPointerCapture(e.pointerId)});
 renderer.domElement.addEventListener('pointermove',e=>{if(drag){desiredY+=(e.clientX-prev)*.008;prev=e.clientX}});
 renderer.domElement.addEventListener('pointerup',()=>drag=false);renderer.domElement.addEventListener('pointercancel',()=>drag=false);
 renderer.domElement.addEventListener('wheel',e=>{e.preventDefault();targetZ=Math.max(4.5,Math.min(11,targetZ+e.deltaY*.006))},{passive:false});
 function resize(){const w=root.clientWidth,h=root.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()}window.addEventListener('resize',resize);resize();camera.position.z=zoom;
 const initial=focusMap['${focus}'];desiredY=initial[0];targetZ=initial[1];
 document.getElementById('fallback').remove();
 function animate(){requestAnimationFrame(animate);if(!drag&&targetZ>6.5)desiredY+=.00045;earth.rotation.y+=(desiredY-earth.rotation.y)*.035;earth.rotation.x+=(desiredX-earth.rotation.x)*.04;zoom+=(targetZ-zoom)*.045;camera.position.z=zoom;renderer.render(scene,camera)}animate();
 </script></body></html>`,[focus])
 return <iframe title='Interactive 3D Earth' srcDoc={html} className='h-full w-full border-0' sandbox='allow-scripts' loading='lazy'/>
}
