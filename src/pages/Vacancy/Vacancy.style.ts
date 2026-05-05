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
    padding: '20px 24px 32px',
  },

  // ─── Tabs ────────────────────────────────────────────────────────────────────
  tabs: {
    minHeight: '44px',
    '& .MuiTab-root': {
      fontSize: '13px',
      fontWeight: 500,
      textTransform: 'none' as const,
      color: '#6b7280',
      minWidth: 0,
      minHeight: '44px',
      padding: '0 18px',
      gap: '6px',
    },
    '& .Mui-selected': {
      color: `${theme.palette.navy[800]} !important`,
      fontWeight: '600 !important',
    },
    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.navy[800],
      height: '2px',
    },
  },

  // ─── Vacancy header card ──────────────────────────────────────────────────────
  vacancyHeader: {
    padding: '16px 20px',
    marginBottom: '20px',
    border: `1px solid ${theme.palette.slate[200]} !important`,
    borderRadius: '8px !important',
  },
  vacancyIconBox: {
    width: '44px',
    height: '44px',
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
    gap: '5px',
    backgroundColor: '#dcfce7',
    color: '#16a34a',
    borderRadius: '20px',
    padding: '3px 10px',
    fontSize: '12px',
    fontWeight: 600,
  },
  vacancyLiveDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#16a34a',
  },
  vacancyMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    color: theme.palette.slate[500],
    fontSize: '12px',
  },

  // ─── Single form card ─────────────────────────────────────────────────────────
  formCard: {
    border: `1px solid ${theme.palette.slate[200]} !important`,
    borderRadius: '8px !important',
    overflow: 'hidden',
  },

  // ─── Form card header row ─────────────────────────────────────────────────────
  formHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
  },
  formTitle: {
    fontSize: '15px !important',
    fontWeight: '700 !important',
    color: `${theme.palette.navy[800]} !important`,
    lineHeight: '1.2 !important',
  },
  formSubtitle: {
    fontSize: '12px !important',
    color: '#0891b2 !important',
    marginTop: '3px !important',
  },
  openBtn: {
    backgroundColor: `${theme.palette.success.main} !important`,
    color: '#ffffff !important',
    fontSize: '12px !important',
    fontWeight: '600 !important',
    padding: '6px 22px !important',
    borderRadius: '20px !important',
    textTransform: 'none !important' as 'none',
    '&:hover': { backgroundColor: `${theme.palette.success.dark} !important` },
  },

  // ─── Section block (inside the single form card) ──────────────────────────────
  sectionBlock: {
    padding: '32px 24px 16px',
    '&:last-child': {
      paddingBottom: '32px',
    },
  },

  sectionHeaderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  sectionIconBox: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    backgroundColor: '#0891b2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  sectionTitle: {
    fontWeight: '700 !important',
    fontSize: '14px !important',
    color: `${theme.palette.navy[800]} !important`,
    lineHeight: '1.2 !important',
    marginBottom: '2px !important',
  },
  sectionSubtitle: {
    fontSize: '12px !important',
    color: '#0891b2 !important',
    lineHeight: '1.3 !important',
  },

  // ─── Form fields ─────────────────────────────────────────────────────────────
  fieldLabel: {
    display: 'block',
    fontSize: '11px',
    fontWeight: 500,
    color: theme.palette.slate[500],
    marginBottom: '5px',
    lineHeight: 1.4,
  },
  fieldBox: {
    border: `1px solid ${theme.palette.slate[200]}`,
    borderRadius: '6px',
    padding: '8px 12px',
    backgroundColor: theme.palette.bg.paper,
    minHeight: '36px',
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
    borderRadius: '6px',
    padding: '10px 12px',
    backgroundColor: theme.palette.bg.paper,
    minHeight: '80px',
  },
  textAreaBoxTall: {
    border: `1px solid ${theme.palette.slate[200]}`,
    borderRadius: '6px',
    padding: '10px 12px',
    backgroundColor: theme.palette.bg.paper,
    minHeight: '148px',
  },
  textAreaValue: {
    fontSize: '13px',
    color: theme.palette.slate[700],
    lineHeight: 1.65,
  },

  // ─── Yes / No toggle ─────────────────────────────────────────────────────────
  toggleGroup: {
    display: 'inline-flex',
    border: `1px solid ${theme.palette.slate[200]}`,
    borderRadius: '8px',
    overflow: 'hidden',
    marginTop: '2px',
  },
  toggleBtn: {
    padding: '6px 18px',
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
    padding: '60px 0',
    color: theme.palette.slate[400],
  },
}));
