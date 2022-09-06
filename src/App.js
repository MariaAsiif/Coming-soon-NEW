// import React from 'react'
import CommingSoon from './components/CommingSoon/CommingSoon'


import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';


import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Fintech from './pages/Fintech';

// import Customers from './pages/ecommerce/Customers';
// import Orders from './pages/ecommerce/Orders';
// import Invoices from './pages/ecommerce/Invoices';
// import Shop from './pages/ecommerce/Shop';
// import Shop2 from './pages/ecommerce/Shop2';
// import Product from './pages/ecommerce/Product';
// import Cart from './pages/ecommerce/Cart';
// import Cart2 from './pages/ecommerce/Cart2';
// import Cart3 from './pages/ecommerce/Cart3';
// import Pay from './pages/ecommerce/Pay';
// import Campaigns from './pages/Campaigns';
// import UsersTabs from './pages/community/UsersTabs';
// import UsersTiles from './pages/community/UsersTiles';
// import Profile from './pages/community/Profile';
// import Feed from './pages/community/Feed';
// import Forum from './pages/community/Forum';
// import ForumPost from './pages/community/ForumPost';
// import Meetups from './pages/community/Meetups';
// import MeetupsPost from './pages/community/MeetupsPost';
// import CreditCards from './pages/finance/CreditCards';
// import Transactions from './pages/finance/Transactions';
// import TransactionDetails from './pages/finance/TransactionDetails';
// import JobListing from './pages/job/JobListing';
// import JobPost from './pages/job/JobPost';
// import CompanyProfile from './pages/job/CompanyProfile';
// import Messages from './pages/Messages';
// import TasksKanban from './pages/tasks/TasksKanban';
// import TasksList from './pages/tasks/TasksList';
// import Inbox from './pages/Inbox';
// import Calendar from './pages/Calendar';
// import Account from './pages/settings/Account';
// import Notifications from './pages/settings/Notifications';
// import Apps from './pages/settings/Apps';
// import Plans from './pages/settings/Plans';
// import Billing from './pages/settings/Billing';
// import Feedback from './pages/settings/Feedback';
// import Changelog from './pages/utility/Changelog';
// import Roadmap from './pages/utility/Roadmap';
// import Faqs from './pages/utility/Faqs';
// import EmptyState from './pages/utility/EmptyState';
import PageNotFound from './pages/utility/PageNotFound';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

import MainWrapper from './pages/MainWrapper';
import { useSelector } from 'react-redux'

import Jobs from './pages/Jobs/Jobs';
import CreateJob from './pages/Jobs/CreateJob';

import Candidate from './pages/candidates/candidates';
import CreateCandidate from './pages/candidates/CreateCandidate';
import Employers from './pages/employers/employers';
import CreateEmployer from './pages/employers/CreateEmployer';
import Department from './pages/department/departments';
import CreateDepartment from './pages/department/CreateDepartment';
import Designation from './pages/designation/designation';
import CreateDesignation from './pages/designation/CreateDesignation';
import Inspire from './pages/inspire/inspire';
import CreateInspire from './pages/inspire/CreateInspire';
import Ticker from './pages/ticker/ticker';
import CreateTicker from './pages/ticker/CreateTicker';
import FeedBack from './pages/feedback/feedback';
import CreateFeedback from './pages/feedback/CreateFeedback';
import UserFeedback from './pages/UserFeedback';
import Faqs from './pages/faqs/Faqs';
import CreateFaq from './pages/faqs/CreateFaq';
import Policy from './pages/policies/Policy';
import CreatePolicy from './pages/policies/CreatePolicy';

// import Locate from './pages/locate/locate';
import CreateDoctor from './pages/locate/Doctors/CreateDoctor';
import CreateLawyer from './pages/locate/Lawyers/CreateLawyer';
import CreateServices from './pages/locate/Services/CreateServices';
import Permission from './pages/permission/permission';
import CreatePermission from './pages/permission/CreatePermission';
import CreateRole from './pages/role/Roles/CreateRole';
import Roles from './pages/role/Roles/roles';
import SinglePermission from './pages/role/Singlepermission/singlePermission';
import CreateSinglePermission from './pages/role/Singlepermission/CreatePermission';
import MutiplePermission from './pages/role/MultiplePermission/multiplepermission'
import CreateMultiplePermission from './pages/role/MultiplePermission/CreatePermission';

