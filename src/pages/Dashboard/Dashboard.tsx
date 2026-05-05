import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid2 as Grid,
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Avatar,
  Stack,
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import WorkIcon from '@mui/icons-material/Work';
import ShieldIcon from '@mui/icons-material/Shield';
import CampaignIcon from '@mui/icons-material/Campaign';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CheckIcon from '@mui/icons-material/Check';
import { useStyles } from './Dashboard.style';
import { NewVacancyDialog } from './NewVacancyDialog';

// ─── Static data ─────────────────────────────────────────────────────────────

interface StatCard {
  value: number;
  label: string;
  icon: React.ReactNode;
  iconBg: string;
}

const statCards: StatCard[] = [
  { value: 24,  label: 'Live Jobs',               icon: <WorkIcon sx={{ fontSize: '22px', color: '#3b82f6' }} />,   iconBg: '#dbeafe' },
  { value: 7,   label: 'Awaiting Authorization',  icon: <ShieldIcon sx={{ fontSize: '22px', color: '#f59e0b' }} />, iconBg: '#fef3c7' },
  { value: 5,   label: 'Awaiting Advertisement',  icon: <CampaignIcon sx={{ fontSize: '22px', color: '#ef4444' }} />,iconBg: '#fee2e2' },
  { value: 38,  label: 'Candidates to Review',    icon: <PeopleIcon sx={{ fontSize: '22px', color: '#8b5cf6' }} />, iconBg: '#ede9fe' },
  { value: 112, label: 'Live Applications',       icon: <AssignmentIcon sx={{ fontSize: '22px', color: '#22c55e' }} />, iconBg: '#dcfce7' },
  { value: 14,  label: 'Interviews Pending',      icon: <EventIcon sx={{ fontSize: '22px', color: '#f97316' }} />,  iconBg: '#ffedd5' },
];

const candidateStatusData = [
  { name: 'Fresh',              value: 45, color: '#1a2332' },
  { name: 'Request Rejection',  value: 18, color: '#f97316' },
  { name: 'Interview Confirmed',value: 37, color: '#2dd4bf' },
];

const groupAppData = [
  { name: 'Freshly Shortlisted', value: 38, color: '#1a2332' },
  { name: 'In Interview',        value: 62, color: '#2dd4bf' },
];

interface Vacancy {
  id: number; title: string; location: string; status: string;
  total: number; fresh: number; interview: number;
}
const vacancies: Vacancy[] = [
  { id: 1, title: 'Senior Software Engineer', location: 'London, UK',       status: 'Live',            total: 24, fresh: 8, interview: 5 },
  { id: 2, title: 'Product Manager',          location: 'Manchester, UK',   status: 'Awaiting Auth',   total: 12, fresh: 4, interview: 2 },
  { id: 3, title: 'UX Designer',              location: 'Remote',           status: 'Live',            total: 18, fresh: 6, interview: 4 },
  { id: 4, title: 'Data Analyst',             location: 'Birmingham, UK',   status: 'Awaiting Advert', total: 9,  fresh: 3, interview: 1 },
  { id: 5, title: 'DevOps Engineer',          location: 'Edinburgh, UK',    status: 'Live',            total: 15, fresh: 5, interview: 3 },
  { id: 6, title: 'Marketing Specialist',     location: 'Bristol, UK',      status: 'Draft',           total: 6,  fresh: 2, interview: 0 },
  { id: 7, title: 'Finance Analyst',          location: 'Leeds, UK',        status: 'Live',            total: 11, fresh: 4, interview: 2 },
];

