import React from "react";
import { Drawer, Box, Typography, IconButton, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import CampaignIcon from "@mui/icons-material/Campaign";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VacancyDetailsSrc from "../../assets/VacancyDetails.svg";
import JobDescriptionSrc from "../../assets/JobDescription.svg";
import EmploymentDetailsSrc from "../../assets/EmploymentDetails.svg";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import RoleIcon from '../../assets/sen_role.svg'

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

const FieldRow: React.FC<{ label: string; value: string; clamp?: number }> = ({
  label,
  value,
  clamp,
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "flex-start",
      py: "12px",
      borderBottom: "1px solid #f3f4f6",
    }}
  >
    <Typography
      sx={{
        width: "145px",
        flexShrink: 0,
        fontSize: "13px",
        color: "#9ca3af",
        lineHeight: 1.6,
      }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        flex: 1,
        fontSize: "14px",
        fontWeight: 600,
        color: "#1a2332",
        lineHeight: 1.6,
        ...(clamp
          ? {
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: clamp,
              WebkitBoxOrient: "vertical" as const,
            }
          : {}),
      }}
    >
      {value}
    </Typography>
  </Box>
);

const SectionHeader: React.FC<{ icon: React.ReactNode; title: string }> = ({
  icon,
  title,
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      py: "10px",
      px: "20px",
      mx: "-20px",
      backgroundColor: "#f8fafc",
      mt: "4px",
      mb: "2px",
    }}
  >
    {icon}
    <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#1a2332" }}>
      {title}
    </Typography>
  </Box>
);

const ActionBtn: React.FC<{
  icon: React.ReactNode;
  label: string;
  bg?: string;
  color?: string;
  border?: string;
}> = ({
  icon,
  label,
  bg = "#ffffff",
  color = "#374151",
  border = "1px solid #e5e7eb",
}) => (
  <Box
    component="button"
    sx={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "7px",
      padding: "14px 6px",
      borderRadius: "12px",
      cursor: "pointer",
      fontFamily: "inherit",
      backgroundColor: bg,
      color,
      border,
      "&:hover": { filter: "brightness(0.94)" },
      transition: "filter 0.12s",
    }}
  >
    {icon}
    <Typography
      sx={{
        fontSize: "12px",
        fontWeight: 600,
        color: "inherit",
        lineHeight: 1,
      }}
    >
      {label}
    </Typography>
  </Box>
);

// ─── Component ────────────────────────────────────────────────────────────────

