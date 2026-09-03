const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

const reservationForm = document.getElementById('reservation-form');

if (reservationForm) {
  reservationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    const statusEl = document.getElementById('form-status');

    const data = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      partySize: document.getElementById('partySize').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value,
      message: document.getElementById('message').value
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    statusEl.textContent = '';
    statusEl.className = 'form-status';

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        statusEl.textContent = 'Reservation confirmed! We look forward to seeing you.';
        statusEl.className = 'form-status success';
        reservationForm.reset();
      } else {
        statusEl.textContent = result.error || 'Something went wrong. Please try again.';
        statusEl.className = 'form-status error';
      }
    } catch (err) {
      statusEl.textContent = 'Could not connect to the server. Please try again.';
      statusEl.className = 'form-status error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Reserve Now';
    }
  });
}