import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import StyleIcon from '@mui/icons-material/Style';
import {useLocation, useNavigate} from 'react-router-dom';
import {logoutTC} from '../../redux/reducers/login-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import profile from '../../assets/img/profile.svg'
import logout from '../../assets/img/logout.svg'
import styles from './Navbar.module.css'
import defaultUser from '../../assets/img/user.svg'

export const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const userName = useAppSelector(state => state.profile.name)
    const userAvatar = useAppSelector(state => state.profile.avatar)
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const location = useLocation()

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const profileHandler = () => {
        navigate('/profile')
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <AppBar position="static" className={styles.wrapper}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <StyleIcon sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'flex'},
                            fontFamily: 'monospace',
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LEARNING CARDS
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}/>
                    {isLoggedIn &&
                        <>
                            <div className={styles.userName}>{userName}</div>
                            <Box sx={{flexGrow: 0}}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                        <Avatar alt={'avatar'}
                                                src={userAvatar || defaultUser}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{mt: '45px'}}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {location.pathname !== '/profile' &&
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center"
                                                        onClick={profileHandler}
                                                        className={styles.menu}
                                            >
                                                <img src={profile}
                                                     alt={'profile'}
                                                     className={styles.icon}
                                                />
                                                <span>Profile</span></Typography>
                                        </MenuItem>}
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center"
                                                    onClick={logoutHandler}
                                                    className={styles.menu}
                                        >
                                            <img src={logout}
                                                 alt={'logout'}
                                                 className={styles.icon}
                                            />
                                            <span>Logout</span></Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};