interface Application {
  id: number; ref: string; initials: string; avatarBg: string;
  name: string; vacancy: string; location: string; status: string; date: string;
}
const applications: Application[] = [
  { id: 1, ref: 'APP-2024-001', initials: 'JT', avatarBg: '#3b82f6', name: 'James Thornton',  vacancy: 'Senior Software Engineer', location: 'London, UK',      status: 'Fresh',              date: '15 Mar 2024' },
  { id: 2, ref: 'APP-2024-002', initials: 'SM', avatarBg: '#8b5cf6', name: 'Sarah Mitchell',  vacancy: 'Product Manager',          location: 'Manchester, UK',  status: 'Interview Confirmed',date: '14 Mar 2024' },
  { id: 3, ref: 'APP-2024-003', initials: 'DO', avatarBg: '#22c55e', name: 'David Okafor',    vacancy: 'UX Designer',              location: 'Remote',          status: 'Shortlisted',        date: '13 Mar 2024' },
  { id: 4, ref: 'APP-2024-004', initials: 'EC', avatarBg: '#f59e0b', name: 'Emma Clarke',     vacancy: 'Data Analyst',             location: 'Birmingham, UK',  status: 'Fresh',              date: '12 Mar 2024' },
  { id: 5, ref: 'APP-2024-005', initials: 'LP', avatarBg: '#ef4444', name: 'Liam Patel',      vacancy: 'DevOps Engineer',          location: 'Edinburgh, UK',   status: 'Rejected',           date: '11 Mar 2024' },
  { id: 6, ref: 'APP-2024-006', initials: 'OB', avatarBg: '#06b6d4', name: 'Olivia Bennett',  vacancy: 'Marketing Specialist',     location: 'Bristol, UK',     status: 'Fresh',              date: '10 Mar 2024' },
  { id: 7, ref: 'APP-2024-007', initials: 'NW', avatarBg: '#1a2332', name: 'Noah Williams',   vacancy: 'Finance Analyst',          location: 'Leeds, UK',       status: 'Interview Confirmed',date: '09 Mar 2024' },
  { id: 8, ref: 'APP-2024-008', initials: 'AJ', avatarBg: '#f97316', name: 'Ava Johnson',     vacancy: 'Senior Software Engineer', location: 'London, UK',      status: 'Shortlisted',        date: '08 Mar 2024' },
];

// ─── Status badge helper ─────────────────────────────────────────────────────

type BadgeVariant = 'Live' | 'Awaiting Auth' | 'Awaiting Advert' | 'Draft' |
  'Fresh' | 'Interview Confirmed' | 'Shortlisted' | 'Rejected';

const badgeStyles: Record<BadgeVariant, { bg: string; color: string }> = {
  'Live':               { bg: '#dcfce7', color: '#166534' },
  'Awaiting Auth':      { bg: '#fef3c7', color: '#92400e' },
  'Awaiting Advert':    { bg: '#fef3c7', color: '#92400e' },
  'Draft':              { bg: '#f1f5f9', color: '#475569' },
  'Fresh':              { bg: '#dcfce7', color: '#166534' },
  'Interview Confirmed':{ bg: '#dbeafe', color: '#1e40af' },
  'Shortlisted':        { bg: '#ede9fe', color: '#5b21b6' },
  'Rejected':           { bg: '#fee2e2', color: '#991b1b' },
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const style = badgeStyles[status as BadgeVariant] ?? { bg: '#f1f5f9', color: '#475569' };
  return (
    <Box
      sx={{
        display: 'inline-block',
        backgroundColor: style.bg,
        color: style.color,
        borderRadius: '5px',
        px: '8px',
        py: '2px',
        fontSize: '11px',
        fontWeight: 700,
        lineHeight: 1.6,
        whiteSpace: 'nowrap',
      }}
      role="status"
      aria-label={`Status: ${status}`}
    >
      {status}
    </Box>
  );
};

// ─── Add Vacancy modal data ───────────────────────────────────────────────────

const departments = [
  'Global Template',
  'Argyll and the Islands',
  'Business Improvement and Internal Audit',
  'Caithness and Sutherland',
  'Communities and Place',
  'Finance and Corporate Services',
  'IT Department',
  'Legal and Governance',
  'People and Culture',
  'Planning and Infrastructure',
];

// ─── Component ───────────────────────────────────────────────────────────────

