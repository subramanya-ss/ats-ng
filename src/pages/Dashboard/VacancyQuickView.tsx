import React from "react";
import { Drawer, Box, Typography, IconButton, Divider, useMediaQuery, useTheme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import CampaignIcon from "@mui/icons-material/Campaign";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VacancyDetailsSrc from "../../assets/VacancyDetails.svg";
import JobDescriptionSrc from "../../assets/JobDescription.svg";
import EmploymentDetailsSrc from "../../assets/EmploymentDetails.svg";
import CompensationSrc from "../../assets/Compensation.svg";
import RequirementsSrc from "../../assets/Requirements.svg";
import SettingAlertsSrc from "../../assets/settingalerts.svg";
import RoleIcon from "../../assets/sen_role.svg";

// ─── Shared type ──────────────────────────────────────────────────────────────

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
  duration?: string;
  salary?: string;
  agencyRate?: string;
  personalSkills?: string;
  experience?: string;
  education?: string;
  additionalInfo?: string;
  closeDate?: string;
  permanentlyOpen?: boolean;
  emailAlertsSent?: boolean;
  disclosureScotlandCheck?: boolean;
  interviewArrangements?: string;
  confirmInterviewDateBy?: string;
  allowApplicationsFrom?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  vacancy: VacancyData | null;
  onFullView: (id: number) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const FieldRow: React.FC<{ label: string; value: string; clamp?: number }> = ({ label, value, clamp }) => (
  <Box sx={{ display: "flex", alignItems: "flex-start", py: "12px", borderBottom: "1px solid #f3f4f6" }}>
    <Typography sx={{ width: "145px", flexShrink: 0, fontSize: "13px", color: "#9ca3af", lineHeight: 1.6 }}>
      {label}
    </Typography>
    <Typography
      sx={{
        flex: 1, fontSize: "14px", fontWeight: 600, color: "#1a2332", lineHeight: 1.6,
        ...(clamp ? { overflow: "hidden", display: "-webkit-box", WebkitLineClamp: clamp, WebkitBoxOrient: "vertical" as const } : {}),
      }}
    >
      {value}
    </Typography>
  </Box>
);

const FieldRowNode: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <Box sx={{ display: "flex", alignItems: "center", py: "12px", borderBottom: "1px solid #f3f4f6" }}>
    <Typography sx={{ width: "145px", flexShrink: 0, fontSize: "13px", color: "#9ca3af", lineHeight: 1.6 }}>
      {label}
    </Typography>
    <Box sx={{ flex: 1 }}>{children}</Box>
  </Box>
);

const YesNoBadge: React.FC<{ value: boolean }> = ({ value }) => (
  <Box
    sx={{
      display: "inline-flex", alignItems: "center", gap: "4px",
      px: "10px", py: "3px", borderRadius: "20px",
      backgroundColor: value ? "#dcfce7" : "#f1f5f9",
      color: value ? "#16a34a" : "#6b7280",
      fontSize: "12px", fontWeight: 600,
    }}
  >
    {value
      ? <CheckIcon sx={{ fontSize: "12px" }} />
      : <CloseRoundedIcon sx={{ fontSize: "12px" }} />}
    {value ? "Yes" : "No"}
  </Box>
);

const SectionHeader: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: "8px", py: "10px", px: "20px", mx: "-20px", backgroundColor: "#f8fafc", mt: "4px", mb: "2px" }}>
    {icon}
    <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#1a2332" }}>{title}</Typography>
  </Box>
);

const ActionBtn: React.FC<{ icon: React.ReactNode; label: string; bg?: string; color?: string; border?: string }> = ({
  icon, label, bg = "#ffffff", color = "#374151", border = "1px solid #e5e7eb",
}) => (
  <Box
    component="button"
    sx={{
      flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: "7px", padding: "14px 6px", borderRadius: "12px", cursor: "pointer", fontFamily: "inherit",
      backgroundColor: bg, color, border,
      "&:hover": { filter: "brightness(0.94)" }, transition: "filter 0.12s",
    }}
  >
    {icon}
    <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "inherit", lineHeight: 1 }}>{label}</Typography>
  </Box>
);

const svgIcon = (src: string, size = "17px") => (
  <img src={src} style={{ width: size, height: size, filter: "brightness(0) opacity(0.55)" }} alt="" />
);

// ─── Component ────────────────────────────────────────────────────────────────

