/* eslint-disable indent,linebreak-style */
/**
 * Created by charnjeetelectrovese@gmail.com on 9/15/2017.
 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import UserReducer from './users.reducers';
import AuthReducer from './Auth.reducer';
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
import AppSettingReducer from './AppSettings.reducer';

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
    blogs: BlogsReducer,
    support: SupportReducer,
    type: TypeReducer,
    unit: UnitReducer,
    faq: FaqReducer,
    faq_question: FaqQuestion,
    customers: Customers,
    // form: formReducer,
});

export default rootReducer;
