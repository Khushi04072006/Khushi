/* plan.js — Nutrition Plan Page Logic */

let currentFilename = null;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('planForm').addEventListener('submit', handleSubmit);
});

async function handleSubmit(e) {
  e.preventDefault();
  clearError();

  const name   = document.getElementById('name').value.trim();
  const age    = document.getElementById('age').value.trim();
  const diet   = document.getElementById('diet_preference').value;
  const city   = document.getElementById('city').value.trim();
  const country= document.getElementById('country').value.trim();

  // Client-side validation
  if (!name)    return showError('Please enter your full name.');
  if (!age)     return showError('Please enter your age.');
  if (isNaN(age) || +age < 1 || +age > 120) return showError('Please enter a valid age (1–120).');
  if (!diet)    return showError('Please select your diet preference.');
  if (!city)    return showError('Please enter your city.');
  if (!country) return showError('Please enter your country.');

  const payload = {
    name,
    age: parseInt(age),
    gender:          document.getElementById('gender').value,
    diet_preference: diet,
    medical_history: document.getElementById('medical_history').value,
    allergies:       document.getElementById('allergies').value.trim() || 'None',
    goal:            document.getElementById('goal').value,
    city,
    country
  };

  showLoading(true);

  try {
    const res  = await fetch('/api/generate_plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      showError(data.error || 'Something went wrong. Please try again.');
      return;
    }

    currentFilename = data.filename;
    renderPlan(data.plan);

  } catch (err) {
    showError('Network error. Please check your connection and try again.');
  } finally {
    showLoading(false);
  }
}

function renderPlan(markdownText) {
  const resultPanel  = document.getElementById('resultPanel');
  const planContent  = document.getElementById('planContent');

  // Use marked.js if available, else plain text fallback
  if (typeof marked !== 'undefined') {
    planContent.innerHTML = marked.parse(markdownText);
  } else {
    planContent.innerHTML = `<pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(markdownText)}</pre>`;
  }

  resultPanel.style.display = 'block';
  resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Wire download button
  document.getElementById('downloadBtn').onclick = downloadPlan;
}

async function downloadPlan() {
  if (!currentFilename) return;
  try {
    const res = await fetch(`/api/download_plan/${encodeURIComponent(currentFilename)}`);
    if (!res.ok) { alert('File not available for download.'); return; }
    const blob = await res.blob();
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = currentFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    alert('Download failed. Please try again.');
  }
}

function showLoading(show) {
  document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none';
  document.getElementById('generateBtn').disabled = show;
  document.getElementById('generateBtn').textContent = show
    ? '⏳ Generating…'
    : '🚀 Generate My Nutrition Plan';
}

function showError(msg) {
  const el = document.getElementById('formError');
  el.textContent = msg;
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearError() {
  const el = document.getElementById('formError');
  el.style.display = 'none';
  el.textContent = '';
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
