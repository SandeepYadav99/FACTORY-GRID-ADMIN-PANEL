import DashboardPage from "../views/dashboard/Dashboard";
import UserList from '../views/User/UserList.container'
import CustomerList from '../views/Customers/CustomerList.container';
import AppSettings from '../views/AppSettings/AppSettings.container';
import IndustryList from '../views/Industry/IndustryList.container';
import CategoryList from '../views/Category/CategoryList.container';
import Rolelist from '../views/Role/RoleList.container';
import BadgeList from "../views/Badge/BadgeList.container";
import ProductList from "../views/Product/ProductList.container";
import ProductView from '../views/Product/ProductView';
import UpperTabs from '../views/User/components/UpperTabs/UpperTabs.view';

import BlogsList from '../views/Blogs/BlogsList.container';
import FaqList from '../views/Faq/FaqList.container';
import SupportList from "../views/Support/SupportList.container";
import TypeList from "../views/Type/TypeList.container";
// import TableList from "views/TableList/TableList.jsx";
// import Typography from "views/Typography/Typography.jsx";
// import Icons from "views/Icons/Icons.jsx";
// import Maps from "views/Maps/Maps.jsx";
// import NotificationsPage from "views/Notifications/Notifications.jsx";

import {
    Dashboard,
    MeetingRoom,
    SupervisedUserCircle,
    Person,
    LibraryBooks,
    VerifiedUser,
    LocalOffer,
    BubbleChart,
    LocationOn,
    Notifications, EventNote,
    ContactSupport
} from "@material-ui/icons";
import Profile from '../views/Profile/MyProfile.view'
import CustomerTabs from "../views/Customers/components/UpperTabs/CustomerTabs.view";
import ManufacturerTabs from '../views/Manufacturer/components/UpperTabs/ManufacturerTabs.view';
import Support from "../views/Support/Support.view";
import UnitList from "../views/Unit/UnitList.container";

const dashboardRoutes = [
    {
        path: "/",
        sidebarName: "Dashboard",
        navbarName: "Material Dashboard",
        icon: Dashboard,
        component: DashboardPage,
        is_sidebar: true,
    },

    // {
    //     path: "/categories",
    //     sidebarName: "Categories",
    //     navbarName: "Categories",
    //     icon: Dashboard,
    //     component: CategoryList,
    //     is_sidebar: true,
    //     is_protect: true,
    // },
    {
        path: 'null',
        sidebarName: "Masters",
        navbarName: "Masters",
        icon: EventNote,
        is_sidebar: true,
        slug: 'masters',
        is_parent: true,
    },
    {
        path: 'null',
        sidebarName: "Admin Users",
        navbarName: "Admin Users",
        icon: EventNote,
        is_sidebar: true,
        slug: 'admin',
        is_parent: true,
    },
    {
        path: "/industry",
        sidebarName: "Industries",
        navbarName: "Industries",
        icon: MeetingRoom,
        component: IndustryList,
        is_sidebar: true,
        is_protect: true,
        parent: 'masters',
    },
    {
        path: "/category",
        sidebarName: "Categories",
        navbarName: "Categories",
        icon: Dashboard,
        component: CategoryList,
        is_sidebar: true,
        is_protect: true,
        parent: 'masters',
    },
    {
        path: "/users",
        sidebarName: "Users",
        navbarName: "Users",
        icon: SupervisedUserCircle,
        component: UserList,
        is_sidebar: true,
        is_protect: true,
        parent: 'admin',
    },
    {
        path: "/users/edit",
        sidebarName: "Users",
        navbarName: "Users",
        icon: Dashboard,
        component: UpperTabs,
        is_sidebar: false,
        is_protect: true,
    },
    {
        path: "/role",
        sidebarName: "UserRole",
        navbarName: "UserRole",
        icon: LibraryBooks,
        component: Rolelist,
        is_sidebar: true,
        is_protect: true,
        parent: 'admin',
    },
    {
        path: "/badge",
        sidebarName: "Badge",
        navbarName: "Badge",
        icon: VerifiedUser,
        component: BadgeList,
        is_sidebar: true,
        is_protect: true,
        parent: 'masters'
    },
    {
        path: "/products",
        sidebarName: "Products",
        navbarName: "Products",
        icon: LocalOffer,
        component: ProductList,
        is_sidebar: true,
        is_protect: true,
        parent: 'masters'
    },
    {
        path: "/products/edit",
        sidebarName: "Products",
        navbarName: "Products",
        icon: LocalOffer,
        component: ProductView,
        is_sidebar: false,
        is_protect: true,

    },
    {
        path: "/profile",
        sidebarName: "Profile",
        navbarName: "Profile",
        icon: Person,
        component: Profile,
        is_sidebar: true,
        is_protect: true,
    },
    {
        path: "/customers",
        sidebarName: "Customers",
        navbarName: "Customers",
        icon: SupervisedUserCircle,
        component: CustomerTabs,
        is_sidebar: true,
        is_protect: true,
    },
    {
        path: "/manufacturer",
        sidebarName: "Manufacturer",
        navbarName: "Manufacturer",
        icon: SupervisedUserCircle,
        component: ManufacturerTabs,
        is_sidebar: true,
        is_protect: true,
    },
    {
        path: "/blogs",
        sidebarName: "Blogs",
        navbarName: "Blogs",
        icon: BubbleChart,
        component: BlogsList,
        is_sidebar: true,
        is_parent: false,
    },
    {
        path: "/faq",
        sidebarName: "FAQ",
        navbarName: "FAQ",
        icon: BubbleChart,
        component: FaqList,
        is_sidebar: true,
        is_protect: true,
        parent: 'masters',
    },
    {
        path: "/support/messages",
        sidebarName: "Customer Support",
        navbarName: "Customer Support",
        icon: ContactSupport,
        component: SupportList,
        is_sidebar: true,
        is_protect: true,
        is_parent: false,
        // parent: 'queries',
        slug: ''
    },
    {
        path: "/support/detail/",
        sidebarName: "Support Detail",
        navbarName: "Support Detail",
        icon: SupervisedUserCircle,
        component: Support,
        is_sidebar: false,
        is_protect: true,
        should_regex: true
    },
    {
        path: "/type",
        sidebarName: "Type",
        navbarName: "Type",
        icon: VerifiedUser,
        component: TypeList,
        is_sidebar: true,
        is_protect: true,
        parent: 'masters'
    },
    {
        path: "/unit",
        sidebarName: "Unit",
        navbarName: "Unit",
        icon: VerifiedUser,
        component: UnitList,
        is_sidebar: true,
        is_protect: true,
        parent: 'masters'
    },
    // {
    //     path: "/app/settings",
    //     sidebarName: "App Settings",
    //     navbarName: "App Settings",
    //     icon: Dashboard,
    //     component: AppSettings,
    //     is_sidebar: true,
    //     is_protect: true,
    // },


    // {
    //   path: "/notifications",
    //   sidebarName: "Notifications",
    //   navbarName: "Notifications",
    //   icon: Notifications,
    //   component: NotificationsPage
    // },
    // { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
