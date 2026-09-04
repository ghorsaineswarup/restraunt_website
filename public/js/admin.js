async function loadReservations() {
  const container = document.getElementById('admin-content');

  try {
    const res = await fetch('/api/reservations');
    if (!res.ok) throw new Error('Failed to load reservations');
    const reservations = await res.json();

    if (reservations.length === 0) {
      container.innerHTML = '<p class="error-text">No reservations yet.</p>';
      return;
    }

    let html = `
      <table class="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Party</th>
            <th>Date</th>
            <th>Time</th>
            <th>Message</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
    `;

    reservations.forEach(r => {
      const submitted = new Date(r.createdAt).toLocaleString();
      html += `
        <tr>
          <td>${r.name}</td>
          <td>${r.email}</td>
          <td>${r.phone}</td>
          <td>${r.partySize}</td>
          <td>${r.date}</td>
          <td>${r.time}</td>
          <td>${r.message || '—'}</td>
          <td>${submitted}</td>
        </tr>
      `;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
  } catch (err) {
    container.innerHTML = '<p class="error-text">Could not load reservations.</p>';
    console.error(err);
  }
}

loadReservations();