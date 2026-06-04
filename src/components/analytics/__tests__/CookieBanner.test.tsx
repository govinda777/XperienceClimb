import { render, screen, fireEvent } from '@testing-library/react';
import CookieBanner from '../CookieBanner';

describe('CookieBanner Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('deve renderizar o banner caso não haja consentimento salvo', () => {
    render(<CookieBanner />);
    expect(screen.getByText(/Utilizamos cookies para melhorar/i)).toBeInTheDocument();
  });

  it('não deve renderizar o banner se o consentimento já foi aceito', () => {
    localStorage.setItem('cookie_consent', 'accepted');
    const { container } = render(<CookieBanner />);
    expect(container).toBeEmptyDOMElement();
  });

  it('deve esconder o banner e salvar o consentimento ao clicar em "Aceitar Todos"', () => {
    render(<CookieBanner />);

    const acceptButton = screen.getByText('Aceitar Todos');
    fireEvent.click(acceptButton);

    expect(localStorage.getItem('cookie_consent')).toBe('accepted');
    expect(screen.queryByText(/Utilizamos cookies para melhorar/i)).not.toBeInTheDocument();
  });

  it('deve esconder o banner e salvar a rejeição ao clicar em "Rejeitar"', () => {
    render(<CookieBanner />);

    const declineButton = screen.getByText('Rejeitar');
    fireEvent.click(declineButton);

    expect(localStorage.getItem('cookie_consent')).toBe('declined');
    expect(screen.queryByText(/Utilizamos cookies para melhorar/i)).not.toBeInTheDocument();
  });
});