/** Home Dashboard — recruitment pipeline overview */
export const Dashboard: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [addVacancyOpen, setAddVacancyOpen] = useState(false);
  const [newVacancyOpen, setNewVacancyOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);

  return (
    <Box component="section" aria-label="Home Dashboard" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* ─── Page header ──────────────────────────────────────────── */}
      <Box className={classes.pageHeader}>
        <Box>
          <Typography component="h1" className={classes.pageTitle}>Home Dashboard</Typography>
          <Typography className={classes.pageSubtitle}>Overview of your recruitment pipeline</Typography>
        </Box>
        <Stack direction="row" spacing={1.5} className={classes.headerActions}>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon sx={{ fontSize: '13px' }} />}
            className={classes.addVacancyBtn}
            onClick={() => setAddVacancyOpen(true)}
            aria-label="Add a new vacancy"
          >
            Add Vacancy
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<PersonIcon sx={{ fontSize: '13px' }} />}
            className={classes.actionCandidatesBtn}
            aria-label="Take action on candidates"
          >
            Action Candidates
          </Button>
        </Stack>
      </Box>
    <Box className={classes.pageContent}>
      {/* ─── Stat cards ───────────────────────────────────────────── */}
      <Grid container spacing={2} sx={{ mb: '20px' }}>
        {statCards.map((card) => (
          <Grid key={card.label} size={{ xs: 12, sm: 6, md: 4 }}>
            <Paper className={classes.statCard} role="region" aria-label={`${card.label}: ${card.value}`} elevation={0}
              sx={{ border: '1px solid #f3f4f6' }}>
              <Box className={classes.statIconBox} sx={{ backgroundColor: card.iconBg }} aria-hidden="true">
                {card.icon}
              </Box>
              <Box>
                <Typography className={classes.statValue}>{card.value}</Typography>
                <Typography className={classes.statLabel}>{card.label}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* ─── Charts ───────────────────────────────────────────────── */}
      <Grid container spacing={2} sx={{ mb: '20px' }} alignItems="stretch">
        {/* Candidate Status */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper className={classes.chartCard} role="region" aria-label="Candidate Status chart"
            elevation={0} sx={{ border: '1px solid #f3f4f6' }}>
            <Typography className={classes.chartTitle}>Candidate Status</Typography>
            <Stack direction="row" alignItems="center" gap="16px">
              <Box sx={{ position: 'relative', width: '110px', height: '110px', flexShrink: 0 }}>
                <ResponsiveContainer width={110} height={110}>
                  <PieChart>
                    <Pie data={candidateStatusData} cx={50} cy={50} innerRadius={32} outerRadius={50}
                      dataKey="value" startAngle={90} endAngle={-270} strokeWidth={0}>
                      {candidateStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                  <Typography className={classes.chartPieCenterValue}>100</Typography>
                  <Typography className={classes.chartPieCenterLabel}>Total</Typography>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                {candidateStatusData.map((d) => (
                  <Box key={d.name} className={classes.chartLegendItem}>
                    <Box className={classes.chartLegendLabel}>
                      <Box className={classes.chartLegendDot} sx={{ backgroundColor: d.color }} aria-hidden="true" />
                      <Typography className={classes.chartLegendText}>{d.name}</Typography>
                    </Box>
                    <Box className={classes.chartLegendValues}>
                      <Typography className={classes.chartLegendCount}>{d.value}</Typography>
                      <Typography className={classes.chartLegendPct}>{d.value}%</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Group Application */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper className={classes.chartCard} role="region" aria-label="Group Application by Status chart"
            elevation={0} sx={{ border: '1px solid #f3f4f6' }}>
            <Typography className={classes.chartTitle}>Group Application by Status</Typography>
            <Stack direction="row" alignItems="center" gap="16px">
              <Box sx={{ width: '160px', height: '160px', flexShrink: 0 }}>
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie
                      data={groupAppData}
                      cx={75} cy={75}
                      outerRadius={70}
                      dataKey="value"
                      startAngle={90} endAngle={-270}
                      strokeWidth={0}
                      label={({ cx, cy, midAngle = 0, innerRadius, outerRadius, value }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        return (
                          <text x={x} y={y} fill="#ffffff" textAnchor="middle" dominantBaseline="central"
                            fontSize={12} fontWeight={700}>
                            {`${value}%`}
                          </text>
                        );
                      }}
                      labelLine={false}
                    >
                      {groupAppData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box>
                {groupAppData.map((d) => (
                  <Box key={d.name} className={classes.chartLegendLabel} sx={{ mb: '10px' }}>
                    <Box sx={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: d.color, flexShrink: 0 }} aria-hidden="true" />
                    <Typography className={classes.chartLegendText}>{d.name}</Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* ─── Vacancies table ──────────────────────────────────────── */}
      <Paper className={classes.sectionCard} elevation={0} sx={{ mb: '20px', border: '1px solid #f3f4f6' }}>
        <Box className={classes.sectionHeader}>
          <Typography className={classes.sectionTitle}>Vacancies</Typography>
          <Typography className={classes.sectionSubtitle}>7 total vacancies</Typography>
        </Box>
        <TableContainer>
          <Table size="small" aria-label="Vacancies table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"><Checkbox size="small" inputProps={{ 'aria-label': 'Select all vacancies' }} /></TableCell>
                <TableCell>Vacancy</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Fresh</TableCell>
                <TableCell>Rec. Interview</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vacancies.map((row) => (
                <TableRow
                  key={row.id}
                  className={classes.tableRow}
                  tabIndex={0}
                  onClick={() => navigate(`/vacancy/${row.id}`)}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/vacancy/${row.id}`)}
                  aria-label={`Vacancy: ${row.title}`}
                >
                  <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                    <Checkbox size="small" inputProps={{ 'aria-label': `Select ${row.title}` }} />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{row.title}</TableCell>
                  <TableCell>
                    <Box className={classes.cellLocation}>
                      <LocationOnIcon sx={{ fontSize: '11px' }} aria-hidden="true" />
                      {row.location}
                    </Box>
                  </TableCell>
                  <TableCell><StatusBadge status={row.status} /></TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{row.total}</TableCell>
                  <TableCell className={classes.cellFresh}>{row.fresh}</TableCell>
                  <TableCell>{row.interview}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Box className={classes.tableActions}>
                      <Button size="small" className={classes.actionBtn} endIcon={<ArrowDropDownIcon sx={{ fontSize: '13px' }} />}
                        aria-label={`Action menu for ${row.title}`}>
                        Action
                      </Button>
                      <Button size="small" className={classes.quickViewBtn} startIcon={<RemoveRedEyeIcon sx={{ fontSize: '12px' }} />}
                        aria-label={`Quick view ${row.title}`}>
                        Quick View
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* ─── Applications table ────────────────────────────────────── */}
      <Paper className={classes.sectionCard} elevation={0} sx={{ border: '1px solid #f3f4f6' }}>
        <Box className={classes.sectionHeader}>
          <Typography className={classes.sectionTitle}>Applications</Typography>
          <Typography className={classes.sectionSubtitle}>8 total applications</Typography>
        </Box>
        <TableContainer>
          <Table size="small" aria-label="Applications table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"><Checkbox size="small" inputProps={{ 'aria-label': 'Select all applications' }} /></TableCell>
                <TableCell>Ref No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Vacancy</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date Submitted</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((row) => (
                <TableRow
                  key={row.id}
                  className={classes.tableRow}
                  tabIndex={0}
                  onClick={() => navigate(`/application/${row.id}`)}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/application/${row.id}`)}
                  aria-label={`Application from ${row.name}`}
                >
                  <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                    <Checkbox size="small" inputProps={{ 'aria-label': `Select application from ${row.name}` }} />
                  </TableCell>
                  <TableCell className={classes.cellRef}>{row.ref}</TableCell>
                  <TableCell>
                    <Box className={classes.cellName}>
                      <Avatar
                        className={classes.candidateAvatar}
                        sx={{ backgroundColor: row.avatarBg }}
                        aria-hidden="true"
                      >
                        {row.initials}
                      </Avatar>
                      <Typography className={classes.candidateName}>{row.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.vacancy}</TableCell>
                  <TableCell>
                    <Box className={classes.cellLocation}>
                      <LocationOnIcon sx={{ fontSize: '11px' }} aria-hidden="true" />
                      {row.location}
                    </Box>
                  </TableCell>
                  <TableCell><StatusBadge status={row.status} /></TableCell>
                  <TableCell sx={{ color: '#64748b' }}>{row.date}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Box className={classes.tableActions}>
                      <Button size="small" className={classes.actionBtn} endIcon={<ArrowDropDownIcon sx={{ fontSize: '13px' }} />}
                        aria-label={`Action menu for ${row.name}`}>
                        Action
                      </Button>
                      <Button size="small" className={classes.quickViewBtn} startIcon={<RemoveRedEyeIcon sx={{ fontSize: '12px' }} />}
                        aria-label={`Quick view ${row.name}`}>
                        Quick View
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>

      {/* ─── New Vacancy wizard ───────────────────────────────────── */}
      <NewVacancyDialog
        open={newVacancyOpen}
        onClose={() => setNewVacancyOpen(false)}
        onSuccess={() => { setNewVacancyOpen(false); setSuccessOpen(true); }}
        department={selectedDepartment}
      />

      {/* ─── Vacancy created success dialog ──────────────────────── */}
      <Dialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        aria-labelledby="success-title"
        slotProps={{
          paper: {
            sx: {
              borderRadius: '16px',
              width: '400px',
              maxWidth: '95vw',
              p: '36px 32px',
              textAlign: 'center',
            },
          },
        }}
      >
        {/* Green check icon */}
        <Box sx={{
          width: 64, height: 64, borderRadius: '50%',
          backgroundColor: '#dcfce7',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          mx: 'auto', mb: '20px',
        }}>
          <CheckIcon sx={{ fontSize: '32px', color: '#22c55e' }} />
        </Box>

        <Typography id="success-title" sx={{ fontWeight: 700, fontSize: '20px', color: '#1a2332', mb: '10px' }}>
          Vacancy Created
        </Typography>

        <Typography sx={{ fontSize: '14px', color: '#374151', mb: '6px', lineHeight: 1.5 }}>
          <Box component="span" sx={{ fontWeight: 700 }}>New Vacancy</Box>
          {' '}has been successfully created.
        </Typography>
        <Typography sx={{ fontSize: '13px', color: '#6b7280', mb: '28px' }}>
          Department:{' '}
          <Box component="span" sx={{ fontWeight: 700, color: '#1a2332' }}>{selectedDepartment}</Box>
        </Typography>

        <Button
          variant="contained"
          fullWidth
          disableElevation
          onClick={() => setSuccessOpen(false)}
          sx={{
            backgroundColor: '#1a2332', color: '#ffffff',
            fontSize: '14px', fontWeight: 600,
            py: '12px', borderRadius: '10px',
            '&:hover': { backgroundColor: '#0f172a' },
          }}
        >
          Done
        </Button>
      </Dialog>

      {/* ─── Add New Vacancy modal ─────────────────────────────────── */}
      <Dialog
        open={addVacancyOpen}
        onClose={() => setAddVacancyOpen(false)}
        aria-labelledby="add-vacancy-title"
        slotProps={{
          paper: {
            sx: {
              borderRadius: '16px',
              width: '440px',
              maxWidth: '95vw',
              p: 0,
              overflow: 'hidden',
            },
          },
        }}
      >
        {/* Header */}
        <Box sx={{ px: '24px', pt: '24px', pb: '16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography id="add-vacancy-title" sx={{ fontWeight: 700, fontSize: '18px', color: '#1a2332', lineHeight: 1.2, mb: '6px' }}>
              Add New Vacancy
            </Typography>
            <Typography sx={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.4 }}>
              Select a department to load the relevant vacancy template.
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => setAddVacancyOpen(false)}
            aria-label="Close modal"
            sx={{ color: '#9ca3af', mt: '-4px', mr: '-8px', '&:hover': { backgroundColor: '#f1f5f9' } }}
          >
            <CloseIcon sx={{ fontSize: '18px' }} />
          </IconButton>
        </Box>

        {/* Department list */}
        <DialogContent sx={{ px: '24px', pb: '24px', pt: 0, maxHeight: '420px', overflowY: 'auto' }}>
          <Stack spacing={1}>
            {departments.map((dept) => (
              <Box
                key={dept}
                component="button"
                onClick={() => { setAddVacancyOpen(false); setSelectedDepartment(dept); setNewVacancyOpen(true); }}
                aria-label={`Select ${dept} template`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  width: '100%',
                  textAlign: 'left',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background-color 0.12s',
                  '&:hover': { backgroundColor: '#f8fafc', borderColor: '#d1d5db' },
                }}
              >
                <Box sx={{
                  width: '34px', height: '34px', borderRadius: '8px',
                  backgroundColor: '#f1f5f9', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <AccountBalanceIcon sx={{ fontSize: '16px', color: '#334155' }} />
                </Box>
                <Typography sx={{ flex: 1, fontSize: '14px', fontWeight: 500, color: '#1a2332', lineHeight: 1.4 }}>
                  {dept}
                </Typography>
                <ChevronRightIcon sx={{ fontSize: '18px', color: '#9ca3af', flexShrink: 0 }} />
              </Box>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
