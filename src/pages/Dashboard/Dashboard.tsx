import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid2 as Grid,
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
} from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import LiveJobsIcon from "../../assets/LiveJobs.svg";
import AwaitingAuthorizationIcon from "../../assets/AwaitingAuthorization.svg";
import AwaitingAdvertisementIcon from "../../assets/AwaitingAdvertisement.svg";
import CandidatestoReviewIcon from "../../assets/CandidatestoReview.svg";
import LiveApplicationsIcon from "../../assets/LiveApplications.svg";
import InterviewsPendingIcon from "../../assets/InterviewsPending.svg";
import AddIcon from "@mui/icons-material/Add";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "../../assets/Location.svg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import FiltersSrc from "../../assets/Filters.svg";
import ExportSrc from "../../assets/export.svg";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckIcon from "@mui/icons-material/Check";
import { useStyles } from "./Dashboard.style";
import { NewVacancyDialog } from "./NewVacancyDialog";
import { VacancyQuickView } from "./VacancyQuickView";
import type { VacancyData } from "./VacancyQuickView";
import VacancyIcon from "../../assets/vacancy.svg";
import EyeIcon from "../../assets/eye.svg";

// ─── Static data ─────────────────────────────────────────────────────────────

interface StatCard {
  value: number;
  label: string;
  iconSrc: string;
  iconBg: string;
  borderColor: string;
}

const statCards: StatCard[] = [
  {
    value: 24,
    label: "Live Jobs",
    iconSrc: LiveJobsIcon,
    iconBg: "#ECFDF5",
    borderColor: "#A7F3D0",
  },
  {
    value: 7,
    label: "Awaiting Authorization",
    iconSrc: AwaitingAuthorizationIcon,
    iconBg: "#FFFBEB",
    borderColor: "#FDE68A",
  },
  {
    value: 5,
    label: "Awaiting Advertisement",
    iconSrc: AwaitingAdvertisementIcon,
    iconBg: "#FFF7ED",
    borderColor: "#FED7AA",
  },
  {
    value: 38,
    label: "Candidates to Review",
    iconSrc: CandidatestoReviewIcon,
    iconBg: "#F0F9FF",
    borderColor: "#BAE6FD",
  },
  {
    value: 112,
    label: "Live Applications",
    iconSrc: LiveApplicationsIcon,
    iconBg: "#F5F3FF",
    borderColor: "#DDD6FE",
  },
  {
    value: 14,
    label: "Interviews Pending",
    iconSrc: InterviewsPendingIcon,
    iconBg: "#FFF1F2",
    borderColor: "#FECDD3",
  },
];

const candidateStatusData = [
  { name: "Fresh", value: 45, color: "#1a2332" },
  { name: "Request Rejection", value: 18, color: "#f97316" },
  { name: "Interview Confirmed", value: 37, color: "#2dd4bf" },
];

const groupAppData = [
  { name: "Freshly Shortlisted", value: 38, color: "#1a2332" },
  { name: "In Interview", value: 62, color: "#2dd4bf" },
];

