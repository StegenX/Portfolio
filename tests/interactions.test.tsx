import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ArchitectureFlow } from '../src/components/ArchitectureFlow';
import { CopyEmailButton, ResumeLink } from '../src/components/ui';
import ProjectCaseStudyPage from '../src/pages/ProjectCaseStudyPage';
import { Routes, Route } from 'react-router-dom';
afterEach(cleanup);
describe('usable portfolio interactions', () => {
  it('explains workflow steps on keyboard focus and click', async () => {
    const user = userEvent.setup();
    render(<ArchitectureFlow />);
    await user.tab();
    expect(screen.getByRole('button', { name: 'Pause workflow animation' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Explore Documents' })).toHaveFocus();
    expect(screen.getByText(/Start with source documents/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Explore Answer' }));
    expect(screen.getByRole('button', { name: 'Explore Answer' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByText(/Evidence still needs evaluation/)).toBeInTheDocument();
  });
  it('copies the email and announces success', async () => {
    const user = userEvent.setup();
    render(<CopyEmailButton />);
    await user.click(screen.getByRole('button', { name: 'Copy email address' }));
    expect(screen.getByRole('status')).toHaveTextContent('Email copied');
  });
  it('keeps the mail link usable when clipboard access fails', async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(new Error('blocked'));
    render(<CopyEmailButton />);
    await user.click(screen.getByRole('button', { name: 'Copy email address' }));
    expect(screen.getByRole('status')).toHaveTextContent('Use the email link');
  });
  it('omits a download button until a real résumé is configured', () => {
    const { container } = render(<ResumeLink />);
    expect(container).toBeEmptyDOMElement();
  });
  it('handles nonexistent case studies with a working home link', () => {
    render(
      <MemoryRouter initialEntries={['/projects/unknown']}>
        <Routes>
          <Route path="/projects/:slug" element={<ProjectCaseStudyPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('A little off the path.');
    expect(screen.getByRole('link', { name: /Back to the portfolio/ })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
