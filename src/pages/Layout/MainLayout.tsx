import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box, Collapse, Drawer, Stack, Typography } from "@mui/material";
import DashboardIconSrc from "../../assets/homedashboard.svg";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ListDashboardIconSrc from "../../assets/listdashboard.svg";
import BoltIcon from "../../assets/actions.svg";
import MapIcon from "../../assets/navigation.svg";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useStyles } from "./MainLayout.style";
import { TopBar } from "./TopBar";

export const MainLayout: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [actionsOpen, setActionsOpen] = useState(true);
  const [navOpen, setNavOpen] = useState(true);

  const isActive = (path: string) => location.pathname.startsWith(path);
  const isVacancy = isActive("/vacancy");
  const isApplication = isActive("/application");

  const DashboardIcon = () => <img src={DashboardIconSrc} alt="dashboard" />;

  const ListDashboardIcon = () => (
    <img src={ListDashboardIconSrc} alt="dashboard" />
  );
  // ── Contextual action items per route ────────────────────────────
  const actionItems =
    isVacancy || isApplication
      ? [
          {
            label: "Edit Candidate",
            icon: <EditIcon className={classes.navIcon} />,
          },
          {
            label: "Superuser Override",
            icon: <BookmarkIcon className={classes.navIcon} />,
          },
          {
            label: "Delete Application",
            icon: <DeleteIcon className={classes.navIcon} />,
          },
          {
            label: "Email Candidate CV",
            icon: <EmailIcon className={classes.navIcon} />,
          },
          {
            label: "Add Candidate for Vacancy",
            icon: <AddIcon className={classes.navIcon} />,
          },
          {
            label: "Add Journal Entry",
            icon: <AddIcon className={classes.navIcon} />,
          },
        ]
      : [
          {
            label: "Add Dashboard",
            icon: <AddIcon className={classes.navIcon} />,
          },
          {
            label: "Edit Design",
            icon: <EditIcon className={classes.navIcon} />,
          },
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
          icon: WorkIcon,
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
      <TopBar />

      <Box className={classes.body}>
        <Drawer
          variant="permanent"
          className={classes.drawer}
          aria-label="Main navigation"
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
