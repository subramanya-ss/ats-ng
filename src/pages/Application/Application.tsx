import React, { useState } from 'react';
import { Grid2 as Grid,
  Box,
  Paper,
  Typography,
  Button,
  Tabs,
  Tab,
  Avatar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import SchoolIcon from '@mui/icons-material/School';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LinkIcon from '@mui/icons-material/Link';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HistoryIcon from '@mui/icons-material/History';
import BadgeIcon from '@mui/icons-material/Badge';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useStyles } from './Application.style';

// ─── Status badge ─────────────────────────────────────────────────────────────

interface StatusStyle { bg: string; color: string }
const statusStyles: Record<string, StatusStyle> = {
  Fresh:               { bg: '#dcfce7', color: '#166534' },
  Shortlisted:         { bg: '#ede9fe', color: '#5b21b6' },
  'Interview Confirmed': { bg: '#dbeafe', color: '#1e40af' },
  Rejected:            { bg: '#fee2e2', color: '#991b1b' },
  Pending:             { bg: '#fef3c7', color: '#92400e' },
  Yes:                 { bg: '#dcfce7', color: '#166534' },
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const s = statusStyles[status] ?? { bg: '#f1f5f9', color: '#475569' };
  return (
    <Box
      sx={{ display: 'inline-block', backgroundColor: s.bg, color: s.color, borderRadius: '5px', px: '8px', py: '2px', fontSize: '11px', fontWeight: 700, lineHeight: 1.6 }}
      role="status"
      aria-label={`Status: ${status}`}
    >
      {status}
    </Box>
  );
};

// ─── Field helpers ────────────────────────────────────────────────────────────

const ReadField: React.FC<{
  label: string; value: string; multiline?: boolean; charCount?: boolean; maxChars?: number;
  classes: ReturnType<typeof useStyles>;
}> = ({ label, value, multiline, charCount, maxChars, classes }) => (
  <Box>
    <Typography component="label" className={classes.fieldLabel}>{label}</Typography>
    <Box className={multiline ? classes.textAreaBox : classes.fieldBox}>
      <Typography className={multiline ? classes.textAreaValue : classes.fieldValue}>{value || ' '}</Typography>
    </Box>
    {charCount && value && (
      <Typography className={classes.charCount}>
        {value.length}{maxChars ? ` / ${maxChars}` : ''} characters
      </Typography>
    )}
  </Box>
);

const DateField: React.FC<{ label: string; hint?: string; classes: ReturnType<typeof useStyles> }> = ({ label, hint, classes }) => (
  <Box>
    <Typography component="label" className={classes.fieldLabel}>{label}</Typography>
    <Box className={classes.dateFieldBox}>
      <CalendarTodayIcon sx={{ fontSize: '14px', color: '#9ca3af' }} aria-hidden="true" />
    </Box>
    {hint && <Typography className={classes.fieldHint}>{hint}</Typography>}
  </Box>
);

interface YesNoProps { yesActive: boolean; noActive: boolean; classes: ReturnType<typeof useStyles>; label: string }
const YesNo: React.FC<YesNoProps> = ({ yesActive, noActive, classes, label }) => (
  <Box className={classes.yesNoGroup} role="group" aria-label={label}>
    <Box component="button" className={yesActive ? classes.yesActiveBtn : classes.yesInactiveBtn} aria-pressed={yesActive} aria-label="Yes">
      <Box component="span" className={yesActive ? classes.radioFilled : classes.radioEmpty} aria-hidden="true" />
      Yes
    </Box>
    <Box component="button" className={noActive ? classes.noActiveBtn : classes.noInactiveBtn} aria-pressed={noActive} aria-label="No">
      <Box component="span" className={noActive ? classes.radioFilledRed : classes.radioEmpty} aria-hidden="true" />
      No
    </Box>
  </Box>
);

// ─── Data ────────────────────────────────────────────────────────────────────

const interviews = [
  { location: 'Amsterdam Office — Room 3B',     datetime: '2024-06-01  09:00–10:00', confirmed: true,  isVideo: false },
  { location: 'Video Call — Microsoft Teams',   datetime: '2024-05-12  14:30',       confirmed: false, isVideo: true  },
];

// ─── Component ───────────────────────────────────────────────────────────────

