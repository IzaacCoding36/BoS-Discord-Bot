(function(){
  const cfg = window.BOT_SITE_CONFIG || {};
  const botName = cfg.botName || 'Meu Bot';
  document.querySelectorAll('[data-bot-name]').forEach(el => el.textContent = botName);

  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const inviteButtons = [
    document.getElementById('inviteBtnHero'),
    document.getElementById('inviteBtn')
  ].filter(Boolean);

  const warn = document.getElementById('inviteWarning');
  function setInvite(url){
    if(url){
      inviteButtons.forEach(b => { b.href = url; b.setAttribute('aria-disabled','false'); });
      if(warn){ warn.classList.add('hidden'); warn.textContent=''; }
    }else{
      inviteButtons.forEach(b => { b.removeAttribute('href'); b.setAttribute('aria-disabled','true'); });
      if(warn){
        warn.classList.remove('hidden');
        warn.textContent = 'Configure seu link de convite em docs/config.js (propriedade inviteUrl).';
      }
    }
  }

  setInvite(cfg.inviteUrl);

  const support = document.getElementById('supportLink');
  if(support){
    if(cfg.supportUrl){
      support.href = cfg.supportUrl;
    }else{
      support.remove();
    }
  }

  const avatar = document.getElementById('botAvatar');
  if(avatar && cfg.avatarUrl){ avatar.src = cfg.avatarUrl; }

  // CRT toggle
  const crtToggle = document.getElementById('crtToggle');
  const screen = document.querySelector('.screen');
  if(crtToggle && screen){
    const saved = localStorage.getItem('crt') ?? 'on';
    crtToggle.checked = saved !== 'off';
    if(saved === 'off') screen.classList.remove('crt');
    crtToggle.addEventListener('change', ()=>{
      if(crtToggle.checked){
        screen.classList.add('crt');
        localStorage.setItem('crt','on');
      }else{
        screen.classList.remove('crt');
        localStorage.setItem('crt','off');
      }
    });
  }

  // Pequena animação de boot (Pip-Boy vibe)
  document.body.style.opacity = '0.001';
  requestAnimationFrame(()=>{
    document.body.style.transition = 'opacity 250ms ease-out';
    document.body.style.opacity = '1';
  });

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('siteNav');
  if(navToggle && nav){
    function setOpen(open){
      nav.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    }
    navToggle.addEventListener('click', (e)=>{
      e.stopPropagation();
      setOpen(!nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>setOpen(false)));
    document.addEventListener('click', (e)=>{
      if(!nav.contains(e.target) && e.target !== navToggle){ setOpen(false); }
    });
  }
})();