const vacancies: VacancyData[] = [
  {
    id: 1,
    title: "Senior Software Engineer",
    location: "London, UK",
    status: "Live",
    total: 24,
    fresh: 8,
    interview: 5,
    contractType: "Permanent",
    grade: "Grade 7",
    department: "IT Department",
    jobDescription:
      "Lead the design and development of scalable software systems, mentor junior engineers, and collaborate with product and design teams to deliver high-quality solutions.",
    fullJobDescription:
      "As a Senior Software Engineer you will be responsible for architecting, implementing and maintaining complex distributed systems. You will work closely with product managers, UX designers and stakeholders to translate business requirements into technical solutions. Responsibilities include code reviews, technical documentation, and contributing to the engineering roadmap.",
    costCentre: "CC-1042",
    reportingTo: "Engineering Manager",
    replacementFor: "N/A",
    hours: "37 hours/week",
    startDate: "01 Apr 2024",
    salary: "£65,000 – £80,000 per annum",
    agencyRate: "£450 per day",
    personalSkills:
      "Strong communication and leadership skills; ability to work collaboratively in agile teams and mentor junior engineers.",
    experience:
      "Minimum 5 years of software engineering experience, with proven expertise in distributed systems and cloud platforms (AWS/GCP).",
    education:
      "BSc in Computer Science or equivalent; relevant professional certifications desirable.",
    additionalInfo:
      "Hybrid working available — minimum 2 days per week on-site in London. Security clearance may be required.",
    closeDate: "30 Apr 2024",
    permanentlyOpen: false,
    emailAlertsSent: true,
    disclosureScotlandCheck: false,
    interviewArrangements:
      "Two-stage interview: initial technical screen (remote) followed by an in-person panel interview at the London office.",
    confirmInterviewDateBy: "15 Apr 2024",
    allowApplicationsFrom: "Internal & External",
  },
  {
    id: 2,
    title: "Product Manager",
    location: "Manchester, UK",
    status: "Awaiting Auth",
    total: 12,
    fresh: 4,
    interview: 2,
    contractType: "Permanent",
    grade: "Grade 6",
    department: "Communities and Place",
    jobDescription:
      "Define product vision, manage roadmap priorities and work cross-functionally to deliver customer-centric features on time.",
    fullJobDescription:
      "The Product Manager will own the product lifecycle from discovery to delivery. You will gather requirements from stakeholders, write user stories, prioritise the backlog and coordinate with engineering and design to ship features that solve real user problems. Experience with agile methodologies and data-driven decision making is essential.",
    costCentre: "CC-2011",
    reportingTo: "Head of Product",
    replacementFor: "J. Harris",
    hours: "37 hours/week",
    startDate: "15 Apr 2024",
    salary: "£55,000 – £65,000 per annum",
    personalSkills:
      "Excellent stakeholder management and communication skills; strong analytical mindset and problem-solving ability.",
    experience:
      "3+ years in a product management role, preferably within a digital or public sector environment.",
    education:
      "Degree-level qualification in a relevant discipline; product management certification (e.g. AIPMM) advantageous.",
    closeDate: "20 Apr 2024",
    permanentlyOpen: false,
    emailAlertsSent: true,
    disclosureScotlandCheck: false,
    interviewArrangements:
      "Single panel interview conducted remotely via Microsoft Teams.",
    confirmInterviewDateBy: "10 Apr 2024",
    allowApplicationsFrom: "External Only",
  },
  {
    id: 3,
    title: "UX Designer",
    location: "Remote",
    status: "Live",
    total: 18,
    fresh: 6,
    interview: 4,
    contractType: "Fixed Term",
    grade: "Grade 5",
    department: "People and Culture",
    jobDescription:
      "Create intuitive user experiences through research, wireframing and prototyping, ensuring designs meet accessibility standards.",
    fullJobDescription:
      "We are looking for a talented UX Designer to join our growing design team. You will conduct user research, create wireframes and interactive prototypes, and work with developers to ensure pixel-perfect implementation. You will champion accessibility and inclusive design across all digital products.",
    costCentre: "CC-3055",
    reportingTo: "Design Lead",
    replacementFor: "N/A",
    hours: "35 hours/week",
    startDate: "01 May 2024",
    duration: "12 months (with possibility of extension)",
    salary: "£42,000 – £50,000 per annum (pro-rata)",
    personalSkills:
      "Creative thinker with strong empathy for users; excellent communication and presentation skills.",
    experience:
      "2+ years experience in UX/UI design; proficiency in Figma and usability testing methodologies.",
    education:
      "Degree in Design, HCI or related field; portfolio of digital product work required.",
    closeDate: "25 Apr 2024",
    permanentlyOpen: false,
    emailAlertsSent: false,
    disclosureScotlandCheck: false,
    interviewArrangements:
      "Portfolio review followed by a one-hour remote interview with the design team.",
    allowApplicationsFrom: "Internal & External",
  },
  {
    id: 4,
    title: "Data Analyst",
    location: "Birmingham, UK",
    status: "Awaiting Advert",
    total: 9,
    fresh: 3,
    interview: 1,
    contractType: "Permanent",
    grade: "Grade 5",
    department: "Finance and Corporate Services",
    jobDescription:
      "Analyse large datasets, build dashboards and provide actionable insights to support strategic decision-making.",
    fullJobDescription:
      "The Data Analyst will work within our Business Intelligence team to gather, clean and analyse complex datasets. You will build and maintain Power BI dashboards, produce regular management reports and collaborate with business units to identify opportunities for data-driven improvement.",
    costCentre: "CC-4021",
    reportingTo: "Head of Analytics",
    replacementFor: "N/A",
    hours: "37 hours/week",
    startDate: "01 Jun 2024",
    salary: "£35,000 – £42,000 per annum",
    personalSkills:
      "Highly numerate with attention to detail; ability to translate complex data into clear business insights.",
    experience:
      "2+ years in a data analysis role; proficiency in SQL, Power BI and Excel required.",
    education:
      "Degree in Mathematics, Statistics, Economics or a related discipline.",
    additionalInfo: "Occasional travel to London office required (quarterly).",
    closeDate: "15 May 2024",
    permanentlyOpen: false,
    emailAlertsSent: true,
    disclosureScotlandCheck: false,
    interviewArrangements:
      "Written assessment followed by a panel interview at the Birmingham office.",
    confirmInterviewDateBy: "25 May 2024",
    allowApplicationsFrom: "Internal & External",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    location: "Edinburgh, UK",
    status: "Live",
    total: 15,
    fresh: 5,
    interview: 3,
    contractType: "Permanent",
    grade: "Grade 6",
    department: "IT Department",
    jobDescription:
      "Manage CI/CD pipelines, cloud infrastructure and ensure system reliability through monitoring and automation.",
    fullJobDescription:
      "As a DevOps Engineer you will design and maintain our cloud infrastructure on AWS, implement CI/CD pipelines using GitHub Actions, and drive a culture of automation and reliability. You will work closely with development teams to improve deployment frequency and reduce mean time to recovery.",
    costCentre: "CC-1042",
    reportingTo: "Infrastructure Lead",
    replacementFor: "M. Scott",
    hours: "37 hours/week",
    startDate: "15 Mar 2024",
    salary: "£55,000 – £68,000 per annum",
    agencyRate: "£400 per day",
    personalSkills:
      "Self-motivated with a strong sense of ownership; able to work in a fast-paced on-call environment.",
    experience:
      "3+ years DevOps/SRE experience; hands-on with AWS, Terraform and Kubernetes in production environments.",
    education:
      "Degree in Computer Science or equivalent practical experience; AWS/GCP certifications desirable.",
    additionalInfo:
      "On-call rota participation required (approximately 1 week in 6).",
    permanentlyOpen: false,
    emailAlertsSent: true,
    disclosureScotlandCheck: true,
    interviewArrangements:
      "Technical take-home task followed by a remote panel interview with the infrastructure team.",
    confirmInterviewDateBy: "28 Mar 2024",
    allowApplicationsFrom: "Internal & External",
  },
  {
    id: 6,
    title: "Marketing Specialist",
    location: "Bristol, UK",
    status: "Draft",
    total: 6,
    fresh: 2,
    interview: 0,
    contractType: "Fixed Term",
    grade: "Grade 4",
    department: "Communities and Place",
    jobDescription:
      "Plan and execute multi-channel marketing campaigns to drive brand awareness and lead generation.",
    fullJobDescription:
      "The Marketing Specialist will develop and deliver integrated marketing campaigns across digital and traditional channels. Responsibilities include content creation, social media management, email marketing, and performance reporting. You will work with the wider communications team to ensure brand consistency.",
    costCentre: "CC-2033",
    reportingTo: "Marketing Manager",
    replacementFor: "N/A",
    hours: "35 hours/week",
    startDate: "01 Jul 2024",
    duration: "6 months",
    salary: "£28,000 – £34,000 per annum (pro-rata)",
    personalSkills:
      "Creative and proactive with strong written and verbal communication skills; comfortable working to tight deadlines.",
    experience:
      "1+ years in a marketing or communications role; experience with social media management tools and email platforms.",
    education:
      "Degree in Marketing, Communications or related field; CIM qualification advantageous.",
    permanentlyOpen: false,
    emailAlertsSent: false,
    disclosureScotlandCheck: false,
    allowApplicationsFrom: "External Only",
  },
  {
    id: 7,
    title: "Finance Analyst",
    location: "Leeds, UK",
    status: "Live",
    total: 11,
    fresh: 4,
    interview: 2,
    contractType: "Permanent",
    grade: "Grade 5",
    department: "Finance and Corporate Services",
    jobDescription:
      "Prepare financial reports, support budget planning and provide analysis to guide business performance.",
    fullJobDescription:
      "The Finance Analyst will support the Finance Business Partnering team by producing monthly management accounts, variance analysis and forecasts. You will liaise with budget holders, assist with year-end processes and contribute to the continuous improvement of financial reporting processes.",
    costCentre: "CC-4011",
    reportingTo: "Finance Business Partner",
    replacementFor: "N/A",
    hours: "37 hours/week",
    startDate: "01 May 2024",
    salary: "£38,000 – £46,000 per annum",
    personalSkills:
      "Excellent attention to detail; strong organisational skills and ability to manage competing priorities.",
    experience:
      "2+ years in a finance or accounting role; experience with Oracle Financials or similar ERP systems preferred.",
    education:
      "Degree in Finance, Accounting or Economics; part-qualified CIMA/ACCA or working towards qualification.",
    additionalInfo:
      "Flexible working arrangements available — up to 3 days remote per week.",
    closeDate: "10 May 2024",
    permanentlyOpen: false,
    emailAlertsSent: true,
    disclosureScotlandCheck: false,
    interviewArrangements:
      "One-stage panel interview at the Leeds office; presentation on a provided financial scenario required.",
    confirmInterviewDateBy: "20 May 2024",
    allowApplicationsFrom: "Internal & External",
  },
];

