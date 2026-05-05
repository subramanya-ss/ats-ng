import { makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  // ─── Page layout (mirrors Vacancy) ─────────────────────────────────────────
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

  // ─── Application form section header ─────────────────────────────────────────
  appFormTitle: {
    fontWeight: '700 !important',
    fontSize: '16px !important',
    color: `${theme.palette.navy[800]} !important`,
    lineHeight: '1.2 !important',
    marginBottom: '4px !important',
  },
  appFormSubtitle: {
    fontSize: '12px !important',
    color: `${theme.palette.slate[400]} !important`,
  },

  // ─── Candidate header card ────────────────────────────────────────────────────
  headerCard: {
    padding: '14px 18px',
    marginBottom: '16px',
    border: `1px solid ${theme.palette.slate[200]}`,
  },
  candidateAvatar: {
    width: '38px !important',
    height: '38px !important',
    fontWeight: '700 !important',
    fontSize: '14px !important',
    flexShrink: 0,
  },
  candidateName: {
    fontWeight: 700,
    fontSize: '16px',
    color: theme.palette.navy[800],
    lineHeight: 1.2,
  },
  candidateRole: {
    fontSize: '12px',
    color: theme.palette.slate[500],
  },
  metaLabel: {
    fontSize: '11px',
    color: theme.palette.slate[400],
    marginBottom: '2px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    fontWeight: 600,
  },
  metaValue: {
    fontSize: '13px',
    fontWeight: 600,
    color: theme.palette.navy[800],
  },
  metaValueBlue: {
    fontSize: '13px',
    fontWeight: 600,
    color: theme.palette.info.main,
  },
  metaIconRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: theme.palette.slate[500],
    fontSize: '12px',
  },
  mapPlaceholder: {
    width: '180px',
    height: '110px',
    borderRadius: '8px',
    backgroundColor: theme.palette.slate[200],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'linear-gradient(135deg, #e8edf2 25%, #d4dce6 100%)',
    flexShrink: 0,
    [theme.breakpoints.down('md')]: { display: 'none' },
  },
  mapPlaceholderText: {
    fontSize: '12px',
    color: theme.palette.slate[400],
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

  // ─── Section cards ────────────────────────────────────────────────────────────
  sectionCard: {
    padding: '16px 20px',
    marginBottom: '14px',
    border: `1px solid ${theme.palette.slate[200]}`,
  },
  sectionHeaderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '14px',
  },
  sectionIconBox: {
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    backgroundColor: '#0891b2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  sectionTitle: {
    fontWeight: 700,
    fontSize: '14px',
    color: theme.palette.navy[800],
  },

  // ─── Fields ──────────────────────────────────────────────────────────────────
  fieldLabel: {
    display: 'block',
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    color: theme.palette.slate[400],
    marginBottom: '4px',
  },
  questionLabel: {
    display: 'block',
    fontSize: '13px !important',
    color: `${theme.palette.slate[500]} !important`,
    marginBottom: '8px !important',
    lineHeight: '1.4 !important',
  },
  fieldBox: {
    border: `1px solid ${theme.palette.slate[200]}`,
    borderRadius: '7px',
    padding: '7px 11px',
    backgroundColor: theme.palette.bg.paper,
    minHeight: '34px',
  },
  fieldValue: {
    fontSize: '13px',
    color: theme.palette.navy[800],
    fontWeight: 500,
    lineHeight: 1.5,
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
  charCount: {
    fontSize: '11px !important',
    color: `${theme.palette.slate[400]} !important`,
    marginTop: '4px !important',
  },
  dateFieldBox: {
    border: `1px solid ${theme.palette.slate[200]}`,
    borderRadius: '7px',
    padding: '7px 11px',
    backgroundColor: theme.palette.bg.paper,
    minHeight: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  fieldHint: {
    fontSize: '10px !important',
    color: `${theme.palette.slate[400]} !important`,
    marginTop: '3px !important',
    fontStyle: 'italic' as const,
  },

  // ─── Yes / No toggles ────────────────────────────────────────────────────────
  yesNoGroup: {
    display: 'inline-flex',
    gap: '8px',
  },
  yesActiveBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    padding: '5px 14px',
    border: '1px solid #22c55e',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 600,
    fontFamily: 'inherit',
    backgroundColor: '#dcfce7',
    color: '#166534',
    outline: 'none',
  },
  yesInactiveBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    padding: '5px 14px',
    border: `1px solid ${theme.palette.slate[300]}`,
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
    fontFamily: 'inherit',
    backgroundColor: '#ffffff',
    color: theme.palette.slate[500],
    '&:hover': { backgroundColor: theme.palette.slate[50] },
  },
  noActiveBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    padding: '5px 14px',
    border: '1px solid #ef4444',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 600,
    fontFamily: 'inherit',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    outline: 'none',
  },
  noInactiveBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    padding: '5px 14px',
    border: `1px solid ${theme.palette.slate[300]}`,
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
    fontFamily: 'inherit',
    backgroundColor: '#ffffff',
    color: theme.palette.slate[500],
    '&:hover': { backgroundColor: theme.palette.slate[50] },
  },
  radioFilled: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#22c55e',
    flexShrink: 0,
    display: 'inline-block',
  },
  radioFilledRed: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#ef4444',
    flexShrink: 0,
    display: 'inline-block',
  },
  radioEmpty: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: `1.5px solid ${theme.palette.slate[400]}`,
    flexShrink: 0,
    display: 'inline-block',
    backgroundColor: 'transparent',
  },

  // ─── Employer card (legacy — kept for reference) ──────────────────────────────
  employerCard: {
    border: `1px solid ${theme.palette.slate[200]}`,
    borderRadius: '8px',
    padding: '12px 14px',
    marginBottom: '10px',
    '&:last-child': { marginBottom: 0 },
  },
  employerCardTitle: {
    fontSize: '11px',
    fontWeight: 700,
    color: theme.palette.info.main,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    marginBottom: '10px',
  },

  // ─── Interview / offer tables ─────────────────────────────────────────────────
  subSectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  addBtn: {
    color: `${theme.palette.info.main} !important`,
    fontSize: '12px !important',
    fontWeight: '600 !important',
    padding: '3px 8px !important',
  },
  tableRow: {
    '&:last-child td': { borderBottom: 'none' },
  },

  // ─── Application summary ──────────────────────────────────────────────────────
  sourceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
  },
  sourceIcon: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    backgroundColor: theme.palette.navy[800],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  sourceIconText: {
    fontSize: '9px',
    color: '#ffffff',
    fontWeight: 800,
  },
  sourceText: {
    fontSize: '13px',
    fontWeight: 500,
    color: theme.palette.navy[800],
  },

  // ─── Empty tab ────────────────────────────────────────────────────────────────
  emptyTab: {
    textAlign: 'center' as const,
    padding: '48px 0',
    color: theme.palette.slate[400],
    fontSize: '13px',
  },
}));
