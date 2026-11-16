(() => {
 const art=document.querySelector('.science-art'),button=document.querySelector('#motion');
 const particleHost=document.querySelector('#particles'),spectrum=document.querySelector('#spectrum');
 const ns='http://www.w3.org/2000/svg';
 const particles=Array.from({length:22},(_,i)=>{const p=document.createElementNS(ns,'circle');p.setAttribute('r',String(1.3+i%3));p.setAttribute('fill',i%2?'#a98cd5':'#8da6dd');particleHost.append(p);return p;});
 const peaks=Array.from({length:31},(_,i)=>{const p=document.createElementNS(ns,'line');p.setAttribute('x1',String(73+i*9));p.setAttribute('x2',String(73+i*9));p.setAttribute('y1','297');spectrum.append(p);return p;});
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches,visible=true,time=0,last=0,frame=0;
 function draw(){particles.forEach((p,i)=>{const progress=(time*.16+i/22)%1;p.setAttribute('cx',String(112+progress*168));p.setAttribute('cy',String(148+Math.sin(i*2.4)*progress*44));p.setAttribute('opacity',String(.25+Math.sin(progress*Math.PI)*.5));});peaks.forEach((p,i)=>{const height=5+(Math.sin(i*7.1)**10)*42;p.setAttribute('y2',String(297-height*(.9+.1*Math.sin(time*1.5+i))));});}
 function tick(now){frame=0;if(paused||!visible||document.hidden)return;time+=Math.min((now-last)/1000,.05);last=now;draw();frame=requestAnimationFrame(tick);}
 function sync(){cancelAnimationFrame(frame);frame=0;button.textContent=paused?'Play motion':'Pause motion';button.setAttribute('aria-pressed',String(paused));draw();if(!paused&&visible&&!document.hidden){last=performance.now();frame=requestAnimationFrame(tick);}}
 button.addEventListener('click',()=>{paused=!paused;sync();});reduced.addEventListener('change',e=>{paused=e.matches;sync();});document.addEventListener('visibilitychange',sync);new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(art);sync();
})();
