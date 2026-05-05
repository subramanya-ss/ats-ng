import React from 'react';
import { Drawer, Box, Typography, IconButton, Divider } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import CampaignIcon from '@mui/icons-material/Campaign';
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ArticleIcon from '@mui/icons-material/Article';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

// ─── Shared type (imported by Dashboard.tsx) ──────────────────────────────────

export interface VacancyData {
  id: number;
  title: string;
  location: string;
  status: string;
  total: number;
  fresh: number;
  interview: number;
  contractType: string;
  grade: string;
  department: string;
  jobDescription: string;
  fullJobDescription: string;
  costCentre: string;
  reportingTo: string;
  replacementFor: string;
  hours: string;
  startDate: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  vacancy: VacancyData | null;
  onFullView: (id: number) => void;
}

// ─── Small helpers ────────────────────────────────────────────────────────────

const FieldRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', py: '9px', borderBottom: '1px solid #f9fafb' }}>
    <Typography sx={{ width: '130px', flexShrink: 0, fontSize: '12px', color: '#9ca3af', lineHeight: 1.5 }}>
      {label}
    </Typography>
    <Typography sx={{ flex: 1, fontSize: '13px', fontWeight: 600, color: '#1a2332', lineHeight: 1.5 }}>
      {value}
    </Typography>
  </Box>
);

const SectionLabel: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: '7px', py: '12px', mt: '6px' }}>
    {icon}
    <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>{title}</Typography>
  </Box>
);

const ActionBtn: React.FC<{
  icon: React.ReactNode; label: string;
  bg?: string; color?: string; border?: string;
}> = ({ icon, label, bg = 'transparent', color = '#374151', border }) => (
  <Box
    component="button"
    sx={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
      padding: '12px 6px', borderRadius: '10px', cursor: 'pointer',
      fontFamily: 'inherit', backgroundColor: bg, color,
      border: border ?? 'none',
      '&:hover': { filter: 'brightness(0.95)' },
      transition: 'filter 0.12s',
    }}
  >
    {icon}
    <Typography sx={{ fontSize: '11px', fontWeight: 600, color: 'inherit', lineHeight: 1 }}>
      {label}
    </Typography>
  </Box>
);

// ─── Component ────────────────────────────────────────────────────────────────

