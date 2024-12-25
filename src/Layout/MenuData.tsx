const menuItems = [
    {
        label: "Navigation", type: "HEADER", //  HEADER , HASHMENU, ITEM(default)
    },
    {
        type: "HASHMENU", id: 1, label: "Dashboard", icon: "ph-duotone ph-gauge", badge: "2", dataPage: null,
        submenu: [
            { id: "dashboard", label: "Analytics", link: "/", dataPage: "dashboard" },
        ]
    },

        // Pages
        { label: "Pages", type: "HEADER", },
        {
            type: "HASHMENU", id: "authentication", label: "Authentication", dataPage: null, icon: "ph-duotone ph-shield-checkered", link: "#",
            submenu: [
                {
                    type: "HASHMENU", id: "auth1", label: "Authentication 1", dataPage: null, link: "#",
                    submenu: [
                        { id: "login", label: "Login", link: "/pages/login-v1", dataPage: "pages-login-v1" },
                        { id: "register", label: "Register", link: "/pages/register-v1", dataPage: "pages-register-v1" },
                        { id: "forgotpw", label: "Forgot Password", link: "/pages/forgot-password-v1", dataPage: "pages-forgot-password-v1" },
                        { id: "resetpw", label: "Reset Password", link: "/pages/reset-password-v1", dataPage: "pages-reset-password-v1" },
                        { id: "codeverify", label: "Code Verification", link: "/pages/code-verification-v1", dataPage: "code-verification-v1" }
                    ]
                },
                {
                    type: "HASHMENU", id: "auth2", label: "Authentication 2", dataPage: null, link: "#",
                    submenu: [
                        { id: "login2", label: "Login", link: "/pages/login-v2", dataPage: "pages-login-v2" },
                        { id: "register2", label: "Register", link: "/pages/register-v2", dataPage: "pages-register-v2" },
                        { id: "forgotpw2", label: "Forgot Password", link: "/pages/forgot-password-v2", dataPage: "pages-forgot-password-v2" },
                        { id: "resetpw2", label: "Reset Password", link: "/pages/reset-password-v2", dataPage: "pages-reset-password-v2" },
                        { id: "codeverify2", label: "Code Verification", link: "/pages/code-verification-v2", dataPage: "code-verification-v2" }
                    ]
                },
            ]
        },
        {
            type: "HASHMENU", id: "maintenance", label: "Maintenance", dataPage: null, icon: "ph-duotone ph-wrench", link: "#",
            submenu: [
                { id: "er404", label: "Error 404", link: "/pages/error-404", dataPage: "error-404" },
                { id: "connectionlost", label: "Connection lost", link: "/pages/connection-lost", dataPage: "connection-lost" },
                { id: "underconstruction", label: "Under Construction", link: "/pages/under-construction", dataPage: "under-construction" },
                { id: "comingsoon", label: "Coming soon", link: "/pages/coming-soon", dataPage: "coming-soon" }
            ]
        },
       
    // Other
    { label: "Other", type: "HEADER" },
    {
        type: "HASHMENU", id: "menulevels", label: "Menu levels", dataPage: null, icon: "ph-duotone ph-tree-structure", link: "#",
        submenu: [
            { id: "level2.1", label: "Level 2.1", dataPage: null, link: "#" },
            {
                type: "HASHMENU", id: "Level 2.2", label: "Level 2.2", dataPage: null, link: "#",
                submenu: [
                    { id: "level3.1", label: "Level 3.1", link: "#", dataPage: "#3.1" },
                    { id: "level3.2", label: "Level 3.2", link: "#", dataPage: "#3.2" },
                    {
                        type: "HASHMENU", id: "level3.3", label: "Level 3.3", dataPage: null, link: "#",
                        submenu: [
                            { id: "level4.1", label: "Level 4.1", link: "#", dataPage: "#4.1" },
                            { id: "level4.2", label: "Level 4.2", link: "#", dataPage: "#4.2" }
                        ]
                    }
                ]
            },
            {
                type: "HASHMENU", id: "level2.3", label: "Level 2.3", dataPage: null, link: "#",
                submenu: [
                    { id: "level3.1", label: "Level 3.1", link: "#", dataPage: "#3.1" },
                    { id: "level3.2", label: "Level 3.2", link: "#", dataPage: "#3.2" },
                    {
                        type: "HASHMENU", id: "level3.3", label: "Level 3.3", dataPage: null, link: "#",
                        submenu: [
                            { id: "level4.1", label: "Level 4.1", link: "#", dataPage: "#4.1" },
                            { id: "level4.2", label: "Level 4.2", link: "#", dataPage: "#4.2" }
                        ]
                    }
                ]
            }
        ]
    },
    { id: "samplepage", label: "Sample page", icon: "ph-duotone ph-desktop", link: "/other/sample-page", dataPage: "sample-page" }
];

export { menuItems };