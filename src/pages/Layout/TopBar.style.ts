import { makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material/styles';

export const useTopBarStyles = makeStyles((theme: Theme) => ({
  topBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    height: '56px',
    width: '100%',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f3f4f6',
    position: 'sticky',
    top: 0,
    zIndex: 1201,
    padding: '6px 16px',
    flexShrink: 0,
    [theme.breakpoints.down('md')]: {
      gap: '8px',
      padding: '6px 12px',
    },
  },

  // Hamburger — visible only on mobile
  hamburger: {
    display: 'none !important' as 'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex !important' as 'flex',
    },
    flexShrink: 0,
  },

  // Brand (logo) — left section, 224px to align with sidebar width
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '224px',
    flexShrink: 0,
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
  },
  brandLogo: {
    width: '32px',
    height: '32px',
    flexShrink: 0,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
  },
  brandText: {
    display: 'flex',
    flexDirection: 'column' as const,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  brandTitle: {
    fontWeight: '700 !important',
    fontSize: '14px !important',
    color: '#0F1F3D',
    letterSpacing: '0.35px',
    lineHeight: '14px !important',
  },
  brandSubtitle: {
    fontSize: '9px !important',
    color: '#9ca3af',
    letterSpacing: '0.9px',
    marginTop: '2px',
  },

  // Divider — hidden on mobile
  divider: {
    width: '1px',
    height: '24px',
    backgroundColor: '#e5e7eb',
    flexShrink: 0,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  // Search bar — hidden on mobile
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '6px 12px',
    gap: '8px',
    width: '448px',
    maxWidth: '448px',
    flexShrink: 0,
    cursor: 'text',
    '&:focus-within': {
      outline: '2px solid #0f1f3d',
      outlineOffset: '-1px',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  searchIcon: {
    fontSize: '14px !important',
    color: '#9ca3af',
    flexShrink: 0,
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    fontSize: '14px',
    color: '#374151',
    flex: 1,
    outline: 'none',
    fontFamily: 'inherit',
    '&::placeholder': { color: '#9ca3af' },
  },
  searchKbd: {
    fontSize: '10px',
    color: '#9ca3af',
    backgroundColor: '#e5e7eb',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    padding: '3px 7px',
    fontFamily: 'inherit',
    flexShrink: 0,
  },

  spacer: { flex: 1 },

  // Right actions
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  iconBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover': { backgroundColor: '#f3f4f6' },
  },

  // Help button wrapper — hidden on mobile
  helpBtn: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  // Language button — hidden on mobile
  langBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    height: '36px',
    padding: '0 10px',
    borderRadius: '8px',
    cursor: 'pointer',
    '&:hover': { backgroundColor: '#f3f4f6' },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  langFlag: {
    fontSize: '16px',
    lineHeight: 1,
  },
  langText: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#4b5563',
  },
  notifBadge: {
    '& .MuiBadge-badge': {
      fontSize: '9px',
      minWidth: '16px',
      height: '16px',
      padding: '0 3px',
      backgroundColor: '#f43f5e',
      top: '6px',
      right: '6px',
    },
  },

  // User section
  actionsDivider: {
    width: '1px',
    height: '24px',
    backgroundColor: '#e5e7eb',
    margin: '0 4px',
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  userBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    height: '36px',
    padding: '4px 10px 4px 4px',
    borderRadius: '8px',
    cursor: 'pointer',
    '&:hover': { backgroundColor: '#f3f4f6' },
    [theme.breakpoints.down('sm')]: {
      padding: '4px',
      gap: '0',
    },
  },
  // User name + role — hidden on mobile
  userBtnText: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  userAvatar: {
    width: '28px !important',
    height: '28px !important',
    backgroundColor: '#0f1f3d !important',
    fontSize: '10px !important',
    fontWeight: '700 !important',
  },
  userName: {
    fontSize: '12px !important',
    fontWeight: '600 !important',
    color: '#0f1f3d',
    lineHeight: '12px',
  },
  userRole: {
    fontSize: '10px !important',
    color: '#9ca3af',
    marginTop: '2px',
  },
  chevron: {
    fontSize: '12px !important',
    color: '#9ca3af',
    [theme.breakpoints.down('sm')]: {
      display: 'none !important' as 'none',
    },
  },
}));
