import DashboardPage from "../views/dashboard/Dashboard";
import UserList from "../views/User/List/UserList.container";
import CustomerList from "../views/Customers/List/CustomerList.container";
import AppSettings from "../views/AppSettings/AppSettings.container";
import IndustryList from "../views/Industry/IndustryList.container";
import CategoryList from "../views/Category/CategoryList.container";
import Rolelist from "../views/Role/RoleList.container";
import BadgeList from "../views/Badge/List/BadgeList.container";
import ProductList from "../views/Product/ProductList.container";
import ProductView from "../views/Product/ProductView";
import UpperTabs from "../views/User/components/UpperTabs/UpperTabs.view";
import BlogsList from "../views/Blogs/BlogsList.container";
import FaqList from "../views/Faq/FaqList.container";
import SupportList from "../views/Support/SupportList.container";
import TypeList from "../views/Type/TypeList.container";
import Profile from "../views/Profile/MyProfile.view";
import CustomerTabs from "../views/Customers/components/UpperTabs/CustomerTabs.view";
import ManufacturerTabs from "../views/Manufacturer/ManufacturerTabs.view";
import Support from "../views/Support/Support.view";
import UnitList from "../views/Unit/UnitList.container";
import SubCategoryList from "../views/SubCategory/SubCategoryList.container";
import QuoteList from "../views/Quotes/QuoteList.container";
import QuoteDetail from "../views/Quotes/Quote.view";
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
  Notifications,
  EventNote,
  ContactSupport,
  Settings,
} from "@material-ui/icons";
import RouteName from "./Route.name";

const dashboardRoutes = [
  {
    path: "/",
    sidebarName: "Dashboard",
    navbarName: "FactoryGird Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    is_sidebar: true,
  },
  {
    path: "/profile",
    sidebarName: "My Profile",
    navbarName: "My Profile",
    icon: Person,
    component: Profile,
    is_sidebar: true,
    is_protect: true,
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
    path: "null",
    sidebarName: "Masters",
    navbarName: "Masters",
    icon: EventNote,
    is_sidebar: true,
    slug: "masters",
    is_parent: true,
  },
  {
    path: "null",
    sidebarName: "Admin Users",
    navbarName: "Admin Users",
    icon: EventNote,
    is_sidebar: true,
    slug: "admin",
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
    should_regex: true,
    parent: "masters",
  },
  {
    path: "/industry/category/:id",
    sidebarName: "Categories",
    navbarName: "Categories",
    icon: Dashboard,
    component: CategoryList,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    // parent: 'masters',
  },
  // {
  //     path: "/industry/category/",
  //     sidebarName: "Categories",
  //     navbarName: "Categories",
  //     icon: Dashboard,
  //     component: CategoryList,
  //     is_sidebar: true,
  //     is_protect: true,
  //      parent: 'masters',
  // },
  {
    path: "/industry/category/subcategory/:id",
    sidebarName: "SubCategory",
    navbarName: "SubCategory",
    icon: Dashboard,
    component: SubCategoryList,
    is_sidebar: false,
    is_protect: true,
    // parent: 'masters',
  },
  {
    path: "/users",
    sidebarName: "Users",
    navbarName: "Users",
    icon: SupervisedUserCircle,
    component: UserList,
    is_sidebar: true,
    is_protect: true,
    parent: "admin",
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
    parent: "admin",
  },
  {
    path: "/badge",
    sidebarName: "Badge",
    navbarName: "Badge",
    icon: VerifiedUser,
    component: BadgeList,
    is_sidebar: true,
    is_protect: true,
    parent: "masters",
  },
  {
    path: "/products",
    sidebarName: "Products",
    navbarName: "Products",
    icon: LocalOffer,
    component: ProductList,
    is_sidebar: true,
    is_protect: true,
    parent: "masters",
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
    path: `${RouteName.APP_USERS}`,
    sidebarName: "App Users",
    navbarName: "App Users",
    icon: SupervisedUserCircle,
    component: CustomerList,
    is_sidebar: true,
    is_protect: true,
  },

  {
    path: `${RouteName.CUSTOMERS_MANUFACTURES}:id`,
    sidebarName: "Manufacturer",
    navbarName: "Manufacturer",
    icon: SupervisedUserCircle,
    component: ManufacturerTabs,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
  },
  {
    path: `${RouteName.CUSTOMERS_CUSTOMER}:id`,
    sidebarName: "Customers",
    navbarName: "Customers",
    icon: SupervisedUserCircle,
    component: CustomerTabs,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
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
    parent: "masters",
  },
  {
    path: "/support",
    sidebarName: "Customer Support",
    navbarName: "Customer Support",
    icon: ContactSupport,
    component: SupportList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
  },
  {
    path: "/support/detail/:id",
    sidebarName: "Support Detail",
    navbarName: "Support Detail",
    icon: SupervisedUserCircle,
    component: Support,
    is_sidebar: false,
    is_protect: true,
    should_regex: false,
  },
  {
    path: "/type",
    sidebarName: "Type",
    navbarName: "Type",
    icon: VerifiedUser,
    component: TypeList,
    is_sidebar: true,
    is_protect: true,
    parent: "masters",
  },
  {
    path: "/unit",
    sidebarName: "Unit",
    navbarName: "Unit",
    icon: VerifiedUser,
    component: UnitList,
    is_sidebar: true,
    is_protect: true,
    parent: "masters",
  },
  {
    path: "/app/settings",
    sidebarName: "App Settings",
    navbarName: "App Settings",
    icon: Settings,
    component: AppSettings,
    is_sidebar: true,
    is_protect: true,
  },
  {
    path: "/quotes",
    sidebarName: "Quotes",
    navbarName: "Quotes",
    icon: ContactSupport,
    component: QuoteList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
  },
  {
    path: "/quotes/detail/:id",
    sidebarName: "Quotes Detail",
    navbarName: "Quotes Detail",
    icon: SupervisedUserCircle,
    component: QuoteDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: false,
  },
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
