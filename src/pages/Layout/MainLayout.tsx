import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box, Collapse, Drawer, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import DashboardIconSrc from "../../assets/homedashboard.svg";
import ListDashboardIconSrc from "../../assets/listdashboard.svg";
import BoltIcon from "../../assets/actions.svg";
import MapIcon from "../../assets/navigation.svg";
import EditCandidateSrc from "../../assets/editcandidate.svg";
import AddCandidateSrc from "../../assets/addcandidate.svg";
import DeleteAppSrc from "../../assets/deleteapp.svg";
import EmailCvSrc from "../../assets/emailcv.svg";
import AddJournalSrc from "../../assets/addjournal.svg";
import ViewVacancySrc from "../../assets/viewvacancy.svg";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useStyles } from "./MainLayout.style";
import { TopBar } from "./TopBar";

export const MainLayout: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(true);
  const [navOpen, setNavOpen] = useState(true);

  const isActive = (path: string) => location.pathname.startsWith(path);
  const isVacancy = isActive("/vacancy");
  const isApplication = isActive("/application");

  const DashboardIcon = () => <img src={DashboardIconSrc} alt="dashboard" />;

  const ListDashboardIcon = () => (
    <img src={ListDashboardIconSrc} alt="dashboard" />
  );

  const ViewVacancyIcon = (_props: { className?: string }) => (
    <img src={ViewVacancySrc} alt="" style={{ width: '14px', height: '14px', flexShrink: 0 }} />
  );
  // ── Contextual action items per route ────────────────────────────
  const svgIcon = (src: string) => (
    <img src={src} alt="" style={{ height: '14px', width: 'auto', flexShrink: 0 }} />
  );

  const actionItems =
    isVacancy || isApplication
      ? [
          { label: "Edit Candidate",           icon: svgIcon(EditCandidateSrc) },
          { label: "Superuser Override",        icon: <BookmarkIcon className={classes.navIcon} /> },
          { label: "Delete Application",        icon: svgIcon(DeleteAppSrc) },
          { label: "Email Candidate CV",        icon: svgIcon(EmailCvSrc) },
          { label: "Add Candidate for Vacancy", icon: svgIcon(AddCandidateSrc) },
          { label: "Add Journal Entry",         icon: svgIcon(AddJournalSrc) },
        ]
      : [
          { label: "Add Dashboard", icon: <AddIcon className={classes.navIcon} /> },
          { label: "Edit Design",   icon: <EditIcon className={classes.navIcon} /> },
        ];

  // ── Contextual nav items per route ───────────────────────────────
  const navItems = isVacancy
    ? [
        {
          label: "Home Dashboard",
          path: "/dashboard",
          icon: DashboardIcon,
          active: false,
        },
        {
          label: "View Vacancy",
          path: "/vacancy/1",
          icon: ViewVacancyIcon,
          active: true,
        },
      ]
    : isApplication
      ? [
          {
            label: "Home Dashboard",
            path: "/dashboard",
            icon: DashboardIcon,
            active: false,
          },
          {
            label: "Filter Vacancy",
            path: "/dashboard",
            icon: WorkIcon,
            active: false,
          },
        ]
      : [
          {
            label: "Home Dashboard",
            path: "/dashboard",
            icon: DashboardIcon,
            active: isActive("/dashboard"),
          },
          {
            label: "List Dashboard",
            path: "/dashboard",
            icon: ListDashboardIcon,
            active: false,
          },
        ];

  const sidebar = (
    <Box className={classes.drawerContent}>
      <Box component="nav" className={classes.nav}>
        {/* ── Actions section ──────────────────────────────────── */}
        <Box
          className={classes.sectionBtn}
          onClick={() => setActionsOpen((v) => !v)}
          role="button"
          tabIndex={0}
          aria-expanded={actionsOpen}
          onKeyDown={(e) => e.key === "Enter" && setActionsOpen((v) => !v)}
        >
          <Box className={classes.sectionBtnLeft}>
            <Box
              component="img"
              src={BoltIcon}
              className={classes.sectionIcon}
              alt="Actions"
            />
            <Typography className={classes.sectionLabel}>Actions</Typography>
          </Box>
          {actionsOpen ? (
            <ExpandLessIcon className={classes.sectionChevron} />
          ) : (
            <ExpandMoreIcon className={classes.sectionChevron} />
          )}
        </Box>

        <Collapse in={actionsOpen}>
          <Box className={classes.subItems}>
            {actionItems.map((item) => (
              <Box
                key={item.label}
                className={classes.navItem}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate("/dashboard")}
              >
                {item.icon}
                <Typography className={classes.navText}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Collapse>

        {/* ── Navigation section ───────────────────────────────── */}
        <Box
          className={classes.sectionBtn}
          onClick={() => setNavOpen((v) => !v)}
          role="button"
          tabIndex={0}
          aria-expanded={navOpen}
          onKeyDown={(e) => e.key === "Enter" && setNavOpen((v) => !v)}
          sx={{ mt: "4px" }}
        >
          <Box className={classes.sectionBtnLeft}>
            <Box
              component="img"
              src={MapIcon}
              className={classes.sectionIcon}
              alt="Actions"
            />
            <Typography className={classes.sectionLabel}>Navigation</Typography>
          </Box>
          {navOpen ? (
            <ExpandLessIcon className={classes.sectionChevron} />
          ) : (
            <ExpandMoreIcon className={classes.sectionChevron} />
          )}
        </Box>

        <Collapse in={navOpen}>
          <Box className={classes.subItems}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Box
                  key={item.label}
                  className={`${classes.navItem} ${item.active ? classes.navItemActive : ""}`}
                  role="button"
                  tabIndex={0}
                  aria-current={item.active ? "page" : undefined}
                  onClick={() => navigate(item.path)}
                  onKeyDown={(e) => e.key === "Enter" && navigate(item.path)}
                >
                  <Icon
                    className={
                      item.active ? classes.navIconActive : classes.navIcon
                    }
                  />
                  <Typography
                    className={
                      item.active ? classes.navTextActive : classes.navText
                    }
                  >
                    {item.label}
                  </Typography>
                  {item.active && (
                    <Box className={classes.navActiveDot} aria-hidden="true" />
                  )}
                </Box>
              );
            })}
          </Box>
        </Collapse>

        <Box className={classes.spacer} />
      </Box>

      {/* ── User footer ──────────────────────────────────────────── */}
      <Box className={classes.userSection}>
        <Stack
          direction="row"
          alignItems="center"
          gap="12px"
          className={classes.userRow}
        >
          <Box className={classes.userAvatarBox} aria-hidden="true">
            <PersonIcon className={classes.userAvatarIcon} />
          </Box>
          <Box>
            <Typography className={classes.userName}>Admin User</Typography>
            <Typography className={classes.userEmail}>
              admin@ats-ng.eu
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box className={classes.root}>
      <TopBar onMenuToggle={() => setMobileOpen((v) => !v)} />

      <Box className={classes.body}>
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          className={classes.drawer}
          aria-label="Main navigation"
          ModalProps={{ keepMounted: true }}
        >
          {sidebar}
        </Drawer>

        <Box className={classes.mainContent} component="main">
          <Box id="main-content" className={classes.pageContent}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
