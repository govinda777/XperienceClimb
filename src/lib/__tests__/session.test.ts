import { getOrCreateSessionId } from '../session';

describe('Session Utility', () => {
  beforeEach(() => {
    // Limpa o localStorage antes de cada teste
    localStorage.clear();
  });

  it('deve gerar um novo ID de sessão caso não exista', () => {
    const sessionId = getOrCreateSessionId();
    expect(sessionId).toBeDefined();
    expect(sessionId).toMatch(/^session-/);

    const storedId = localStorage.getItem('chat_session_id');
    expect(storedId).toBe(sessionId);
  });

  it('deve recuperar o ID de sessão existente', () => {
    const customId = 'session-12345';
    localStorage.setItem('chat_session_id', customId);

    const sessionId = getOrCreateSessionId();
    expect(sessionId).toBe(customId);
  });
});