interface Application {
  id: number;
  ref: string;
  initials: string;
  avatarBg: string;
  name: string;
  vacancy: string;
  location: string;
  status: string;
  date: string;
}
const applications: Application[] = [
  {
    id: 1,
    ref: "APP-2024-001",
    initials: "JT",
    avatarBg: "#3b82f6",
    name: "James Thornton",
    vacancy: "Senior Software Engineer",
    location: "London, UK",
    status: "Fresh",
    date: "15 Mar 2024",
  },
  {
    id: 2,
    ref: "APP-2024-002",
    initials: "SM",
    avatarBg: "#8b5cf6",
    name: "Sarah Mitchell",
    vacancy: "Product Manager",
    location: "Manchester, UK",
    status: "Interview Confirmed",
    date: "14 Mar 2024",
  },
  {
    id: 3,
    ref: "APP-2024-003",
    initials: "DO",
    avatarBg: "#22c55e",
    name: "David Okafor",
    vacancy: "UX Designer",
    location: "Remote",
    status: "Shortlisted",
    date: "13 Mar 2024",
  },
  {
    id: 4,
    ref: "APP-2024-004",
    initials: "EC",
    avatarBg: "#f59e0b",
    name: "Emma Clarke",
    vacancy: "Data Analyst",
    location: "Birmingham, UK",
    status: "Fresh",
    date: "12 Mar 2024",
  },
  {
    id: 5,
    ref: "APP-2024-005",
    initials: "LP",
    avatarBg: "#ef4444",
    name: "Liam Patel",
    vacancy: "DevOps Engineer",
    location: "Edinburgh, UK",
    status: "Rejected",
    date: "11 Mar 2024",
  },
  {
    id: 6,
    ref: "APP-2024-006",
    initials: "OB",
    avatarBg: "#06b6d4",
    name: "Olivia Bennett",
    vacancy: "Marketing Specialist",
    location: "Bristol, UK",
    status: "Fresh",
    date: "10 Mar 2024",
  },
  {
    id: 7,
    ref: "APP-2024-007",
    initials: "NW",
    avatarBg: "#1a2332",
    name: "Noah Williams",
    vacancy: "Finance Analyst",
    location: "Leeds, UK",
    status: "Interview Confirmed",
    date: "09 Mar 2024",
  },
  {
    id: 8,
    ref: "APP-2024-008",
    initials: "AJ",
    avatarBg: "#f97316",
    name: "Ava Johnson",
    vacancy: "Senior Software Engineer",
    location: "London, UK",
    status: "Shortlisted",
    date: "08 Mar 2024",
  },
];

