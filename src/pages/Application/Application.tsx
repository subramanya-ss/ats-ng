import React, { useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
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
  Select,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useStyles } from './Application.style';

// ─── SVG asset imports ────────────────────────────────────────────────────────
import IconApplication from '../../assets/Application.svg';
import IconPreview from '../../assets/preview.svg';
import IconJournal from '../../assets/Journal.svg';
import IconCalender from '../../assets/Calender.svg';
import IconDeclarations from '../../assets/Declarations.svg';
import IconEducation from '../../assets/Education.svg';
import IconEmail from '../../assets/Email.svg';
import IconHash from '../../assets/Hash.svg';
import IconLink from '../../assets/Link.svg';
import IconLocation from '../../assets/Location.svg';
import IconNo from '../../assets/No.svg';
import IconPerson from '../../assets/Person.svg';
import IconPhone from '../../assets/Phone.svg';
import IconPreEmp from '../../assets/Pre_Emp.svg';
import IconPrevEmp from '../../assets/Prev_Emp.svg';
import IconReasons from '../../assets/Reasons.svg';
import IconRole from '../../assets/Role.svg';
import IconSource from '../../assets/Source.svg';
import IconYes from '../../assets/Yes.svg';
import IconTic from '../../assets/Tic.svg';
import IconPending from '../../assets/Pending.svg';

// Lightweight wrapper so SVG assets behave like icons (sized, inline, hidden from a11y by default)
const Icon: React.FC<{ src: string; size?: number; width?: number; height?: number; alt?: string; className?: string; style?: React.CSSProperties }> =
  ({ src, size, width, height, alt = '', className, style }) => (
    <img
      src={src}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      width={width ?? size ?? 14}
      height={height ?? size ?? 14}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    />
  );

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

// Renders a label, splitting trailing " *" into a red asterisk
const FieldLabel: React.FC<{ label: string; className: string }> = ({ label, className }) => {
  const isRequired = label.endsWith(' *');
  const base = isRequired ? label.slice(0, -2) : label;
  return (
    <Typography component="label" className={className}>
      {base}
      {isRequired && <span style={{ color: '#F87171', marginLeft: '2px' }}>*</span>}
    </Typography>
  );
};

