import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

    state: {
        customers: [],
        allCustomers: [],
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
        layoutSidebarClass: "noSideMenu",
        layoutContentStyle: {},
        layoutSidebarStyle: {}
    },
    mutations: {
        setCustomers(state, data) {
            state.customers = data;
            state.allCustomers = data;
        },
        setLayoutHeights(state, contentHeight, sidebarHeight) {
            state.layoutContentStyle = {'min-height': contentHeight +'px'};
            state.layoutSidebarStyle = {'min-height': sidebarHeight +'px'};
        },
        toggleSidebar(state, status) {
            if(status) {
                state.layoutSidebarClass = "hold-transition sidebar-mini sidebar-collapse";
            } else {
                state.layoutSidebarClass = "noSideMenu";
            }
        }
    },    
    getters: {
        customers: state => state.customers,
        allCustomers: state => state.allCustomers,
        emptyCustomer: state => state.emptyCustomer,
        layoutContentStyle: state => state.layoutContentStyle,
        layoutSidebarStyle: state => state.layoutSidebarStyle,
        layoutSidebarClass: state => state.layoutSidebarClass
    }
    
})