/** Application detail page — candidate profile, form, interviews, offer */
export const Application: React.FC = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  return (
    <Box component="section" aria-label="Application detail" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* ─── Sticky tab header ────────────────────────────────────── */}
      <Box className={classes.pageHeader}>
        <Tabs
          value={tab}
          onChange={(_e, v: number) => setTab(v)}
          className={classes.tabs}
          aria-label="Application sections"
        >
          <Tab icon={<BadgeIcon sx={{ fontSize: '16px' }} />} iconPosition="start" label="Application" id="tab-app" aria-controls="tabpanel-app" />
          <Tab icon={<AssessmentIcon sx={{ fontSize: '16px' }} />} iconPosition="start" label="Preview CV"  id="tab-cv"  aria-controls="tabpanel-cv" />
          <Tab icon={<AssessmentIcon sx={{ fontSize: '16px' }} />} iconPosition="start" label="Journal"     id="tab-jnl" aria-controls="tabpanel-jnl" />
        </Tabs>
      </Box>

      <Box className={classes.pageContent}>

      {/* ─── Candidate header ─────────────────────────────────────── */}
      <Paper className={classes.headerCard}>
        <Stack direction="row" gap="16px">
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" alignItems="center" gap="12px" sx={{ mb: '10px' }}>
              <Avatar className={classes.candidateAvatar} sx={{ backgroundColor: '#3b82f6' }} aria-label="Lena Müller">LM</Avatar>
              <Box>
                <Stack direction="row" alignItems="center" gap="8px">
                  <Typography component="h1" className={classes.candidateName}>Lena Müller</Typography>
                  <StatusBadge status="Fresh" />
                </Stack>
                <Typography className={classes.candidateRole}>Senior Software Engineer</Typography>
              </Box>
            </Stack>

            <Grid container spacing={1.5}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography className={classes.metaLabel}>Full Name</Typography>
                <Typography className={classes.metaValue}>Lena Müller</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography className={classes.metaLabel}>APP Reference</Typography>
                <Typography className={classes.metaValueBlue}>APP-2026-0041</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box className={classes.metaIconRow}>
                  <LocationOnIcon sx={{ fontSize: '12px' }} aria-hidden="true" />
                  <Typography sx={{ fontSize: '12px' }}>Kaasengracht 123, 1015 CJ Amsterdam, Netherlands</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack direction="row" gap="16px">
                  <Box className={classes.metaIconRow}>
                    <EmailIcon sx={{ fontSize: '12px', color: '#3b82f6' }} aria-hidden="true" />
                    <Typography sx={{ fontSize: '12px', color: '#3b82f6' }}>lena.muller@email.com</Typography>
                  </Box>
                  <Box className={classes.metaIconRow}>
                    <PhoneIcon sx={{ fontSize: '12px' }} aria-hidden="true" />
                    <Typography sx={{ fontSize: '12px' }}>+1 1234 5678</Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          {/* Map placeholder */}
          <Box className={classes.mapPlaceholder} aria-label="Candidate location map">
            <Typography className={classes.mapPlaceholderText}>📍 Map View</Typography>
          </Box>
        </Stack>
      </Paper>



      {/* ─── Tab: Application ─────────────────────────────────────── */}
      {tab === 0 && (
        <Box role="tabpanel" id="tabpanel-app" aria-labelledby="tab-app">

          {/* Application Form heading */}
          <Box sx={{ mb: '18px' }}>
            <Typography component="h2" className={classes.appFormTitle}>Application Form</Typography>
            <Typography className={classes.appFormSubtitle}>Review and update submitted application responses</Typography>
          </Box>

          {/* Declarations */}
          <Paper className={classes.sectionCard}>
            <Box className={classes.sectionHeaderRow}>
              <Box className={classes.sectionIconBox} sx={{ backgroundColor: '#059669' }}>
                <WorkIcon sx={{ fontSize: '13px', color: '#ffffff' }} />
              </Box>
              <Typography component="h2" className={classes.sectionTitle}>Declarations</Typography>
            </Box>
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography className={classes.questionLabel}>Are you eligible to undertake employment in the UK if offered a position? *</Typography>
                <YesNo yesActive noActive={false} classes={classes} label="Eligible to work in UK" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography className={classes.questionLabel}>Are you an existing employee of HIE? *</Typography>
                <YesNo yesActive={false} noActive classes={classes} label="Existing employee of HIE" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography className={classes.questionLabel}>
                  Have you ever been convicted of any criminal offences which are not yet spent under the Rehabilitation of Offenders Act 1974, or have any impending charges against you? *
                </Typography>
                <YesNo yesActive noActive={false} classes={classes} label="Criminal convictions" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography className={classes.questionLabel}>Do you hold a full current driving licence? *</Typography>
                <YesNo yesActive noActive={false} classes={classes} label="Driving licence" />
              </Grid>
            </Grid>
          </Paper>

          {/* Source & Interview Requirements */}
          <Paper className={classes.sectionCard}>
            <Box className={classes.sectionHeaderRow}>
              <Box className={classes.sectionIconBox}>
                <LinkIcon sx={{ fontSize: '13px', color: '#ffffff' }} />
              </Box>
              <Typography component="h2" className={classes.sectionTitle}>Source &amp; Interview Requirements</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReadField label="Source of Interest *" value="Indeed Job Post — Easy Apply" classes={classes} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReadField label="If you were invited for interview, would you have any special requirements?" value="None" classes={classes} />
              </Grid>
            </Grid>
          </Paper>

          {/* Education */}
          <Paper className={classes.sectionCard}>
            <Box className={classes.sectionHeaderRow}>
              <Box className={classes.sectionIconBox}>
                <SchoolIcon sx={{ fontSize: '13px', color: '#ffffff' }} />
              </Box>
              <Typography component="h2" className={classes.sectionTitle}>Education</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <ReadField label="Name of school, university, college or other institution *" value="TU Delft" classes={classes} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <ReadField label="Subjects / Level &amp; Result obtained *" value="MSc Computer Science — Distinction" classes={classes} />
              </Grid>
            </Grid>
          </Paper>

          {/* Reasons for Applying */}
          <Paper className={classes.sectionCard}>
            <Box className={classes.sectionHeaderRow}>
              <Box className={classes.sectionIconBox}>
                <PersonIcon sx={{ fontSize: '13px', color: '#ffffff' }} />
              </Box>
              <Typography component="h2" className={classes.sectionTitle}>Reasons for Applying</Typography>
            </Box>
            <ReadField
              label="What are your reasons for applying for the post? *"
              value="I am passionate about building scalable systems and the Senior Software Engineer role at HIE aligns perfectly with my experience in distributed architecture and cloud-native development."
              multiline
              charCount
              classes={classes}
            />
          </Paper>

          {/* Present Employer */}
          <Paper className={classes.sectionCard}>
            <Box className={classes.sectionHeaderRow}>
              <Box className={classes.sectionIconBox}>
                <WorkIcon sx={{ fontSize: '13px', color: '#ffffff' }} />
              </Box>
              <Typography component="h2" className={classes.sectionTitle}>Present Employer</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <DateField label="Present Employer (Date From) *" classes={classes} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DateField label="Present Employer (Date To)" hint="Leave blank if current employer" classes={classes} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <ReadField label="Present Employer Name / Address *" value="TechFlow B.V., Herengracht 456, Amsterdam" classes={classes} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <ReadField label="Present Employer Position Held and Nature of Work *" value="Senior Backend Engineer — Led microservices migration and API gateway redesign" classes={classes} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReadField label="Present Employer Salary" value="€72,000 per annum" classes={classes} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReadField label="Current Employer Category" value="Select category..." classes={classes} />
              </Grid>
            </Grid>
          </Paper>

          {/* Previous Employer 1 */}
          <Paper className={classes.sectionCard}>
            <Box className={classes.sectionHeaderRow}>
              <Box className={classes.sectionIconBox}>
                <HistoryIcon sx={{ fontSize: '13px', color: '#ffffff' }} />
              </Box>
              <Typography component="h2" className={classes.sectionTitle}>Previous Employer 1</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <DateField label="Previous Employer (Date From)" classes={classes} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DateField label="Previous Employer (Date To)" classes={classes} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <ReadField label="Previous Employer Name / Address" value="DataPulse GmbH, Friedrichstraße 89, Berlin" classes={classes} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <ReadField label="Position Held and Nature of Work" value="Software Engineer — Built real-time analytics pipelines" classes={classes} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReadField label="Salary" value="€58,000 per annum" classes={classes} />
              </Grid>
            </Grid>
          </Paper>

          {/* Previous Employer 2 */}
          <Paper className={classes.sectionCard}>
            <Box className={classes.sectionHeaderRow}>
              <Box className={classes.sectionIconBox}>
                <HistoryIcon sx={{ fontSize: '13px', color: '#ffffff' }} />
              </Box>
              <Typography component="h2" className={classes.sectionTitle}>Previous Employer 2</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <DateField label="Previous Employer (Date From)" classes={classes} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DateField label="Previous Employer (Date To)" classes={classes} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <ReadField label="Previous Employer Name / Address" value="StartUp Labs, Singel 12, Amsterdam" classes={classes} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <ReadField label="Position Held and Nature of Work" value="Junior Developer — Full-stack web development" classes={classes} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReadField label="Salary" value="€42,000 per annum" classes={classes} />
              </Grid>
            </Grid>
          </Paper>

          {/* Personal Statement */}
          <Paper className={classes.sectionCard}>
            <Box className={classes.sectionHeaderRow}>
              <Box className={classes.sectionIconBox}>
                <PersonIcon sx={{ fontSize: '13px', color: '#ffffff' }} />
              </Box>
              <Typography component="h2" className={classes.sectionTitle}>Personal Statement</Typography>
            </Box>
            <ReadField
              label="Personal Statement *"
              value="With over 7 years of experience in software engineering, I have developed a strong foundation in designing and implementing scalable backend systems. My expertise spans across cloud infrastructure, microservices architecture, and API design. I thrive in collaborative environments and am eager to contribute to HIE's mission of delivering world-class digital solutions."
              multiline
              charCount
              maxChars={500}
              classes={classes}
            />
          </Paper>

          {/* Application summary */}
          <Paper className={classes.sectionCard}>
            <Typography component="h2" className={classes.sectionTitle} sx={{ mb: '12px' }}>Application Summary</Typography>
            <Typography className={classes.appFormSubtitle} sx={{ mb: '14px' }}>Update the state of this application</Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 3 }}>
                <Typography className={classes.fieldLabel}>Current Status</Typography>
                <StatusBadge status="Fresh" />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <ReadField label="Created Date" value="2026-04-22" classes={classes} />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <ReadField label="Last Updated" value="2026-04-25" classes={classes} />
              </Grid>
            </Grid>
            <Box sx={{ mt: '14px' }}>
              <Typography className={classes.fieldLabel}>Source of Application</Typography>
              <Box className={classes.sourceRow}>
                <Box className={classes.sourceIcon} aria-hidden="true">
                  <Typography className={classes.sourceIconText}>in</Typography>
                </Box>
                <Typography className={classes.sourceText}>Indeed Job Post — Easy Apply</Typography>
              </Box>
            </Box>
          </Paper>

          {/* Interview list */}
          <Paper className={classes.sectionCard}>
            <Box className={classes.subSectionHeader}>
              <Typography component="h2" className={classes.sectionTitle}>Interview List</Typography>
              <Button size="small" className={classes.addBtn} startIcon={<AddIcon sx={{ fontSize: '12px' }} />}
                aria-label="Add new interview">
                Add Interview
              </Button>
            </Box>
            <Table size="small" aria-label="Interview list">
              <TableHead>
                <TableRow>
                  <TableCell>Location</TableCell>
                  <TableCell>Date &amp; Time</TableCell>
                  <TableCell>Confirmed</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {interviews.map((row, i) => (
                  <TableRow key={i} className={classes.tableRow}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" gap="6px" sx={{ fontSize: '13px' }}>
                        {row.isVideo
                          ? <VideoCallIcon sx={{ fontSize: '13px', color: '#64748b' }} aria-hidden="true" />
                          : <LocationOnIcon sx={{ fontSize: '13px', color: '#64748b' }} aria-hidden="true" />}
                        {row.location}
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ color: '#64748b' }}>{row.datetime}</TableCell>
                    <TableCell><StatusBadge status={row.confirmed ? 'Yes' : 'Pending'} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          {/* Offer list */}
          <Paper className={classes.sectionCard}>
            <Typography component="h2" className={classes.sectionTitle} sx={{ mb: '12px' }}>Offer List</Typography>
            <Table size="small" aria-label="Offer list">
              <TableHead>
                <TableRow>
                  {['Created Date', 'Start Date', 'Salary & Benefits', 'Confirmed'].map((h) => (
                    <TableCell key={h}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className={classes.tableRow}>
                  <TableCell>2026-04-03</TableCell>
                  <TableCell>2026-06-01</TableCell>
                  <TableCell>€85,000 / year + 25 days holiday</TableCell>
                  <TableCell><StatusBadge status="Pending" /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Box>
      )}

      {tab === 1 && (
        <Box role="tabpanel" id="tabpanel-cv" aria-labelledby="tab-cv" className={classes.emptyTab}>
          <Typography sx={{ fontSize: '13px' }}>CV processing view will appear here</Typography>
        </Box>
      )}
      {tab === 2 && (
        <Box role="tabpanel" id="tabpanel-jnl" aria-labelledby="tab-jnl" className={classes.emptyTab}>
          <Typography sx={{ fontSize: '13px' }}>Journal entries will appear here</Typography>
        </Box>
      )}

      </Box> {/* pageContent */}
    </Box>
  );
};
