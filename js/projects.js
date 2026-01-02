async function fetchProjects() {
  try {
    const url = `./data/projects.json?ts=${Date.now()}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load projects.json');
    return await res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

function projectCard(p) {
  const tags = (p.tech || []).map(t => `<span class="tag">${t}</span>`).join('');
  const repoBtn = p.repo ? `<a class="btn" href="${p.repo}" target="_blank" rel="noopener">Repo</a>` : '';
  const demoBtn = p.demo ? `<a class="btn" href="${p.demo}" target="_blank" rel="noopener">Demo</a>` : '';
  const linkTarget = p.link || p.demo || p.repo || './projects.html';
  const isExternal = /^https?:\/\//.test(linkTarget);
  const linkAttrs = isExternal ? 'target="_blank" rel="noopener"' : '';
  const image = p.image ? `<a class="card-image-link" href="${linkTarget}" ${linkAttrs}><img class="card-image" src="${p.image}" alt="${p.imageAlt || p.title}" loading="lazy"></a>` : '';
  return `
    <div class="card">
      <h3>${p.title}</h3>
      <p>${p.description || ''}</p>
      ${image}
      <div class="tags">${tags}</div>
      <div class="actions">${repoBtn}${demoBtn}</div>
    </div>
  `;
}

async function loadProjects({ targetId, limit } = {}) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const projects = await fetchProjects();
  const list = limit ? projects.slice(0, limit) : projects;
  target.innerHTML = list.map(projectCard).join('');
}

window.loadProjects = loadProjects;
