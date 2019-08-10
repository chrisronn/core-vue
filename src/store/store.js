import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {router} from "../main.js"

export const store = new Vuex.Store({

    state: {
        layoutSidebarOpen: false,
        layoutSidebarClass: "noSideMenu",
        layoutContentStyle: {},
        layoutSidebarStyle: {},
        layoutContentRightType: "",
        layoutContentRightOpen: false,
        customers: [],
        customer: {},
        customerModel: {
            "id": "",        
            "name": "",
            "address": "",        
            "zipcode": "",
            "city": ""
        },
        contacts: [],
        contact: {},
        contactModel: {
            "id": "",  
            "custid": "",       
            "firstname": "",
            "lastname": "",        
            "phone": "",
            "mobilephone": "",
            "email": ""
        }
    },
    mutations: {
        setCustomers(state, data) {
            state.customers = data;
        },
        setCustomer(state, data) {
            state.customer = data;
        },
        setContacts(state, data) {
            state.contacts = data;
        },
        setContact(state, data) {
            state.contact = data;
        },
        addCustomer(state, { cust, cont }) {
            
            localStorage.setItem('cust', cust)
            localStorage.setItem('cont', cont)

            if(this.$useExternalApi=="true") {
              
                var url = this.$dataUrlCustomerCreate;
                var params = new URLSearchParams();

                params.append('name', cust.name);
                params.append('address', cust.address);
                params.append('zipcode', cust.zipcode);
                params.append('city', cust.city);

                params.append('firstname', cont.firstname);
                params.append('lastname', cont.lastname);
                params.append('phone', cont.phone);
                params.append('mobilephone', cont.mobilephone);
                params.append('email', cont.email);

                //this.isLoading = true;
                this.axios
                .post(url, params)
                .then(response => {
                    this.isLoading = false;
                    console.log(response.data);
                    router.push("/customer/" + response.data.id);    
                })
                .catch(error => {
                    //this.isLoading = false;
                    console.log(error);
                });
                
            } else {

                let custId = (Math.floor(Math.random() * 10000) + 2000).toString();
                let contId = (Math.floor(Math.random() * 10000) + 2000).toString();
                cust.id = custId.toString();   
                cont.custid = custId.toString();
                cont.id = contId.toString();
                cont.fullname = cont.firstname + " " + cont.lastname;

                state.customers.push(cust);
                state.contacts.push(cont);      
                
                router.push("/customer/" + cust.id);
            }

        },
        setLayoutHeights(state, { contentHeight, sidebarHeight }) {

            localStorage.setItem('contentHeight', contentHeight)
            localStorage.setItem('sidebarHeight', sidebarHeight)

            state.layoutContentStyle = {'min-height': contentHeight +'px'};
            state.layoutSidebarStyle = {'min-height': sidebarHeight +'px'};
        },
        toggleSidebar(state, status) {
            state.layoutSidebarOpen = status;      
            if(status) {
                state.layoutSidebarClass = 'hold-transition sidebar-mini sidebar-collapse';
            } else {
                state.layoutSidebarClass = 'noSideMenu';
            }      
        },
        toggleSidebarForce(state, status) {
            if(status) {
                state.layoutSidebarClass = 'sidebar-mini sidebar-open';
            } else {
                state.layoutSidebarClass = 'nhold-transition sidebar-mini sidebar-collapse';
            }  
        },    
        setContentRight(state, content) {
            state.layoutContentRightType = content;
        },
        toggleContentRight(state, status) {
            state.layoutContentRightOpen = status;
        }
    },    
    getters: {
        customers: state => state.customers,
        customer: state => state.customer,        
        customerModel: state => state.customerModel,
        contacts: state => state.contacts,
        contact: state => state.contact,        
        contactModel: state => state.contactModel,
        layoutContentStyle: state => state.layoutContentStyle,
        layoutSidebarStyle: state => state.layoutSidebarStyle,
        layoutSidebarOpen: state => state.layoutSidebarOpen,
        layoutSidebarClass: state => state.layoutSidebarClass,
        layoutContentRightOpen: state => state.layoutContentRightOpen,
        layoutContentRightType: state => state.layoutContentRightType
    }
    
})