"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { successMsg } from "../toaster/msg/toaster";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Logout"];

export default function Navbar() {
    const router = useRouter();
    const pathName = usePathname();
    const { status, data: session } = useSession();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };



    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // Redirect unauthenticated users
    React.useEffect(() => {
        if (status === "unauthenticated" && pathName !== "/auth/signin") {
            router.push("/auth/signin");
        }
    }, [status, pathName, router]);

    // Render empty component if the user is already on the signin page
    if (status === "unauthenticated" && pathName === "/auth/signin") {
        return null;
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Universal Booking
                    </Typography>

                    {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> */}

                    <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Universal
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {/* {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page}
                            </Button>
                        ))} */}
                    </Box>

                    {status === "authenticated" ? (
                        <Box
                            sx={{
                                display: "flex", // Enable Flexbox layout
                                alignItems: "center", // Align items vertically in the center
                                gap: 1, // Add spacing between child elements
                                flexGrow: 0, // Ensure it does not take up unnecessary space
                            }}
                        >
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {session.user.name}
                            </Typography>
                            <Tooltip title="Open settings">
                                <Avatar
                                    onClick={handleOpenUserMenu}
                                    alt="User"
                                    src={session?.user?.image || "/static/images/avatar/2.jpg"}
                                />
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={
                                            setting === "Logout"
                                                ? () => {
                                                    successMsg("Logged out successfully!");
                                                    signOut();
                                                }
                                                : handleCloseUserMenu
                                        }
                                    >
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                    ) : (
                        <Button
                            onClick={() => router.push("/auth/signin")}
                            sx={{ my: 2, color: "white", display: "block" }}
                        >
                            Login
                        </Button>
                    )}
                </Toolbar>
            </Container>
        </AppBar >
    );
}
