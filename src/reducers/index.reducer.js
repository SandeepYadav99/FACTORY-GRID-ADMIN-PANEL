/* eslint-disable indent,linebreak-style */
/**
 * Created by charnjeetelectrovese@gmail.com on 9/15/2017.
 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import User from './User.reducer';

import Customers from './Customers.reducer';
import Industry from './Industry.reducer';
import Category from './Category.reducer'
import DashboardReducer from './Dashboard.reducer';
import ProductReducer from './Product.reducer';
import BadgeReducer from './Badge.reducer';
import RoleReducer from './Role.reducers';
import BlogsReducer from './Blogs.reducer';
import SupportReducer from './Support.reducer';
import TypeReducer from './Type.reducer';
import UnitReducer from './Unit.reducer';
import FaqReducer from './Faq.reducer';
import FaqQuestion from './Faq_question.reducer';
import Subcategory from './SubCategory.reducer'
import AppSettingReducer from './AppSettings.reducer';
import QuotesReducer from './Quotes.reducer';
import ProviderUser from './ProviderUser.reducer';
import AuthReducer from './Auth.reducer';
import HubMasterReducer from './HubMaster.reducer';
import CommonReducer from './Common.reducer';
import AssociatedManufacturesReducer from './AssociatedManufactures.reducer';
import ServiceReducer from './Service.reducer';
import MilestoneReducer from './Milestone.reducer';
import TopManufactureReducer from './TopManufacture.reducer';

const rootReducer = combineReducers({
    state: (state = {}) => state,
    form: formReducer,
    app_setting: AppSettingReducer,
    dashboard: DashboardReducer,
    user: User,
    auth: AuthReducer,
    badge: BadgeReducer,
    product: ProductReducer,
    role: RoleReducer,
    // user: UserReducer,
    industry: Industry,
    category: Category,
    subcategory: Subcategory,
    blogs: BlogsReducer,
    support: SupportReducer,
    type: TypeReducer,
    unit: UnitReducer,
    faq: FaqReducer,
    faq_question: FaqQuestion,
    provider_user: ProviderUser,
    quotes: QuotesReducer,
    customers: Customers,
    Service:ServiceReducer,
    Milestone:MilestoneReducer,
    // form: formReducer,
    hubMaster:HubMasterReducer,
    common: CommonReducer,
    associatedManufactures:AssociatedManufacturesReducer,
    topManufacture:TopManufactureReducer

});

export default rootReducer;
