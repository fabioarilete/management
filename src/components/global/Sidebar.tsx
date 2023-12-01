import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { tokens } from '../../theme';
import madruga from '../../assets/madruga.png';
import logo from '../../assets/logosf.png';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';

type ItemTypes = {
  title: string;
  to: string;
  icon: any;
  selected: string;
  setSelected(title: string): void;
};

const Item = ({ title, to, icon, selected, setSelected }: ItemTypes) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

function SideBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');
  return (
    <Box
      sx={{
        '& .ps-sidebar-container': {
          background: `${colors.primary[400]} !important`,
          height: '100vh',
        },
        '& .ps-menu-button': {
          background: 'transparent !important',
        },
        '& .ps-menuitem-root': {
          padding: '5px 0px 5px 0px',
        },
        '& .ps-menu-button:hover': {
          color: '#868dfb !important',
        },
        '& .ps-menu-button .ps-active': {
          color: '#6870fa !important',
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu>
          {/* logo e menu Icon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '15px 10px 10px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-around" alignItems="center" ml="15px">
                <img src={logo} alt="Logo" width="160px" />

                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={madruga}
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: '10px 0 0 0' }}>
                  Sr.Madruga
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Director
                </Typography>
              </Box>
            </Box>
          )}

          {/* Menu Items */}

          <Box>
            <Item title="Home" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<DashboardOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Custos"
              to="/costs"
              icon={<DatasetOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Materiais"
              to="/materials"
              icon={<CategoryOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Operações"
              to="/operations"
              icon={<EngineeringOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Mark Ups"
              to="/markUps"
              icon={<CalculateOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Informações"
              to="/informations"
              icon={<HelpOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Relatórios"
              to="/reports"
              icon={<DescriptionOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
}

export default SideBar;
