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

async function loadProjects({ targetId, limit, excludeFirst = 0, prioritizeTitle, moveToEnd, placeAfter, onlyFeatured = false, excludeFeatured = false } = {}) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const projects = await fetchProjects();

  // Start with full list
  let list = projects.slice();

  // Apply featured filters
  if (onlyFeatured) {
    list = list.filter(p => p.featured === true);
  } else if (excludeFeatured) {
    list = list.filter(p => p.featured !== true);
  }

  // Optionally exclude the first N items (legacy support)
  if (excludeFirst && excludeFirst > 0) {
    list = list.slice(excludeFirst);
  }

  // Move specific title(s) to the front if requested
  if (prioritizeTitle) {
    const titles = Array.isArray(prioritizeTitle) ? prioritizeTitle : [prioritizeTitle];
    const prioritized = [];
    const remaining = [];
    for (const p of list) {
      if (titles.includes(p.title)) prioritized.push(p);
      else remaining.push(p);
    }
    list = prioritized.concat(remaining);
  }

  // Place a title immediately after another title, if requested
  if (placeAfter && placeAfter.title && placeAfter.after && placeAfter.title !== placeAfter.after) {
    const srcIdx = list.findIndex(p => p.title === placeAfter.title);
    if (srcIdx !== -1) {
      const [item] = list.splice(srcIdx, 1);
      const newAfterIdx = list.findIndex(p => p.title === placeAfter.after);
      if (newAfterIdx !== -1) {
        list.splice(newAfterIdx + 1, 0, item);
      } else {
        // If the `after` item isn't found, put the item back where it was
        list.splice(srcIdx, 0, item);
      }
    }
  }

  // Move specific title(s) to the end if requested
  if (moveToEnd) {
    const titles = Array.isArray(moveToEnd) ? moveToEnd : [moveToEnd];
    const endItems = [];
    const middle = [];
    for (const p of list) {
      if (titles.includes(p.title)) endItems.push(p);
      else middle.push(p);
    }
    list = middle.concat(endItems);
  }

  // Apply limit last
  if (limit && limit > 0) list = list.slice(0, limit);

  target.innerHTML = list.map(projectCard).join('');
}

window.loadProjects = loadProjects;
