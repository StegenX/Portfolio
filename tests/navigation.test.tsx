import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/app/App';

afterEach(cleanup);
function portfolio(route = '/', basename = '/') {
  return render(
    <MemoryRouter initialEntries={[route]} basename={basename}>
      <App />
    </MemoryRouter>,
  );
}
describe('portfolio navigation', () => {
  it('shows the complete homepage with valid section targets and three case-study actions', () => {
    portfolio();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Building Intelligent Systems.',
    );
    expect(screen.getAllByRole('link', { name: 'Explore Case Study' })).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'View Case Study' })).toHaveAttribute(
      'href',
      '/projects/financial-rag-assistant',
    );
    const liveApp = screen.getByRole('link', { name: 'Try FilingLens' });
    expect(liveApp).toHaveAttribute('href', 'https://financial-rag-assistance.streamlit.app/');
    expect(liveApp).toHaveAttribute('target', '_blank');
    for (const link of screen.getAllByRole('link')) {
      const href = link.getAttribute('href');
      expect(href).toBeTruthy();
      if (href?.startsWith('#') || href?.startsWith('/#')) {
        const id = href.split('#')[1];
        expect(document.getElementById(id), `Missing anchor: ${href}`).not.toBeNull();
      }
    }
    expect(screen.queryByRole('link', { name: 'Download Résumé' })).not.toBeInTheDocument();
  });
  it('opens a case study and returns to selected work', async () => {
    const user = userEvent.setup();
    portfolio();
    await user.click(screen.getByRole('link', { name: 'View Case Study' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('FilingLens');
    expect(document.title).toBe('FilingLens — Aymane Agharbi');
    expect(screen.getByRole('link', { name: 'Try FilingLens' })).toHaveAttribute(
      'href',
      'https://financial-rag-assistance.streamlit.app/',
    );
    await user.click(screen.getByRole('link', { name: 'Back to selected work' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Building Intelligent Systems.',
    );
  });
  it('closes the mobile menu with Escape and returns focus to its control', async () => {
    const user = userEvent.setup();
    portfolio();
    const control = screen.getByRole('button', { name: 'Open navigation' });
    await user.click(control);
    expect(control).toHaveAttribute('aria-expanded', 'true');
    expect(
      within(screen.getByRole('navigation')).getByRole('link', { name: 'Projects' }),
    ).toHaveAttribute('href', '/#projects');
    await user.keyboard('{Escape}');
    expect(control).toHaveAttribute('aria-expanded', 'false');
    expect(control).toHaveFocus();
  });
  it('opens a case-study directory and keeps navigation inside a GitHub Pages repository', async () => {
    const user = userEvent.setup();
    portfolio('/Portfolio/projects/financial-rag-assistant/', '/Portfolio/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('FilingLens');
    expect(document.title).toBe('FilingLens — Aymane Agharbi');
    expect(screen.getByRole('link', { name: 'Back to selected work' })).toHaveAttribute(
      'href',
      '/Portfolio/#projects',
    );
    await user.click(screen.getByRole('link', { name: 'Back to selected work' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Building Intelligent Systems.',
    );
    expect(screen.getByRole('link', { name: 'View Case Study' })).toHaveAttribute(
      'href',
      '/Portfolio/projects/financial-rag-assistant',
    );
    expect(screen.getByRole('link', { name: 'Aymane Agharbi AI Engineer' })).toHaveAttribute(
      'href',
      '/Portfolio/#home',
    );
  });
});