export const VacancyQuickView: React.FC<Props> = ({
  open,
  onClose,
  vacancy,
  onFullView,
}) => {
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
      slotProps={{
        paper: {
          sx: {
            width: "441px",
            maxWidth: "95vw",
            top: 0,
            height: "100vh",
            borderRadius: 0,
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
    >
      {/* ── Header ──────────────────────────────────────────────────── */}
      <Box
        sx={{
          px: "20px",
          py: "16px",
          borderBottom: "1px solid #f3f4f6",
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
          {/* Icon box */}
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "12px",
              backgroundColor: "#1a2332",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {/* <WorkIcon sx={{ fontSize: "24px", color: "#ffffff" }} /> */}
        <img src={RoleIcon} width={'25px'} height={'25px'}/>
          </Box>

          {/* Title + meta */}
          <Box sx={{ flex: 1, minWidth: 0, pt: "2px" }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "18px",
                color: "#1a2332",
                lineHeight: 1.2,
                mb: "8px",
              }}
            >
              {vacancy.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  backgroundColor: s.bg,
                  color: s.color,
                  borderRadius: "20px",
                  px: "10px",
                  py: "3px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: s.color,
                  }}
                />
                {vacancy.status}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  color: "#9ca3af",
                  fontSize: "12px",
                }}
              >
                <LocationOnIcon sx={{ fontSize: "13px" }} />
                {vacancy.location}
              </Box>
            </Box>
          </Box>

          {/* Full View + Close */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexShrink: 0,
              pt: "2px",
            }}
          >
            <Box
              component="button"
              onClick={() => onFullView(vacancy.id)}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#374151",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                padding: "6px 12px",
                cursor: "pointer",
                fontFamily: "inherit",
                backgroundColor: "#ffffff",
                "&:hover": { backgroundColor: "#f9fafb" },
              }}
            >
              <OpenInNewIcon sx={{ fontSize: "14px" }} />
              Full View
            </Box>
            <IconButton
              size="small"
              onClick={onClose}
              sx={{
                color: "#9ca3af",
                "&:hover": { backgroundColor: "#f9fafb" },
              }}
            >
              <CloseIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* ── Actions ─────────────────────────────────────────────────── */}
      <Box
        sx={{
          px: "20px",
          pt: "14px",
          pb: "12px",
          borderBottom: "1px solid #f3f4f6",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#9ca3af",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            mb: "10px",
          }}
        >
          Actions
        </Typography>
        <Box sx={{ display: "flex", gap: "8px" }}>
          <ActionBtn
            icon={
              <CampaignIcon
                sx={{ fontSize: "18px", width: "18px", color: "#ffffff" }}
              />
            }
            label="Advertise"
            bg="#059669"
            color="#ffffff"
            border="none"
          />
          <ActionBtn
            icon={
              <PauseCircleOutlinedIcon
                sx={{ fontSize: "18px", width: "18px", color: "#ffffff" }}
              />
            }
            label="Suspend"
            bg="#F59E0B"
            color="#ffffff"
            border="none"
          />
          <ActionBtn
            icon={
              <ArchiveIcon
                sx={{ fontSize: "18px", width: "18px", color: "#374151" }}
              />
            }
            label="Archive"
          />
          <ActionBtn
            icon={
              <DeleteOutlineIcon
                sx={{ fontSize: "18px", width: "18px", color: "#ef4444" }}
              />
            }
            label="Remove"
            bg="#ffffff"
            color="#ef4444"
            border="1px solid #fecaca"
          />
        </Box>
      </Box>

      {/* ── Stats ───────────────────────────────────────────────────── */}
      <Box
        sx={{
          mx: "20px",
          my: "14px",
          backgroundColor: "#f8fafc",
          border: "1px solid #f3f4f6",
          borderRadius: "10px",
          display: "flex",
          flexShrink: 0,
        }}
      >
        <Box sx={{ flex: 1, textAlign: "center", py: "16px" }}>
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#1a2332",
              lineHeight: 1,
            }}
          >
            {vacancy.total}
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#9ca3af", mt: "4px" }}>
            Total
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#f3f4f6" }}
        />
        <Box sx={{ flex: 1, textAlign: "center", py: "16px" }}>
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#16a34a",
              lineHeight: 1,
            }}
          >
            {vacancy.fresh}
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#9ca3af", mt: "4px" }}>
            Fresh
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#f3f4f6" }}
        />
        <Box sx={{ flex: 1, textAlign: "center", py: "16px" }}>
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#1a2332",
              lineHeight: 1,
            }}
          >
            {vacancy.interview}
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#9ca3af", mt: "4px" }}>
            Rec. Interview
          </Typography>
        </Box>
      </Box>

      {/* ── Scrollable detail sections ───────────────────────────────── */}
      <Box sx={{ flex: 1, overflowY: "auto", px: "20px", pb: "32px" }}>
        {/* Vacancy Details */}
        <SectionHeader
           icon={
            <img
              src={VacancyDetailsSrc}
              style={{
                width: "17px",
                height: "17px",
                filter: "brightness(100%) invert(1)",
              }}
            />
          }
          title="Vacancy Details"
        />
        <FieldRow label="Status" value={vacancy.status} />
        <FieldRow label="Request Title" value={vacancy.title} />
        <FieldRow label="Contract Type" value={vacancy.contractType} />
        <FieldRow label="Location" value={vacancy.location} />
        <FieldRow label="Grade" value={vacancy.grade} />
        <FieldRow label="Department" value={vacancy.department} />

        {/* Job Description */}
        <SectionHeader
         icon={
          <img
            src={JobDescriptionSrc}
            style={{
              width: "17px",
              height: "17px",
              filter: "brightness(5) invert(1)",
            }}
          />
        }
          title="Job Description"
        />
        <FieldRow
          label="Job Description"
          value={vacancy.jobDescription}
          clamp={3}
        />
        <FieldRow
          label="Full Job Description"
          value={vacancy.fullJobDescription}
          clamp={4}
        />

        {/* Employment Details */}
        <SectionHeader
         icon={
          <img
            src={EmploymentDetailsSrc}
            style={{
              width: "24px",
              height: "24px",
              filter: "brightness(5) invert(1)",
            }}
          />
        }
          title="Employment Details"
        />
        <FieldRow label="Cost Centre" value={vacancy.costCentre} />
        <FieldRow label="Reporting To" value={vacancy.reportingTo} />
        <FieldRow label="Replacement For" value={vacancy.replacementFor} />
        <FieldRow label="Hours" value={vacancy.hours} />
        <FieldRow label="Start Date" value={vacancy.startDate} />
      </Box>
    </Drawer>
  );
};
