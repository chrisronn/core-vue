
import SiteLayout from "../components/layout/SiteLayout";
import Customer from "../components/page/Customer";
import CustomerList from "../components/page/CustomerList";
import CustomerCard from "../components/page/CustomerCard";
import CustomerInfo from "../components/page/CustomerInfo";
import CustomerContactList from "../components/page/CustomerContactList";
import CustomerContact from "../components/page/CustomerContact";

const routes = [
    {
      path: '/start',
      name: 'Start',
      component: SiteLayout,
      redirect: '/customer/list'
    },
    {
      path: '/customer',
      component: SiteLayout,
      redirect: '/customer/list',
      children: [
        {
          path: 'list',
          name: 'CustomerList',
          component: CustomerList
        },
        {
          path: ':customerId',
          component: Customer,
          redirect: '/customer/:customerId/card',
          props: true,
          children: [
            {
              path: 'card',
              name: 'CustomerCard',
              component: CustomerCard,
            },
            {
              path: 'info',
              name: 'CustomerInfo',
              component: CustomerInfo,
            },
            {
              path: 'contacts',
              name: 'CustomerContactList',
              component: CustomerContactList,
            },
            {
              path: 'contact/:contactId',
              name: 'CustomerContact',
              component: CustomerContact,
              props: true
            }
          ]
        }
      ]
    },
    { 
      path: '*', 
      redirect: '/start' 
    }
]

export default routes