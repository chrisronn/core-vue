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
        }
    },
    mutations: {
        setCustomers(state, data) {
            state.customers = data;
            state.allCustomers = data;
        },
    },    
    getters: {
        customers: state => state.customers,
        allCustomers: state => state.allCustomers,
        emptyCustomer: state => state.emptyCustomer
    }
    
})