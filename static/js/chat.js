/* chat.js — Agentic Q&A Chat Logic */

document.addEventListener('DOMContentLoaded', () => {
  // Set welcome message timestamp
  const welcomeTime = document.getElementById('welcomeTime');
  if (welcomeTime) welcomeTime.textContent = formatTime(new Date());

  // Enter key sends message (Shift+Enter = new line)
  const input = document.getElementById('chatInput');
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Character counter
  input.addEventListener('input', () => {
    document.getElementById('charCount').textContent = input.value.length;
  });
});

async function sendMessage() {
  const input   = document.getElementById('chatInput');
  const message = input.value.trim();

  if (!message) return;
  if (message.length > 1000) {
    showChatError('Message too long (max 1000 characters).');
    return;
  }

  clearChatError();
  appendMessage('user', message);
  input.value = '';
  document.getElementById('charCount').textContent = '0';

  showTyping(true);
  disableSend(true);

  try {
    const res  = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      appendMessage('bot', '⚠️ ' + (data.error || 'Something went wrong. Please try again.'));
      return;
    }

    appendMessage('bot', data.answer);

  } catch (err) {
    appendMessage('bot', '⚠️ Network error. Please check your connection.');
  } finally {
    showTyping(false);
    disableSend(false);
  }
}

function sendSuggestion(btn) {
  const text = btn.textContent.trim();
  document.getElementById('chatInput').value = text;
  document.getElementById('charCount').textContent = text.length;
  sendMessage();
}

function appendMessage(role, text) {
  const chatWindow = document.getElementById('chatWindow');

  const msgDiv    = document.createElement('div');
  msgDiv.className = `chat-msg ${role === 'user' ? 'user-msg' : 'bot-msg'}`;

  const avatar    = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.textContent = role === 'user' ? '👤' : '🥗';

  const bubble    = document.createElement('div');
  bubble.className = 'msg-bubble';

  // Convert simple markdown (bold, newlines, lists) to HTML
  bubble.innerHTML = formatBubble(text);

  // Timestamp
  const time      = document.createElement('small');
  time.className  = 'msg-time';
  time.textContent = formatTime(new Date());
  bubble.appendChild(time);

  msgDiv.appendChild(avatar);
  msgDiv.appendChild(bubble);
  chatWindow.appendChild(msgDiv);

  // Scroll to bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function formatBubble(text) {
  // Escape HTML
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold **text**
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Convert bullet lines (- item or * item)
  const lines = html.split('\n');
  let result  = '';
  let inList  = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList) { result += '<ul>'; inList = true; }
      result += `<li>${trimmed.slice(2)}</li>`;
    } else {
      if (inList) { result += '</ul>'; inList = false; }
      if (trimmed) result += `<p>${trimmed}</p>`;
    }
  }
  if (inList) result += '</ul>';

  return result || `<p>${html}</p>`;
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function showTyping(show) {
  document.getElementById('typingIndicator').style.display = show ? 'flex' : 'none';
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function disableSend(disable) {
  const btn = document.getElementById('sendBtn');
  btn.disabled   = disable;
  btn.textContent = disable ? '…' : 'Send ➤';
}

function showChatError(msg) {
  const el = document.getElementById('chatError');
  el.textContent = msg;
  el.style.display = 'block';
}

function clearChatError() {
  const el = document.getElementById('chatError');
  el.style.display = 'none';
  el.textContent   = '';
}
