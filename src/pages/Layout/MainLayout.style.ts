import { makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: theme.palette.bg.main,
  },
  body: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },

  // ─── Drawer shell ─────────────────────────────────────────────────────────
  drawer: {
    width: '224px',
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: '224px',
      backgroundColor: '#06132b',
      color: '#ffffff',
      border: 'none',
      overflowX: 'hidden',
      overflowY: 'auto',
      position: 'relative',
      height: '100%',
      borderRadius: '0px',
    },
  },
  drawerContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },

  // ─── Nav area ─────────────────────────────────────────────────────────────
  nav: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 12px',
    flex: 1,
  },

  // Section header button (Actions / Navigation rows)
  sectionBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '200px',
    height: '40px',
    userSelect: 'none' as const,
    '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' },
    '&:focus-visible': { outline: '2px solid rgba(255,255,255,0.3)', outlineOffset: '-2px' },
  },
  sectionBtnLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  sectionIcon: {
    fontSize: '16px !important',
    color: 'rgba(255,255,255,0.7)',
    flexShrink: 0,
  },
  sectionLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: '20px',
  },
  sectionChevron: {
    fontSize: '14px !important',
    color: 'rgba(255,255,255,0.5)',
  },

  // Sub-items wrapper (indented)
  subItems: {
    paddingLeft: '16px',
    paddingTop: '4px',
    display: 'flex',
    flexDirection: 'column',
  },

  // Regular nav item (36px)
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '184px',
    height: '36px',
    userSelect: 'none' as const,
    '&:hover': { backgroundColor: 'rgba(255,255,255,0.07)' },
    '&:focus-visible': { outline: '2px solid rgba(255,255,255,0.3)', outlineOffset: '-2px' },
    '& + &': { marginTop: '2px' },
  },
  navIcon: {
    fontSize: '14px !important',
    color: 'rgba(255,255,255,0.5)',
    flexShrink: 0,
  },
  navText: {
    fontSize: '14px',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: '20px',
    whiteSpace: 'nowrap' as const,
  },


  navItemActive: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    '&:hover': { backgroundColor: 'rgba(255,255,255,0.18)' },
  },
  navIconActive: {
    fontSize: '14px !important',
    color: '#ffffff',
    flexShrink: 0,
  },
  navTextActive: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#ffffff',
    lineHeight: '20px',
    flex: 1,
  },
  navActiveDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#34d399',
    flexShrink: 0,
  },

  spacer: { flex: 1 },

  // ─── User footer ──────────────────────────────────────────────────────────
  userSection: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    padding: '17px 16px 16px',
    flexShrink: 0,
  },
  userRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '192px',
    height: '32px',
  },
  userAvatarBox: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  userAvatarIcon: {
    fontSize: '14px !important',
    color: 'rgba(255,255,255,0.8)',
  },
  userName: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#ffffff',
    lineHeight: '16px',
  },
  userEmail: {
    fontSize: '10px',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.4)',
    lineHeight: '15px',
  },

  // ─── Main content ─────────────────────────────────────────────────────────
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    minWidth: 0,
  },
  pageContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: '#f0f2f5',
  },
}));
