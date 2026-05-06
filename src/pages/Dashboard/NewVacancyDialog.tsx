import React, { useState, useEffect } from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  TextField,
  Select,
  MenuItem,
  Switch,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Grid2 as Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import VacancyDetailsSrc from "../../assets/VacancyDetails.svg";
import JobDescriptionSrc from "../../assets/JobDescription.svg";
import EmploymentDetailsSrc from "../../assets/EmploymentDetails.svg";
import CompensationSrc from "../../assets/Compensation.svg";
import RequirementsSrc from "../../assets/Requirements.svg";
import SettingAlertsSrc from "../../assets/settingalerts.svg";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LinkIcon from "../../assets/doc_link.svg";
import UploadIcon from "../../assets/upload.svg";
import OwnershipIcon from "../../assets/ownership.svg";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  department: string;
}

// ─── Nav config ───────────────────────────────────────────────────────────────

const navItems: Array<{
  src?: string;
  Icon?: React.ElementType;
  label: string;
}> = [
  { src: VacancyDetailsSrc, label: "Vacancy Details" },
  { src: JobDescriptionSrc, label: "Job Description" },
  { src: EmploymentDetailsSrc, label: "Employment Details" },
  { src: CompensationSrc, label: "Compensation" },
  { src: RequirementsSrc, label: "Requirements" },
  { src: SettingAlertsSrc, label: "Settings & Alerts" },
];

// ─── Small helpers ────────────────────────────────────────────────────────────

const FieldLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography
    component="label"
    sx={{
      display: "block",
      fontSize: "12px",
      fontWeight: 600,
      color: "#374151",
      mb: "5px",
    }}
  >
    {children}
  </Typography>
);

