import { Link, Box } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
type TNavBar = {
  links: {
    text: string;
    href: string;
    'data-testid'?: string;
  }[];
};

const activeLinkStyle = {
  fontWeight: 700,
  textDecoration: 'underline',
};

function NavBar({ links }: TNavBar) {
  const { pathname } = useLocation();
  const [currentLink, setCurrentLink] = useState(pathname);

  return (
    <Box
      component="aside"
      sx={{
        background: '#0c2975',
        padding: '16px',
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Link
        component={RouterLink}
        onClick={() => setCurrentLink('/')}
        to="/"
        sx={{ cursor: 'pointer', marginBottom: '80px', marginTop: '40px' }}
      >
        <img src="/surelogo.svg" alt="logo"></img>
      </Link>

      {links.map(({ text, href, 'data-testid': dataTestId }) => (
        <Link
          aria-current={currentLink === href ? 'page' : undefined}
          component={RouterLink}
          onClick={() => setCurrentLink(href)}
          key={href}
          to={href}
          color="#fff"
          underline="hover"
          style={currentLink === href ? activeLinkStyle : undefined}
          sx={{
            cursor: 'pointer',
            '&:not(:last-of-type)': {
              marginBottom: '16px',
            },
          }}
          data-testid={dataTestId}
        >
          {text}
        </Link>
      ))}
    </Box>
  );
}

export default NavBar;
