async function loadMenu() {
  const container = document.getElementById('menu-container');

  try {
    const res = await fetch('/api/menu');
    if (!res.ok) throw new Error('Failed to load menu');
    const items = await res.json();

    if (items.length === 0) {
      container.innerHTML = '<p class="error-text">Menu coming soon.</p>';
      return;
    }

    const categories = {};
    items.forEach(item => {
      if (!categories[item.category]) categories[item.category] = [];
      categories[item.category].push(item);
    });

    container.innerHTML = '';

    for (const category in categories) {
      const section = document.createElement('div');
      section.className = 'menu-category';

      const heading = document.createElement('h2');
      heading.textContent = category;
      section.appendChild(heading);

      const grid = document.createElement('div');
      grid.className = 'menu-grid';

      categories[category].forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `
          <img src="${item.image || 'images/placeholder-food.jpg'}" alt="${item.name}">
          <div class="menu-card-body">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="menu-price">$${item.price.toFixed(2)}</span>
          </div>
        `;
        grid.appendChild(card);
      });

      section.appendChild(grid);
      container.appendChild(section);
    }
  } catch (err) {
    container.innerHTML = '<p class="error-text">Could not load menu right now. Please try again later.</p>';
    console.error(err);
  }
}

loadMenu();