const SectionHeader: React.FC<{
  icon: React.ReactNode;
  title: string;
  errorText?: string;
}> = ({ icon, title, errorText }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      mb: "16px",
      pb: "12px",
      borderBottom: "1px solid #f3f4f6",
    }}
  >
    <Box
      sx={{
        width: "28px",
        height: "28px",
        borderRadius: "6px",
        backgroundColor: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Typography sx={{ fontWeight: 700, fontSize: "14px", color: "#1a2332" }}>
      {title}
    </Typography>
    {errorText && (
      <Typography sx={{ fontSize: "12px", color: "#ef4444" }}>
        ({errorText})
      </Typography>
    )}
  </Box>
);

const UploadZone: React.FC<{ label: string; subtitle: string }> = ({
  label,
  subtitle,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <Box>
      <Typography
        sx={{ fontSize: "12px", fontWeight: 600, color: "#374151", mb: "8px" }}
      >
        {label}
      </Typography>
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <Box
        onClick={handleClick}
        sx={{
          border: `1.5px dashed ${fileName ? "#16a34a" : "#d1d5db"}`,
          borderRadius: "8px",
          padding: "16px 20px",
          backgroundColor: "#fafafa",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          cursor: "pointer",
          "&:hover": { backgroundColor: "#f1f5f9", borderColor: "#9ca3af" },
          transition: "all 0.15s",
        }}
      >
        <img src={UploadIcon} width={"20px"} height={"20px"} />
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#374151",
              lineHeight: 1.3,
            }}
          >
            {fileName ?? "Click to attach file"}
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#9ca3af", mt: "2px" }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

export const NewVacancyDialog: React.FC<Props> = ({
  open,
  onClose,
  onSuccess,
  department,
}) => {
  const [step, setStep] = useState(1);
  const [activeNav, setActiveNav] = useState(0);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setActiveNav(0);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      aria-labelledby="new-vacancy-title"
      slotProps={{
        paper: {
          sx: {
            borderRadius: "16px",
            width: step === 1 ? "760px" : "680px",
            maxWidth: "95vw",
            height: step === 1 ? "88vh" : "auto",
            maxHeight: "820px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            m: "16px",
          },
        },
      }}
    >
      {/* ── Header ────────────────────────────────────────────────── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          px: "20px",
          py: "14px",
          borderBottom: "1px solid #e5e7eb",
          flexShrink: 0,
        }}
      >
        {step === 1 && (
          <IconButton size="small" sx={{ color: "#6b7280", flexShrink: 0 }}>
            <ArrowBackIcon sx={{ fontSize: "18px" }} />
          </IconButton>
        )}

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            id="new-vacancy-title"
            sx={{
              fontWeight: 700,
              fontSize: "16px",
              color: "#1a2332",
              lineHeight: 1.2,
            }}
          >
            New Vacancy — Step {step} of 2
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              mt: "3px",
            }}
          >
            <Typography sx={{ fontSize: "12px", color: "#6b7280" }}>
              Department:
            </Typography>
            <Typography
              sx={{ fontSize: "12px", fontWeight: 600, color: "#1a2332" }}
            >
              {department}
            </Typography>
            {step === 1 && (
              <Box
                component="button"
                sx={{
                  fontSize: "12px",
                  color: "#0891b2",
                  fontWeight: 500,
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: "0 0 0 4px",
                  fontFamily: "inherit",
                  lineHeight: 1,
                }}
              >
                Change
              </Box>
            )}
          </Box>
        </Box>

        {/* Step indicator */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flexShrink: 0,
          }}
        >
          {/* Step 1 circle */}
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              backgroundColor: step === 2 ? "#22c55e" : "#1a2332",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {step === 2 ? (
              <CheckIcon sx={{ fontSize: "16px", color: "#ffffff" }} />
            ) : (
              <Typography
                sx={{ color: "#ffffff", fontSize: "12px", fontWeight: 700 }}
              >
                1
              </Typography>
            )}
          </Box>
          <Box
            sx={{ width: "28px", height: "1.5px", backgroundColor: "#d1d5db" }}
          />
          {/* Step 2 circle */}
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              backgroundColor: step === 2 ? "#1a2332" : "transparent",
              border: step === 2 ? "none" : "1.5px solid #d1d5db",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: step === 2 ? "#ffffff" : "#9ca3af",
                fontSize: "12px",
                fontWeight: step === 2 ? 700 : 400,
              }}
            >
              2
            </Typography>
          </Box>
        </Box>

        <IconButton
          size="small"
          onClick={onClose}
          sx={{ color: "#9ca3af", flexShrink: 0 }}
        >
          <CloseIcon sx={{ fontSize: "18px" }} />
        </IconButton>
      </Box>

      {/* ── Body: Step 1 ──────────────────────────────────────────── */}
      {step === 1 && (
        <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Left nav */}
          <Box
            sx={{
              width: "210px",
              backgroundColor: "#ffffff",
              flexShrink: 0,
              py: "12px",
              px: "10px",
              borderRight: "1px solid #f3f4f6",
            }}
          >
            {navItems.map(({ src, label }, i) => {
              const isActive = i === activeNav;
              return (
                <Box
                  key={label}
                  component="button"
                  onClick={() => setActiveNav(i)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    padding: "11px 14px",
                    mb: "4px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    border: "none",
                    textAlign: "left",
                    borderRadius: "8px",
                    backgroundColor: isActive ? "#1a2332" : "transparent",
                    color: isActive ? "#ffffff" : "#6b7280",
                    "&:hover": {
                      backgroundColor: isActive ? "#1a2332" : "#f1f5f9",
                      color: isActive ? "#ffffff" : "#374151",
                    },
                    transition: "background-color 0.12s",
                  }}
                >
                  {src && (
                    <img
                      src={src}
                      alt=""
                      style={{
                        width: "16px",
                        height: "auto",
                        flexShrink: 0,
                        filter: isActive
                          ? "brightness(0) invert(1)"
                          : "brightness(0) opacity(0.45)",
                      }}
                    />
                  )}
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: isActive ? 600 : 500,
                      color: "inherit",
                      lineHeight: 1.3,
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* Right scrollable content */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: "24px",
              backgroundColor: "#ffffff",
            }}
          >
            {/* ── Vacancy Details ───────────────────────────────────── */}
            <SectionHeader
              icon={
                <img
                  src={VacancyDetailsSrc}
                  style={{
                    width: "14px",
                    height: "14px",
                    filter: "brightness(100%) invert(1)",
                  }}
                />
              }
              title="Vacancy Details"
              // errorText="Required fields were not filled in"
            />
            <Grid container spacing={2} sx={{ mb: "28px" }}>
              <Grid size={12}>
                <FieldLabel>Request Title</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. Senior Planning Officer"
                />
              </Grid>
              <Grid size={6}>
                <FieldLabel>Contract Type</FieldLabel>
                <Select
                  fullWidth
                  size="small"
                  value=""
                  displayEmpty
                  onChange={() => {}}
                >
                  <MenuItem value="">
                    <em style={{ color: "#9ca3af", fontStyle: "normal" }}>
                      Select...
                    </em>
                  </MenuItem>
                  <MenuItem value="permanent">Permanent</MenuItem>
                  <MenuItem value="fixed-term">Fixed Term</MenuItem>
                  <MenuItem value="temporary">Temporary</MenuItem>
                </Select>
              </Grid>
              <Grid size={6}>
                <FieldLabel>
                  Location <span style={{ color: "#ef4444" }}>*</span>
                </FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. Inverness"
                  // error
                  // helperText={
                  //   <Box component="span" sx={{ display: "flex", alignItems: "center", gap: "3px", color: "#ef4444" }}>
                  //     <ErrorOutlineIcon sx={{ fontSize: "12px" }} /> Location is required
                  //   </Box>
                  // }
                />
              </Grid>
              <Grid size={6}>
                <FieldLabel>Grade</FieldLabel>
                <Select
                  fullWidth
                  size="small"
                  value=""
                  displayEmpty
                  onChange={() => {}}
                >
                  <MenuItem value="">
                    <em style={{ color: "#9ca3af", fontStyle: "normal" }}>
                      Select...
                    </em>
                  </MenuItem>
                  <MenuItem value="g7">G7 — Senior Specialist</MenuItem>
                  <MenuItem value="g6">G6 — Principal</MenuItem>
                  <MenuItem value="g5">G5 — Manager</MenuItem>
                </Select>
              </Grid>
              <Grid size={6}>
                <FieldLabel>Department</FieldLabel>
                <Box sx={{ display: "flex", gap: "8px" }}>
                  <TextField
                    value={department}
                    onChange={() => {}}
                    size="small"
                    sx={{ flex: 1 }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      flexShrink: 0,
                      borderColor: "#d1d5db",
                      color: "#374151",
                      fontSize: "12px",
                      fontWeight: 500,
                      px: "12px",
                      "&:hover": {
                        borderColor: "#9ca3af",
                        backgroundColor: "#f9fafb",
                      },
                    }}
                  >
                    Change
                  </Button>
                </Box>
              </Grid>
            </Grid>

            {/* ── Job Description ───────────────────────────────────── */}
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
            <Stack spacing={2} sx={{ mb: "28px" }}>
              <Box>
                <FieldLabel>Job Description</FieldLabel>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  size="small"
                  placeholder="Brief summary of the role..."
                />
              </Box>
              <Box>
                <FieldLabel>Full Job Description</FieldLabel>
                <TextField
                  fullWidth
                  multiline
                  minRows={5}
                  size="small"
                  placeholder="Full detailed job description including responsibilities, key duties, and expectations..."
                />
              </Box>
            </Stack>

            {/* ── Employment Details ────────────────────────────────── */}
            <SectionHeader
              icon={
                <img
                  src={EmploymentDetailsSrc}
                  style={{
                    width: "20px",
                    height: "20px",
                    filter: "brightness(5) invert(1)",
                  }}
                />
              }
              title="Employment Details"
            />
            <Grid container spacing={2} sx={{ mb: "28px" }}>
              <Grid size={6}>
                <FieldLabel>Cost Centre</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. CC-PLAN-042"
                />
              </Grid>
              <Grid size={6}>
                <FieldLabel>Reporting To</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. Head of Planning"
                />
              </Grid>
              <Grid size={6}>
                <FieldLabel>Replacement For</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. New Headcount"
                />
              </Grid>
              <Grid size={6}>
                <FieldLabel>Start Date</FieldLabel>
                <TextField fullWidth size="small" type="date" />
              </Grid>
            </Grid>

            {/* ── Compensation ──────────────────────────────────────── */}
            <SectionHeader
              icon={
                <img
                  src={CompensationSrc}
                  style={{
                    width: "14px",
                    height: "14px",
                    filter: "brightness(5) invert(1)",
                  }}
                />
              }
              title="Compensation"
            />
            <Grid container spacing={2} sx={{ mb: "28px" }}>
              <Grid size={6}>
                <FieldLabel>Salary</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. £30,000 – £38,000 per annum"
                />
              </Grid>
              <Grid size={6}>
                <FieldLabel>Agency Rate</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. £250 per day"
                />
              </Grid>
            </Grid>

            {/* ── Candidate Requirements ────────────────────────────── */}
            <SectionHeader
              icon={
                <img
                  src={RequirementsSrc}
                  style={{
                    width: "20px",
                    height: "20px",
                    filter: "brightness(5) invert(1)",
                  }}
                />
              }
              title="Candidate Requirements"
            />
            <Stack spacing={2} sx={{ mb: "28px" }}>
              <Box>
                <FieldLabel>Personal Skills</FieldLabel>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  size="small"
                  placeholder="Key personal attributes and soft skills required..."
                />
              </Box>
              <Box>
                <FieldLabel>Experience</FieldLabel>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  size="small"
                  placeholder="Required and desirable experience..."
                />
              </Box>
              <Box>
                <FieldLabel>Education</FieldLabel>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  size="small"
                  placeholder="Minimum education requirements and desirable qualifications..."
                />
              </Box>
              <Box>
                <FieldLabel>Additional Information</FieldLabel>
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  size="small"
                  placeholder="Any other relevant information..."
                />
              </Box>
              <Box>
                <FieldLabel>Close Date</FieldLabel>
                <TextField size="small" type="date" sx={{ width: "200px" }} />
              </Box>
              <Box
                sx={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  p: "14px 16px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <Checkbox
                  size="small"
                  sx={{
                    p: 0,
                    mt: "1px",
                    color: "#d1d5db",
                    "&.Mui-checked": { color: "#1a2332" },
                  }}
                />
                <Box>
                  <Typography
                    sx={{ fontSize: "13px", fontWeight: 600, color: "#1a2332" }}
                  >
                    Is this vacancy permanently open?
                  </Typography>
                  <Typography
                    sx={{ fontSize: "11px", color: "#9ca3af", mt: "2px" }}
                  >
                    If you tick yes the job will remain live until it is
                    manually suspended, archived or removed.
                  </Typography>
                </Box>
              </Box>
            </Stack>

            {/* ── Settings & Alerts ─────────────────────────────────── */}
            <SectionHeader
              icon={
                <img
                  src={SettingAlertsSrc}
                  style={{
                    width: "14px",
                    height: "14px",
                    filter: "brightness(5) invert(1)",
                  }}
                />
              }
              title="Settings & Alerts"
            />
            <Stack spacing={0} sx={{ mb: "28px" }}>
              {/* Email Alerts */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  py: "12px",
                  px: "12px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  mt: "8px",
                  mb: "8px",
                  backgroundColor: "#F9FAFB80",
                }}
              >
                <Box>
                  <Typography
                    sx={{ fontSize: "13px", fontWeight: 600, color: "#1a2332" }}
                  >
                    Email Alerts Sent
                  </Typography>
                  <Typography
                    sx={{ fontSize: "11px", color: "#9ca3af", mt: "2px" }}
                  >
                    Notify relevant contacts when applications are received
                  </Typography>
                </Box>
                <Switch size="small" sx={{ flexShrink: 0 }} />
              </Box>

              {/* Disclosure Scotland — with error highlight */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  py: "12px",
                  px: "12px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  mt: "8px",
                  mb: "8px",
                  backgroundColor: "#F9FAFB80",
                }}
              >
                <Box>
                  <Typography
                    sx={{ fontSize: "13px", fontWeight: 600, color: "#1a2332" }}
                  >
                    Post requires a Disclosure Scotland check{" "}
                    <span style={{ color: "#ef4444" }}>*</span>
                  </Typography>
                  <Typography
                    sx={{ fontSize: "11px", color: "#9ca3af", mt: "2px" }}
                  >
                    To be done on successful candidate
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      mt: "4px",
                    }}
                  >
                    {/* <ErrorOutlineIcon
                      sx={{ fontSize: "12px", color: "#ef4444" }}
                    />
                    <Typography sx={{ fontSize: "11px", color: "#ef4444" }}>
                      Please confirm the Disclosure Scotland requirement
                    </Typography> */}
                  </Box>
                </Box>
                <Switch size="small" sx={{ flexShrink: 0 }} />
              </Box>

              {/* Interview Arrangements */}
              <Box sx={{ py: "12px" }}>
                <FieldLabel>Interview Arrangements</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. Interviews will be held on 31st October 2023"
                />
              </Box>

              {/* Confirm Interview Date By */}
              <Box sx={{ py: "12px" }}>
                <FieldLabel>Confirm Interview Date By</FieldLabel>
                <TextField size="small" type="date" sx={{ width: "200px" }} />
              </Box>

              {/* Allow Applications From */}
              <Box sx={{ py: "12px" }}>
                <FieldLabel>Allow Applications From</FieldLabel>
                <Select
                  fullWidth
                  size="small"
                  value=""
                  displayEmpty
                  onChange={() => {}}
                >
                  <MenuItem value="">
                    <em style={{ color: "#9ca3af", fontStyle: "normal" }}>
                      Select platform...
                    </em>
                  </MenuItem>
                  <MenuItem value="indeed">Indeed</MenuItem>
                  <MenuItem value="linkedin">LinkedIn</MenuItem>
                  <MenuItem value="direct">Direct</MenuItem>
                </Select>
              </Box>
            </Stack>
          </Box>
        </Box>
      )}

      {/* ── Body: Step 2 ──────────────────────────────────────────── */}
      {step === 2 && (
        <Box sx={{ overflowY: "auto", p: "28px", backgroundColor: "#ffffff" }}>
          {/* Documents */}
          <SectionHeader
            icon={
              <img src={LinkIcon} style={{ width: "15px", height: "15px" }} />
            }
            title="Documents"
          />
          <Stack spacing={2} sx={{ mb: "32px" }}>
            <UploadZone
              label="Job Description"
              subtitle="Upload the job description document (PDF, DOC, DOCX)"
            />
            <UploadZone
              label="Initial Sifting Document"
              subtitle="Upload the initial sifting / shortlisting criteria document"
            />
            <UploadZone
              label="Interview Sifting Document"
              subtitle="Upload the interview scoring / sifting criteria document"
            />
          </Stack>

          {/* Ownership */}
          <SectionHeader
            icon={<img src={OwnershipIcon} width={"17px"} height={"17px"} />}
            title="Ownership"
          />
          <Grid container spacing={2}>
            <Grid size={6}>
              <FieldLabel>Vacancy Owner</FieldLabel>
              <Select
                fullWidth
                size="small"
                value=""
                displayEmpty
                onChange={() => {}}
              >
                <MenuItem value="">
                  <em style={{ color: "#9ca3af", fontStyle: "normal" }}>
                    Select owner...
                  </em>
                </MenuItem>
                <MenuItem value="admin">Admin User</MenuItem>
                <MenuItem value="manager">HR Manager</MenuItem>
              </Select>
            </Grid>
            <Grid size={6}>
              <FieldLabel>
                Recruitment Team Owner{" "}
                <span style={{ color: "#F87171" }}>*</span>
              </FieldLabel>
              <Select
                fullWidth
                size="small"
                value=""
                displayEmpty
                onChange={() => {}}
              >
                <MenuItem value="">
                  <em style={{ color: "#9ca3af", fontStyle: "normal" }}>
                    Select team owner...
                  </em>
                </MenuItem>
                <MenuItem value="team-a">Recruitment Team A</MenuItem>
                <MenuItem value="team-b">Recruitment Team B</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* ── Footer ────────────────────────────────────────────────── */}
      <Box
        sx={{
          display: "flex",
          justifyContent: step === 2 ? "space-between" : "flex-end",
          alignItems: "center",
          gap: "12px",
          px: "24px",
          py: "16px",
          borderTop: "1px solid #e5e7eb",
          flexShrink: 0,
          backgroundColor: "#ffffff",
        }}
      >
        {step === 1 ? (
          <>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#d1d5db",
                color: "#374151",
                fontSize: "13px",
                fontWeight: 600,
                px: "20px",
                borderRadius: "8px",
                "&:hover": {
                  borderColor: "#9ca3af",
                  backgroundColor: "#f9fafb",
                },
              }}
            >
              Save as Draft
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={() => setStep(2)}
              sx={{
                backgroundColor: "#1a2332",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 600,
                px: "24px",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#0f172a" },
              }}
            >
              Next (Document & Ownership)
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              onClick={() => setStep(1)}
              sx={{
                borderColor: "#d1d5db",
                color: "#374151",
                fontSize: "13px",
                fontWeight: 600,
                px: "24px",
                borderRadius: "8px",
                "&:hover": {
                  borderColor: "#9ca3af",
                  backgroundColor: "#f9fafb",
                },
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              disableElevation
              endIcon={<CheckIcon sx={{ fontSize: "16px" }} />}
              onClick={onSuccess}
              sx={{
                backgroundColor: "#1a2332",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 600,
                px: "24px",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#0f172a" },
              }}
            >
              Create Vacancy
            </Button>
          </>
        )}
      </Box>
    </Dialog>
  );
};
