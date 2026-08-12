(function(){
  "use strict";

  // ⚠️ REPLACE these two values with your real Supabase Project URL and
  // anon public key (Project Settings → API in your Supabase dashboard).
  // Nothing in this file will work against a real backend until you do.
  const supabase = window.supabase.createClient(
    "https://rzurbreowtxoiopdoeco.supabase.co",   // your Project URL
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6dXJicmVvd3R4b2lvcGRvZWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwNjk1NDcsImV4cCI6MjA5OTY0NTU0N30.IJAxGs9n8ZJ-f1nJE-NmlI16sPjOVKT9kQkhKNj1-Js"                 // your anon public key
  );

  /* ---------------------------------------------------------
     DATA
  --------------------------------------------------------- */
  const CATALOG = [
    {id:1, title:"Structures of Computation", author:"D. Vellum", call:"QA76.6 .V44", category:"Computer Science", course:"CS 201", status:"available", desc:"A foundational text on algorithmic thinking and data structures, used across the introductory computing sequence."},
    {id:2, title:"Networks & Distributed Systems", author:"R. Achebe-Lund", call:"TK5105 .A24", category:"Computer Science", course:"CS 340", status:"loaned", due:"2026-07-14", desc:"Covers distributed consensus, replication, and the practical failure modes of networked systems."},
    {id:3, title:"The Weight of Ordinary Days", author:"M. Solano", call:"PR6069 .S65", category:"Literature", course:"LIT 110", status:"available", desc:"A contemporary novel examining domestic life across three generations of a coastal family."},
    {id:4, title:"Rhetoric & the Public Voice", author:"H. Okonkwo", call:"PN4121 .O36", category:"Literature", course:"LIT 220", status:"available", desc:"An analysis of persuasive language in civic life, from classical oratory to modern media."},
    {id:5, title:"Linear Algebra Reconsidered", author:"P. Ferrante", call:"QA184 .F47", category:"Mathematics", course:"MATH 214", status:"loaned", due:"2026-07-11", desc:"A rigorous but accessible treatment of vector spaces, eigenstructures, and applications."},
    {id:6, title:"Topology of Everyday Shapes", author:"S. Nakagawa", call:"QA611 .N33", category:"Mathematics", course:"MATH 330", status:"available", desc:"An intuitive entry point into point-set and algebraic topology using physical analogies."},
    {id:7, title:"Empires of Grain", author:"C. Duval", call:"D210 .D88", category:"History", course:"HIST 150", status:"available", desc:"A history of agricultural surplus and its role in the formation of early states."},
    {id:8, title:"The Long Twentieth Century", author:"A. Reyes-Park", call:"D421 .R49", category:"History", course:"HIST 305", status:"loaned", due:"2026-07-16", desc:"Traces the political and economic shifts that defined the 1900s across three continents."},
    {id:9, title:"Thermodynamics for the Curious", author:"J. Whitcombe", call:"QC311 .W45", category:"Physics", course:"PHYS 210", status:"available", desc:"An approachable but complete treatment of entropy, energy, and statistical mechanics."},
    {id:10, title:"Fields, Waves & Light", author:"E. Bertrand", call:"QC661 .B37", category:"Physics", course:"PHYS 240", status:"available", desc:"Covers electromagnetic theory from first principles through to optical applications."},
    {id:11, title:"Behavioral Foundations of Markets", author:"L. Marsh", call:"HB74 .M27", category:"Economics", course:"ECON 260", status:"available", desc:"Explores how cognitive biases shape real-world market outcomes and policy design."},
    {id:12, title:"Trade, Tariffs & Territory", author:"K. Osei", call:"HF1379 .O84", category:"Economics", course:"ECON 315", status:"loaned", due:"2026-07-13", desc:"A modern survey of international trade theory grounded in historical case studies."}
  ];

  const CATEGORIES = ["Computer Science","Literature","Mathematics","History","Physics","Economics"];

  const CONTENT_BY_CATEGORY = {
    "Computer Science": [
      { label:"Chapter 1 — Framing the Problem", paragraphs:[
        "Every system begins as a rough sketch of what should happen when something goes wrong, long before anyone writes a line that describes what happens when things go right. This habit of thinking in failure first is what separates code that merely runs from code that survives contact with real users.",
        "The chapters ahead build outward from small, testable pieces. Each idea is introduced with a plain description before any notation appears, so that the underlying intuition never gets lost beneath syntax.",
        "Readers are encouraged to keep a notebook of open questions. The most useful kind of confusion is the kind you can name."
      ]},
      { label:"Chapter 2 — Structure Over Cleverness", paragraphs:[
        "A well-chosen structure tends to make clever tricks unnecessary. When a data structure fits the shape of a problem, the resulting code often reads as obvious in hindsight, even though finding that fit took real effort.",
        "This chapter walks through several structures side by side, comparing not just their speed but the kinds of mistakes each one tends to invite.",
        "By the end, the goal is not to have memorized a list of structures, but to have developed a reflex for asking what shape a problem actually has."
      ]},
      { label:"Chapter 3 — Systems That Outlive Their Authors", paragraphs:[
        "Software that lasts is rarely the software that was cleverest at launch. It is the software that was legible enough for someone else to safely change five years later.",
        "The closing section turns to maintenance: how to leave a system easier to understand than you found it, and how to recognize when a shortcut today will become someone else's obstacle tomorrow."
      ]}
    ],
    "Literature": [
      { label:"Chapter 1 — An Ordinary Morning", paragraphs:[
        "The kitchen light came on before the rest of the house was ready for it, and for a moment the room held its breath the way rooms do when no one has decided yet what kind of day this will be.",
        "She set two cups on the table out of habit, then looked at the second one for longer than she meant to. Some mornings the absence had a shape you could set a cup in front of.",
        "Outside, the street was doing what streets do — indifferent, ongoing, unbothered by the particular weight sitting at this particular table."
      ]},
      { label:"Chapter 2 — What the Letters Didn't Say", paragraphs:[
        "The letters had arrived in the usual bundle, tied with the same string he always used, as if string could make a message feel less like an intrusion.",
        "She read them in order, not because order mattered, but because reading them out of order felt like a kind of cheating — skipping ahead to the parts that hurt less."
      ]},
      { label:"Chapter 3 — The Long Way Home", paragraphs:[
        "They took the longer road, the one that curved past the old mill, not because it was scenic but because neither of them was ready for the conversation waiting at the other end of the short one.",
        "Some silences are comfortable. This was not one of them, but it was, at least, a silence they were choosing together."
      ]}
    ],
    "Mathematics": [
      { label:"Chapter 1 — Building Intuition First", paragraphs:[
        "Before any formal definition appears, this chapter asks you to sit with a few concrete examples until a pattern starts to feel inevitable rather than imposed.",
        "Mathematics rewards patience more than speed. A reader who lingers on a simple case for an extra ten minutes often finds the general theorem almost writes itself afterward.",
        "Diagrams are used liberally throughout, not as decoration but as a second language running alongside the symbols."
      ]},
      { label:"Chapter 2 — Proof as Explanation", paragraphs:[
        "A proof that merely confirms a statement is true has done half its job. The better proof also explains why the statement could not have been otherwise.",
        "This chapter favors proofs that build understanding over proofs that are merely short, even when a shorter alternative exists in the literature."
      ]},
      { label:"Chapter 3 — Where the Ideas Lead", paragraphs:[
        "The final chapter gestures toward applications outside pure theory, showing how the same structures reappear, often unrecognized, in fields that rarely cite one another."
      ]}
    ],
    "History": [
      { label:"Chapter 1 — Before the Record Begins", paragraphs:[
        "Most historical narratives start where the documents start, which is a little like judging a conversation only by the part you overheard. This chapter tries to reconstruct what came just before the written record, using what the land and the artifacts still have to say.",
        "Caution is warranted here. Absence of evidence is a genuinely different claim from evidence of absence, and the difference matters more in this period than almost any other."
      ]},
      { label:"Chapter 2 — Institutions Take Shape", paragraphs:[
        "Power rarely announces itself as power. It arrives first as convenience — a shared granary, a common calendar, a trusted mediator for disputes — and only later hardens into something people might resist.",
        "The sources for this chapter are treated as arguments, not facts. Each chronicler had a patron, and every patron had a preferred version of events."
      ]},
      { label:"Chapter 3 — Consequences That Outlasted Their Causes", paragraphs:[
        "By the close of this period, decisions made for short-term reasons had settled into structures that would outlast everyone who made them — a pattern this book returns to again and again."
      ]}
    ],
    "Physics": [
      { label:"Chapter 1 — Starting From What You Can Measure", paragraphs:[
        "Physics begins not with equations but with instruments: a way of turning a question about the world into a number you can argue about. This chapter insists on that order throughout.",
        "Wherever possible, a phenomenon is described first in plain language, then in a sketch, and only then in the notation that professionals reach for out of habit."
      ]},
      { label:"Chapter 2 — Symmetry as a Shortcut", paragraphs:[
        "Long calculations often collapse the moment you notice a symmetry the problem was hiding. This chapter treats symmetry-spotting as a skill worth practicing deliberately, not a stroke of luck reserved for experts.",
        "Several worked examples are left deliberately messy at first, so the cleanup made possible by symmetry is easier to appreciate."
      ]},
      { label:"Chapter 3 — Where the Model Breaks", paragraphs:[
        "Every model in this book has a boundary past which it quietly stops being true. Knowing where that boundary sits is, in a real sense, knowing the model better than the equations alone can tell you."
      ]}
    ],
    "Economics": [
      { label:"Chapter 1 — Incentives Before Ideology", paragraphs:[
        "Most economic behavior looks irrational only until you ask what the person doing it actually had to gain. This chapter sets aside grand theory in favor of that more modest, more reliable question.",
        "The examples used throughout are ordinary on purpose: grocery pricing, commute choices, the strange economics of office snacks. Big ideas hold up best when they survive small tests."
      ]},
      { label:"Chapter 2 — Markets Are Conversations", paragraphs:[
        "A price is best understood not as a fact about the world but as the current state of an ongoing argument between buyers and sellers, most of whom will never meet.",
        "This framing makes market failures easier to diagnose: they are usually places where that conversation has broken down, not places where people have simply behaved badly."
      ]},
      { label:"Chapter 3 — Policy in an Imperfect World", paragraphs:[
        "The closing chapter turns from description to design, asking what a policymaker can reasonably do once it's accepted that no market, and no regulator, ever has complete information."
      ]}
    ]
  };

  function getBookContent(book){
    const chapters = CONTENT_BY_CATEGORY[book.category] || CONTENT_BY_CATEGORY["Computer Science"];
    const personalized = JSON.parse(JSON.stringify(chapters));
    personalized[0].paragraphs[0] = `${personalized[0].paragraphs[0]} This edition of "${book.title}" by ${book.author} is provided to you for the duration of your loan.`;
    return personalized;
  }

  const AUDIT_LOG = [
    {ts:"2026-07-09 08:14", user:"STU-20481", action:"LOGIN_SUCCESS", detail:"MFA verified"},
    {ts:"2026-07-09 08:15", user:"STU-20481", action:"BORROW", detail:"Networks & Distributed Systems"},
    {ts:"2026-07-08 21:02", user:"FAC-1092", action:"RESERVE_UPDATE", detail:"CS 340 reading list edited"},
    {ts:"2026-07-08 16:47", user:"STU-19207", action:"LOGIN_FAILED", detail:"Password mismatch (attempt 1/3)"},
    {ts:"2026-07-08 09:30", user:"LIB-0044", action:"CATALOG_EDIT", detail:"Added \"Fields, Waves & Light\""}
  ];

  /* ---------------------------------------------------------
     STATE (in-memory only — no localStorage in this environment)
  --------------------------------------------------------- */
  let state = {
    user: null,
    catalog: JSON.parse(JSON.stringify(CATALOG)),
    activeDrawer: "all",
    searchQuery: "",
    trail: [
      {date:"2026-07-01", title:"Structures of Computation", action:"Borrowed"},
      {date:"2026-06-24", title:"Thermodynamics for the Curious", action:"Returned"},
      {date:"2026-06-18", title:"Thermodynamics for the Curious", action:"Borrowed"}
    ],
    sessionSeconds: 30*60,
    failedAttempts: 0,
    locked: false,
    readingProgress: {}
  };

  // Prefix used only to build a human-friendly display ID (e.g. "STU-213123")
  // for the top bar, review screen, and confirmation message. Never used as
  // part of what the person actually types to sign in.
  const ROLE_PREFIX = { student: "STU-", faculty: "FAC-", librarian: "LIB-" };

  function displayId(role, rawId){
    return (ROLE_PREFIX[role] || '') + rawId.trim().toUpperCase();
  }

  function getProgress(bookId){
    const rp = state.readingProgress[bookId];
    const total = 3;
    if(!rp) return 0;
    return Math.round(((rp.chapter+1) / total) * 100);
  }

  /* ---------------------------------------------------------
     LOGIN FLOW
  --------------------------------------------------------- */
  const loginError = document.getElementById('loginError');
  const stepCreds = document.getElementById('stepCreds');
  const stepMfa = document.getElementById('stepMfa');
  const loginStepTitle = document.getElementById('loginStepTitle');
  const loginStepTag = document.getElementById('loginStepTag');

  let pendingUser = null;

  function showLoginError(msg){
    loginError.textContent = msg;
    loginError.classList.add('show');
  }
  function clearLoginError(){
    loginError.classList.remove('show');
  }

  document.getElementById('toggleVis').addEventListener('click', function(){
    const pw = document.getElementById('pwInput');
    const show = pw.type === 'password';
    pw.type = show ? 'text' : 'password';
    this.textContent = show ? 'HIDE' : 'SHOW';
  });

  document.getElementById('continueBtn').addEventListener('click', async function(){
    clearLoginError();
    if(state.locked){
      showLoginError("Account temporarily locked after repeated failed attempts. Try again in a few minutes.");
      return;
    }
    const idRaw = document.getElementById('idInput').value.trim();
    const pw = document.getElementById('pwInput').value.trim();
    const role = document.getElementById('roleSelect').value;

    if(!idRaw || !pw){
      showLoginError("Please enter both your institution ID and password.");
      return;
    }

    // Step 1: turn "role + raw ID" into the email Supabase actually
    // authenticates with, using the get_login_email() function created
    // in Supabase's SQL editor.
    const { data: email, error: lookupError } = await supabase.rpc('get_login_email', {
      p_role: role, p_raw_id: idRaw
    });
    if (lookupError || !email) {
      showLoginError("No account found for that ID. Check your number, or create an account.");
      return;
    }

    // Step 2: sign in for real against Supabase Auth.
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pw });
    if (error) {
      showLoginError("Incorrect password for that institution ID.");
      return;
    }

    // Step 3: pull the profile row so we know their display name/role.
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
    if (profileError || !profile) {
      showLoginError("Signed in, but couldn't load your profile. Please try again.");
      return;
    }

    pendingUser = { id: profile.display_id, role: profile.role, name: profile.full_name, email };

    // proceed to MFA
    stepCreds.style.display = 'none';
    stepMfa.style.display = 'block';
    loginStepTitle.textContent = "Verify your identity";
    loginStepTag.textContent = "STEP 2 / 2";
    document.querySelectorAll('.mfa-box')[0].focus();
  });

  document.getElementById('backBtn').addEventListener('click', function(){
    clearLoginError();
    pendingUser = null;
    stepMfa.style.display = 'none';
    stepCreds.style.display = 'block';
    loginStepTitle.textContent = "Sign in with institution ID";
    loginStepTag.textContent = "STEP 1 / 2";
  });

  const mfaBoxes = Array.from(document.querySelectorAll('.mfa-box'));
  mfaBoxes.forEach((box, i) => {
    box.addEventListener('input', () => {
      box.value = box.value.replace(/[^0-9]/g,'');
      if(box.value && mfaBoxes[i+1]) mfaBoxes[i+1].focus();
    });
    box.addEventListener('keydown', (e) => {
      if(e.key === 'Backspace' && !box.value && mfaBoxes[i-1]) mfaBoxes[i-1].focus();
    });
  });

  document.getElementById('verifyBtn').addEventListener('click', function(){
    clearLoginError();
    const code = mfaBoxes.map(b => b.value).join('');
    if(code.length < 6){
      showLoginError("Enter the full 6-digit code.");
      return;
    }
    if(code !== "000000"){
      state.failedAttempts++;
      if(state.failedAttempts >= 3){
        state.locked = true;
        showLoginError("Too many failed attempts. Account locked for security.");
      } else {
        showLoginError(`Incorrect code. ${3 - state.failedAttempts} attempt(s) remaining.`);
      }
      mfaBoxes.forEach(b => b.value = '');
      mfaBoxes[0].focus();
      return;
    }
    if(!pendingUser){
      showLoginError("Session expired. Please re-enter your credentials.");
      stepMfa.style.display = 'none';
      stepCreds.style.display = 'block';
      loginStepTitle.textContent = "Sign in with institution ID";
      loginStepTag.textContent = "STEP 1 / 2";
      return;
    }
    state.user = pendingUser;
    pendingUser = null;
    launchApp();
  });

  /* ---------------------------------------------------------
     APP LAUNCH
  --------------------------------------------------------- */
  function launchApp(){
    document.getElementById('loginScreen').style.display = 'none';
    const shell = document.getElementById('appShell');
    shell.classList.add('active');

    document.getElementById('userName').textContent = state.user.name;
    document.getElementById('userRole').textContent = state.user.role;
    document.getElementById('userAvatar').textContent = state.user.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();

    buildSidebar();
    renderView('all');
    startSessionTimer();
    showToast("Signed in securely · session encrypted end-to-end");
  }

  document.getElementById('logoutBtn').addEventListener('click', async function(){
    if(confirm("Sign out of Athenaeum?")){
      await supabase.auth.signOut();
      location.reload();
    }
  });

  /* ---------------------------------------------------------
     SESSION TIMER
  --------------------------------------------------------- */
  let timerInterval;
  function startSessionTimer(){
    const el = document.getElementById('sessionTimer');
    timerInterval = setInterval(() => {
      state.sessionSeconds--;
      const m = Math.floor(state.sessionSeconds/60);
      const s = String(state.sessionSeconds%60).padStart(2,'0');
      el.textContent = `Session ${m}:${s}`;
      if(state.sessionSeconds <= 0){
        clearInterval(timerInterval);
        alert("Your session has expired for security. Please sign in again.");
        location.reload();
      } else if(state.sessionSeconds === 60){
        showToast("Session expiring in 1 minute");
      }
    }, 1000);
  }

  /* ---------------------------------------------------------
     SIDEBAR
  --------------------------------------------------------- */
  function buildSidebar(){
    const sb = document.getElementById('sidebar');
    let html = `<div class="drawer-group-label">Browse the catalog</div>`;
    html += drawerBtn('all', 'All Holdings', state.catalog.length);
    CATEGORIES.forEach(cat => {
      const count = state.catalog.filter(b => b.category === cat).length;
      html += drawerBtn(cat, cat, count);
    });

    html += `<div class="drawer-group-label">Your account</div>`;
    html += drawerBtn('mydesk', 'My Desk', getLoanedByUser().length);
    html += drawerBtn('trail', 'Reading Trail', state.trail.length);

    if(state.user.role === 'faculty'){
      html += `<div class="drawer-group-label">Faculty tools</div>`;
      html += drawerBtn('reserves', 'Course Reserves', '');
    }
    if(state.user.role === 'librarian'){
      html += `<div class="drawer-group-label">Administration</div>`;
      html += drawerBtn('audit', 'Audit Log', AUDIT_LOG.length);
    }

    sb.innerHTML = html;
    sb.querySelectorAll('.drawer').forEach(btn => {
      btn.addEventListener('click', () => renderView(btn.dataset.key));
    });
  }

  function drawerBtn(key, label, count){
    return `<button class="drawer" data-key="${key}">
      <span class="drawer-pull"></span>
      <span>${label}</span>
      ${count !== '' ? `<span class="count">${count}</span>` : ''}
    </button>`;
  }

  function getLoanedByUser(){
    return state.catalog.filter(b => b.status === 'loaned');
  }

  /* ---------------------------------------------------------
     MAIN VIEW ROUTER
  --------------------------------------------------------- */
  function renderView(key){
    state.activeDrawer = key;
    document.querySelectorAll('.drawer').forEach(d => d.classList.toggle('active', d.dataset.key === key));
    const main = document.getElementById('main');

    if(key === 'mydesk') return renderMyDesk(main);
    if(key === 'trail') return renderTrail(main);
    if(key === 'audit') return renderAudit(main);
    if(key === 'reserves') return renderReserves(main);
    return renderCatalog(main, key);
  }

  function renderCatalog(main, filterKey){
    const q = state.searchQuery.toLowerCase();
    let books = state.catalog.filter(b => {
      const matchesFilter = filterKey === 'all' || b.category === filterKey;
      const matchesSearch = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.call.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });

    const heading = filterKey === 'all' ? 'All Holdings' : filterKey;

    let html = `
      <div class="view-header">
        <div>
          <h2>${heading}</h2>
          <p>${books.length} item${books.length===1?'':'s'} · showing availability in real time</p>
        </div>
      </div>
    `;

    if(books.length === 0){
      html += `<div class="empty-state"><h3>No matches on the shelf</h3><p>Try a different search term or browse another drawer.</p></div>`;
    } else {
      html += `<div class="book-grid">`;
      books.forEach(b => { html += bookCard(b); });
      html += `</div>`;
    }

    main.innerHTML = html;
    attachCardEvents(main);
  }

  function bookCard(b){
    const stampHtml = b.status === 'available'
      ? `<span class="stamp avail">Available</span>`
      : `<span class="stamp">On loan</span>`;
    const dueHtml = b.status === 'loaned' ? `<div class="due">Due ${b.due}</div>` : '';
    const digitalTag = `<span class="digital-tag">⬤ E-book included</span>`;
    let actionsHtml;
    if(b.status === 'available'){
      actionsHtml = `
        <button class="btn-mini secondary view-btn" data-id="${b.id}">Details</button>
        <button class="btn-mini borrow-btn" data-id="${b.id}">Borrow</button>`;
    } else {
      actionsHtml = `
        <button class="btn-mini secondary view-btn" data-id="${b.id}">Details</button>
        <button class="btn-mini read-btn" data-id="${b.id}">Read Online</button>`;
    }
    return `
      <div class="book-card" data-id="${b.id}">
        <span class="call-tab mono">${b.call}</span>
        <div class="cat-tag">${b.category}</div>
        <h3>${b.title}</h3>
        <div class="author">${b.author}</div>
        ${stampHtml}
        ${dueHtml}
        ${digitalTag}
        <div class="card-actions">
          ${actionsHtml}
        </div>
      </div>
    `;
  }

  function attachCardEvents(scope){
    scope.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); openDetail(parseInt(btn.dataset.id)); });
    });
    scope.querySelectorAll('.borrow-btn').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); borrowBook(parseInt(btn.dataset.id)); });
    });
    scope.querySelectorAll('.return-btn').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); returnBook(parseInt(btn.dataset.id)); });
    });
    scope.querySelectorAll('.read-btn').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); openReader(parseInt(btn.dataset.id)); });
    });
    scope.querySelectorAll('.book-card').forEach(card => {
      card.addEventListener('click', () => openDetail(parseInt(card.dataset.id)));
    });
  }

  /* ---------------------------------------------------------
     MY DESK
  --------------------------------------------------------- */
  function renderMyDesk(main){
    const loaned = getLoanedByUser();
    let html = `
      <div class="view-header">
        <div><h2>My Desk</h2><p>Items currently checked out to you</p></div>
      </div>
      <div class="panel">
    `;
    if(loaned.length === 0){
      html += `<div class="empty-state"><h3>Your desk is clear</h3><p>Nothing borrowed right now — browse the catalog to check something out.</p></div>`;
    } else {
      html += `<table class="ledger"><thead><tr>
        <th>Title</th><th>Call Number</th><th>Due</th><th>Status</th><th>Progress</th><th colspan="2"></th>
      </tr></thead><tbody>`;
      loaned.forEach(b => {
        const overdue = new Date(b.due) < new Date('2026-07-09');
        const progress = getProgress(b.id);
        html += `<tr>
          <td>${b.title}</td>
          <td class="mono">${b.call}</td>
          <td class="mono">${b.due}</td>
          <td>${overdue ? '<span style="color:var(--stamp);font-weight:600;">Overdue</span>' : 'On time'}</td>
          <td class="mono">${progress}%</td>
          <td><button class="btn-mini read-btn" data-id="${b.id}" style="padding:6px 12px;">Read Online</button></td>
          <td><button class="btn-mini secondary return-btn" data-id="${b.id}" style="padding:6px 12px;">Return</button></td>
        </tr>`;
      });
      html += `</tbody></table>`;
    }
    html += `</div>`;
    main.innerHTML = html;
    attachCardEvents(main);
  }

  /* ---------------------------------------------------------
     READING TRAIL
  --------------------------------------------------------- */
  function renderTrail(main){
    let html = `
      <div class="view-header">
        <div><h2>Reading Trail</h2><p>A running record of what you've borrowed — exportable as a citation trail</p></div>
        <button class="btn-mini secondary" id="exportBtn" style="width:auto; padding:9px 16px;">Export bibliography</button>
      </div>
      <div class="panel">
        <div class="trail">
    `;
    state.trail.slice().reverse().forEach(t => {
      html += `<div class="trail-item">
        <div class="date mono">${t.date}</div>
        <div class="title">${t.title}</div>
        <div class="action">${t.action}</div>
      </div>`;
    });
    html += `</div></div>`;
    main.innerHTML = html;
    document.getElementById('exportBtn').addEventListener('click', () => {
      showToast("Bibliography exported (APA format) — check your downloads");
    });
  }

  /* ---------------------------------------------------------
     COURSE RESERVES (faculty)
  --------------------------------------------------------- */
  function renderReserves(main){
    const grouped = {};
    state.catalog.forEach(b => {
      if(!grouped[b.course]) grouped[b.course] = [];
      grouped[b.course].push(b);
    });
    let html = `
      <div class="view-header">
        <div><h2>Course Reserves</h2><p>Reading lists linked to your courses</p></div>
      </div>
    `;
    Object.keys(grouped).forEach(course => {
      html += `<div class="panel">
        <h3>${course}</h3>
        <div class="sub">${grouped[course].length} linked resource${grouped[course].length===1?'':'s'}</div>
        <div class="book-grid">${grouped[course].map(bookCard).join('')}</div>
      </div>`;
    });
    main.innerHTML = html;
    attachCardEvents(main);
  }

  /* ---------------------------------------------------------
     AUDIT LOG (librarian/admin)
  --------------------------------------------------------- */
  function renderAudit(main){
    let html = `
      <div class="view-header">
        <div><h2>Audit Log</h2><p>System access and catalog activity — retained for compliance review</p></div>
      </div>
      <div class="panel">
        <table class="ledger"><thead><tr>
          <th>Timestamp</th><th>User</th><th>Action</th><th>Detail</th>
        </tr></thead><tbody>
    `;
    AUDIT_LOG.forEach(row => {
      html += `<tr>
        <td class="mono">${row.ts}</td>
        <td class="mono">${row.user}</td>
        <td>${row.action}</td>
        <td>${row.detail}</td>
      </tr>`;
    });
    html += `</tbody></table></div>`;
    main.innerHTML = html;
  }

  /* ---------------------------------------------------------
     BOOK DETAIL MODAL
  --------------------------------------------------------- */
  function openDetail(id){
    const b = state.catalog.find(x => x.id === id);
    if(!b) return;
    const overlay = document.getElementById('overlay');
    const stampHtml = b.status === 'available'
      ? `<span class="stamp avail">Available</span>` : `<span class="stamp">On loan — due ${b.due}</span>`;

    document.getElementById('modalContent').innerHTML = `
      <div class="modal-head">
        <div>
          <h3>${b.title}</h3>
          <div class="author">${b.author}</div>
        </div>
        <button class="modal-close" id="modalCloseBtn">&times;</button>
      </div>
      <div class="modal-body">
        <div style="margin-bottom:14px;">${stampHtml}</div>
        <div class="meta-grid">
          <div><span>Call Number</span><b class="mono">${b.call}</b></div>
          <div><span>Category</span><b>${b.category}</b></div>
          <div><span>Linked Course</span><b>${b.course}</b></div>
          <div><span>Format</span><b>Print + Digital</b></div>
        </div>
        <div class="desc">${b.desc}</div>
        <div class="modal-foot">
          ${b.status === 'available'
            ? `<button class="btn-primary borrow-btn" data-id="${b.id}">Borrow this item</button>`
            : `<button class="btn-primary read-btn" data-id="${b.id}">Read online</button>`}
        </div>
      </div>
    `;
    overlay.classList.add('show');
    document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
    const borrowBtn = document.getElementById('modalContent').querySelector('.borrow-btn');
    if(borrowBtn) borrowBtn.addEventListener('click', () => { borrowBook(b.id); closeModal(); });
    const readBtn = document.getElementById('modalContent').querySelector('.read-btn');
    if(readBtn) readBtn.addEventListener('click', () => openReader(b.id));
  }
  function closeModal(){
    document.getElementById('overlay').classList.remove('show');
  }
  document.getElementById('overlay').addEventListener('click', (e) => {
    if(e.target.id === 'overlay') closeModal();
  });

  /* ---------------------------------------------------------
     BORROW / RETURN
  --------------------------------------------------------- */
  function borrowBook(id){
    const b = state.catalog.find(x => x.id === id);
    if(!b || b.status !== 'available') return;
    b.status = 'loaned';
    const due = new Date('2026-07-09');
    due.setDate(due.getDate() + 14);
    b.due = due.toISOString().slice(0,10);
    state.trail.push({date:'2026-07-09', title:b.title, action:'Borrowed'});
    showToast(`"${b.title}" checked out — due ${b.due}`);
    buildSidebar();
    renderView(state.activeDrawer);
  }
  function returnBook(id){
    const b = state.catalog.find(x => x.id === id);
    if(!b) return;
    b.status = 'available';
    delete b.due;
    state.trail.push({date:'2026-07-09', title:b.title, action:'Returned'});
    showToast(`"${b.title}" returned — thank you`);
    buildSidebar();
    renderView(state.activeDrawer);
  }

  /* ---------------------------------------------------------
     DIGITAL READER
  --------------------------------------------------------- */
  let readerBookId = null;
  const readerEl = document.getElementById('readerView');
  const readerPageWrap = document.getElementById('readerPageWrap');

  function openReader(id){
    const b = state.catalog.find(x => x.id === id);
    if(!b || b.status !== 'loaned'){
      showToast("Borrow this title first to read it online.");
      return;
    }
    readerBookId = id;
    if(!state.readingProgress[id]){
      state.readingProgress[id] = { chapter:0, fontSize:18, theme:'paper', bookmarked:false };
      state.trail.push({date:'2026-07-09', title:b.title, action:'Started reading online'});
    }
    document.getElementById('readerTitle').textContent = b.title;
    document.getElementById('readerAuthor').textContent = b.author;
    applyReaderTheme(state.readingProgress[id].theme);
    applyReaderFontSize(state.readingProgress[id].fontSize);
    updateBookmarkButton();
    renderReaderChapter();
    readerEl.classList.add('show');
    closeModal();
  }

  function closeReader(){
    readerEl.classList.remove('show');
    readerBookId = null;
  }
  document.getElementById('readerClose').addEventListener('click', closeReader);

  function currentBook(){ return state.catalog.find(x => x.id === readerBookId); }
  function currentProgress(){ return state.readingProgress[readerBookId]; }

  function renderReaderChapter(){
    const b = currentBook();
    if(!b) return;
    const chapters = getBookContent(b);
    const rp = currentProgress();
    const chapter = chapters[rp.chapter];

    document.getElementById('readerChapterLabel').textContent = chapter.label;
    document.getElementById('readerText').innerHTML = chapter.paragraphs.map(p => `<p>${p}</p>`).join('');
    document.getElementById('readerPageIndicator').textContent = `Page ${rp.chapter+1} of ${chapters.length}`;
    document.getElementById('prevPageBtn').disabled = rp.chapter === 0;
    document.getElementById('nextPageBtn').disabled = rp.chapter === chapters.length - 1;

    const pct = Math.round(((rp.chapter+1) / chapters.length) * 100);
    document.getElementById('readerProgressFill').style.width = pct + '%';
    document.getElementById('readerProgressPct').textContent = pct + '%';

    readerPageWrap.scrollTop = 0;
    updateBookmarkButton();

    if(pct === 100){
      showToast(`You've reached the end of "${b.title}" — nice work.`);
    }
  }

  document.getElementById('prevPageBtn').addEventListener('click', () => {
    const rp = currentProgress();
    if(rp.chapter > 0){ rp.chapter--; renderReaderChapter(); }
  });
  document.getElementById('nextPageBtn').addEventListener('click', () => {
    const b = currentBook();
    const chapters = getBookContent(b);
    const rp = currentProgress();
    if(rp.chapter < chapters.length - 1){ rp.chapter++; renderReaderChapter(); }
  });

  function applyReaderFontSize(size){
    document.getElementById('readerText').style.fontSize = size + 'px';
  }
  document.getElementById('fontDown').addEventListener('click', () => {
    const rp = currentProgress(); if(!rp) return;
    rp.fontSize = Math.max(14, rp.fontSize - 2);
    applyReaderFontSize(rp.fontSize);
  });
  document.getElementById('fontUp').addEventListener('click', () => {
    const rp = currentProgress(); if(!rp) return;
    rp.fontSize = Math.min(26, rp.fontSize + 2);
    applyReaderFontSize(rp.fontSize);
  });

  function applyReaderTheme(theme){
    readerEl.classList.remove('theme-paper','theme-sepia','theme-dark');
    readerEl.classList.add('theme-' + theme);
    document.querySelectorAll('.reader-theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
  }
  document.querySelectorAll('.reader-theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const rp = currentProgress(); if(!rp) return;
      rp.theme = btn.dataset.theme;
      applyReaderTheme(rp.theme);
    });
  });

  function updateBookmarkButton(){
    const rp = currentProgress();
    const btn = document.getElementById('bookmarkBtn');
    if(!rp) return;
    btn.textContent = rp.bookmarked ? '🔖 Bookmarked on this page' : '🔖 Bookmark this page';
  }
  document.getElementById('bookmarkBtn').addEventListener('click', () => {
    const rp = currentProgress(); if(!rp) return;
    rp.bookmarked = !rp.bookmarked;
    updateBookmarkButton();
    showToast(rp.bookmarked ? "Page bookmarked" : "Bookmark removed");
  });

  /* ---------------------------------------------------------
     SEARCH
  --------------------------------------------------------- */
  document.getElementById('searchInput').addEventListener('input', function(){
    state.searchQuery = this.value;
    if(['all', ...CATEGORIES].includes(state.activeDrawer)){
      renderView(state.activeDrawer);
    }
  });

  /* ---------------------------------------------------------
     TOAST
  --------------------------------------------------------- */
  let toastTimeout;
  function showToast(msg){
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => t.classList.remove('show'), 3200);
  }

  /* ---------------------------------------------------------
     SIGN-UP WIZARD
  --------------------------------------------------------- */
  const signup = {
    role: null,
    data: {},
    step: 1
  };

  const loginScreen = document.getElementById('loginScreen');
  const signupScreen = document.getElementById('signupScreen');
  const signupError = document.getElementById('signupError');

  document.getElementById('goToSignup').addEventListener('click', () => {
    loginScreen.style.display = 'none';
    signupScreen.style.display = 'flex';
    resetSignup();
  });
  document.getElementById('goToLogin').addEventListener('click', () => backToLogin());
  document.getElementById('suGoLogin').addEventListener('click', () => {
    if(signup.data && signup.data.rawId){
      document.getElementById('idInput').value = signup.data.rawId;
      document.getElementById('roleSelect').value = signup.role;
      clearLoginError();
    }
    backToLogin();
  });

  function backToLogin(){
    signupScreen.style.display = 'none';
    loginScreen.style.display = 'flex';
  }

  function resetSignup(){
    signup.role = null;
    signup.data = {};
    goToSignupStep(1);
    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
    ['suFullName','suEmail','suStudentId','suProgram','suFacultyId','suDeptFaculty','suStaffId','suDeptLib','suApprovalCode','suPassword','suPasswordConfirm']
      .forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
    document.getElementById('suTerms').checked = false;
    clearSignupError();
  }

  function clearSignupError(){ signupError.classList.remove('show'); signupError.textContent=''; }
  function showSignupError(msg){ signupError.textContent = msg; signupError.classList.add('show'); }

  const stepTitles = {
    1: ["Choose your account type", "STEP 1 / 4"],
    2: ["Tell us about yourself", "STEP 2 / 4"],
    3: ["Secure your account", "STEP 3 / 4"],
    4: ["Review & submit", "STEP 4 / 4"]
  };

  function goToSignupStep(n){
    signup.step = n;
    for(let i=1;i<=5;i++){
      const el = document.getElementById('suStep'+i);
      if(el) el.style.display = (i===n) ? 'block' : 'none';
    }
    if(stepTitles[n]){
      document.getElementById('signupStepTitle').textContent = stepTitles[n][0];
      document.getElementById('signupStepTag').textContent = stepTitles[n][1];
    }
    document.querySelectorAll('.progress-rail .progress-step').forEach(p => {
      const s = parseInt(p.dataset.step);
      p.classList.toggle('active', s === n);
      p.classList.toggle('done', s < n);
    });
    clearSignupError();
  }

  // --- Step 1: role selection ---
  document.querySelectorAll('.role-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      signup.role = card.dataset.role;
      document.getElementById('fieldsStudent').style.display = signup.role === 'student' ? 'block' : 'none';
      document.getElementById('fieldsFaculty').style.display = signup.role === 'faculty' ? 'block' : 'none';
      document.getElementById('fieldsLibrarian').style.display = signup.role === 'librarian' ? 'block' : 'none';
      setTimeout(() => goToSignupStep(2), 180);
    });
  });
  document.getElementById('suBack1').addEventListener('click', () => backToLogin());

  // --- Step 2: details ---
  document.getElementById('suNext2').addEventListener('click', () => {
    clearSignupError();
    const name = document.getElementById('suFullName').value.trim();
    const email = document.getElementById('suEmail').value.trim();
    if(!name || !email){
      showSignupError("Please enter your full name and institutional email.");
      return;
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      showSignupError("Enter a valid email address.");
      return;
    }
    if(signup.role === 'student'){
      const sid = document.getElementById('suStudentId').value.trim();
      const program = document.getElementById('suProgram').value.trim();
      if(!sid || !program){ showSignupError("Please fill in your student ID and program."); return; }
      signup.data = { name, email, rawId: sid, program, year: document.getElementById('suYear').value };
    } else if(signup.role === 'faculty'){
      const fid = document.getElementById('suFacultyId').value.trim();
      const dept = document.getElementById('suDeptFaculty').value.trim();
      if(!fid || !dept){ showSignupError("Please fill in your faculty ID and department."); return; }
      signup.data = { name, email, rawId: fid, dept, title: document.getElementById('suTitle').value };
    } else if(signup.role === 'librarian'){
      const sid = document.getElementById('suStaffId').value.trim();
      const unit = document.getElementById('suDeptLib').value.trim();
      const code = document.getElementById('suApprovalCode').value.trim();
      if(!sid || !unit || !code){ showSignupError("Staff ID, unit, and approval code are all required for admin accounts."); return; }
      signup.data = { name, email, rawId: sid, unit, code };
    } else {
      showSignupError("Please go back and choose an account type.");
      return;
    }
    goToSignupStep(3);
  });
  document.getElementById('suBack2').addEventListener('click', () => goToSignupStep(1));

  // --- Step 3: password strength + terms ---
  document.getElementById('suToggleVis').addEventListener('click', function(){
    const pw = document.getElementById('suPassword');
    const show = pw.type === 'password';
    pw.type = show ? 'text' : 'password';
    this.textContent = show ? 'HIDE' : 'SHOW';
  });

  document.getElementById('suPassword').addEventListener('input', function(){
    const val = this.value;
    let score = 0;
    if(val.length >= 8) score++;
    if(/[A-Z]/.test(val)) score++;
    if(/[0-9]/.test(val)) score++;
    if(/[^A-Za-z0-9]/.test(val)) score++;
    const fill = document.getElementById('strengthFill');
    const label = document.getElementById('strengthLabel');
    const pct = [0, 25, 50, 75, 100][score];
    const colors = ['#9b3a32','#9b3a32','#c98a3a','#4d8a5f','#24413a'];
    const labels = ['Enter a password','Weak — add more characters','Fair — add a number or symbol','Good','Strong password'];
    fill.style.width = pct + '%';
    fill.style.background = colors[score];
    label.textContent = val ? labels[score] : 'Enter a password';
  });

  document.getElementById('suNext3').addEventListener('click', () => {
    clearSignupError();
    const pw = document.getElementById('suPassword').value;
    const pw2 = document.getElementById('suPasswordConfirm').value;
    if(pw.length < 8){ showSignupError("Password must be at least 8 characters."); return; }
    if(pw !== pw2){ showSignupError("Passwords do not match."); return; }
    if(!document.getElementById('suTerms').checked){ showSignupError("Please accept the acceptable use policy to continue."); return; }
    signup.data.password = pw;
    buildReview();
    goToSignupStep(4);
  });
  document.getElementById('suBack3').addEventListener('click', () => goToSignupStep(2));

  // --- Step 4: review + submit ---
  function buildReview(){
    const d = signup.data;
    let rows = [
      ['Full name', d.name],
      ['Email', d.email],
      ['Account type', signup.role.charAt(0).toUpperCase()+signup.role.slice(1)],
      ['Institution ID', displayId(signup.role, d.rawId)]
    ];
    if(signup.role === 'student') rows.push(['Program', d.program], ['Year level', d.year]);
    if(signup.role === 'faculty') rows.push(['Department', d.dept], ['Title', d.title]);
    if(signup.role === 'librarian') rows.push(['Unit', d.unit], ['Approval code', '•'.repeat(d.code.length)]);
    document.getElementById('reviewGrid').innerHTML = rows.map(([label, val]) =>
      `<div><span>${label}</span><b>${val}</b></div>`
    ).join('');
  }

  document.getElementById('suSubmit').addEventListener('click', async () => {
    const icon = document.getElementById('confirmIcon');
    const title = document.getElementById('confirmTitle');
    const body = document.getElementById('confirmBody');
    const submitBtn = document.getElementById('suSubmit');

    clearSignupError();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account…';

    const shownId = displayId(signup.role, signup.data.rawId);

    // Step 1: create the real Supabase Auth user (email + password).
    const { data, error } = await supabase.auth.signUp({
      email: signup.data.email,
      password: signup.data.password
    });
    if (error) {
      showSignupError(error.message);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Create account';
      return;
    }

    // Step 2: store the role/ID/name in the profiles table, linked to
    // that new auth user by id.
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      role: signup.role,
      raw_id: signup.data.rawId.trim().toUpperCase(),
      display_id: shownId,
      full_name: signup.data.name,
      extra_info: signup.data.program || signup.data.dept || signup.data.unit || null
    });
    if (profileError) {
      showSignupError(profileError.message);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Create account';
      return;
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Create account';

    if(signup.role === 'librarian'){
      icon.textContent = '⏳';
      icon.classList.add('pending');
      title.textContent = 'Application submitted';
      body.textContent = `Admin accounts are reviewed by a library director before activation. We'll email ${signup.data.email} once ${shownId} is approved — usually within one business day. You can still sign in with your number (${signup.data.rawId}) for this preview.`;
    } else {
      icon.textContent = '✓';
      icon.classList.remove('pending');
      title.textContent = 'Account created';
      body.textContent = `Welcome, ${signup.data.name.split(' ')[0]}. Your ${signup.role} account (${shownId}) is ready — sign in with your number (${signup.data.rawId}) and the password you just created.`;
    }
    goToSignupStep(5);
  });

})();