// ─── Status badge helper ─────────────────────────────────────────────────────

type BadgeVariant =
  | "Live"
  | "Awaiting Auth"
  | "Awaiting Advert"
  | "Draft"
  | "Fresh"
  | "Interview Confirmed"
  | "Shortlisted"
  | "Rejected";

const badgeStyles: Record<
  BadgeVariant,
  { bg: string; color: string; border: string }
> = {
  Live: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  "Awaiting Auth": { bg: "#fffbeb", color: "#92400e", border: "#fde68a" },
  "Awaiting Advert": { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  Draft: { bg: "#f8fafc", color: "#475569", border: "#cbd5e1" },
  Fresh: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  "Interview Confirmed": { bg: "#eff6ff", color: "#1e40af", border: "#bfdbfe" },
  Shortlisted: { bg: "#f5f3ff", color: "#5b21b6", border: "#ddd6fe" },
  Rejected: { bg: "#fff1f2", color: "#991b1b", border: "#fecdd3" },
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const style = badgeStyles[status as BadgeVariant] ?? {
    bg: "#f8fafc",
    color: "#475569",
    border: "#cbd5e1",
  };
  return (
    <Box
      sx={{
        display: "inline-block",
        backgroundColor: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        borderRadius: "999px",
        px: "12px",
        py: "3px",
        fontSize: "12px",
        fontWeight: 500,
        lineHeight: 1.5,
        whiteSpace: "nowrap",
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
  "Global Template",
  "Argyll and the Islands",
  "Business Improvement and Internal Audit",
  "Caithness and Sutherland",
  "Communities and Place",
  "Finance and Corporate Services",
  "IT Department",
  "Legal and Governance",
  "People and Culture",
  "Planning and Infrastructure",
];

// ─── Component ───────────────────────────────────────────────────────────────

/** Home Dashboard — recruitment pipeline overview */
export const Dashboard: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [addVacancyOpen, setAddVacancyOpen] = useState(false);
  const [newVacancyOpen, setNewVacancyOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickViewVacancy, setQuickViewVacancy] = useState<VacancyData | null>(
    null,
  );
  const [vacancySearch, setVacancySearch] = useState("");

  const filteredVacancies = vacancySearch.trim()
    ? vacancies.filter(
        (v) =>
          v.title.toLowerCase().includes(vacancySearch.toLowerCase()) ||
          v.location.toLowerCase().includes(vacancySearch.toLowerCase()) ||
          v.status.toLowerCase().includes(vacancySearch.toLowerCase()),
      )
    : vacancies;

  return (
    <Box
      component="section"
      aria-label="Home Dashboard"
      sx={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      {/* ─── Page header ──────────────────────────────────────────── */}
      <Box className={classes.pageHeader}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Typography component="h1" className={classes.pageTitle}>
              Home Dashboard
            </Typography>
            <IconButton
              size="small"
              aria-label="Edit dashboard title"
              sx={{
                color: "#3b82f6",
                padding: "2px",
                "&:hover": { backgroundColor: "#eff6ff" },
              }}
            >
              <DriveFileRenameOutlineIcon sx={{ fontSize: "18px" }} />
            </IconButton>
          </Box>
          <Typography className={classes.pageSubtitle}>
            Overview of your recruitment pipeline
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} className={classes.headerActions}>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon sx={{ fontSize: "13px" }} />}
            className={classes.addVacancyBtn}
            onClick={() => setAddVacancyOpen(true)}
            aria-label="Add a new vacancy"
          >
            Add Vacancy
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<PersonIcon sx={{ fontSize: "13px" }} />}
            className={classes.actionCandidatesBtn}
            aria-label="Take action on candidates"
          >
            Action Candidates
          </Button>
        </Stack>
      </Box>
      <Box className={classes.pageContent}>
        {/* ─── Stat cards ───────────────────────────────────────────── */}
        <Grid container spacing={2} sx={{ mb: "20px" }}>
          {statCards.map((card) => (
            <Grid key={card.label} size={{ xs: 12, sm: 6, md: 4 }}>
              <Paper
                className={classes.statCard}
                role="region"
                aria-label={`${card.label}: ${card.value}`}
                elevation={0}
                sx={{ border: `1px solid ${card.borderColor}` }}
              >
                <Box
                  className={classes.statIconBox}
                  sx={{ backgroundColor: card.iconBg }}
                  aria-hidden="true"
                >
                  <img src={card.iconSrc} alt="" width={22} height={22} />
                </Box>
                <Box>
                  <Typography className={classes.statValue}>
                    {card.value}
                  </Typography>
                  <Typography className={classes.statLabel}>
                    {card.label}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* ─── Charts ───────────────────────────────────────────────── */}
        <Grid container spacing={2} sx={{ mb: "20px" }} alignItems="stretch">
          {/* Candidate Status */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              className={classes.chartCard}
              role="region"
              aria-label="Candidate Status chart"
              elevation={0}
              sx={{ border: "1px solid #f3f4f6" }}
            >
              <Typography className={classes.chartTitle}>
                Candidate Status
              </Typography>
              <Stack direction="row" alignItems="center" gap="16px">
                <Box
                  sx={{
                    position: "relative",
                    width: "110px",
                    height: "110px",
                    flexShrink: 0,
                  }}
                >
                  <ResponsiveContainer width={110} height={110}>
                    <PieChart>
                      <Pie
                        data={candidateStatusData}
                        cx={50}
                        cy={50}
                        innerRadius={32}
                        outerRadius={50}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                        strokeWidth={0}
                      >
                        {candidateStatusData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      textAlign: "center",
                    }}
                  >
                    <Typography className={classes.chartPieCenterValue}>
                      100
                    </Typography>
                    <Typography className={classes.chartPieCenterLabel}>
                      Total
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  {candidateStatusData.map((d) => (
                    <Box key={d.name} className={classes.chartLegendItem}>
                      <Box className={classes.chartLegendLabel}>
                        <Box
                          className={classes.chartLegendDot}
                          sx={{ backgroundColor: d.color }}
                          aria-hidden="true"
                        />
                        <Typography className={classes.chartLegendText}>
                          {d.name}
                        </Typography>
                      </Box>
                      <Box className={classes.chartLegendValues}>
                        <Typography className={classes.chartLegendCount}>
                          {d.value}
                        </Typography>
                        <Typography className={classes.chartLegendPct}>
                          {d.value}%
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Group Application */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              className={classes.chartCard}
              role="region"
              aria-label="Group Application by Status chart"
              elevation={0}
              sx={{ border: "1px solid #f3f4f6" }}
            >
              <Typography className={classes.chartTitle}>
                Group Application by Status
              </Typography>
              <Stack direction="row" alignItems="center" gap="16px">
                <Box sx={{ width: "160px", height: "160px", flexShrink: 0 }}>
                  <ResponsiveContainer width={160} height={160}>
                    <PieChart>
                      <Pie
                        data={groupAppData}
                        cx={75}
                        cy={75}
                        outerRadius={70}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                        strokeWidth={0}
                        label={({
                          cx,
                          cy,
                          midAngle = 0,
                          innerRadius,
                          outerRadius,
                          value,
                        }) => {
                          const RADIAN = Math.PI / 180;
                          const radius =
                            innerRadius + (outerRadius - innerRadius) * 0.55;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);
                          return (
                            <text
                              x={x}
                              y={y}
                              fill="#ffffff"
                              textAnchor="middle"
                              dominantBaseline="central"
                              fontSize={12}
                              fontWeight={700}
                            >
                              {`${value}%`}
                            </text>
                          );
                        }}
                        labelLine={false}
                      >
                        {groupAppData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Box>
                  {groupAppData.map((d) => (
                    <Box
                      key={d.name}
                      className={classes.chartLegendLabel}
                      sx={{ mb: "10px" }}
                    >
                      <Box
                        sx={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "3px",
                          backgroundColor: d.color,
                          flexShrink: 0,
                        }}
                        aria-hidden="true"
                      />
                      <Typography className={classes.chartLegendText}>
                        {d.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* ─── Vacancies table ──────────────────────────────────────── */}
        <Paper
          className={classes.sectionCard}
          elevation={0}
          sx={{ mb: "20px", border: "1px solid #f3f4f6" }}
        >
          <Box className={classes.sectionHeader}>
            {/* Left: title + count */}
            <Box>
              <Typography className={classes.sectionTitle}>
                Vacancies
              </Typography>
              <Typography className={classes.sectionSubtitle}>
                {filteredVacancies.length} of {vacancies.length} vacancies
              </Typography>
            </Box>
            {/* Right: search + filters + export */}
            <Box className={classes.vacancyHeaderRight}>
              <Box className={classes.vacancySearchBox}>
                <SearchIcon className={classes.vacancySearchIcon} />
                <Box
                  component="input"
                  className={classes.vacancySearchInput}
                  placeholder="Search vacancies by name, location or status..."
                  value={vacancySearch}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setVacancySearch(e.target.value)
                  }
                  aria-label="Search vacancies"
                />
              </Box>
              <Button
                variant="outlined"
                size="small"
                className={classes.filtersBtn}
                startIcon={
                  <img
                    src={FiltersSrc}
                    alt=""
                    style={{ width: "14px", height: "auto" }}
                  />
                }
              >
                Filters
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.exportBtn}
                startIcon={
                  <img
                    src={ExportSrc}
                    alt=""
                    style={{ width: "14px", height: "auto" }}
                  />
                }
              >
                Export
              </Button>
            </Box>
          </Box>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table size="small" aria-label="Vacancies table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      size="small"
                      inputProps={{ "aria-label": "Select all vacancies" }}
                    />
                  </TableCell>
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
                {filteredVacancies.map((row) => (
                  <TableRow
                    key={row.id}
                    className={classes.tableRow}
                    tabIndex={0}
                    onClick={() => navigate(`/vacancy/${row.id}`)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && navigate(`/vacancy/${row.id}`)
                    }
                    aria-label={`Vacancy: ${row.title}`}
                  >
                    <TableCell
                      padding="checkbox"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        size="small"
                        inputProps={{ "aria-label": `Select ${row.title}` }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{row.title}</TableCell>
                    <TableCell>
                      <Box className={classes.cellLocation}>
                        <img
                          src={LocationOnIcon}
                          alt=""
                          style={{ width: "11px", height: "auto" }}
                        />
                        {row.location}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={row.status} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{row.total}</TableCell>
                    <TableCell className={classes.cellFresh}>
                      {row.fresh}
                    </TableCell>
                    <TableCell>{row.interview}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="small"
                        className={classes.quickViewBtn}
                        startIcon={
                          <img
                            src={EyeIcon}
                            width="17px"
                            height="17px"
                            alt=""
                          />
                        }
                        aria-label={`Quick view ${row.title}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickViewVacancy(row);
                          setQuickViewOpen(true);
                        }}
                      >
                        Quick View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* ─── Applications table ────────────────────────────────────── */}
        <Paper
          className={classes.sectionCard}
          elevation={0}
          sx={{ border: "1px solid #f3f4f6" }}
        >
          <Box className={classes.sectionHeader}>
            <Typography className={classes.sectionTitle}>
              Applications
            </Typography>
            <Typography className={classes.sectionSubtitle}>
              8 total applications
            </Typography>
          </Box>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table size="small" aria-label="Applications table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      size="small"
                      inputProps={{ "aria-label": "Select all applications" }}
                    />
                  </TableCell>
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
                    onKeyDown={(e) =>
                      e.key === "Enter" && navigate(`/application/${row.id}`)
                    }
                    aria-label={`Application from ${row.name}`}
                  >
                    <TableCell
                      padding="checkbox"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        size="small"
                        inputProps={{
                          "aria-label": `Select application from ${row.name}`,
                        }}
                      />
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
                        <Typography className={classes.candidateName}>
                          {row.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.vacancy}</TableCell>
                    <TableCell>
                      <Box className={classes.cellLocation}>
                        <img
                          src={LocationOnIcon}
                          alt=""
                          style={{ width: "11px", height: "auto" }}
                        />
                        {row.location}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={row.status} />
                    </TableCell>
                    <TableCell sx={{ color: "#64748b" }}>{row.date}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Box className={classes.tableActions}>
                        <Button
                          size="small"
                          className={classes.actionBtn}
                          endIcon={
                            <ArrowDropDownIcon sx={{ fontSize: "13px" }} />
                          }
                          aria-label={`Action menu for ${row.name}`}
                        >
                          Action
                        </Button>
                        <Button
                          size="small"
                          className={classes.quickViewBtn}
                          startIcon={
                            <img src={EyeIcon} width={"17px"} height={"17px"} />
                          }
                          aria-label={`Quick view ${row.name}`}
                        >
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

      {/* ─── Vacancy Quick View drawer ───────────────────────────── */}
      <VacancyQuickView
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
        vacancy={quickViewVacancy}
        onFullView={(id) => {
          setQuickViewOpen(false);
          navigate(`/vacancy/${id}`);
        }}
      />

      {/* ─── New Vacancy wizard ───────────────────────────────────── */}
      <NewVacancyDialog
        open={newVacancyOpen}
        onClose={() => setNewVacancyOpen(false)}
        onSuccess={() => {
          setNewVacancyOpen(false);
          setSuccessOpen(true);
        }}
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
              borderRadius: "16px",
              width: "400px",
              maxWidth: "95vw",
              p: "36px 32px",
              textAlign: "center",
            },
          },
        }}
      >
        {/* Green check icon */}
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: "#dcfce7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: "20px",
          }}
        >
          <CheckIcon sx={{ fontSize: "32px", color: "#22c55e" }} />
        </Box>

        <Typography
          id="success-title"
          sx={{
            fontWeight: 700,
            fontSize: "20px",
            color: "#1a2332",
            mb: "10px",
          }}
        >
          Vacancy Created
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            color: "#374151",
            mb: "6px",
            lineHeight: 1.5,
          }}
        >
          <Box component="span" sx={{ fontWeight: 700 }}>
            New Vacancy
          </Box>{" "}
          has been successfully created.
        </Typography>
        <Typography sx={{ fontSize: "13px", color: "#6b7280", mb: "28px" }}>
          Department:{" "}
          <Box component="span" sx={{ fontWeight: 700, color: "#1a2332" }}>
            {selectedDepartment}
          </Box>
        </Typography>

        <Button
          variant="contained"
          fullWidth
          disableElevation
          onClick={() => setSuccessOpen(false)}
          sx={{
            backgroundColor: "#1a2332",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 600,
            py: "12px",
            borderRadius: "10px",
            "&:hover": { backgroundColor: "#0f172a" },
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
              borderRadius: "16px",
              width: "440px",
              maxWidth: "95vw",
              p: 0,
              overflow: "hidden",
            },
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: "24px",
            pt: "24px",
            pb: "16px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            border: "1px solid #F3F4f6",
          }}
        >
          <Box>
            <Typography
              id="add-vacancy-title"
              sx={{
                fontWeight: 700,
                fontSize: "18px",
                color: "#1a2332",
                lineHeight: 1.2,
                mb: "6px",
              }}
            >
              Add New Vacancy
            </Typography>
            <Typography
              sx={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.4 }}
            >
              Select a department to load the relevant vacancy template.
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => setAddVacancyOpen(false)}
            aria-label="Close modal"
            sx={{
              color: "#9ca3af",
              mt: "-4px",
              mr: "-8px",
              "&:hover": { backgroundColor: "#f1f5f9" },
            }}
          >
            <CloseIcon sx={{ fontSize: "18px" }} />
          </IconButton>
        </Box>

        {/* Department list */}
        <DialogContent
          sx={{
            px: "24px",
            pb: "24px",
            maxHeight: "420px",
            overflowY: "auto",
          }}
        >
          <Stack spacing={1}>
            {departments.map((dept) => (
              <Box
                key={dept}
                component="button"
                onClick={() => {
                  setAddVacancyOpen(false);
                  setSelectedDepartment(dept);
                  setNewVacancyOpen(true);
                }}
                aria-label={`Select ${dept} template`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  width: "100%",
                  textAlign: "left",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "14px 16px",
                  backgroundColor: "#ffffff",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background-color 0.12s",
                  "&:hover": {
                    backgroundColor: "#f8fafc",
                    borderColor: "#d1d5db",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    backgroundColor: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <img src={VacancyIcon} alt="" width={15} height={15} />
                </Box>
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#1a2332",
                    lineHeight: 1.4,
                  }}
                >
                  {dept}
                </Typography>
                <ChevronRightIcon
                  sx={{ fontSize: "18px", color: "#9ca3af", flexShrink: 0 }}
                />
              </Box>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
