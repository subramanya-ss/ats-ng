import { makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material/styles';

export const useTopBarStyles = makeStyles((_theme: Theme) => ({
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
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '1px',
    flexShrink: 0,
  },

  // Brand (logo) — left section, 224px to align with sidebar width
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '224px',
    flexShrink: 0,
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
    flexDirection: 'column',
  },
  brandTitle: {
    fontWeight: 700,
    fontSize: '14px',
    color: '#0f1f3d',
    letterSpacing: '0.35px',
    lineHeight: '14px',
  },
  brandSubtitle: {
    fontSize: '9px',
    color: '#9ca3af',
    letterSpacing: '0.9px',
    lineHeight: '13.5px',
    marginTop: '2px',
  },

  // Divider
  divider: {
    width: '1px',
    height: '24px',
    backgroundColor: '#e5e7eb',
    flexShrink: 0,
  },

  // Search bar
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '9px 13px',
    gap: '8px',
    width: '448px',
    maxWidth: '448px',
    flexShrink: 0,
    cursor: 'text',
    '&:focus-within': {
      outline: '2px solid #0f1f3d',
      outlineOffset: '-1px',
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
  langBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    height: '36px',
    padding: '0 10px',
    borderRadius: '8px',
    cursor: 'pointer',
    '&:hover': { backgroundColor: '#f3f4f6' },
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
  },
  userAvatar: {
    width: '28px !important',
    height: '28px !important',
    backgroundColor: '#0f1f3d !important',
    fontSize: '10px !important',
    fontWeight: '700 !important',
  },
  userName: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#0f1f3d',
    lineHeight: '12px',
  },
  userRole: {
    fontSize: '10px',
    color: '#9ca3af',
    lineHeight: '15px',
    marginTop: '2px',
  },
  chevron: {
    fontSize: '12px !important',
    color: '#9ca3af',
  },
}));
