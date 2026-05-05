import { makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material/styles';

export const useStyles = makeStyles((theme: Theme) => ({

  // ─── Page layout ─────────────────────────────────────────────────────────────
  pageHeader: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f3f4f6',
    padding: '0 24px',
    flexShrink: 0,
  },
  pageContent: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '24px',
  },

  // ─── Tabs ────────────────────────────────────────────────────────────────────
  tabs: {
    '& .MuiTab-root': {
      fontSize: '13px',
      fontWeight: 500,
      textTransform: 'none' as const,
      color: '#6b7280',
      minWidth: 0,
      padding: '12px 16px',
    },
    '& .Mui-selected': {
      color: `${theme.palette.navy[800]} !important`,
      fontWeight: '600 !important',
    },
    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.navy[800],
    },
  },

  // ─── Vacancy header card ──────────────────────────────────────────────────────
  vacancyHeader: {
    padding: '14px 18px',
    marginBottom: '16px',
    border: `1px solid ${theme.palette.slate[200]} !important`,
  },
  vacancyIconBox: {
    width: '42px',
    height: '42px',
    borderRadius: '10px',
    backgroundColor: theme.palette.navy[800],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  vacancyTitle: {
    fontWeight: '700 !important',
    fontSize: '16px !important',
    color: `${theme.palette.navy[800]} !important`,
    lineHeight: '1.2 !important',
  },
  vacancyLiveBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: '#dcfce7',
    color: '#16a34a',
    borderRadius: '20px',
    padding: '2px 10px',
    fontSize: '11px',
    fontWeight: 700,
  },
  vacancyLiveDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: '#16a34a',
  },
  vacancyMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: theme.palette.slate[500],
    fontSize: '12px',
  },

  // ─── Vacancy Form header ──────────────────────────────────────────────────────
  formHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 20px',
    marginBottom: '14px',
    border: `1px solid ${theme.palette.slate[200]} !important`,
  },
  formTitle: {
    fontSize: '14px !important',
    fontWeight: '700 !important',
    color: `${theme.palette.navy[800]} !important`,
    lineHeight: '1.2 !important',
  },
  formSubtitle: {
    fontSize: '12px !important',
    color: '#0891b2 !important',
    marginTop: '2px !important',
  },
  openBtn: {
    backgroundColor: `${theme.palette.success.main} !important`,
    color: '#ffffff !important',
    fontSize: '12px !important',
    padding: '6px 18px !important',
    borderRadius: '6px !important',
    '&:hover': { backgroundColor: `${theme.palette.success.dark} !important` },
  },

  // ─── Section cards ────────────────────────────────────────────────────────────
  sectionCard: {
    padding: '18px 22px',
    marginBottom: '14px',
    border: `1px solid ${theme.palette.slate[200]} !important`,
  },
  sectionHeaderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px',
  },
  sectionIconBox: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#0891b2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  sectionTitle: {
    fontWeight: '700 !important',
    fontSize: '13px !important',
    color: `${theme.palette.navy[800]} !important`,
    lineHeight: '1.2 !important',
  },
  sectionSubtitle: {
    fontSize: '11px !important',
    color: '#0891b2 !important',
    lineHeight: '1.3 !important',
  },

  // ─── Form fields ─────────────────────────────────────────────────────────────
  fieldLabel: {
    display: 'block',
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    color: theme.palette.slate[400],
    marginBottom: '4px',
  },
  fieldBox: {
    border: `1px solid ${theme.palette.slate[200]}`,
    borderRadius: '7px',
    padding: '7px 11px',
    backgroundColor: theme.palette.bg.paper,
    minHeight: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldValue: {
    fontSize: '13px',
    color: theme.palette.navy[800],
    fontWeight: 500,
    lineHeight: 1.5,
    flex: 1,
  },
  fieldCalendarIcon: {
    fontSize: '14px !important',
    color: theme.palette.slate[400],
    flexShrink: 0,
  },
  textAreaBox: {
    border: `1px solid ${theme.palette.slate[200]}`,
    borderRadius: '7px',
    padding: '9px 11px',
    backgroundColor: theme.palette.bg.paper,
    minHeight: '72px',
  },
  textAreaValue: {
    fontSize: '13px',
    color: theme.palette.slate[700],
    lineHeight: 1.6,
  },

  // ─── Yes / No toggle ─────────────────────────────────────────────────────────
  toggleGroup: {
    display: 'inline-flex',
    border: `1px solid ${theme.palette.slate[200]}`,
    borderRadius: '8px',
    overflow: 'hidden',
  },
  toggleBtn: {
    padding: '5px 16px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'inherit',
    transition: 'background-color 0.15s',
    outline: 'none',
    '&:focus-visible': { outline: `2px solid ${theme.palette.navy[800]}`, outlineOffset: '-2px' },
  },
  toggleYesActive: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  toggleYesInactive: {
    backgroundColor: theme.palette.bg.paper,
    color: theme.palette.slate[500],
    '&:hover': { backgroundColor: theme.palette.slate[50] },
  },
  toggleNoActive: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  },
  toggleNoInactive: {
    backgroundColor: theme.palette.bg.paper,
    color: theme.palette.slate[500],
    '&:hover': { backgroundColor: theme.palette.slate[50] },
  },

  // ─── Empty tab state ─────────────────────────────────────────────────────────
  emptyTab: {
    textAlign: 'center' as const,
    padding: '48px 0',
    color: theme.palette.slate[400],
  },
}));
