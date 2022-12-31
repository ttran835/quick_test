import NavBar from './NavBar';
import { renderWithProviders } from '../../utils/test';

describe('NavBar', () => {
  const defaultProps = {
    links: [
      { text: 'Link1', href: '/link1' },
      { text: 'Link2', href: '/link2' },
      { text: 'Link3', href: '/link3' },
    ],
  };

  it('should render NavBar links', () => {
    const { getByText } = renderWithProviders(<NavBar {...defaultProps} />);

    expect(getByText('Link1')).toBeInTheDocument();
    expect(getByText('Link2')).toBeInTheDocument();
    expect(getByText('Link3')).toBeInTheDocument();
  });

  // TODO: Challenge 2
  it('should render an `href` attribute for each link', () => {
    const { getByText } = renderWithProviders(<NavBar {...defaultProps} />);

    const link1Anchor = getByText('Link1').closest('a');
    const link2Anchor = getByText('Link2').closest('a');
    const link3Anchor = getByText('Link3').closest('a');

    expect(link1Anchor).toHaveAttribute('href', '/link1');
    expect(link2Anchor).toHaveAttribute('href', '/link2');
    expect(link3Anchor).toHaveAttribute('href', '/link3');
  });
});