import Doctors from './pages/locate/Doctors/Doctors';
import Lawyers from './pages/locate/Lawyers/Lawyers';
import Services from './pages/locate/Services/Services';
import CreatePhoneBook from './pages/phoneBook/CreatePhoneBook';
import PhoneBooks from './pages/phoneBook/phoneBooks';


const RequireAuth = ({ children }) => {
  const token = useSelector((state) => state.userAuth.loginInfo.token);
  let location = useLocation();
  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
}


function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<CommingSoon />} />
        <Route exact path="/user-feedback" element={<UserFeedback />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<RequireAuth><MainWrapper /></RequireAuth>} >
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="fintech" element={<Fintech />} />
        </Route>
        <Route path="/department" element={<RequireAuth><MainWrapper /></RequireAuth>} >
          <Route index element={<Department />} />
          <Route path="create-department" element={<CreateDepartment />} />
        </Route>
        <Route path="/designation" element={<RequireAuth><MainWrapper /></RequireAuth>} >
          <Route index element={<Designation />} />
          <Route path="create-designation" element={<CreateDesignation />} />
        </Route>

        <Route path="/jobs" element={<RequireAuth><MainWrapper /></RequireAuth>} >
          <Route index element={<Jobs />} />
          <Route path="create-job" element={<CreateJob />} />
        </Route>

        <Route path="/candidates" element={<RequireAuth><MainWrapper /> </RequireAuth>} >
          <Route index element={<Candidate />} />
          <Route path="create-candidate" element={<CreateCandidate />} />
        </Route>
        <Route path="/employers" element={<RequireAuth><MainWrapper /></RequireAuth>} >
          <Route index element={<Employers />} />
          <Route path="create-employers" element={<CreateEmployer />} />
        </Route>
        <Route path="/inspire" element={<RequireAuth><MainWrapper /></RequireAuth>} >
          <Route index element={<Inspire />} />
          <Route path="create-inspire" element={<CreateInspire />} />
        </Route>

        <Route path="/ticker" element={<RequireAuth><MainWrapper /></RequireAuth>} >
          <Route index element={<Ticker />} />
          <Route path="create-ticker" element={<CreateTicker />} />
        </Route>


        <Route path="/phonebook" element={<RequireAuth><MainWrapper /></RequireAuth>} >
          <Route index element={<PhoneBooks />} />
          <Route path="create-phonebook" element={<CreatePhoneBook />} />
        </Route>

        <Route path="/feedback" element={<RequireAuth><MainWrapper /></RequireAuth>} >
          <Route index element={<FeedBack />} />
          <Route path="create-feedback" element={<CreateFeedback />} />
        </Route>

        <Route path="/locate/" element={<RequireAuth><MainWrapper /></RequireAuth>} >
          <Route path="doctor" element={<Doctors />} />
          <Route path="lawyer" element={<Lawyers />} />
          <Route path="services" element={<Services />} />
          <Route path="doctor/create-doctor" element={<CreateDoctor />} />
          <Route path="lawyer/create-lawyer" element={<CreateLawyer />} />
          <Route path="services/create-service" element={<CreateServices />} />
        </Route>

        <Route path="/faq" element={<RequireAuth><MainWrapper /></RequireAuth>} >
          <Route index element={<Faqs />} />
          <Route path="create-faq" element={<CreateFaq />} />
        </Route>

        <Route path="/policy" element={<RequireAuth><MainWrapper /></RequireAuth>} >
          <Route index element={<Policy />} />
          <Route path="create-policy" element={<CreatePolicy />} />
        </Route>

        <Route path="/permission" element={<RequireAuth><MainWrapper /></RequireAuth>} >
          <Route index element={<Permission />} />
          <Route path="create-permission" element={<CreatePermission />} />
        </Route>

        <Route path="/roles" element={<RequireAuth><MainWrapper /></RequireAuth>} >
          <Route index element={<Roles />} />
          <Route path="create-roles" element={<CreateRole />} />
        </Route>

        <Route path="/singlePermission" element={<RequireAuth><MainWrapper /></RequireAuth>} >
          <Route index element={<SinglePermission />} />
          <Route path="create-permission" element={<CreateSinglePermission />} />
        </Route>

        <Route path="/multiplePermission" element={<RequireAuth><MainWrapper /></RequireAuth>} >
          <Route index element={<MutiplePermission />} />
          <Route path="create-permission" element={<CreateMultiplePermission />} />
        </Route>


        {/* <Route path="/ecommerce" element={<RequireAuth> <MainWrapper /></RequireAuth>} >
          <Route index path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop-2" element={<Shop2 />} />
          <Route path="product" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="cart-2" element={<Cart2 />} />
          <Route path="cart-3" element={<Cart3 />} />
          <Route path="pay" element={<Pay />} />
        </Route>


        <Route path="/campaigns" element={<RequireAuth> <MainWrapper /></RequireAuth>} >
          <Route index element={<Campaigns />} />
        </Route>

        <Route path="/community" element={<RequireAuth> <MainWrapper /></RequireAuth>} >
          <Route index path="users-tabs" element={<UsersTabs />} />
          <Route path="users-tiles" element={<UsersTiles />} />
          <Route path="profile" element={<Profile />} />
          <Route path="feed" element={<Feed />} />
          <Route path="forum" element={<Forum />} />
          <Route path="forum-post" element={<ForumPost />} />
          <Route path="meetups" element={<Meetups />} />
          <Route path="meetups-post" element={<MeetupsPost />} />
        </Route>


        <Route path="/finance" element={<RequireAuth> <MainWrapper /></RequireAuth>} >
          <Route index path="cards" element={<CreditCards />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="transaction-details" element={<TransactionDetails />} />
        </Route>


        <Route path="/job" element={<RequireAuth> <MainWrapper /></RequireAuth>} >
          <Route index path="job-listing" element={<JobListing />} />
          <Route path="job-post" element={<JobPost />} />
          <Route path="company-profile" element={<CompanyProfile />} />
        </Route>

        <Route path="/messages" element={<RequireAuth> <MainWrapper /></RequireAuth>} >
          <Route index element={<Messages />} />
        </Route>

        <Route path="/tasks" element={<RequireAuth> <MainWrapper /></RequireAuth>} >
          <Route index path="kanban" element={<TasksKanban />} />
          <Route path="list" element={<TasksList />} />
        </Route>

        <Route path="/inbox" element={<RequireAuth> <MainWrapper /></RequireAuth>} >
          <Route index element={<Inbox />} />
        </Route>

        <Route path="/calendar" element={<RequireAuth> <MainWrapper /></RequireAuth>} >
          <Route index element={<Calendar />} />
        </Route>

        <Route path="/settings" element={<RequireAuth> <MainWrapper /></RequireAuth>} >
          <Route index path="account" element={<Account />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="apps" element={<Apps />} />
          <Route path="plans" element={<Plans />} />
          <Route path="billing" element={<Billing />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>

        <Route path="/utility" element={<RequireAuth> <MainWrapper /></RequireAuth>} >
          <Route index path="changelog" element={<Changelog />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="empty-state" element={<EmptyState />} />
          <Route path="404" element={<PageNotFound />} />
          <Route path="knowledge-base" element={<KnowledgeBase />} />
        </Route>

        <Route path="/utility" element={<RequireAuth> <MainWrapper /></RequireAuth>} >
          <Route index path="changelog" element={<Changelog />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="empty-state" element={<EmptyState />} />
          <Route path="404" element={<PageNotFound />} />
          <Route path="knowledge-base" element={<KnowledgeBase />} />
        </Route>


        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />


        <Route path="/onboarding-01" element={<Onboarding01 />} />
        <Route path="/onboarding-02" element={<Onboarding02 />} />
        <Route path="/onboarding-03" element={<Onboarding03 />} />
        <Route path="/onboarding-04" element={<Onboarding04 />} />

        <Route path="/component" element={<RequireAuth> <MainWrapper /></RequireAuth>} >
          <Route index path="button" element={<ButtonPage />} />
          <Route path="form" element={<FormPage />} />
          <Route path="dropdown" element={<DropdownPage />} />
          <Route path="alert" element={<AlertPage />} />
          <Route path="modal" element={<ModalPage />} />
          <Route path="pagination" element={<PaginationPage />} />
          <Route path="tabs" element={<TabsPage />} />
          <Route path="breadcrumb" element={<BreadcrumbPage />} />
          <Route path="badge" element={<BadgePage />} />
          <Route path="avatar" element={<AvatarPage />} />
          <Route path="tooltip" element={<TooltipPage />} />
          <Route path="accordion" element={<AccordionPage />} />
          <Route path="icons" element={<IconsPage />} />
        </Route> */}
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </>
  );
}

export default App;
