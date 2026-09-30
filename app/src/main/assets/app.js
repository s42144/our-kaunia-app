// Amader Kaunia Application Engine
// NO EMOJIS - STRICTLY SVG ICONS ONLY

(function() {
  const state = {
    activeTab: 'home',
    theme: localStorage.getItem('kaunia_theme') || 'light',
    user: JSON.parse(localStorage.getItem('kaunia_user') || 'null'),
    isAdmin: localStorage.getItem('kaunia_admin') === 'true',
    savedItems: JSON.parse(localStorage.getItem('kaunia_saved') || '[]'),
    bloodDonors: [...window.KAUNIA_DATA.bloodDonorsInitial],
    communityPosts: [],
    mapInstance: null,
    markers: []
  };

  // SVG Icons Library (No emojis used anywhere)
  const SVGS = {
    phone: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.4 11.4 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.4 11.4 0 00.57 3.58 1 1 0 01-.24 1.02l-2.21 2.19z"/></svg>`,
    location: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>`,
    hospital: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>`,
    fire: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M13.5 12.5a1.5 1.5 0 01-3 0 5 5 0 013-4.5 7.5 7.5 0 00-6 7.5 7.5 7.5 0 0015 0c0-4.14-3.36-7.5-7.5-7.5-.83 0-1.63.13-2.37.38a7.48 7.48 0 00.87 4.12z"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>`,
    blood: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>`,
    train: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2c-4 0-8 .5-8 4v9.5A3.5 3.5 0 007.5 19L6 20.5v.5h12v-.5L16.5 19A3.5 3.5 0 0020 15.5V6c0-3.5-4-4-8-4zm-3.5 14a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm7 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm2.5-5H6V6h12v5z"/></svg>`,
    school: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>`,
    business: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>`,
    sun: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>`,
    moon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.3 2a10 10 0 00-1.9 19.8 10 10 0 0011.6-11.6A10 10 0 0012.3 2z"/></svg>`,
    chat: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>`,
    send: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`,
    check: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
    close: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`,
    info: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`,
    bookmark: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>`
  };
  window.SVGS = SVGS;

  // Firebase Realtime DB REST Fallback / Direct Bridge
  const DB_BASE = "https://my-doctor-ai-92237-default-rtdb.firebaseio.com/kaunia";

  async function fetchRemotePosts() {
    try {
      const res = await fetch(`${DB_BASE}/posts.json`);
      if (res.ok) {
        const data = await res.json();
        if (data) {
          const list = Object.keys(data).map(k => ({ id: k, ...data[k] }));
          state.communityPosts = list.reverse();
          renderCommunityFeed();
          return;
        }
      }
    } catch(e) {
      console.warn("DB offline, using local storage", e);
    }
    // Local fallback
    const saved = localStorage.getItem('kaunia_local_posts');
    if (saved) {
      state.communityPosts = JSON.parse(saved);
    } else {
      state.communityPosts = [
        {
          id: "p1",
          author: "মো: রফিক আহমেদ",
          union: "কুর্শা",
          category: "জরুরি রক্ত প্রয়োজন",
          text: "কাউনিয়া উপজেলা স্বাস্থ্য কমপ্লেক্সে একজন প্রসূতি মায়ের জন্য জরুরি ২ ব্যাগ O+ (ও পজিটিভ) রক্তের প্রয়োজন। যোগাযোগ করুন দ্রুত।",
          phone: "01712-998877",
          time: "১০ মিনিট আগে",
          likes: 5
        },
        {
          id: "p2",
          author: "শহীদুল ইসলাম",
          union: "সারাই",
          category: "হারানো বিজ্ঞপ্তি",
          text: "কাউনিয়া জংশন স্টেশনে একটি কালো রঙের চামড়ার মানিব্যাগ হারিয়ে গেছে। প্রয়োজনীয় জাতীয় পরিচয়পত্র ছিল। পেলে উপযুক্ত পুরস্কার দেওয়া হবে।",
          phone: "01733-445566",
          time: "১ ঘণ্টা আগে",
          likes: 2
        }
      ];
    }
    renderCommunityFeed();
  }

  async function saveRemotePost(postData) {
    try {
      await fetch(`${DB_BASE}/posts.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData)
      });
    } catch(e) {
      console.warn("Saving post locally due to network state");
    }
    state.communityPosts.unshift(postData);
    localStorage.setItem('kaunia_local_posts', JSON.stringify(state.communityPosts));
    renderCommunityFeed();
  }

  // Theme Initializer
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.innerHTML = state.theme === 'dark' ? SVGS.sun : SVGS.moon;
    }
  }

  window.toggleTheme = function() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('kaunia_theme', state.theme);
    applyTheme();
  };

  // Switch Tab
  window.switchTab = function(tabName) {
    state.activeTab = tabName;
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));

    const targetEl = document.getElementById(`tab-${tabName}`);
    if (targetEl) targetEl.classList.add('active');

    const navBtn = document.getElementById(`nav-${tabName}`);
    if (navBtn) navBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tabName === 'map' && !state.mapInstance) {
      setTimeout(initMap, 200);
    }
  };

  // Render Emergency List
  function renderEmergency(filter = 'সব') {
    const container = document.getElementById('emergencyList');
    if (!container) return;

    const list = filter === 'সব' ? window.KAUNIA_DATA.emergency : window.KAUNIA_DATA.emergency.filter(i => i.category === filter);

    container.innerHTML = list.map(item => `
      <div class="card">
        <div class="card-header-row">
          <div>
            <div class="card-title">${item.title}</div>
            <div class="card-sub">${item.sub}</div>
          </div>
          <span class="badge badge-primary">${item.category}</span>
        </div>
        <div style="margin-top: 10px; display: flex; gap: 8px;">
          <a href="tel:${item.phone}" class="btn btn-primary btn-block">
            ${SVGS.phone} সরাসরি কল করুন (${item.phone})
          </a>
        </div>
      </div>
    `).join('');
  }

  // Filter Emergency
  window.filterEmergency = function(cat, btn) {
    document.querySelectorAll('#emergencyChips .filter-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderEmergency(cat);
  };

  // Render Blood Donors
  window.renderBloodDonors = function(groupFilter = 'সব') {
    const listEl = document.getElementById('bloodDonorsList');
    if (!listEl) return;

    let list = state.bloodDonors;
    if (groupFilter !== 'সব') {
      list = list.filter(d => d.group === groupFilter);
    }

    listEl.innerHTML = list.map(donor => `
      <div class="card">
        <div class="card-header-row">
          <div>
            <div class="card-title" style="display:flex; align-items:center; gap:6px;">
              ${donor.name}
            </div>
            <div class="card-sub">এলাকা: ${donor.union} ইউনিয়ন | শেষ রক্তদান: ${donor.lastDonated || 'নতুন রক্তদাতা'}</div>
          </div>
          <span class="badge badge-danger" style="font-size:0.9rem; padding: 4px 10px;">${donor.group}</span>
        </div>
        <div style="margin-top: 10px;">
          <a href="tel:${donor.phone}" class="btn btn-outline btn-block">
            ${SVGS.phone} কল করুন (${donor.phone})
          </a>
        </div>
      </div>
    `).join('');
  };

  // Filter Blood
  window.filterBlood = function(group, btn) {
    document.querySelectorAll('#bloodChips .filter-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    window.renderBloodDonors(group);
  };

  // Add Blood Donor
  window.submitBloodDonor = function(e) {
    e.preventDefault();
    const name = document.getElementById('donorName').value.trim();
    const group = document.getElementById('donorGroup').value;
    const phone = document.getElementById('donorPhone').value.trim();
    const union = document.getElementById('donorUnion').value;

    if (!name || !phone) return alert('অনুগ্রহ করে নাম এবং ফোন নম্বর দিন');

    const newDonor = { name, group, phone, union, lastDonated: 'নতুন নিবন্ধিত' };
    state.bloodDonors.unshift(newDonor);
    window.renderBloodDonors();
    closeModal('bloodDonorModal');
    alert('অভিনন্দন! আপনি সফলভাবে রক্তদাতা হিসেবে নিবন্ধিত হয়েছেন।');
  };

  // Render Community Posts
  function renderCommunityFeed() {
    const feed = document.getElementById('communityFeed');
    if (!feed) return;

    feed.innerHTML = state.communityPosts.map(post => `
      <div class="card">
        <div class="card-header-row">
          <div>
            <div class="card-title">${post.author}</div>
            <div class="card-sub">${post.union} ইউনিয়ন • ${post.time || 'এইমাত্র'}</div>
          </div>
          <span class="badge badge-info">${post.category}</span>
        </div>
        <div style="font-size: 0.9rem; margin: 8px 0; line-height: 1.45;">
          ${post.text}
        </div>
        ${post.phone ? `
          <div style="margin-top: 8px;">
            <a href="tel:${post.phone}" class="btn btn-sm btn-outline">
              ${SVGS.phone} যোগাযোগ: ${post.phone}
            </a>
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  // Submit Community Post
  window.submitPost = function(e) {
    e.preventDefault();
    const author = document.getElementById('postAuthor').value.trim() || 'কাউনিয়াবাসী';
    const union = document.getElementById('postUnion').value;
    const category = document.getElementById('postCategory').value;
    const phone = document.getElementById('postPhone').value.trim();
    const text = document.getElementById('postText').value.trim();

    if (!text) return alert('অনুগ্রহ করে আপনার পোস্টের বিবরণ লিখুন');

    const newPost = {
      id: 'post_' + Date.now(),
      author,
      union,
      category,
      phone,
      text,
      time: 'এইমাত্র'
    };

    saveRemotePost(newPost);
    closeModal('newPostModal');
    document.getElementById('postForm').reset();
  };

  // Render Train Schedule
  function renderTrains() {
    const container = document.getElementById('trainsList');
    if (!container) return;

    container.innerHTML = window.KAUNIA_DATA.trains.map(t => `
      <div class="card">
        <div class="card-header-row">
          <div>
            <div class="card-title">${t.name}</div>
            <div class="card-sub">রুট: ${t.route}</div>
          </div>
          <span class="badge badge-success">${t.kauniaTime}</span>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 6px;">
          ছুটির দিন: <strong>${t.offDay}</strong> | সম্ভাব্য ভাড়া: <strong>${t.fare}</strong>
        </div>
      </div>
    `).join('');
  }

  // Render Unions List
  function renderUnions() {
    const container = document.getElementById('unionsList');
    if (!container) return;

    container.innerHTML = window.KAUNIA_DATA.unions.map(u => `
      <div class="card">
        <div class="card-header-row">
          <div>
            <div class="card-title">${u.name}</div>
            <div class="card-sub">কার্যালয়: ${u.office}</div>
          </div>
          <span class="badge badge-primary">আয়তন: ${u.area}</span>
        </div>
        <div style="font-size: 0.82rem; margin: 8px 0;">
          চেয়ারম্যান: <strong>${u.chairman}</strong>
        </div>
        <a href="tel:${u.phone}" class="btn btn-sm btn-outline">
          ${SVGS.phone} কার্যালয়ে কল করুন (${u.phone})
        </a>
      </div>
    `).join('');
  }

  // Render Business Directory
  window.renderBusinesses = function(category = 'সব') {
    const container = document.getElementById('businessList');
    if (!container) return;

    let list = window.KAUNIA_DATA.businesses;
    if (category !== 'সব') {
      list = list.filter(b => b.category === category);
    }

    container.innerHTML = list.map(b => `
      <div class="card">
        <div class="card-header-row">
          <div>
            <div class="card-title">${b.name}</div>
            <div class="card-sub">মালিক: ${b.owner} | ঠিকানা: ${b.location}</div>
          </div>
          <span class="badge badge-info">${b.category}</span>
        </div>
        <div style="margin-top: 10px;">
          <a href="tel:${b.phone}" class="btn btn-outline btn-block">
            ${SVGS.phone} দোকানে কল করুন (${b.phone})
          </a>
        </div>
      </div>
    `).join('');
  };

  // Filter Business
  window.filterBusiness = function(cat, btn) {
    document.querySelectorAll('#businessChips .filter-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    window.renderBusinesses(cat);
  };

  // Render Education
  function renderEducation() {
    const container = document.getElementById('educationList');
    if (!container) return;

    container.innerHTML = window.KAUNIA_DATA.schools.map(s => `
      <div class="card">
        <div class="card-header-row">
          <div>
            <div class="card-title">${s.name}</div>
            <div class="card-sub">${s.location}</div>
          </div>
          <span class="badge badge-primary">${s.type}</span>
        </div>
        <div style="font-size: 0.8rem; margin: 6px 0; color: var(--text-muted);">শিক্ষার্থী সংখ্যা: ${s.students}</div>
        <a href="tel:${s.phone}" class="btn btn-sm btn-outline">${SVGS.phone} যোগাযোগ: ${s.phone}</a>
      </div>
    `).join('');
  }

  // Interactive Map Initialization (OpenStreetMap Leaflet Engine)
  function initMap() {
    const mapEl = document.getElementById('leafletMap');
    if (!mapEl || state.mapInstance) return;

    // Kaunia Junction Coordinates
    const kauniaLat = 25.7725;
    const kauniaLng = 89.4183;

    if (window.L) {
      state.mapInstance = L.map('leafletMap').setView([kauniaLat, kauniaLng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap'
      }).addTo(state.mapInstance);

      renderMapMarkers('সব');
    }
  }

  window.renderMapMarkers = function(category = 'সব') {
    if (!state.mapInstance || !window.L) return;

    // Clear existing markers
    state.markers.forEach(m => state.mapInstance.removeLayer(m));
    state.markers = [];

    const locations = category === 'সব'
      ? window.KAUNIA_DATA.mapLocations
      : window.KAUNIA_DATA.mapLocations.filter(loc => loc.category === category);

    locations.forEach(loc => {
      const popupHtml = `
        <div style="font-family: inherit; font-size: 13px; line-height: 1.4;">
          <strong style="color: #0D9488;">${loc.name}</strong><br/>
          <span>${loc.address}</span><br/>
          <span style="display:inline-block; margin-top:4px; font-weight:600; color:#555;">${loc.category}</span><br/>
          ${loc.phone !== '-' ? `<a href="tel:${loc.phone}" style="color:#0284C7; text-decoration:none;">কল: ${loc.phone}</a>` : ''}
        </div>
      `;
      const marker = L.marker([loc.lat, loc.lng]).addTo(state.mapInstance);
      marker.bindPopup(popupHtml);
      state.markers.push(marker);
    });
  };

  window.filterMapCategory = function(cat, btn) {
    document.querySelectorAll('#mapChips .filter-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    window.renderMapMarkers(cat);
  };

  // AI Kaunia Assistant Logic
  window.askAiAssistant = function(query) {
    const input = document.getElementById('aiQueryInput');
    const q = query || (input ? input.value.trim() : '');
    if (!q) return;

    if (input) input.value = '';

    appendChatMessage(q, 'user');

    // Simulate smart Bengali reasoning about Kaunia
    setTimeout(() => {
      let reply = "";
      const lower = q.toLowerCase();

      if (lower.includes('থানা') || lower.includes('পুলিশ') || lower.includes('ওসি')) {
        reply = "কাউনিয়া থানার ওসির সরকারি মোবাইল নম্বর: 01320-136450 এবং ডিউটি অফিসার: 01713-373888। জরুরি যেকোনো পরিস্থিতিতে ২৪ ঘণ্টা পুলিশ কন্ট্রোল রুম খোলা রয়েছে।";
      } else if (lower.includes('হাসপাতাল') || lower.includes('ডাক্তার') || lower.includes('চিকিৎসা')) {
        reply = "কাউনিয়া উপজেলা স্বাস্থ্য কমপ্লেক্সের জরুরি বিভাগের নম্বর: 01730-324890। এটি হাসপাতাল মোড়ে অবস্থিত এবং ২৪ ঘণ্টা চিকিৎসা সেবা ও এম্বুলেন্স সেবা প্রদান করে।";
      } else if (lower.includes('ফায়ার') || lower.includes('আগুন')) {
        reply = "কাউনিয়া ফায়ার সার্ভিস ও সিভিল ডিফেন্স স্টেশনের জরুরি নম্বর: 01716-435555। তারা অগ্নি দুর্ঘটনা এবং তিস্তা নদীতে উদ্ধার কাজে নিয়োজিত।";
      } else if (lower.includes('ইউনিয়ন') || lower.includes('কয়টি')) {
        reply = "কাউনিয়া উপজেলায় মোট ৬টি ইউনিয়ন রয়েছে: ১. সারাই, ২. হারাগাছ, ৩. কুর্শা, ৪. শহীদবাগ, ৫. বালাপাড়া এবং ৬. টেপামধুপুর।";
      } else if (lower.includes('ট্রেন') || lower.includes('স্টেশন') || lower.includes('রেল')) {
        reply = "কাউনিয়া রেলওয়ে জংশন উত্তরবঙ্গের অন্যতম প্রধান জংশন। এখান থেকে কুড়িগ্রাম এক্সপ্রেস, করতোয়া এক্সপ্রেস, উত্তরবঙ্গ মেইল এবং পদ্মরাগ ট্রেন চলাচল করে। ট্রেনের বিস্তারিত সময়সূচি আমাদের 'যানবাহন' ট্যাবে দেওয়া আছে।";
      } else if (lower.includes('আবহাওয়া') || lower.includes('বৃষ্টি') || lower.includes('তাপমাত্রা')) {
        reply = "কাউনিয়া অঞ্চলের বর্তমান তাপমাত্রা প্রায় ২৯° সেলসিয়াস, আকাশ আংশিক মেঘলা এবং বাতাসের আর্দ্রতা স্বাভাবিক রয়েছে। কোনো বড় ঝড়বৃষ্টির পূর্বাভাস নেই।";
      } else if (lower.includes('রক্ত') || lower.includes('ব্লাড')) {
        reply = "আমাদের অ্যাপের 'স্বাস্থ্য ও রক্ত' বিভাগে তাৎক্ষণিকভাবে সকল ব্লাড গ্রুপের রক্তদাতাদের তালিকা পাওয়া যাবে। আপনি সরাসরি ফোন করে তাদের সাথে যোগাযোগ করতে পারবেন।";
      } else {
        reply = `আপনার প্রশ্ন: "${q}" এর জন্য ধন্যবাদ। কাউনিয়া উপজেলার যেকোনো সরকারি অফিস, থানা, স্বাস্থ্য কমপ্লেক্স, তিস্তা সেতু ভ্রমণ, ট্রেন ও বাসের সময়সূচি অথবা রক্তদাতার তথ্যের জন্য আমি সদা প্রস্তুত। আপনি নির্দিষ্ট তথ্য জানতে আরও প্রশ্ন করতে পারেন।`;
      }

      appendChatMessage(reply, 'assistant');
    }, 400);
  };

  function appendChatMessage(text, role) {
    const box = document.getElementById('chatMessages');
    if (!box) return;

    const div = document.createElement('div');
    div.className = `chat-bubble chat-bubble-${role}`;
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  // Modal helpers
  window.openModal = function(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
  };

  window.closeModal = function(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  };

  // Toggle Admin Mode
  window.toggleAdminMode = function() {
    state.isAdmin = !state.isAdmin;
    localStorage.setItem('kaunia_admin', state.isAdmin);
    alert(state.isAdmin ? 'অ্যাডমিন মোড সক্রিয় হয়েছে!' : 'অ্যাডমিন মোড নিষ্ক্রিয় হয়েছে।');
    window.switchTab('admin');
  };

  // Initialize all elements on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    renderEmergency();
    window.renderBloodDonors();
    renderTrains();
    renderUnions();
    window.renderBusinesses();
    renderEducation();
    fetchRemotePosts();
  });
})();