export const VacancyQuickView: React.FC<Props> = ({ open, onClose, vacancy, onFullView }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!vacancy) return null;

  const statusStyles: Record<string, { bg: string; color: string }> = {
    Live: { bg: "#dcfce7", color: "#16a34a" },
    "Awaiting Auth": { bg: "#fef3c7", color: "#92400e" },
    "Awaiting Advert": { bg: "#fef3c7", color: "#92400e" },
    Draft: { bg: "#f1f5f9", color: "#475569" },
  };
  const s = statusStyles[vacancy.status] ?? { bg: "#f1f5f9", color: "#475569" };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ zIndex: 1400 }}
      slotProps={{ paper: { sx: { width: "441px", maxWidth: "95vw", top: 0, height: "100vh", borderRadius: 0, display: "flex", flexDirection: "column" } } }}
    >
      {/* ── Header ──────────────────────────────────────────────────── */}
      <Box sx={{ px: isMobile ? "14px" : "20px", py: isMobile ? "12px" : "16px", borderBottom: "1px solid #f3f4f6", flexShrink: 0 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: isMobile ? "10px" : "14px" }}>
          {/* Icon box — smaller on mobile */}
          <Box sx={{ width: isMobile ? 40 : 56, height: isMobile ? 40 : 56, borderRadius: "12px", backgroundColor: "#1a2332", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <img src={RoleIcon} width={isMobile ? "18px" : "25px"} height={isMobile ? "18px" : "25px"} alt="" />
          </Box>

          {/* Title + badges */}
          <Box sx={{ flex: 1, minWidth: 0, pt: "2px" }}>
            <Typography sx={{ fontWeight: 700, fontSize: isMobile ? "15px" : "18px", color: "#1a2332", lineHeight: 1.3, mb: "6px" }}>
              {vacancy.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: "5px", backgroundColor: s.bg, color: s.color, borderRadius: "20px", px: "10px", py: "3px", fontSize: "12px", fontWeight: 600 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: s.color }} />
                {vacancy.status}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "3px", color: "#9ca3af", fontSize: "12px" }}>
                <LocationOnIcon sx={{ fontSize: "13px" }} />
                {vacancy.location}
              </Box>
            </Box>
          </Box>

          {/* Controls — icon-only Full View on mobile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0, pt: "2px" }}>
            {isMobile ? (
              <IconButton
                size="small"
                onClick={() => onFullView(vacancy.id)}
                sx={{ color: "#374151", border: "1px solid #d1d5db", borderRadius: "8px", p: "5px", "&:hover": { backgroundColor: "#f9fafb" } }}
                aria-label="Full View"
              >
                <OpenInNewIcon sx={{ fontSize: "16px" }} />
              </IconButton>
            ) : (
              <Box
                component="button"
                onClick={() => onFullView(vacancy.id)}
                sx={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "13px", fontWeight: 500, color: "#374151", border: "1px solid #d1d5db", borderRadius: "8px", padding: "6px 12px", cursor: "pointer", fontFamily: "inherit", backgroundColor: "#ffffff", "&:hover": { backgroundColor: "#f9fafb" } }}
              >
                <OpenInNewIcon sx={{ fontSize: "14px" }} />
                Full View
              </Box>
            )}
            <IconButton size="small" onClick={onClose} sx={{ color: "#9ca3af", "&:hover": { backgroundColor: "#f9fafb" } }}>
              <CloseIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* ── Actions ─────────────────────────────────────────────────── */}
      <Box sx={{ px: isMobile ? "14px" : "20px", pt: "14px", pb: "12px", borderBottom: "1px solid #f3f4f6", flexShrink: 0 }}>
        <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em", mb: "10px" }}>
          Actions
        </Typography>
        <Box sx={{ display: "flex", gap: "8px" }}>
          <ActionBtn icon={<CampaignIcon sx={{ fontSize: "18px", color: "#ffffff" }} />} label="Advertise" bg="#059669" color="#ffffff" border="none" />
          <ActionBtn icon={<PauseCircleOutlinedIcon sx={{ fontSize: "18px", color: "#ffffff" }} />} label="Suspend" bg="#F59E0B" color="#ffffff" border="none" />
          <ActionBtn icon={<ArchiveIcon sx={{ fontSize: "18px", color: "#374151" }} />} label="Archive" />
          <ActionBtn icon={<DeleteOutlineIcon sx={{ fontSize: "18px", color: "#ef4444" }} />} label="Remove" bg="#ffffff" color="#ef4444" border="1px solid #fecaca" />
        </Box>
      </Box>

      {/* ── Stats ───────────────────────────────────────────────────── */}
      <Box sx={{ mx: "20px", my: "14px", backgroundColor: "#f8fafc", border: "1px solid #f3f4f6", borderRadius: "10px", display: "flex", flexShrink: 0 }}>
        <Box sx={{ flex: 1, textAlign: "center", py: "16px" }}>
          <Typography sx={{ fontSize: "22px", fontWeight: 700, color: "#1a2332", lineHeight: 1 }}>{vacancy.total}</Typography>
          <Typography sx={{ fontSize: "12px", color: "#9ca3af", mt: "4px" }}>Total</Typography>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ borderColor: "#f3f4f6" }} />
        <Box sx={{ flex: 1, textAlign: "center", py: "16px" }}>
          <Typography sx={{ fontSize: "22px", fontWeight: 700, color: "#16a34a", lineHeight: 1 }}>{vacancy.fresh}</Typography>
          <Typography sx={{ fontSize: "12px", color: "#9ca3af", mt: "4px" }}>Fresh</Typography>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ borderColor: "#f3f4f6" }} />
        <Box sx={{ flex: 1, textAlign: "center", py: "16px" }}>
          <Typography sx={{ fontSize: "22px", fontWeight: 700, color: "#1a2332", lineHeight: 1 }}>{vacancy.interview}</Typography>
          <Typography sx={{ fontSize: "12px", color: "#9ca3af", mt: "4px" }}>Rec. Interview</Typography>
        </Box>
      </Box>

      {/* ── Scrollable detail sections ───────────────────────────────── */}
      <Box sx={{ flex: 1, overflowY: "auto", px: isMobile ? "14px" : "20px", pb: "32px" }}>

        {/* Vacancy Details */}
        <SectionHeader icon={svgIcon(VacancyDetailsSrc)} title="Vacancy Details" />
        <FieldRow label="Status" value={vacancy.status} />
        <FieldRow label="Request Title" value={vacancy.title} />
        <FieldRow label="Contract Type" value={vacancy.contractType} />
        <FieldRow label="Location" value={vacancy.location} />
        <FieldRow label="Grade" value={vacancy.grade} />
        <FieldRow label="Department" value={vacancy.department} />

        {/* Job Description */}
        <SectionHeader icon={svgIcon(JobDescriptionSrc)} title="Job Description" />
        <FieldRow label="Job Description" value={vacancy.jobDescription} clamp={3} />
        <FieldRow label="Full Job Description" value={vacancy.fullJobDescription} clamp={4} />

        {/* Employment Details */}
        <SectionHeader icon={svgIcon(EmploymentDetailsSrc, "20px")} title="Employment Details" />
        <FieldRow label="Cost Centre" value={vacancy.costCentre} />
        <FieldRow label="Reporting To" value={vacancy.reportingTo} />
        <FieldRow label="Replacement For" value={vacancy.replacementFor} />
        <FieldRow label="Hours" value={vacancy.hours} />
        <FieldRow label="Start Date" value={vacancy.startDate} />
        {vacancy.duration && <FieldRow label="Duration" value={vacancy.duration} />}

        {/* Compensation */}
        <SectionHeader icon={svgIcon(CompensationSrc)} title="Compensation" />
        {vacancy.salary && <FieldRow label="Salary" value={vacancy.salary} />}
        {vacancy.agencyRate && <FieldRow label="Agency Rate" value={vacancy.agencyRate} />}

        {/* Candidate Requirements */}
        <SectionHeader icon={svgIcon(RequirementsSrc, "18px")} title="Candidate Requirements" />
        {vacancy.personalSkills && <FieldRow label="Personal Skills" value={vacancy.personalSkills} clamp={2} />}
        {vacancy.experience && <FieldRow label="Experience" value={vacancy.experience} clamp={2} />}
        {vacancy.education && <FieldRow label="Education" value={vacancy.education} clamp={2} />}

        {/* Additional Information */}
        <SectionHeader icon={<InfoOutlinedIcon sx={{ fontSize: "15px", color: "#6b7280" }} />} title="Additional Information" />
        {vacancy.additionalInfo && <FieldRow label="Additional Info" value={vacancy.additionalInfo} clamp={2} />}
        {vacancy.closeDate && <FieldRow label="Close Date" value={vacancy.closeDate} />}
        {vacancy.permanentlyOpen !== undefined && (
          <FieldRowNode label="Permanently Open">
            <YesNoBadge value={vacancy.permanentlyOpen} />
          </FieldRowNode>
        )}

        {/* Alerts & Interview */}
        <SectionHeader icon={svgIcon(SettingAlertsSrc)} title="Alerts & Interview" />
        {vacancy.emailAlertsSent !== undefined && (
          <FieldRowNode label="Email Alerts Sent">
            <YesNoBadge value={vacancy.emailAlertsSent} />
          </FieldRowNode>
        )}
        {vacancy.disclosureScotlandCheck !== undefined && (
          <FieldRowNode label="Disclosure Scotland Check">
            <YesNoBadge value={vacancy.disclosureScotlandCheck} />
          </FieldRowNode>
        )}
        {vacancy.interviewArrangements && <FieldRow label="Interview Arrangements" value={vacancy.interviewArrangements} clamp={2} />}
        {vacancy.confirmInterviewDateBy && <FieldRow label="Confirm Interview Date By" value={vacancy.confirmInterviewDateBy} />}
        {vacancy.allowApplicationsFrom && <FieldRow label="Allow Applications From" value={vacancy.allowApplicationsFrom} />}

      </Box>
    </Drawer>
  );
};
