export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = localStorage.getItem('chat_session_id');
  if (!sessionId) {
    sessionId = `session-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`;
    localStorage.setItem('chat_session_id', sessionId);
  }
  return sessionId;
}
