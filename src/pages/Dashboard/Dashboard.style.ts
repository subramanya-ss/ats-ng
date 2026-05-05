import { makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material/styles';

export const useStyles = makeStyles((theme: Theme) => ({

  // ─── Page header ────────────────────────────────────────────────────────────
  // Breaks out of pageContent padding to become a full-width white strip
  pageHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f3f4f6',
    padding: '12px 24px',
    minHeight: '63px',
    flexShrink: 0,
    flexWrap: 'wrap' as const,
    gap: '12px',
  },
  pageTitle: {
    fontWeight: '700 !important',
    fontSize: '16px !important',
    color: `${theme.palette.navy[800]} !important`,
    lineHeight: '1.2 !important',
  },
  pageSubtitle: {
    fontSize: '12px !important',
    color: `${theme.palette.slate[400]} !important`,
    marginTop: '2px !important',
  },
  headerActions: {
    display: 'flex',
    gap: '10px',
    flexShrink: 0,
  },
  addVacancyBtn: {
    backgroundColor: `${theme.palette.navy[800]} !important`,
    color: '#ffffff !important',
    fontSize: '12px !important',
    padding: '8px 14px !important',
    borderRadius: '6px !important',
    '&:hover': { backgroundColor: `${theme.palette.navy[900]} !important` },
  },
  actionCandidatesBtn: {
    borderColor: `${theme.palette.slate[300]} !important`,
    color: `${theme.palette.navy[800]} !important`,
    fontSize: '12px !important',
    padding: '8px 14px !important',
    borderRadius: '6px !important',
    '&:hover': { borderColor: `${theme.palette.slate[400]} !important`, backgroundColor: `${theme.palette.slate[50]} !important` },
  },

  // ─── Stat cards ──────────────────────────────────────────────────────────────
  statCard: {
    padding: '20px 21px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    minHeight: '91px',
    borderRadius: '16px !important',
    transition: 'box-shadow 0.15s ease',
    '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  },
  statIconBox: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  statValue: {
    fontSize: '28px !important',
    fontWeight: '700 !important',
    color: `${theme.palette.navy[800]} !important`,
    lineHeight: '1 !important',
  },
  statLabel: {
    fontSize: '13px !important',
    color: `${theme.palette.slate[500]} !important`,
    marginTop: '4px !important',
    lineHeight: '1.3 !important',
  },

  // ─── Charts ──────────────────────────────────────────────────────────────────
  chartCard: {
    padding: '20px 22px',
    height: '100%',
  },
  chartTitle: {
    fontWeight: '700 !important',
    fontSize: '14px !important',
    color: `${theme.palette.navy[800]} !important`,
    marginBottom: '16px !important',
  },
  chartLegendItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  chartLegendLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  chartLegendDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  chartLegendText: {
    fontSize: '12px !important',
    color: `${theme.palette.slate[500]} !important`,
  },
  chartLegendValues: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  chartLegendCount: {
    fontSize: '12px !important',
    fontWeight: '600 !important',
    color: `${theme.palette.navy[800]} !important`,
    minWidth: '24px',
    textAlign: 'right' as const,
  },
  chartLegendPct: {
    fontSize: '12px !important',
    color: `${theme.palette.slate[400]} !important`,
    minWidth: '36px',
    textAlign: 'right' as const,
  },
  chartPieCenterValue: {
    fontSize: '16px !important',
    fontWeight: '700 !important',
    color: `${theme.palette.navy[800]} !important`,
    lineHeight: '1 !important',
  },
  chartPieCenterLabel: {
    fontSize: '10px !important',
    color: `${theme.palette.slate[400]} !important`,
    marginTop: '2px !important',
  },

  // ─── Section cards (tables) ──────────────────────────────────────────────────
  sectionCard: {
    overflow: 'hidden',
  },
  sectionHeader: {
    padding: '16px 20px 10px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
    borderBottom: `1px solid ${theme.palette.slate[100]}`,
  },
  sectionTitle: {
    fontWeight: '700 !important',
    fontSize: '15px !important',
    color: `${theme.palette.navy[800]} !important`,
    lineHeight: '1.3 !important',
  },
  sectionSubtitle: {
    fontSize: '12px !important',
    color: `${theme.palette.slate[400]} !important`,
    lineHeight: '1.3 !important',
  },

  // ─── Table ────────────────────────────────────────────────────────────────────
  tableRow: {
    cursor: 'pointer',
    '&:hover': { backgroundColor: theme.palette.slate[50] },
    '&:focus-visible': { outline: `2px solid ${theme.palette.navy[800]}`, outlineOffset: '-2px' },
    '&:last-child td': { borderBottom: 'none' },
  },
  cellLocation: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: theme.palette.slate[500],
    fontSize: '12px',
  },
  cellFresh: {
    color: `${theme.palette.success.main} !important`,
    fontWeight: '600 !important',
  },
  cellRef: {
    color: `${theme.palette.slate[400]} !important`,
    fontSize: '11px !important',
    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
  },
  cellName: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  candidateAvatar: {
    width: '28px !important',
    height: '28px !important',
    fontSize: '10px !important',
    fontWeight: '700 !important',
    flexShrink: 0,
  },
  candidateName: {
    fontSize: '13px !important',
    fontWeight: '600 !important',
    color: `${theme.palette.navy[800]} !important`,
  },
  tableActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  actionBtn: {
    backgroundColor: `${theme.palette.navy[800]} !important`,
    color: '#ffffff !important',
    fontSize: '11px !important',
    padding: '4px 10px !important',
    borderRadius: '6px !important',
    minWidth: '0 !important',
  },
  quickViewBtn: {
    color: `${theme.palette.slate[500]} !important`,
    fontSize: '11px !important',
    padding: '4px 8px !important',
    minWidth: '0 !important',
    border: `1px solid ${theme.palette.slate[200]} !important`,
    borderRadius: '6px !important',
  },

  pageContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
  },
}));
