import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

    state: {
        loader: false,
        layoutSidebarOpen: false,
        layoutSidebarClass: "noSideMenu",
        layoutContentStyle: {},
        layoutSidebarStyle: {},
        layoutContentRightType: "",
        layoutContentRightOpen: false,
        customers: [],
        customer: {},
        contacts: [],
        contact: {}
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
        addCustomer(state, data) {
            state.customers.push(data);
        },
        addContact(state, data) {
            state.contacts.push(data);
        },
        startLoader(state) {
            state.loader = true;
        },
        stopLoader(state) {
            state.loader = false;
        },
        setLayoutHeights(state, { contentHeight, sidebarHeight }) {

            localStorage.setItem('contentHeight', contentHeight)
            localStorage.setItem('sidebarHeight', sidebarHeight)

            state.layoutContentStyle = { 'min-height': contentHeight + 'px' };
            state.layoutSidebarStyle = { 'min-height': sidebarHeight + 'px' };
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
    actions: {

        resetCustomer({ commit }) {

            let cust = {
                "id": "",        
                "name": "",
                "address": "",        
                "zipcode": "",
                "city": ""
            }
            commit('setCustomer', cust);
        },

        resetContact({ commit }) {

            let cont= {
                "id": "",  
                "custid": "",       
                "firstname": "",
                "lastname": "",        
                "phone": "",
                "mobilephone": "",
                "email": ""
            }
            commit('setContact', cont);
        },

        addCustomer({ dispatch, commit }, { cust, cont }) {
            
            commit('startLoader');

            localStorage.setItem('cust', cust);
            localStorage.setItem('cont', cont);            
                        
            return new Promise((resolve, reject) => {
               
                if(this.$useExternalApi=="true") {
                
                    var url = this.$dataUrlCustomerCreate;
                    var params = new URLSearchParams();

                    params.append('name', cust.name);
                    params.append('address', cust.address);
                    params.append('zipcode', cust.zipcode);
                    params.append('city', cust.city);

                    this.axios
                    .post(url, params)
                    .then(response => {
                        
                        // add customer
                        cust.id = response.response.data.id;
                        commit('setCustomer', cust);
                        commit('addCustomer', cust);

                        // add contact
                        cont.custid = cust.id;
                        dispatch('addContact', cont).then(() => {
                            commit('stopLoader');
                            resolve();
                        })                        
                    })
                    .catch(error => {
                        commit('stopLoader');
                        console.log(error);
                        reject();
                    });
                    
                } else {

                    // add customer
                    let custId = (Math.floor(Math.random() * 10000) + 2000).toString();                    
                    cust.id = custId.toString();     
                    commit('setCustomer', cust);
                    commit('addCustomer', cust);

                    // add contact
                    cont.custid = cust.id  
                    setTimeout(() => {
                        dispatch('addContact', cont).then(() => {
                            commit('stopLoader');
                            resolve();
                        })  
                    }, 1000)    
                }
            })
        },

        addContact({ commit }, cont) {
            
            commit('startLoader');

            return new Promise((resolve, reject) => {

                if (this.$useExternalApi == "true") {
                    
                    var url = this.$dataUrlContactCreate + cont.custid + this.$dataUrlContactKey;
                    var params = new URLSearchParams();

                    params.append('firstname', cont.firstname);
                    params.append('lastname', cont.lastname);
                    params.append('phone', cont.phone);
                    params.append('mobilephone', cont.mobilephone);
                    params.append('email', cont.email);

                    this.axios
                        .post(url, params)
                        .then(response => {
                        
                            cont.id = response.data.id;
                            cont.fullname = cont.firstname + " " + cont.lastname;
                            commit('setContact', cont);
                            commit('addContact', cont);

                            commit('stopLoader');
                            resolve();
                        })
                        .catch(error => {
                            commit('stopLoader');
                            console.log(error);
                            reject();
                        });
                    
                } else {

                    let contId = (Math.floor(Math.random() * 10000) + 2000).toString();
                    cont.id = contId.toString();
                    cont.fullname = cont.firstname + " " + cont.lastname;

                    commit('setContact', cont);
                    commit('addContact', cont);

                    commit('stopLoader');
                    resolve();
                }
            });
        }
        
    },
    getters: {
        customers: state => state.customers,
        customer: state => state.customer,        
        contacts: state => state.contacts,
        contact: state => state.contact,
        loader: state => state.loader,
        layoutContentStyle: state => state.layoutContentStyle,
        layoutSidebarStyle: state => state.layoutSidebarStyle,
        layoutSidebarOpen: state => state.layoutSidebarOpen,
        layoutSidebarClass: state => state.layoutSidebarClass,
        layoutContentRightOpen: state => state.layoutContentRightOpen,
        layoutContentRightType: state => state.layoutContentRightType
    }
    
})