const ReadField: React.FC<{
  label: string; value: string; multiline?: boolean; charCount?: boolean; maxChars?: number;
  classes: ReturnType<typeof useStyles>;
}> = ({ label, value, multiline, charCount, maxChars, classes }) => (
  <Box sx={{ width: '100%' }}>
    <FieldLabel label={label} className={classes.fieldLabel} />
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

const DropdownField: React.FC<{
  label: string;
  value: string;
  options: string[];
  classes: ReturnType<typeof useStyles>;
}> = ({ label, value, options, classes }) => {
  const [val, setVal] = useState(value);
  return (
    <Box sx={{ width: '100%' }}>
      <FieldLabel label={label} className={classes.fieldLabel} />
      <Select
        value={val}
        onChange={(e) => setVal(e.target.value as string)}
        className={classes.dropdownSelect}
        IconComponent={KeyboardArrowDownIcon}
        MenuProps={{ PaperProps: { sx: { mt: 0.5, borderRadius: '8px' } } }}
        fullWidth
      >
        {options.map((opt) => (
          <MenuItem key={opt} value={opt} sx={{ fontSize: '14px', fontFamily: '"Roboto", sans-serif' }}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

const DateField: React.FC<{ label: string; hint?: string; defaultValue?: string; classes: ReturnType<typeof useStyles> }> = ({ label, hint, defaultValue, classes }) => {
  const [value, setValue] = useState<Dayjs | null>(defaultValue ? dayjs(defaultValue) : null);
  return (
    <Box sx={{ width: '100%' }}>
      <FieldLabel label={label} className={classes.fieldLabel} />
      <DatePicker
        value={value}
        onChange={(v) => setValue(v)}
        slots={{ openPickerIcon: () => <Icon src={IconCalender} width={14} height={14} style={{ filter: 'brightness(0.55) saturate(0.6)' }} /> }}
        slotProps={{
          textField: { fullWidth: true, className: classes.datePickerField, placeholder: 'dd/mm/yyyy' },
        }}
      />
      {hint && <Typography className={classes.fieldHint}>{hint}</Typography>}
    </Box>
  );
};

interface YesNoProps {
  defaultValue?: 'yes' | 'no' | null;
  classes: ReturnType<typeof useStyles>;
  label: string;
}
const YesNo: React.FC<YesNoProps> = ({ defaultValue = null, classes, label }) => {
  const [val, setVal] = useState<'yes' | 'no' | null>(defaultValue);
  const yesActive = val === 'yes';
  const noActive = val === 'no';
  return (
    <Box className={classes.yesNoGroup} role="group" aria-label={label}>
      <Box
        component="button"
        type="button"
        onClick={() => setVal(yesActive ? null : 'yes')}
        className={`${classes.yesNoBtnBase} ${yesActive ? classes.yesActiveBtn : classes.yesInactiveBtn}`}
        aria-pressed={yesActive}
        aria-label="Yes"
      >
        {yesActive
          ? <Icon src={IconYes} width={14} height={14} />
          : <Box component="span" className={`${classes.radioDotBase} ${classes.radioEmpty}`} aria-hidden="true" />}
        Yes
      </Box>
      <Box
        component="button"
        type="button"
        onClick={() => setVal(noActive ? null : 'no')}
        className={`${classes.yesNoBtnBase} ${noActive ? classes.noActiveBtn : classes.noInactiveBtn}`}
        aria-pressed={noActive}
        aria-label="No"
      >
        {noActive
          ? <Icon src={IconNo} width={14} height={14} />
          : <Box component="span" className={`${classes.radioDotBase} ${classes.radioEmpty}`} aria-hidden="true" />}
        No
      </Box>
    </Box>
  );
};

// Required asterisk suffix for labels
const Req: React.FC<{ classes: ReturnType<typeof useStyles> }> = ({ classes }) => (
  <span className={classes.requiredStar}>*</span>
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box component="section" aria-label="Application detail" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* ─── Sticky tab header ────────────────────────────────────── */}
      <Box className={classes.pageHeader}>
        <Tabs
          value={tab}
          onChange={(_e, v: number) => setTab(v)}
          className={classes.tabs}
          aria-label="Application sections"
        >
          <Tab icon={<Icon src={IconApplication} size={14} />} iconPosition="start" label="Application" id="tab-app" aria-controls="tabpanel-app" />
          <Tab icon={<Icon src={IconPreview} size={14} />} iconPosition="start" label="Preview CV"  id="tab-cv"  aria-controls="tabpanel-cv" />
          <Tab icon={<Icon src={IconJournal} size={14} />} iconPosition="start" label="Journal"     id="tab-jnl" aria-controls="tabpanel-jnl" />
        </Tabs>
      </Box>

      {/* ─── Candidate identity strip (Figma spec) ──────────────── */}
      <Box className={classes.candidateStrip}>
        <Avatar className={classes.candidateStripAvatar} aria-label="Lena Müller">LM</Avatar>
        <Box className={classes.candidateStripBody}>
          <Box className={classes.candidateStripTitleRow}>
            <Typography component="h1" className={classes.candidateStripName}>Lena Müller</Typography>
            <span className={classes.candidateStripStatus}>
              <span className={classes.candidateStripStatusDot} aria-hidden="true" />
              Fresh
            </span>
          </Box>
          <Box className={classes.candidateStripMeta}>
            <Box className={classes.candidateStripMetaItem}>
              <Icon src={IconRole} width={13} height={12} />
              <span>Senior Software Engineer</span>
            </Box>
            <Box className={classes.candidateStripMetaItem}>
              <Icon src={IconLocation} width={13} height={12} />
              <span>London, UK</span>
            </Box>
            <Box className={classes.candidateStripMetaItem}>
              <Icon src={IconCalender} width={13} height={12} />
              <span>Applied 15 March 2024</span>
            </Box>
            <Box className={`${classes.candidateStripMetaItem} ${classes.candidateStripMetaItemMono}`}>
              <Icon src={IconHash} width={13} height={12} />
              <span>APP-2026-0041</span>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={classes.pageContent}>

      {/* ─── Candidate header ─────────────────────────────────────── */}
      <Paper elevation={0} className={classes.headerCard}>
        <Box className={classes.headerLeft}>
          <Box className={classes.headerFieldGrid}>
            <Box className={classes.headerField}>
              <Typography component="label" className={classes.headerFieldLabel}>Full Name</Typography>
              <Typography className={classes.headerFieldValue}>Lena Müller</Typography>
            </Box>
            <Box className={classes.headerField}>
              <Typography component="label" className={classes.headerFieldLabel}>AMRIS Reference</Typography>
              <Typography className={classes.headerFieldValueMono}>APP-2026-0041</Typography>
            </Box>
          </Box>

          <Box className={classes.headerFieldFull}>
            <Typography component="label" className={classes.headerFieldLabel}>Address</Typography>
            <Box className={classes.headerFieldValueRow}>
              <Icon src={IconLocation} width={13} height={12} />
              <span>Keizersgracht 123, 1015 CJ Amsterdam, Netherlands</span>
            </Box>
          </Box>

          <Box className={classes.headerFieldGrid}>
            <Box className={classes.headerField}>
              <Typography component="label" className={classes.headerFieldLabel}>Email</Typography>
              <Box className={`${classes.headerFieldValueRow} ${classes.headerFieldValueEmail}`}>
                <Icon src={IconEmail} width={13} height={12} />
                <span>lena.muller@email.com</span>
              </Box>
            </Box>
            <Box className={classes.headerField}>
              <Typography component="label" className={classes.headerFieldLabel}>Mobile Telephone</Typography>
              <Box className={classes.headerFieldValueRow}>
                <Icon src={IconPhone} width={13} height={12} />
                <span>+31 6 1234 5678</span>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className={classes.mapPlaceholder} aria-label="Candidate location map">
          <Typography className={classes.mapPlaceholderText}>📍 Map View</Typography>
        </Box>
      </Paper>



      {/* ─── Tab: Application ─────────────────────────────────────── */}
      {tab === 0 && (
        <Box role="tabpanel" id="tabpanel-app" aria-labelledby="tab-app">

          {/* ─── Application Form (single card, dividers between sub-sections) ── */}
          <Paper elevation={0} className={classes.appFormCard}>

            {/* Header */}
            <Box className={classes.appFormHeader}>
              <Typography component="h2" className={classes.appFormTitle}>Application Form</Typography>
              <Typography className={classes.appFormSubtitle}>Review and update submitted application responses</Typography>
            </Box>

            {/* Body */}
            <Box className={classes.appFormBody}>

              {/* Declarations */}
              <Box className={classes.formSection}>
                <Box className={classes.sectionHeaderRow}>
                  <Box className={classes.sectionIconBox}><Icon src={IconDeclarations} width={15} height={14} /></Box>
                  <Typography component="h3" className={classes.sectionTitle}>Declarations</Typography>
                </Box>
                <Box className={classes.formGrid}>
                  <Box className={classes.formCol6}>
                    <Typography component="label" className={classes.questionLabel}>
                      Are you eligible to undertake employment in the UK if offered a position?<Req classes={classes} />
                    </Typography>
                    <YesNo defaultValue="yes" classes={classes} label="Eligible to work in UK" />
                  </Box>
                  <Box className={classes.formCol6}>
                    <Typography component="label" className={classes.questionLabel}>
                      Are you an existing employee of HIE?<Req classes={classes} />
                    </Typography>
                    <YesNo defaultValue="no" classes={classes} label="Existing employee of HIE" />
                  </Box>
                  <Box className={classes.formCol12}>
                    <Typography component="label" className={classes.questionLabel}>
                      Have you ever been convicted of any criminal offences which are not yet spent under the Rehabilitation of Offenders Act 1974, or have any impending charges against you?<Req classes={classes} />
                    </Typography>
                    <YesNo defaultValue="no" classes={classes} label="Criminal convictions" />
                  </Box>
                  <Box className={classes.formCol6}>
                    <Typography component="label" className={classes.questionLabel}>
                      Do you hold a full current driving licence?<Req classes={classes} />
                    </Typography>
                    <YesNo defaultValue="yes" classes={classes} label="Driving licence" />
                  </Box>
                </Box>
              </Box>

              <Box className={classes.formDivider} />

              {/* Source & Interview Requirements */}
              <Box className={classes.formSection}>
                <Box className={classes.sectionHeaderRow}>
                  <Box className={classes.sectionIconBox}><Icon src={IconSource} width={15} height={14} /></Box>
                  <Typography component="h3" className={classes.sectionTitle}>Source &amp; Interview Requirements</Typography>
                </Box>
                <Box className={classes.formGrid}>
                  <Box className={classes.formCol6}>
                    <DropdownField
                      label="Source of Interest *"
                      value="Indeed Job Post — Easy Apply"
                      options={['Indeed Job Post — Easy Apply', 'LinkedIn', 'Company Website', 'Referral', 'Other']}
                      classes={classes}
                    />
                  </Box>
                  <Box className={classes.formCol6}>
                    <ReadField label="If you were invited for interview, would you have any special requirements?" value="None" classes={classes} />
                  </Box>
                </Box>
              </Box>

              <Box className={classes.formDivider} />

              {/* Education */}
              <Box className={classes.formSection}>
                <Box className={classes.sectionHeaderRow}>
                  <Box className={classes.sectionIconBox}><Icon src={IconEducation} width={15} height={14} /></Box>
                  <Typography component="h3" className={classes.sectionTitle}>Education</Typography>
                </Box>
                <Box className={classes.formGrid}>
                  <Box className={classes.formCol12}>
                    <ReadField label="Name of school, university, college or other institution *" value="TU Delft" classes={classes} />
                  </Box>
                  <Box className={classes.formCol12}>
                    <ReadField label="Subjects / Level & Result obtained *" value="MSc Computer Science — Distinction" multiline classes={classes} />
                  </Box>
                </Box>
              </Box>

              <Box className={classes.formDivider} />

              {/* Reasons for Applying */}
              <Box className={classes.formSection}>
                <Box className={classes.sectionHeaderRow}>
                  <Box className={classes.sectionIconBox}><Icon src={IconReasons} width={15} height={14} /></Box>
                  <Typography component="h3" className={classes.sectionTitle}>Reasons for Applying</Typography>
                </Box>
                <ReadField
                  label="What are your reasons for applying for the post? *"
                  value="I am passionate about building scalable systems and the Senior Software Engineer role at HIE aligns perfectly with my experience in distributed architecture and cloud-native development."
                  multiline
                  charCount
                  classes={classes}
                />
              </Box>

              <Box className={classes.formDivider} />

              {/* Present Employer */}
              <Box className={classes.formSection}>
                <Box className={classes.sectionHeaderRow}>
                  <Box className={classes.sectionIconBox}><Icon src={IconPreEmp} width={15} height={14} /></Box>
                  <Typography component="h3" className={classes.sectionTitle}>Present Employer</Typography>
                </Box>
                <Box className={classes.formGrid}>
                  <Box className={classes.formCol6}>
                    <DateField label="Present Employer (Date From) *" classes={classes} />
                  </Box>
                  <Box className={classes.formCol6}>
                    <DateField label="Present Employer (Date To)" hint="Leave blank if current employer" classes={classes} />
                  </Box>
                  <Box className={classes.formCol12}>
                    <ReadField label="Present Employer Name / Address *" value="TechFlow B.V., Herengracht 456, Amsterdam" multiline classes={classes} />
                  </Box>
                  <Box className={classes.formCol12}>
                    <ReadField label="Present Employer Position Held and Nature of Work *" value="Senior Backend Engineer — Led microservices migration and API gateway redesign" multiline classes={classes} />
                  </Box>
                  <Box className={classes.formCol6}>
                    <ReadField label="Present Employer Salary" value="€72,000 per annum" classes={classes} />
                  </Box>
                  <Box className={classes.formCol6}>
                    <DropdownField
                      label="Current Employer Category"
                      value="Select category..."
                      options={['Select category...', 'Technology', 'Finance', 'Healthcare', 'Retail', 'Education', 'Other']}
                      classes={classes}
                    />
                  </Box>
                </Box>
              </Box>

              <Box className={classes.formDivider} />

              {/* Previous Employer 1 */}
              <Box className={classes.formSection}>
                <Box className={classes.sectionHeaderRow}>
                  <Box className={classes.sectionIconBox}><Icon src={IconPrevEmp} width={15} height={14} /></Box>
                  <Typography component="h3" className={classes.sectionTitle}>Previous Employer 1</Typography>
                </Box>
                <Box className={classes.formGrid}>
                  <Box className={classes.formCol6}>
                    <DateField label="Previous Employer (Date From)" classes={classes} />
                  </Box>
                  <Box className={classes.formCol6}>
                    <DateField label="Previous Employer (Date To)" classes={classes} />
                  </Box>
                  <Box className={classes.formCol12}>
                    <ReadField label="Previous Employer Name / Address" value="DataPulse GmbH, Friedrichstraße 89, Berlin" multiline classes={classes} />
                  </Box>
                  <Box className={classes.formCol12}>
                    <ReadField label="Position Held and Nature of Work" value="Software Engineer — Built real-time analytics pipelines" multiline classes={classes} />
                  </Box>
                  <Box className={classes.formCol6}>
                    <ReadField label="Salary" value="€58,000 per annum" classes={classes} />
                  </Box>
                </Box>
              </Box>

              <Box className={classes.formDivider} />

              {/* Previous Employer 2 */}
              <Box className={classes.formSection}>
                <Box className={classes.sectionHeaderRow}>
                  <Box className={classes.sectionIconBox}><Icon src={IconPrevEmp} width={15} height={14} /></Box>
                  <Typography component="h3" className={classes.sectionTitle}>Previous Employer 2</Typography>
                </Box>
                <Box className={classes.formGrid}>
                  <Box className={classes.formCol6}>
                    <DateField label="Previous Employer (Date From)" classes={classes} />
                  </Box>
                  <Box className={classes.formCol6}>
                    <DateField label="Previous Employer (Date To)" classes={classes} />
                  </Box>
                  <Box className={classes.formCol12}>
                    <ReadField label="Previous Employer Name / Address" value="StartUp Labs, Singel 12, Amsterdam" multiline classes={classes} />
                  </Box>
                  <Box className={classes.formCol12}>
                    <ReadField label="Position Held and Nature of Work" value="Junior Developer — Full-stack web development" multiline classes={classes} />
                  </Box>
                  <Box className={classes.formCol6}>
                    <ReadField label="Salary" value="€42,000 per annum" classes={classes} />
                  </Box>
                </Box>
              </Box>

              <Box className={classes.formDivider} />

              {/* Personal Statement */}
              <Box className={classes.formSection}>
                <Box className={classes.sectionHeaderRow}>
                  <Box className={classes.sectionIconBox}><Icon src={IconPerson} width={15} height={14} /></Box>
                  <Typography component="h3" className={classes.sectionTitle}>Personal Statement</Typography>
                </Box>
                <ReadField
                  label="Personal Statement *"
                  value="With over 7 years of experience in software engineering, I have developed a strong foundation in designing and implementing scalable backend systems. My expertise spans across cloud infrastructure, microservices architecture, and API design. I thrive in collaborative environments and am eager to contribute to HIE's mission of delivering world-class digital solutions."
                  multiline
                  charCount
                  maxChars={500}
                  classes={classes}
                />
              </Box>
            </Box>
          </Paper>

          {/* ─── Application Summary (Figma spec) ──────────────────────────── */}
          <Paper elevation={0} className={classes.summaryCard}>
            <Box className={classes.summaryHeader}>
              <Typography component="h2" className={classes.summaryTitle}>Application Summary</Typography>
              <Typography className={classes.summarySubtitle}>Current state of this application</Typography>
            </Box>
            <Box className={classes.summaryBody}>
              <Box className={classes.summaryCol}>
                <Typography component="label" className={classes.summaryLabel}>Current Status</Typography>
                <span className={classes.statusPillFresh}>Fresh</span>
              </Box>
              <Box className={classes.summaryCol}>
                <Typography component="label" className={classes.summaryLabel}>Created Date</Typography>
                <Box className={classes.summaryDateRow}>
                  <Icon src={IconCalender} width={13} height={12} />
                  <span>2026-04-22</span>
                </Box>
              </Box>
              <Box className={classes.summaryCol}>
                <Typography component="label" className={classes.summaryLabel}>Last Updated</Typography>
                <Box className={classes.summaryDateRow}>
                  <Icon src={IconCalender} width={13} height={12} />
                  <span>2026-04-25</span>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* ─── Source of Application (Figma spec) ────────────────────────── */}
          <Paper elevation={0} className={classes.sourceCard}>
            <Box className={classes.sourceHeader}>
              <Typography component="h2" className={classes.sourceTitle}>Source of Application</Typography>
            </Box>
            <Box className={classes.sourceBody}>
              <Box className={classes.sourceRow}>
                <Box className={classes.sourceIcon} aria-hidden="true">
                  <Icon src={IconLink} width={15} height={14} />
                </Box>
                <Typography component="span" className={classes.sourceText}>
                  LinkedIn Job Post — Direct Apply
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* ─── Interview List (Figma spec) ───────────────────────────────── */}
          <Paper elevation={0} className={classes.tableCard}>
            <Box className={classes.tableCardHeader}>
              <Box className={classes.tableCardTitleBlock}>
                <Typography component="h2" className={classes.tableCardTitle}>Interview List</Typography>
                <Typography className={classes.tableCardSubtitle}>{interviews.length} interviews scheduled</Typography>
              </Box>
              <Button
                className={classes.addBtn}
                startIcon={<AddIcon />}
                aria-label="Add new interview"
              >
                Add Interview
              </Button>
            </Box>
            <Table className={classes.appTable} aria-label="Interview list">
              <TableHead>
                <TableRow>
                  <TableCell>LOCATION</TableCell>
                  <TableCell>DATE &amp; TIME</TableCell>
                  <TableCell align="center">CONFIRMED</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {interviews.map((row, i) => (
                  <TableRow key={i} className={classes.tableRow}>
                    <TableCell>
                      <Box className={classes.tableCellRow}>
                        {row.isVideo
                          ? <VideoCallIcon aria-hidden="true" sx={{ fontSize: '14px', color: '#94A3B8' }} />
                          : <Icon src={IconLocation} width={13} height={12} />}
                        <span>{row.location}</span>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className={classes.tableCellRow}>
                        <Icon src={IconCalender} width={13} height={12} />
                        <span>{row.datetime}</span>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <span className={`${classes.statusPillBase} ${row.confirmed ? classes.statusPillYes : classes.statusPillPending}`}>
                        <Icon src={row.confirmed ? IconTic : IconPending} width={12} height={11} />
                        {row.confirmed ? 'Yes' : 'Pending'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          {/* ─── Offer List (Figma spec) ───────────────────────────────────── */}
          <Paper elevation={0} className={classes.tableCard}>
            <Box className={classes.tableCardHeader}>
              <Box className={classes.tableCardTitleBlock}>
                <Typography component="h2" className={classes.tableCardTitle}>Offer List</Typography>
                <Typography className={classes.tableCardSubtitle}>1 offer made</Typography>
              </Box>
            </Box>
            <Table className={classes.appTable} aria-label="Offer list">
              <TableHead>
                <TableRow>
                  <TableCell>CREATED DATE</TableCell>
                  <TableCell>START DATE</TableCell>
                  <TableCell>SALARY &amp; BENEFITS</TableCell>
                  <TableCell align="center">ACCEPTED</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className={classes.tableRow}>
                  <TableCell>2026-04-20</TableCell>
                  <TableCell>2026-06-01</TableCell>
                  <TableCell>€85,000 + pension + 25 days holiday</TableCell>
                  <TableCell align="center">
                    <span className={`${classes.statusPillBase} ${classes.statusPillPending}`}>
                      <Icon src={IconPending} width={12} height={11} />
                      Pending
                    </span>
                  </TableCell>
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
    </LocalizationProvider>
  );
};
