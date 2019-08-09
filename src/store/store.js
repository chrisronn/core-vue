import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
        emptyCustomer: {
            "id": "",        
            "name": "",
            "address": "",        
            "zipcode": "",
            "city": "",
            "phone": "",
            "mobilephone": "",
            "email": ""
        },
        contacts: [],
        contact: {},
        emptyContact: {
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
        setLayoutHeights(state, contentHeight, sidebarHeight) {
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
        emptyCustomer: state => state.emptyCustomer,
        contacts: state => state.contacts,
        contact: state => state.contact,        
        emptyContact: state => state.emptyContact,
        layoutContentStyle: state => state.layoutContentStyle,
        layoutSidebarStyle: state => state.layoutSidebarStyle,
        layoutSidebarOpen: state => state.layoutSidebarOpen,
        layoutSidebarClass: state => state.layoutSidebarClass,
        layoutContentRightOpen: state => state.layoutContentRightOpen,
        layoutContentRightType: state => state.layoutContentRightType
    }
    
})