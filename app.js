(() => {
  const config = window.PORTFOLIO_CONFIG;
  const root = new URL(".", document.currentScript.src);
  const pathname = decodeURIComponent(location.pathname).replace(/\\/g, "/");
  const rootPath = decodeURIComponent(root.pathname).replace(/\\/g, "/");
  const relativePath = pathname.startsWith(rootPath) ? pathname.slice(rootPath.length) : pathname;
  const pageParts = relativePath.split("/").filter(Boolean).filter((part) => part !== "index.html");
  const page = pageParts.at(-1) === "404.html" ? "404" : pageParts.at(-1) || "home";
  const pageNames = ["home", "about", "skills", "projects", "services", "contact", "resume"];
  const pageMeta = {
    home: ["Home", "Gospel Ibanga — Full Stack Developer building responsive, user-focused web experiences."],
    about: ["About", "Learn about Gospel Ibanga's approach to full-stack web development."],
    skills: ["Skills", "Explore Gospel Ibanga's configurable full-stack development skills."],
    projects: ["Projects", "A configurable showcase of Gospel Ibanga's selected web development projects."],
    services: ["Services", "Possible web development services from Gospel Ibanga. Service ideas are editable and require confirmation."],
    contact: ["Contact", "Contact Gospel Ibanga about a web project or professional opportunity."],
    resume: ["Resume", "A configurable online CV for Gospel Ibanga, Full Stack Developer."]
  };
  const activePage = pageNames.includes(page) ? page : "404";
  const esc = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const pageUrl = (name) => name === "home" ? new URL("index.html", root).href : new URL(`${name}/index.html`, root).href;
  const rootUrl = (path) => new URL(path, root).href;
  const projectStyles = document.createElement("link");
  projectStyles.rel = "stylesheet";
  projectStyles.href = rootUrl("project-cards.css");
  document.head.append(projectStyles);
  const safeExternal = (value) => /^https:\/\//i.test(value || "");
  const externalLink = (url, label, className = "") => safeExternal(url) ? `<a class="${className}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}</a>` : "";
  const githubLink = (className = "") => config.githubUrl ? externalLink(config.githubUrl, "GitHub <span aria-hidden=\"true\">↗</span>", className) : "";
  const resumeLink = (className = "button button-secondary") => config.resumeUrl ? `<a class="${className}" href="${esc(rootUrl(config.resumeUrl))}" download>Download my CV <span aria-hidden="true">↓</span></a>` : "";
  const phoneDigits = config.phone.replace(/[^+\d]/g, "");
  const whatsappDigits = config.whatsapp.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(config.whatsappMessage)}`;
  const main = document.querySelector("#site-content");

  function renderNav() {
    const links = ["home", "about", "skills", "projects", "services", "contact"];
    return `<a class="brand" href="${pageUrl("home")}" aria-label="${esc(config.name)}, home"><span class="brand-symbol">G<span>.</span></span><span class="brand-copy"><strong>${esc(config.name)}</strong><small>${esc(config.title)}</small></span></a>
      <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span></button>
      <nav class="nav" id="primary-nav" aria-label="Main navigation">${links.map((name) => `<a href="${pageUrl(name)}" ${activePage === name ? 'aria-current="page"' : ""}>${name === "home" ? "Home" : name[0].toUpperCase() + name.slice(1)}</a>`).join("")}
        <button class="theme-toggle" type="button" aria-label="Switch to light theme" title="Switch to light theme"><span class="theme-icon" aria-hidden="true">☼</span><span class="theme-text">Light</span></button>
        <a class="nav-cta" href="${pageUrl("contact")}">Let's talk <span aria-hidden="true">↗</span></a>
      </nav>`;
  }

  function renderFooter() {
    const footerPages = ["about", "skills", "projects", "services", "contact", ...(config.resumeUrl ? ["resume"] : [])];
    return `<footer class="footer"><div class="footer-main"><a class="brand" href="${pageUrl("home")}"><span class="brand-symbol">G<span>.</span></span><span class="brand-copy"><strong>${esc(config.name)}</strong><small>${esc(config.title)}</small></span></a><p>Building digital experiences from idea to reality.</p><div class="footer-social"><a href="mailto:${esc(config.email)}">Email <span aria-hidden="true">↗</span></a><a href="tel:${esc(phoneDigits)}">Call <span aria-hidden="true">↗</span></a>${externalLink(whatsappUrl, "WhatsApp <span aria-hidden=\"true\">↗</span>")}${externalLink(config.linkedinUrl, "LinkedIn <span aria-hidden=\"true\">↗</span>")}${githubLink()}</div></div><div class="footer-bottom"><nav aria-label="Footer navigation">${footerPages.map((name) => `<a href="${pageUrl(name)}">${name[0].toUpperCase() + name.slice(1)}</a>`).join("")}</nav><span>© ${new Date().getFullYear()} ${esc(config.name)}</span><a class="back-top" href="${pageUrl("home")}#site-header">Back to top ↑</a></div></footer>`;
  }

  function reveal(content, className = "") { return `<div class="reveal ${className}">${content}</div>`; }
  function pageHeader(number, eyebrow, title, description = "") {
    return `<div class="page-heading"><p class="eyebrow"><span class="eyebrow-index">${number}</span>${esc(eyebrow)}</p><h1>${title}</h1>${description ? `<p class="page-lede">${esc(description)}</p>` : ""}</div>`;
  }
  function sectionLabel(title) { return `<p class="section-kicker">${esc(title)}</p>`; }
  function projectCard(project, index) {
    const screenshot = project.image ? `<img class="project-image" src="${esc(rootUrl(project.image))}" alt="${esc(project.imageAlt || `Illustrative project preview for ${project.name}; not a screenshot`)}" loading="lazy"><span class="project-image-caption">${project.placeholder ? "Original placeholder artwork" : "Illustrative preview · not a screenshot"}</span>` : `<div class="project-placeholder-art" aria-label="Illustrative CSS preview; not a screenshot"><div class="thumb-window"><div class="thumb-top"><i></i><i></i><i></i><span>${esc(project.name)}</span></div><div class="thumb-content"><b></b><i></i><i></i><i></i><em></em></div></div><span class="thumb-caption">Illustrative preview · not a screenshot</span></div>`;
    const stack = (project.stack || []).map((item) => `<span class="tag">${esc(item)}</span>`).join("");
    const live = safeExternal(project.liveUrl) ? `<a class="button button-primary" href="${esc(project.liveUrl)}" target="_blank" rel="noopener noreferrer">Live Demo <span aria-hidden="true">↗</span></a>` : "";
    const repo = safeExternal(project.githubUrl) ? `<a class="button button-secondary" href="${esc(project.githubUrl)}" target="_blank" rel="noopener noreferrer">View Source Code <span aria-hidden="true">↗</span></a>` : "";
    const type = project.placeholder ? "Coming Soon" : (project.category || "Project");
    return `<article class="project-card reveal" style="--card-index:${index}"><div class="project-media">${screenshot}<span class="project-category">${esc(type)}</span></div><div class="project-detail"><div><h3>${esc(project.name)}</h3><p>${esc(project.description)}</p></div>${stack ? `<div class="tag-list">${stack}</div>` : ""}<div class="project-links">${live}${repo}${project.placeholder ? `<span class="placeholder-note">Coming soon · add verified project details and links in site-config.js.</span>` : ""}</div></div></article>`;
  }
  const placeholderProjects = Array.from({ length: 7 }, (_, index) => ({ placeholder: true, name: `Project ${String(index + 1).padStart(2, "0")} — Add your project`, description: "Reserved for a real project. Add its verified description, stack, and links in site-config.js.", category: "" }));
  function renderProjectGrid(projects) { return projects.length ? `<div class="project-grid">${projects.map(projectCard).join("")}</div>` : `<div class="empty-state"><span class="empty-icon" aria-hidden="true">✳</span><h3>No projects added yet</h3><p>Your real projects can appear here when you're ready to share them. Add them to the <code>projects</code> list in <code>site-config.js</code>.</p></div>`; }

  function homePage() {
    const featured = config.projects.filter((project) => project.featured).slice(0, 3);
    const shown = featured.length ? featured : (config.projects.length ? config.projects.slice(0, 3) : placeholderProjects);
    return `<main id="main">
      <section class="hero wrap" aria-labelledby="hero-title"><div class="hero-mesh" aria-hidden="true"></div><div class="hero-dots" aria-hidden="true"></div>
        <div class="hero-copy"><p class="eyebrow"><span class="availability-dot"></span> ${esc(config.title)} <span class="eyebrow-rule"></span></p><p class="hero-greeting">Hello, I'm</p><h1 id="hero-title">Gospel <span>Ibanga<span class="title-period">.</span></span></h1>
          <div class="role-row"><span class="role-label">I build as a</span><span class="typed-role" aria-live="polite">Full Stack Developer</span><span class="typing-caret" aria-hidden="true"></span></div>
          <h2>Building Digital Experiences<br class="desktop-only"> <span class="gradient-text">From Idea to Reality.</span></h2><p class="hero-description">${esc(config.intro)}</p>
          <div class="hero-actions"><a class="button button-primary magnetic" href="${pageUrl("projects")}">View My Projects <span aria-hidden="true">↘</span></a><a class="button button-secondary magnetic" href="${pageUrl("contact")}">Contact Me <span aria-hidden="true">↗</span></a></div>
          <div class="hero-subactions">${githubLink("text-button")} ${externalLink(config.linkedinUrl, "LinkedIn <span aria-hidden=\"true\">↗</span>", "text-button")} ${resumeLink("text-button")}</div>
        </div><div class="hero-portrait" aria-label="Portrait of ${esc(config.name)}"><div class="portrait-glow"></div><div class="portrait-shape shape-a"></div><div class="portrait-shape shape-b"></div><div class="portrait-ring"></div><div class="portrait-image"><img src="${esc(rootUrl(config.portrait))}" alt="Portrait of Gospel Ibanga" fetchpriority="high"></div><span class="float-label label-ui"><i>&lt;/&gt;</i> Frontend</span><span class="float-label label-api"><i>{ }</i> Backend</span><div class="portrait-caption"><span class="availability-dot"></span><span><strong>${esc(config.name)}</strong><small>${esc(config.title)}</small></span></div></div>
        <a class="scroll-cue" href="#featured"><span></span> Scroll to explore <b aria-hidden="true">↓</b></a>
      </section>
      <section class="section wrap section-space" id="featured"><div class="section-top">${sectionLabel("Selected work")}${externalLink(config.githubUrl, "View GitHub profile ↗", "inline-link")}</div><div class="section-title-row"><h2>Projects made<br><span class="gradient-text">with intention.</span></h2><p>Real work, thoughtfully presented. Add projects to the central configuration when you're ready.</p></div>${renderProjectGrid(shown)}<div class="section-action"><a class="button button-secondary" href="${pageUrl("projects")}">Explore all projects <span aria-hidden="true">↗</span></a></div></section>
      <section class="home-about"><div class="wrap home-about-inner"><div>${sectionLabel("A little about me")}<h2>Good work starts<br>with <span class="gradient-text">good questions.</span></h2></div><div><p>${esc(config.biography)}</p><a class="inline-link" href="${pageUrl("about")}">A bit more about me <span aria-hidden="true">↗</span></a></div></div></section>
      <section class="section wrap section-space"><div class="section-top">${sectionLabel("The toolkit")}</div><div class="section-title-row"><h2>Useful tools.<br><span class="gradient-text">Thoughtful choices.</span></h2><p>Technologies shown here are grounded in the linked projects and remain editable in the central configuration.</p></div><div class="category-preview">${config.skills.map((group, index) => `<a class="category-card reveal" href="${pageUrl("skills")}" style="--card-index:${index}"><span class="category-number">0${index + 1}</span><h3>${esc(group.category)}</h3><span>Explore skills ↗</span></a>`).join("")}</div></section>
      <section class="cta-band wrap"><div><p class="eyebrow">Have a project in mind?</p><h2>Let's build something <span class="gradient-text">great.</span></h2></div><a class="button button-primary magnetic" href="${pageUrl("contact")}">Get in touch <span aria-hidden="true">↗</span></a></section>
    </main>`;
  }

  function aboutPage() {
    const list = (values) => values.length ? `<ul class="check-list">${values.map((value) => `<li>${esc(typeof value === "string" ? value : value.title || "")}</li>`).join("")}</ul>` : `<p class="quiet-note">Not configured yet. Add verified details in <code>site-config.js</code> when you're ready.</p>`;
    return `<main id="main" class="wrap page-main">${pageHeader("01", "About me", "Thoughtful by nature.<br><span class=\"gradient-text\">Full stack by craft.</span>", config.biography)}
      <section class="about-story content-grid"><div><div class="profile-photo-small"><img src="${esc(rootUrl(config.portrait))}" alt="Gospel Ibanga" loading="lazy"></div></div><div><h2>My approach</h2><p class="large-copy">I like building web experiences that feel straightforward to use and are solid behind the scenes.</p>${list(config.approach)}<h2 class="subheading">What I'm interested in</h2>${list(config.interests)}</div></section>
      <section class="content-section"><div class="section-top">${sectionLabel("The path so far")}</div><div class="section-title-row"><h2>Education &amp;<br><span class="gradient-text">experience.</span></h2><p>Reserved for verified history and achievements—nothing has been assumed.</p></div><div class="history-grid"><article class="history-card"><span class="history-icon">01</span><h3>Education &amp; training</h3>${list(config.education)}</article><article class="history-card"><span class="history-icon">02</span><h3>Experience &amp; achievements</h3>${list(config.experience)}</article></div></section>
      <section class="cta-band"><div><p class="eyebrow">Ready to talk?</p><h2>Let's turn an idea into <span class="gradient-text">something real.</span></h2></div><div class="cta-actions">${resumeLink()}<a class="button button-primary" href="${pageUrl("contact")}">Contact me <span aria-hidden="true">↗</span></a></div></section></main>`;
  }

  function skillsPage() {
    return `<main id="main" class="wrap page-main">${pageHeader("02", "Skills & toolkit", "A toolkit for<br><span class=\"gradient-text\">building end to end.</span>", "The listed technologies are supported by the linked projects and can be edited in site-config.js.")}
      <div class="skills-grid">${config.skills.map((group, index) => `<article class="skill-group reveal" style="--card-index:${index}"><div class="skill-group-head"><span class="skill-number">0${index + 1}</span><span class="skill-symbol" aria-hidden="true">${["&lt;/&gt;", "{ }", "◈", "⌘"][index]}</span></div><h2>${esc(group.category)}</h2>${group.items.length ? `<div class="tag-list">${group.items.map((skill) => `<span class="tag">${esc(skill)}</span>`).join("")}</div>` : `<p class="quiet-note">Add the technologies you actually use to the <code>${esc(group.category.toLowerCase())}</code> list in <code>site-config.js</code>.</p>`}</article>`).join("")}</div>
      <p class="editor-note"><span aria-hidden="true">↳</span> No proficiency percentages—just the tools you can confidently stand behind.</p></main>`;
  }

  function projectsPage() {
    const projects = config.projects.length ? config.projects : placeholderProjects;
    return `<main id="main" class="wrap page-main">${pageHeader("03", "Projects", "Selected work.<br><span class=\"gradient-text\">A place for what's next.</span>", "The first two cards link to real repositories; the remaining five are editable placeholders for projects you choose to add.")}
      <div class="filter-row" role="group" aria-label="Filter projects"><button class="filter-button is-active" type="button" data-filter="all" aria-pressed="true">All projects</button><button class="filter-button" type="button" data-filter="frontend" aria-pressed="false">Frontend</button><button class="filter-button" type="button" data-filter="full-stack" aria-pressed="false">Full Stack</button><button class="filter-button" type="button" data-filter="web-design" aria-pressed="false">Web Design</button></div>
      <div id="project-list">${renderProjectGrid(projects)}</div><div class="projects-footnote">Project cards and filters are driven by <code>site-config.js</code>. Add only work you're ready to share.</div>${githubLink("button button-secondary github-projects")}</main>`;
  }

  function servicesPage() {
    return `<main id="main" class="wrap page-main">${pageHeader("04", "Services", "Ways we could<br><span class=\"gradient-text\">work together.</span>", "I can help with responsive websites, frontend development, backend and API integration, and ongoing improvements.")}
      <div class="service-grid">${config.services.map((service, index) => `<article class="service-card reveal" style="--card-index:${index}"><span class="service-number">0${index + 1}</span><h2>${esc(service.title)}</h2><p>${esc(service.description)}</p><a href="${pageUrl("contact")}">Discuss this service <span aria-hidden="true">↗</span></a></article>`).join("")}</div><section class="cta-band"><div><p class="eyebrow">Have something different in mind?</p><h2>Tell me what you're <span class="gradient-text">thinking.</span></h2></div><a class="button button-primary" href="${pageUrl("contact")}">Discuss your project <span aria-hidden="true">↗</span></a></section></main>`;
  }

  function contactPage() {
    return `<main id="main" class="wrap page-main contact-page">${pageHeader("05", "Contact", "Have a Project in Mind?<br><span class=\"gradient-text\">Let's Build Something Great.</span>", "Share a little about what you'd like to create. The form uses your email application as a fallback; it does not submit to a server.")}
      <div class="contact-layout"><section class="contact-details"><h2>Reach me directly</h2><a class="contact-method" href="mailto:${esc(config.email)}"><span class="contact-icon">@</span><span><small>Email</small><strong>${esc(config.email)}</strong></span><b aria-hidden="true">↗</b></a><a class="contact-method" href="tel:${esc(phoneDigits)}"><span class="contact-icon">⌕</span><span><small>Call</small><strong>${esc(config.phone)}</strong></span><b aria-hidden="true">↗</b></a>${externalLink(whatsappUrl, `<span class="contact-icon">◉</span><span><small>WhatsApp</small><strong>Start a conversation</strong></span><b aria-hidden="true">↗</b>`, "contact-method")}${externalLink(config.linkedinUrl, `<span class="contact-icon">in</span><span><small>LinkedIn</small><strong>Connect with me</strong></span><b aria-hidden="true">↗</b>`, "contact-method")}${githubLink("contact-method github-method")}${config.location ? `<p class="location-note">⌖ ${esc(config.location)}</p>` : ""}</section>
        <form class="contact-form" id="contact-form" novalidate><div class="form-row"><div class="field"><label for="name">Name</label><input id="name" name="name" autocomplete="name" required minlength="2" placeholder="Your name"><small class="field-error" data-error-for="name"></small></div><div class="field"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" required placeholder="you@example.com"><small class="field-error" data-error-for="email"></small></div></div><div class="field"><label for="subject">Subject</label><input id="subject" name="subject" required minlength="3" placeholder="What would you like to discuss?"><small class="field-error" data-error-for="subject"></small></div><div class="field"><label for="message">Message</label><textarea id="message" name="message" rows="5" required minlength="10" placeholder="A few details about your idea or opportunity..."></textarea><small class="field-error" data-error-for="message"></small></div><button class="button button-primary" type="submit">Open email to send <span aria-hidden="true">↗</span></button><p class="form-status" id="form-status" aria-live="polite">This form opens your email app with a prepared message. Nothing is sent from this website.</p></form>
      </div></main>`;
  }

  function resumePage() {
    const list = (values) => values.length ? `<ul>${values.map((item) => `<li>${esc(typeof item === "string" ? item : item.title || "")}</li>`).join("")}</ul>` : `<p class="quiet-note">Not added yet. Add verified details to <code>site-config.js</code>.</p>`;
    const skills = config.skills.flatMap((group) => group.items.map((item) => `${group.category}: ${item}`));
    return `<main id="main" class="wrap page-main resume-main"><div class="resume-toolbar"><span class="eyebrow">Online CV · editable profile</span><button class="button button-secondary print-button" type="button">Print this page <span aria-hidden="true">⎙</span></button>${resumeLink()}</div><article class="resume-sheet"><header class="resume-header"><div><p class="eyebrow">${esc(config.title)}</p><h1>${esc(config.name)}</h1><p>${esc(config.intro)}</p></div><div class="resume-contact"><a href="mailto:${esc(config.email)}">${esc(config.email)}</a><a href="tel:${esc(phoneDigits)}">${esc(config.phone)}</a>${externalLink(config.linkedinUrl, "LinkedIn ↗")}${githubLink()}</div></header><section><h2>Technical skills</h2>${skills.length ? `<p>${esc(skills.join(" · "))}</p>` : list([])}</section><section><h2>Projects</h2>${config.projects.length ? `<ul>${config.projects.map((project) => `<li><strong>${esc(project.name)}</strong> — ${esc(project.description)}</li>`).join("")}</ul>` : list([])}</section><section><h2>Education &amp; training</h2>${list(config.education)}</section><section><h2>Work experience</h2>${list(config.experience)}</section><section><h2>Certifications</h2>${list(config.certifications)}</section></article></main>`;
  }

  function notFoundPage() {
    return `<main id="main" class="wrap not-found"><p class="eyebrow">404 · Page not found</p><h1>That page isn't<br><span class="gradient-text">in the map.</span></h1><p>The address may have changed, or this page may not exist.</p><a class="button button-primary" href="${pageUrl("home")}">Back to home <span aria-hidden="true">↗</span></a></main>`;
  }

  const content = { home: homePage, about: aboutPage, skills: skillsPage, projects: projectsPage, services: servicesPage, contact: contactPage, resume: resumePage };
  const meta = pageMeta[activePage] || ["Page not found", "This page could not be found."];
  document.title = `${config.name} | ${meta[0]}`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = meta[1];
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", document.documentElement.dataset.theme === "light" ? "#f5f8fc" : "#080b12");
  document.querySelector("#site-header").innerHTML = renderNav();
  main.innerHTML = (content[activePage] || notFoundPage)();
  document.querySelector("#site-footer").innerHTML = renderFooter();

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealEls = document.querySelectorAll(".reveal");
  if (motionQuery.matches || !("IntersectionObserver" in window)) revealEls.forEach((element) => element.classList.add("is-visible"));
  else {
    const observer = new IntersectionObserver((entries, current) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); current.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealEls.forEach((element) => observer.observe(element));
  }

  const header = document.querySelector("#site-header");
  const menuButton = header.querySelector(".menu-toggle");
  const nav = header.querySelector(".nav");
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", open);
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
  }));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      nav.classList.remove("is-open");
      menuButton.focus();
    }
  });
  document.addEventListener("pointerdown", (event) => {
    if (!header.contains(event.target) && menuButton.getAttribute("aria-expanded") === "true") {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      nav.classList.remove("is-open");
    }
  });

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      const light = theme === "light";
      toggle.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
      toggle.title = light ? "Switch to dark theme" : "Switch to light theme";
      toggle.querySelector(".theme-icon").textContent = light ? "☾" : "☼";
      toggle.querySelector(".theme-text").textContent = light ? "Dark" : "Light";
    }
    try { localStorage.setItem("gospel-portfolio-theme", theme); } catch { /* Storage can be unavailable in private contexts. */ }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#f5f8fc" : "#080b12");
  }
  document.querySelector(".theme-toggle").addEventListener("click", () => applyTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light"));
  applyTheme(document.documentElement.dataset.theme || "dark");

  const roleNode = document.querySelector(".typed-role");
  if (roleNode && !motionQuery.matches) {
    const roles = ["Full Stack Developer", "Frontend Developer", "Backend Developer", "Web Application Developer"];
    let roleIndex = 0, character = roles[0].length, deleting = false;
    const type = () => {
      const role = roles[roleIndex];
      character += deleting ? -1 : 1;
      roleNode.textContent = role.slice(0, character);
      let delay = deleting ? 36 : 68;
      if (!deleting && character === role.length) { deleting = true; delay = 1450; }
      else if (deleting && character === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 300; }
      window.setTimeout(type, delay);
    };
    window.setTimeout(type, 1600);
  }

  if (activePage === "projects") {
    const list = document.querySelector("#project-list");
    const filters = document.querySelectorAll(".filter-button");
    filters.forEach((button) => button.addEventListener("click", () => {
      filters.forEach((filter) => { filter.classList.toggle("is-active", filter === button); filter.setAttribute("aria-pressed", String(filter === button)); });
      const category = button.dataset.filter;
      const filtered = config.projects.filter((project) => category === "all" || (project.category || "").toLowerCase().replace(/\s+/g, "-") === category);
      list.innerHTML = renderProjectGrid(config.projects.length ? filtered : (category === "all" ? placeholderProjects : []));
      list.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
    }));
  }

  if (activePage === "contact") {
    const form = document.querySelector("#contact-form");
    const status = document.querySelector("#form-status");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let valid = true;
      ["name", "email", "subject", "message"].forEach((fieldName) => {
        const field = form.elements[fieldName];
        const error = form.querySelector(`[data-error-for="${fieldName}"]`);
        let message = "";
        if (!field.value.trim()) message = "Please fill out this field.";
        else if (fieldName === "email" && !field.validity.valid) message = "Enter a valid email address.";
        else if (field.validity.tooShort) message = `Please enter at least ${field.minLength} characters.`;
        error.textContent = message;
        field.setAttribute("aria-invalid", String(Boolean(message)));
        if (message) valid = false;
      });
      if (!valid) { status.textContent = "Please review the highlighted fields."; form.querySelector('[aria-invalid="true"]').focus(); return; }
      const data = new FormData(form);
      const subject = encodeURIComponent(data.get("subject"));
      const body = encodeURIComponent(`Name: ${data.get("name")}\nReply email: ${data.get("email")}\n\n${data.get("message")}`);
      status.textContent = "Opening your email app with this message prepared. The portfolio itself does not transmit it.";
      location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;
    });
    form.querySelectorAll("input, textarea").forEach((field) => field.addEventListener("input", () => {
      field.removeAttribute("aria-invalid");
      form.querySelector(`[data-error-for="${field.name}"]`).textContent = "";
    }));
  }
  document.querySelector(".print-button")?.addEventListener("click", () => window.print());

  if (!motionQuery.matches && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".magnetic").forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        button.style.setProperty("--mag-x", `${(event.clientX - rect.left - rect.width / 2) * 0.08}px`);
        button.style.setProperty("--mag-y", `${(event.clientY - rect.top - rect.height / 2) * 0.12}px`);
      });
      button.addEventListener("pointerleave", () => { button.style.setProperty("--mag-x", "0px"); button.style.setProperty("--mag-y", "0px"); });
    });
  }
})();
