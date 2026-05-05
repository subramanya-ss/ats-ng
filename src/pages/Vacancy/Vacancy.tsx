import React, { useState } from 'react';
import { Grid2 as Grid,
  Box,
  Paper,
  Typography,
  Button,
  Tabs,
  Tab,
  Stack,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useStyles } from './Vacancy.style';

// ─── Types ───────────────────────────────────────────────────────────────────

interface FieldDef {
  label: string;
  value: string;
  col: number;
  multiline?: boolean;
  hasCalendar?: boolean;
  hasDropdown?: boolean;
}

interface FormSection {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  fields: FieldDef[];
  hasToggle?: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const formSections: FormSection[] = [
  {
    icon: <WorkIcon sx={{ fontSize: '14px', color: '#ffffff' }} />,
    title: 'Basic Details',
    subtitle: 'Core vacancy information',
    fields: [
      { label: 'Request Title *', value: 'Senior Software Engineer — Platform Team', col: 4 },
      { label: 'Contract Type *', value: 'Permanent', col: 4 },
      { label: 'Location *', value: 'Amsterdam, Netherlands', col: 4 },
      { label: 'Grade *', value: 'G7 — Senior Specialist', col: 4 },
      { label: 'Department *', value: 'Engineering & Platform', col: 4 },
      { label: 'Cost Centre', value: 'CC-ENG-001', col: 4 },
    ],
  },
  {
    icon: <PersonOutlineIcon sx={{ fontSize: '14px', color: '#ffffff' }} />,
    title: 'Reporting & Structure',
    subtitle: 'Hierarchy and role context',
    fields: [
      { label: 'Reporting To', value: 'Head of Engineering — Platform', col: 4 },
      { label: 'Replacement For', value: 'N/A — New Position', col: 4 },
      { label: 'Hours', value: '37.5 hours per week (full-time)', col: 4 },
    ],
  },
  {
    icon: <DescriptionIcon sx={{ fontSize: '14px', color: '#ffffff' }} />,
    title: 'Job Description',
    subtitle: 'Role overview and full description',
    fields: [
      { label: 'Short Job Description *', col: 12, multiline: true, value: 'We are seeking an experienced Senior Software Engineer to join our Platform Team. You will design, build, and maintain the core infrastructure and services that power our digital products. This role requires deep expertise in distributed systems, cloud-native architecture, and high-performance backend engineering.' },
      { label: 'Full Job Description *', col: 12, multiline: true, value: 'The Senior Software Engineer will lead the design and implementation of scalable microservices, API gateways, and data pipelines. You will collaborate with cross-functional teams including Product, Design, and DevOps to deliver robust, secure, and maintainable systems. Responsibilities include: architecting new platform capabilities, mentoring junior engineers, conducting code reviews, optimising system performance, and ensuring high availability of production services. You will also contribute to technical roadmaps and evaluate emerging technologies for adoption.' },
    ],
  },
  {
    icon: <MonetizationOnIcon sx={{ fontSize: '14px', color: '#ffffff' }} />,
    title: 'Terms & Compensation',
    subtitle: 'Salary, dates, and agency terms',
    hasToggle: true,
    fields: [
      { label: 'Start Date', value: '', col: 4, hasCalendar: true },
      { label: 'Duration', value: 'Permanent', col: 4 },
      { label: 'Salary *', value: '€75,000 — €90,000 per annum (depending on experience)', col: 4 },
      { label: 'Agency Rate', value: '15% of first-year base salary', col: 4 },
      { label: 'Close Date', value: '', col: 4, hasCalendar: true },
    ],
  },
  {
    icon: <PersonIcon sx={{ fontSize: '14px', color: '#ffffff' }} />,
    title: 'Requirements',
    subtitle: 'Skills, experience, and education needed',
    fields: [
      { label: 'Personal Skills *', col: 12, multiline: true, value: 'Strong communication and collaboration skills. Ability to work autonomously and take ownership of complex technical problems. Excellent problem-solving mindset with attention to detail. Comfortable presenting technical concepts to non-technical stakeholders. Adaptable and eager to learn new technologies.' },
      { label: 'Experience *', col: 12, multiline: true, value: 'Minimum 5 years of professional software engineering experience. Proven track record in designing and building distributed systems at scale. Experience with cloud platforms (AWS, GCP, or Azure). Strong proficiency in at least one modern backend language (Go, Rust, Java, or Python). Experience with containerisation (Docker, Kubernetes) and CI/CD pipelines.' },
      { label: 'Education *', col: 12, multiline: true, value: "Bachelor's degree in Computer Science, Software Engineering, or a related technical field. Master's degree preferred but not required. Relevant professional certifications (e.g. AWS Solutions Architect, CKA) are a plus." },
    ],
  },
  {
    icon: <InfoIcon sx={{ fontSize: '14px', color: '#ffffff' }} />,
    title: 'Additional Information',
    subtitle: 'Any extra notes or context',
    fields: [
      { label: 'Additional Information', col: 12, multiline: true, value: 'This role offers a hybrid working arrangement with 3 days per week in the Amsterdam office. We provide a comprehensive benefits package including pension contribution, health insurance, 25 days annual leave, and a professional development budget of €2,000 per year. Relocation support is available for candidates moving from outside the Netherlands.' },
    ],
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const FieldRow: React.FC<{
  field: FieldDef;
  classes: ReturnType<typeof useStyles>;
}> = ({ field, classes }) => (
  <Box>
    <Typography component="label" className={classes.fieldLabel}>{field.label}</Typography>
    {field.multiline ? (
      <Box className={classes.textAreaBox}>
        <Typography className={classes.textAreaValue}>{field.value || ' '}</Typography>
      </Box>
    ) : (
      <Box className={classes.fieldBox}>
        <Typography className={classes.fieldValue}>{field.value || ' '}</Typography>
        {field.hasCalendar && <CalendarTodayIcon className={classes.fieldCalendarIcon} />}
        {field.hasDropdown && <ExpandMoreIcon className={classes.fieldCalendarIcon} />}
      </Box>
    )}
  </Box>
);

// ─── Component ───────────────────────────────────────────────────────────────

export const Vacancy: React.FC = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [permanentlyOpen, setPermanentlyOpen] = useState(true);

  return (
    <Box component="section" aria-label="Vacancy detail" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* ─── Sticky page header: tabs ─────────────────────────────── */}
      <Box className={classes.pageHeader}>
        <Tabs
          value={tab}
          onChange={(_e, v: number) => setTab(v)}
          className={classes.tabs}
          aria-label="Vacancy sections"
        >
          <Tab icon={<AssignmentIcon sx={{ fontSize: '16px' }} />} iconPosition="start" label="Vacancy" id="tab-vacancy" aria-controls="tabpanel-vacancy" />
          <Tab icon={<PeopleIcon sx={{ fontSize: '16px' }} />} iconPosition="start" label="Applications" id="tab-applications" aria-controls="tabpanel-applications" />
          <Tab icon={<AssessmentIcon sx={{ fontSize: '16px' }} />} iconPosition="start" label="Journal" id="tab-journal" aria-controls="tabpanel-journal" />
        </Tabs>
      </Box>

      {/* ─── Scrollable content ───────────────────────────────────── */}
      <Box className={classes.pageContent}>

        {/* ─── Vacancy header card ─────────────────────────────────── */}
        <Paper elevation={0} className={classes.vacancyHeader}>
          <Stack direction="row" alignItems="center" gap="14px">
            <Box className={classes.vacancyIconBox} aria-hidden="true">
              <WorkIcon sx={{ color: '#fff', fontSize: '18px' }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" alignItems="center" gap="10px" sx={{ mb: '4px' }}>
                <Typography component="h1" className={classes.vacancyTitle}>Senior Software Engineer</Typography>
                <Box className={classes.vacancyLiveBadge} role="status">
                  <Box className={classes.vacancyLiveDot} aria-hidden="true" />
                  Live
                </Box>
              </Stack>
              <Stack direction="row" gap="16px" flexWrap="wrap">
                {[
                  { icon: <LocationOnIcon sx={{ fontSize: '11px' }} />,    text: 'London, UK' },
                  { icon: <CategoryIcon sx={{ fontSize: '11px' }} />,      text: 'Technology & Digital' },
                  { icon: <WorkIcon sx={{ fontSize: '11px' }} />,           text: 'Permanent' },
                  { icon: <CalendarTodayIcon sx={{ fontSize: '11px' }} />, text: 'Closes 15 April 2024' },
                ].map((item) => (
                  <Box key={item.text} className={classes.vacancyMeta}>
                    {item.icon}
                    {item.text}
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Paper>

        {/* ─── Tab panel: Vacancy ───────────────────────────────────── */}
        {tab === 0 && (
          <Box role="tabpanel" id="tabpanel-vacancy" aria-labelledby="tab-vacancy">

            {/* Vacancy Form header */}
            <Paper elevation={0} className={classes.formHeader}>
              <Box>
                <Typography className={classes.formTitle}>Vacancy Form</Typography>
                <Typography className={classes.formSubtitle}>Edit vacancy details and requirements</Typography>
              </Box>
              <Button variant="contained" size="small" className={classes.openBtn} aria-label="Open vacancy form">
                Open
              </Button>
            </Paper>

            {formSections.map((section) => (
              <Paper key={section.title} elevation={0} className={classes.sectionCard}>
                <Box className={classes.sectionHeaderRow}>
                  <Box className={classes.sectionIconBox} aria-hidden="true">{section.icon}</Box>
                  <Box>
                    <Typography component="h2" className={classes.sectionTitle}>{section.title}</Typography>
                    <Typography className={classes.sectionSubtitle}>{section.subtitle}</Typography>
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  {section.fields.map((f) => (
                    <Grid key={f.label} size={{ xs: 12, md: f.col as 4 | 12 }}>
                      <FieldRow field={f} classes={classes} />
                    </Grid>
                  ))}

                  {section.hasToggle && (
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Typography component="label" className={classes.fieldLabel}>Permanently Open Vacancy</Typography>
                      <Box className={classes.toggleGroup} role="group" aria-label="Permanently Open Vacancy">
                        <Box
                          component="button"
                          className={`${classes.toggleBtn} ${!permanentlyOpen ? classes.toggleYesActive : classes.toggleYesInactive}`}
                          onClick={() => setPermanentlyOpen(false)}
                          aria-pressed={!permanentlyOpen}
                        >
                          ✓ Yes
                        </Box>
                        <Box
                          component="button"
                          className={`${classes.toggleBtn} ${permanentlyOpen ? classes.toggleNoActive : classes.toggleNoInactive}`}
                          onClick={() => setPermanentlyOpen(true)}
                          aria-pressed={permanentlyOpen}
                        >
                          ✗ No
                        </Box>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            ))}

            {/* Alerts, Checks & Interview Arrangements */}
            <Paper elevation={0} className={classes.sectionCard}>
              <Box className={classes.sectionHeaderRow}>
                <Box className={classes.sectionIconBox} aria-hidden="true">
                  <NotificationsActiveIcon sx={{ fontSize: '14px', color: '#ffffff' }} />
                </Box>
                <Box>
                  <Typography component="h2" className={classes.sectionTitle}>Alerts, Checks & Interview Arrangements</Typography>
                  <Typography className={classes.sectionSubtitle}>Email alerts, compliance checks, interview scheduling and application sources</Typography>
                </Box>
              </Box>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <FieldRow field={{ label: 'Email Alerts Sent', value: '', col: 4, hasCalendar: true }} classes={classes} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography component="label" className={classes.fieldLabel}>Post Requires a Disclosure Scotland Check</Typography>
                  <Box className={classes.toggleGroup} role="group" aria-label="Disclosure Scotland Check">
                    <Box component="button" className={`${classes.toggleBtn} ${classes.toggleYesActive}`}>✓ Yes</Box>
                    <Box component="button" className={`${classes.toggleBtn} ${classes.toggleNoInactive}`}>✗ No</Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <FieldRow field={{ label: 'Allow Applications From', value: 'Indeed', col: 4, hasDropdown: true }} classes={classes} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <FieldRow field={{ label: 'Interviews Will Be Held On', value: '', col: 4, hasCalendar: true }} classes={classes} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <FieldRow field={{ label: 'Confirm Interview Date By', value: '', col: 4, hasCalendar: true }} classes={classes} />
                </Grid>
              </Grid>
            </Paper>

          </Box>
        )}

        {tab === 1 && (
          <Box role="tabpanel" id="tabpanel-applications" aria-labelledby="tab-applications" className={classes.emptyTab}>
            <Typography sx={{ fontSize: '13px' }}>Applications list will appear here</Typography>
          </Box>
        )}
        {tab === 2 && (
          <Box role="tabpanel" id="tabpanel-journal" aria-labelledby="tab-journal" className={classes.emptyTab}>
            <Typography sx={{ fontSize: '13px' }}>Journal entries will appear here</Typography>
          </Box>
        )}

      </Box>
    </Box>
  );
};
