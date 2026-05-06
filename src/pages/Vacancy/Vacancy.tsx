import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid2 as Grid,
  Box,
  Paper,
  Typography,
  Button,
  Tabs,
  Tab,
  Stack,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import IosShareIcon from "@mui/icons-material/IosShare";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import QrCodeIcon from "@mui/icons-material/QrCode";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import WorkIconBig from "../../assets/VacancyHeader.svg";
import WorkIcon from "@mui/icons-material/Work";
import WorkIconIn from "../../assets/Permanent.svg";
import LocationOnIcon from "../../assets/Location.svg";
import CategoryIcon from "../../assets/Technology.svg";
import CalendarTodayIcon from "../../assets/Closes.svg";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import InfoIcon from "@mui/icons-material/Info";
import VacancySection1 from "../../assets/vacancy/1.svg";
import VacancySection2 from "../../assets/vacancy/2.svg";
import VacancySection3 from "../../assets/vacancy/3.svg";
import VacancySection4 from "../../assets/vacancy/4.svg";
import VacancySection5 from "../../assets/vacancy/5.svg";
import VacancySection6 from "../../assets/vacancy/6.svg";
import VacancySection7 from "../../assets/vacancy/7.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useStyles } from "./Vacancy.style";
import { YesNo } from "../../components/YesNo";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FieldDef {
  label: string;
  value: string;
  col: number;
  multiline?: boolean;
  tall?: boolean;
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
    icon: (
      <img
        src={VacancySection1}
        alt=""
        style={{ width: "15px", height: "auto" }}
      />
    ),
    title: "Basic Details",
    subtitle: "Core vacancy information",
    fields: [
      {
        label: "Request Title *",
        value: "Senior Software Engineer — Platform Team",
        col: 4,
      },
      { label: "Contract Type *", value: "Permanent", col: 4 },
      { label: "Location *", value: "Amsterdam, Netherlands", col: 4 },
      { label: "Grade *", value: "G7 — Senior Specialist", col: 4 },
      { label: "Department *", value: "Engineering & Platform", col: 4 },
      { label: "Cost Centre", value: "CC-ENG-001", col: 4 },
    ],
  },
  {
    icon: (
      <img
        src={VacancySection2}
        alt=""
        style={{ width: "15px", height: "auto" }}
      />
    ),
    title: "Reporting & Structure",
    subtitle: "Hierarchy and role context",
    fields: [
      {
        label: "Reporting To",
        value: "Head of Engineering — Platform",
        col: 4,
      },
      { label: "Replacement For", value: "N/A — New Position", col: 4 },
      { label: "Hours", value: "37.5 hours per week (full-time)", col: 4 },
    ],
  },
  {
    icon: (
      <img
        src={VacancySection3}
        alt=""
        style={{ width: "15px", height: "auto" }}
      />
    ),
    title: "Job Description",
    subtitle: "Role overview and full description",
    fields: [
      {
        label: "Short Job Description *",
        col: 12,
        multiline: true,
        value:
          "We are seeking an experienced Senior Software Engineer to join our Platform Team. You will design, build, and maintain the core infrastructure and services that power our digital products. This role requires deep expertise in distributed systems, cloud-native architecture, and high-performance backend engineering.",
      },
      {
        label: "Full Job Description *",
        col: 12,
        multiline: true,
        tall: true,
        value:
          "The Senior Software Engineer will lead the design and implementation of scalable microservices, API gateways, and data pipelines. You will collaborate with cross-functional teams including Product, Design, and DevOps to deliver robust, secure, and maintainable systems. Responsibilities include: architecting new platform capabilities, mentoring junior engineers, conducting code reviews, optimising system performance, and ensuring high availability of production services. You will also contribute to technical roadmaps and evaluate emerging technologies for adoption.",
      },
    ],
  },
  {
    icon: (
      <img
        src={VacancySection4}
        alt=""
        style={{ width: "15px", height: "auto" }}
      />
    ),
    title: "Terms & Compensation",
    subtitle: "Salary, dates, and agency terms",
    hasToggle: true,
    fields: [
      { label: "Start Date", value: "", col: 4, hasCalendar: true },
      { label: "Duration", value: "Permanent", col: 4 },
      {
        label: "Salary *",
        value: "€75,000 — €90,000 per annum (depending on experience)",
        col: 4,
      },
      { label: "Agency Rate", value: "15% of first-year base salary", col: 4 },
      { label: "Close Date", value: "", col: 4, hasCalendar: true },
    ],
  },
  {
    icon: (
      <img
        src={VacancySection5}
        alt=""
        style={{ width: "15px", height: "auto" }}
      />
    ),
    title: "Requirements",
    subtitle: "Skills, experience, and education needed",
    fields: [
      {
        label: "Personal Skills *",
        col: 12,
        multiline: true,
        value:
          "Strong communication and collaboration skills. Ability to work autonomously and take ownership of complex technical problems. Excellent problem-solving mindset with attention to detail. Comfortable presenting technical concepts to non-technical stakeholders. Adaptable and eager to learn new technologies.",
      },
      {
        label: "Experience *",
        col: 12,
        multiline: true,
        tall: true,
        value:
          "Minimum 5 years of professional software engineering experience. Proven track record in designing and building distributed systems at scale. Experience with cloud platforms (AWS, GCP, or Azure). Strong proficiency in at least one modern backend language (Go, Rust, Java, or Python). Experience with containerisation (Docker, Kubernetes) and CI/CD pipelines.",
      },
      {
        label: "Education *",
        col: 12,
        multiline: true,
        value:
          "Bachelor's degree in Computer Science, Software Engineering, or a related technical field. Master's degree preferred but not required. Relevant professional certifications (e.g. AWS Solutions Architect, CKA) are a plus.",
      },
    ],
  },
  {
    icon: (
      <img
        src={VacancySection6}
        alt=""
        style={{ width: "15px", height: "auto" }}
      />
    ),
    title: "Additional Information",
    subtitle: "Any extra notes or context",
    fields: [
      {
        label: "Additional Information",
        col: 12,
        multiline: true,
        value:
          "This role offers a hybrid working arrangement with 3 days per week in the Amsterdam office. We provide a comprehensive benefits package including pension contribution, health insurance, 25 days annual leave, and a professional development budget of €2,000 per year. Relocation support is available for candidates moving from outside the Netherlands.",
      },
    ],
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const FieldRow: React.FC<{
  field: FieldDef;
  classes: ReturnType<typeof useStyles>;
}> = ({ field, classes }) => {
  const isRequired = field.label.endsWith(" *");
  const baseLabel = isRequired ? field.label.slice(0, -2) : field.label;

  return (
    <Box>
      <Typography component="label" className={classes.fieldLabel}>
        {baseLabel}
        {isRequired && (
          <Box component="span" sx={{ color: "#F87171", ml: "2px" }}>
            *
          </Box>
        )}
      </Typography>
      {field.multiline ? (
        <Box
          className={field.tall ? classes.textAreaBoxTall : classes.textAreaBox}
        >
          <Typography className={classes.textAreaValue}>
            {field.value || " "}
          </Typography>
        </Box>
      ) : (
        <Box className={classes.fieldBox}>
          <Typography className={classes.fieldValue}>
            {field.value || " "}
          </Typography>
          {field.hasCalendar && (
            <img
              src={CalendarTodayIcon}
              alt=""
              style={{ width: "14px", height: "auto", flexShrink: 0 }}
            />
          )}
          {field.hasDropdown && (
            <ExpandMoreIcon className={classes.fieldCalendarIcon} />
          )}
        </Box>
      )}
    </Box>
  );
};

// ─── Component ───────────────────────────────────────────────────────────────

export const Vacancy: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [permanentlyOpen, setPermanentlyOpen] = useState(true);
  const [actionsAnchor, setActionsAnchor] = useState<HTMLElement | null>(null);

  const actionMenuItems = [
    {
      icon: <EditOutlinedIcon sx={{ fontSize: "14px" }} />,
      label: "Edit Vacancy",
    },
    {
      icon: <NearMeOutlinedIcon sx={{ fontSize: "14px" }} />,
      label: "Send Vacancy",
    },
    {
      icon: <MenuBookOutlinedIcon sx={{ fontSize: "14px" }} />,
      label: "Add Journal Entry",
    },
    {
      icon: <AdminPanelSettingsOutlinedIcon sx={{ fontSize: "14px" }} />,
      label: "Superuser override",
    },
    {
      icon: <EventOutlinedIcon sx={{ fontSize: "14px" }} />,
      label: "Interview Slots",
    },
    { icon: <QrCodeIcon sx={{ fontSize: "14px" }} />, label: "View job Codes" },
    {
      icon: <HowToRegOutlinedIcon sx={{ fontSize: "14px" }} />,
      label: "Action Candidates",
    },
    { icon: <DeleteOutlineIcon sx={{ fontSize: "14px" }} />, label: "Remove" },
    {
      icon: <PauseCircleOutlineIcon sx={{ fontSize: "14px" }} />,
      label: "Suspend",
    },
    {
      icon: <CampaignOutlinedIcon sx={{ fontSize: "14px" }} />,
      label: "Advertise",
    },
    {
      icon: <ArchiveOutlinedIcon sx={{ fontSize: "14px" }} />,
      label: "Archive",
    },
  ];

  return (
    <Box
      component="section"
      aria-label="Vacancy detail"
      sx={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {/* ─── Breadcrumb bar ──────────────────────────────────────── */}
      <Box className={classes.breadcrumbBar}>
        <IconButton
          size="small"
          onClick={() => navigate("/dashboard")}
          className={classes.breadcrumbBack}
          aria-label="Go back"
        >
          <ArrowBackIcon sx={{ fontSize: "16px" }} />
        </IconButton>
        <Box className={classes.breadcrumbPath}>
          <Typography
            className={classes.breadcrumbLink}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Typography>
          <ChevronRightIcon className={classes.breadcrumbSep} />
          <Typography
            className={classes.breadcrumbLink}
            onClick={() => navigate("/dashboard")}
          >
            Vacancies
          </Typography>
          <ChevronRightIcon className={classes.breadcrumbSep} />
          <Typography className={classes.breadcrumbCurrent}>
            Senior Software Engineer
          </Typography>
        </Box>
      </Box>

      {/* ─── Sticky tabs bar ──────────────────────────────────────── */}
      <Box className={classes.pageHeader}>
        <Tabs
          value={tab}
          onChange={(_e, v: number) => setTab(v)}
          className={classes.tabs}
          aria-label="Vacancy sections"
        >
          <Tab
            icon={<AssignmentIcon sx={{ fontSize: "15px" }} />}
            iconPosition="start"
            label="Vacancy"
            id="tab-vacancy"
            aria-controls="tabpanel-vacancy"
          />
          <Tab
            icon={<PeopleIcon sx={{ fontSize: "15px" }} />}
            iconPosition="start"
            label="Applications"
            id="tab-applications"
            aria-controls="tabpanel-applications"
          />
          <Tab
            icon={<AssessmentIcon sx={{ fontSize: "15px" }} />}
            iconPosition="start"
            label="Journal"
            id="tab-journal"
            aria-controls="tabpanel-journal"
          />
        </Tabs>
      </Box>

      {/* ─── Scrollable content ───────────────────────────────────── */}
      <Box className={classes.pageContent}>
        {/* ─── Vacancy header card ─────────────────────────────────── */}
        <Paper elevation={0} className={classes.vacancyHeader}>
          <Stack direction="row" alignItems="center" gap="14px">
            <Box className={classes.vacancyIconBox} aria-hidden="true">
              <img
                src={WorkIconBig}
                alt=""
                style={{ width: "20px", height: "auto" }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Stack
                direction="row"
                alignItems="center"
                gap="10px"
                sx={{ mb: "6px" }}
              >
                <Typography component="h1" className={classes.vacancyTitle}>
                  Senior Software Engineer
                </Typography>
                <Box className={classes.vacancyLiveBadge} role="status">
                  <Box className={classes.vacancyLiveDot} aria-hidden="true" />
                  Live
                </Box>
              </Stack>
              <Stack direction="row" gap="16px" flexWrap="wrap">
                {[
                  {
                    icon: (
                      <img
                        src={LocationOnIcon}
                        alt=""
                        style={{ width: "12px", height: "auto" }}
                      />
                    ),
                    text: "London, UK",
                  },
                  {
                    icon: (
                      <img
                        src={CategoryIcon}
                        alt=""
                        style={{ width: "12px", height: "auto" }}
                      />
                    ),
                    text: "Technology & Digital",
                  },
                  {
                    icon: (
                      <img
                        src={WorkIconIn}
                        alt=""
                        style={{ width: "12px", height: "auto" }}
                      />
                    ),
                    text: "Permanent",
                  },
                  {
                    icon: (
                      <img
                        src={CalendarTodayIcon}
                        alt=""
                        style={{ width: "12px", height: "auto" }}
                      />
                    ),
                    text: "Closes 15 April 2024",
                  },
                ].map((item) => (
                  <Box key={item.text} className={classes.vacancyMeta}>
                    {item.icon}
                    {item.text}
                  </Box>
                ))}
              </Stack>
            </Box>
            {/* ─── Header action buttons ───────────────────────── */}
            <Box className={classes.vacancyActions}>
              <Button
                variant="outlined"
                size="small"
                startIcon={
                  <ContentCopyOutlinedIcon sx={{ fontSize: "14px" }} />
                }
              >
                Duplicate
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<IosShareIcon sx={{ fontSize: "14px" }} />}
              >
                Share
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<ViewHeadlineIcon sx={{ fontSize: "14px" }} />}
                endIcon={
                  <KeyboardArrowDownIcon
                    sx={{
                      fontSize: "14px",
                      transition: "transform 0.15s",
                      transform: actionsAnchor ? "rotate(180deg)" : "none",
                    }}
                  />
                }
                onClick={(e) => setActionsAnchor(e.currentTarget)}
                aria-haspopup="true"
                aria-expanded={Boolean(actionsAnchor)}
              >
                Actions
              </Button>

              {/* Actions dropdown menu */}
              <Menu
                anchorEl={actionsAnchor}
                open={Boolean(actionsAnchor)}
                onClose={() => setActionsAnchor(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: "6px",
                      minWidth: "190px",
                      borderRadius: "10px",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                      border: "1px solid #f1f5f9",
                      overflow: "hidden",
                    },
                  },
                }}
              >
                {actionMenuItems.map((item, i) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => setActionsAnchor(null)}
                    sx={{
                      px: "12px",
                      py: "7px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      minHeight: 0,
                      borderBottom:
                        i < actionMenuItems.length - 1
                          ? "1px solid #f3f4f6"
                          : "none",
                      "&:hover": { backgroundColor: "#f8fafc" },
                    }}
                  >
                    <Box
                      sx={{ color: "#9ca3af", display: "flex", flexShrink: 0 }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#374151",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Stack>
        </Paper>

        {/* ─── Tab panel: Vacancy ───────────────────────────────────── */}
        {tab === 0 && (
          <Box
            role="tabpanel"
            id="tabpanel-vacancy"
            aria-labelledby="tab-vacancy"
          >
            {/* ── Single form card ──────────────────────────────────── */}
            <Paper elevation={0} className={classes.formCard}>
              {/* Form card header */}
              <Box className={classes.formHeader}>
                <Box>
                  <Typography className={classes.formTitle}>
                    Vacancy Form
                  </Typography>
                  <Typography className={classes.formSubtitle}>
                    Edit vacancy details and requirements
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  className={classes.openBtn}
                  aria-label="Open vacancy form"
                >
                  Open
                </Button>
              </Box>

              <Divider sx={{ borderColor: "#f3f4f6" }} />

              {/* All form sections inside the single card */}
              {formSections.map((section, index) => (
                <React.Fragment key={section.title}>
                  {index > 0 && <Divider className={classes.formDivider} />}
                  <Box className={classes.sectionBlock}>
                    <Box className={classes.sectionHeaderRow}>
                      <Box
                        className={classes.sectionIconBox}
                        aria-hidden="true"
                      >
                        {section.icon}
                      </Box>
                      <Box>
                        <Typography
                          component="h2"
                          className={classes.sectionTitle}
                        >
                          {section.title}
                        </Typography>
                        <Typography className={classes.sectionSubtitle}>
                          {section.subtitle}
                        </Typography>
                      </Box>
                    </Box>

                    <Grid container spacing={2}>
                      {section.fields.map((f) => (
                        <Grid
                          key={f.label}
                          size={{ xs: 12, md: f.col as 4 | 12 }}
                        >
                          <FieldRow field={f} classes={classes} />
                        </Grid>
                      ))}

                      {section.hasToggle && (
                        <Grid size={{ xs: 12, md: 4 }}>
                          <Typography
                            component="label"
                            className={classes.fieldLabel}
                          >
                            Permanently Open Vacancy
                          </Typography>
                          <YesNo
                            label="Permanently Open Vacancy"
                            value={permanentlyOpen ? "no" : "yes"}
                            onChange={(v) => setPermanentlyOpen(v === "no")}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </React.Fragment>
              ))}

              <Divider className={classes.formDivider} />

              {/* Alerts, Checks & Interview Arrangements */}
              <Box className={classes.sectionBlock}>
                <Box className={classes.sectionHeaderRow}>
                  <Box className={classes.sectionIconBox} aria-hidden="true">
                    <img
                      src={VacancySection7}
                      alt=""
                      style={{ width: "15px", height: "auto" }}
                    />
                  </Box>
                  <Box>
                    <Typography component="h2" className={classes.sectionTitle}>
                      Alerts, Checks & Interview Arrangements
                    </Typography>
                    <Typography className={classes.sectionSubtitle}>
                      Email alerts, compliance checks, interview scheduling and
                      application sources
                    </Typography>
                  </Box>
                </Box>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <FieldRow
                      field={{
                        label: "Email Alerts Sent",
                        value: "",
                        col: 4,
                        hasCalendar: true,
                      }}
                      classes={classes}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Typography
                      component="label"
                      className={classes.fieldLabel}
                    >
                      Post Requires a Disclosure Scotland Check
                    </Typography>
                    <YesNo
                      label="Disclosure Scotland Check"
                      defaultValue="no"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <FieldRow
                      field={{
                        label: "Allow Applications From",
                        value: "Indeed",
                        col: 4,
                        hasDropdown: true,
                      }}
                      classes={classes}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <FieldRow
                      field={{
                        label: "Interviews Will Be Held On",
                        value: "",
                        col: 4,
                        hasCalendar: true,
                      }}
                      classes={classes}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <FieldRow
                      field={{
                        label: "Confirm Interview Date By",
                        value: "",
                        col: 4,
                        hasCalendar: true,
                      }}
                      classes={classes}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        )}

        {tab === 1 && (
          <Box
            role="tabpanel"
            id="tabpanel-applications"
            aria-labelledby="tab-applications"
            className={classes.emptyTab}
          >
            <Typography sx={{ fontSize: "13px" }}>
              Applications list will appear here
            </Typography>
          </Box>
        )}
        {tab === 2 && (
          <Box
            role="tabpanel"
            id="tabpanel-journal"
            aria-labelledby="tab-journal"
            className={classes.emptyTab}
          >
            <Typography sx={{ fontSize: "13px" }}>
              Journal entries will appear here
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