export const VacancyQuickView: React.FC<Props> = ({ open, onClose, vacancy, onFullView }) => {
  if (!vacancy) return null;

  const statusBg: Record<string, { bg: string; color: string }> = {
    'Live':           { bg: '#dcfce7', color: '#166534' },
    'Awaiting Auth':  { bg: '#fef3c7', color: '#92400e' },
    'Awaiting Advert':{ bg: '#fef3c7', color: '#92400e' },
    'Draft':          { bg: '#f1f5f9', color: '#475569' },
  };
  const s = statusBg[vacancy.status] ?? { bg: '#f1f5f9', color: '#475569' };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: '380px',
            maxWidth: '95vw',
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      {/* ── Header ────────────────────────────────────────────────── */}
      <Box sx={{ px: '16px', py: '14px', borderBottom: '1px solid #f3f4f6', flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          {/* Icon box */}
          <Box sx={{
            width: 40, height: 40, borderRadius: '10px', backgroundColor: '#1a2332',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <WorkIcon sx={{ fontSize: '18px', color: '#ffffff' }} />
          </Box>

          {/* Title + meta */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#1a2332', lineHeight: 1.2, mb: '5px' }}>
              {vacancy.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {/* Live badge */}
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: s.bg, color: s.color, borderRadius: '20px', px: '8px', py: '2px', fontSize: '11px', fontWeight: 700 }}>
                <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: s.color }} />
                {vacancy.status}
              </Box>
              {/* Location */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#6b7280', fontSize: '12px' }}>
                <LocationOnIcon sx={{ fontSize: '12px' }} />
                {vacancy.location}
              </Box>
            </Box>
          </Box>

          {/* Full View + Close */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <Box
              component="button"
              onClick={() => onFullView(vacancy.id)}
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                fontSize: '12px', fontWeight: 500, color: '#374151',
                border: '1px solid #d1d5db', borderRadius: '6px',
                padding: '4px 10px', cursor: 'pointer',
                fontFamily: 'inherit', backgroundColor: '#ffffff',
                '&:hover': { backgroundColor: '#f9fafb' },
              }}
            >
              <OpenInNewIcon sx={{ fontSize: '13px' }} />
              Full View
            </Box>
            <IconButton size="small" onClick={onClose} sx={{ color: '#9ca3af' }}>
              <CloseIcon sx={{ fontSize: '18px' }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* ── Actions ───────────────────────────────────────────────── */}
      <Box sx={{ px: '16px', pt: '12px', pb: '8px', flexShrink: 0 }}>
        <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', mb: '8px' }}>
          Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <ActionBtn
            icon={<CampaignIcon sx={{ fontSize: '20px', color: '#ffffff' }} />}
            label="Advertise" bg="#16a34a" color="#ffffff"
          />
          <ActionBtn
            icon={<PauseCircleOutlinedIcon sx={{ fontSize: '20px', color: '#ffffff' }} />}
            label="Suspend" bg="#f59e0b" color="#ffffff"
          />
          <ActionBtn
            icon={<ArchiveIcon sx={{ fontSize: '20px', color: '#374151' }} />}
            label="Archive" bg="transparent" color="#374151" border="1px solid #e5e7eb"
          />
          <ActionBtn
            icon={<DeleteOutlineIcon sx={{ fontSize: '20px', color: '#ef4444' }} />}
            label="Remove" bg="transparent" color="#ef4444" border="1px solid #fecaca"
          />
        </Box>
      </Box>

      {/* ── Stats ─────────────────────────────────────────────────── */}
      <Box sx={{ mx: '16px', mb: '4px', border: '1px solid #f3f4f6', borderRadius: '10px', display: 'flex', flexShrink: 0 }}>
        <Box sx={{ flex: 1, textAlign: 'center', py: '14px' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#1a2332' }}>{vacancy.total}</Typography>
          <Typography sx={{ fontSize: '11px', color: '#9ca3af', mt: '2px' }}>Total</Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ flex: 1, textAlign: 'center', py: '14px' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#22c55e' }}>{vacancy.fresh}</Typography>
          <Typography sx={{ fontSize: '11px', color: '#9ca3af', mt: '2px' }}>Fresh</Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ flex: 1, textAlign: 'center', py: '14px' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#1a2332' }}>{vacancy.interview}</Typography>
          <Typography sx={{ fontSize: '11px', color: '#9ca3af', mt: '2px' }}>Rec. Interview</Typography>
        </Box>
      </Box>

      {/* ── Scrollable detail sections ─────────────────────────────── */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: '16px', pb: '24px' }}>

        {/* Vacancy Details */}
        <SectionLabel icon={<ListAltIcon sx={{ fontSize: '14px', color: '#6b7280' }} />} title="Vacancy Details" />
        <FieldRow label="Status" value={vacancy.status} />
        <FieldRow label="Request Title" value={vacancy.title} />
        <FieldRow label="Contract Type" value={vacancy.contractType} />
        <FieldRow label="Location" value={vacancy.location} />
        <FieldRow label="Grade" value={vacancy.grade} />
        <FieldRow label="Department" value={vacancy.department} />

        {/* Job Description */}
        <SectionLabel icon={<ArticleIcon sx={{ fontSize: '14px', color: '#6b7280' }} />} title="Job Description" />
        <Box sx={{ py: '9px', borderBottom: '1px solid #f9fafb' }}>
          <Typography sx={{ fontSize: '12px', color: '#9ca3af', mb: '4px' }}>Job Description</Typography>
          <Typography sx={{
            fontSize: '13px', color: '#374151', lineHeight: 1.5,
            overflow: 'hidden', display: '-webkit-box',
            WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
          }}>
            {vacancy.jobDescription}
          </Typography>
        </Box>
        <Box sx={{ py: '9px', borderBottom: '1px solid #f9fafb' }}>
          <Typography sx={{ fontSize: '12px', color: '#9ca3af', mb: '4px' }}>Full Job Description</Typography>
          <Typography sx={{
            fontSize: '13px', color: '#374151', lineHeight: 1.5,
            overflow: 'hidden', display: '-webkit-box',
            WebkitLineClamp: 4, WebkitBoxOrient: 'vertical',
          }}>
            {vacancy.fullJobDescription}
          </Typography>
        </Box>

        {/* Employment Details */}
        <SectionLabel icon={<ManageAccountsIcon sx={{ fontSize: '14px', color: '#6b7280' }} />} title="Employment Details" />
        <FieldRow label="Cost Centre" value={vacancy.costCentre} />
        <FieldRow label="Reporting To" value={vacancy.reportingTo} />
        <FieldRow label="Replacement For" value={vacancy.replacementFor} />
        <FieldRow label="Hours" value={vacancy.hours} />
        <FieldRow label="Start Date" value={vacancy.startDate} />

      </Box>
    </Drawer>
  );
};
