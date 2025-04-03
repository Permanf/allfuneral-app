import { useState } from 'react';
import {
    IconBriefcase,
    IconHome2,
    IconLogout,
    IconSearch,
    IconSettings,
    IconUsers,
} from '@tabler/icons-react';
import { Divider, Stack, Title, Tooltip, UnstyledButton } from '@mantine/core';
// import { MantineLogo } from '@mantinex/mantine-logo';
import TreeLogo from '../../assets/tree-logo.svg';
import Contractor from '../../assets/contractor.svg';
import classes from './sidebar.module.css';

const mainLinksMockdata = [
  { icon: IconBriefcase, label: 'Organizations' },
  { icon: IconSearch, label: 'Search' },
];

const linksMockdata = [
  { icon: IconBriefcase, type:'icon', label: 'Organizations' },
  { icon: Contractor, type: 'image', label: 'Contractors' },
  { icon: IconUsers, type:"icon", label: 'Clients' },
];

interface NavbarLinkProps {
    icon: typeof IconHome2;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    return (
      <Tooltip 
      label={label} 
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}>
        <UnstyledButton 
            onClick={onClick} 
            className={classes.mainLink} 
            data-active={active || undefined}>
            <Icon size={22} stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    );
}

export function Sidebar() {
  const [active, setActive] = useState('Organizations');
  const [activeLink, setActiveLink] = useState('Organizations');

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => setActive(link.label)}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <link.icon size={22} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  const links = linksMockdata.map((link) => (
    <a
      className={`${classes.link} border border-gray-300`}
      data-active={activeLink === link.label || undefined}
      href="#"
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(link.label);
      }}
      key={link.label}
    >
        <div className='flex items-center gap-2'>
            {link.type === 'image' ? (
                <img src={link.icon as string} alt={link.label} style={{ filter: activeLink === link.label ? "brightness(1)" : "brightness(0.3)" }}/>
            ) : (
                <link.icon size={20} stroke={1.5} />
            )}
            {link.label}
        </div>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.twoRows}>
            <div className={classes.aside}>
                <div className={classes.logo}>
                    <img src={TreeLogo} alt="logo" className={'w-10'} />
                </div>
                <div className='space-y-[20px] mt-[20px]'>
                    {mainLinks}
                </div>
            </div>
            <Divider my="md" />
            <Stack justify="center" gap={20} mb={17}>
                <NavbarLink icon={IconSettings} label="Settings" />
                <NavbarLink icon={IconLogout} label="Logout" />
            </Stack> 
        </div>
        <div className={classes.main}>
          <div>
          <Title order={4} className={classes.title}>
            Oak Tree Cemetery
          </Title>
          <span className={classes.subTitle}>Process Manager</span>
          <div className={classes.divider}>
            <Divider my="md" />
          </div>
          <div className='space-y-[12px]'>
            {links}
          </div>
          </div>
          <span className={`${classes.subTitle} text-gray-500`}>All Funeral Services © 2015-2025</span>
        </div>
      </div>
      
    </nav>
  );
}