import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import _ from 'lodash';

export const store = new Vuex.Store({

    state: {
        customers: [],
        customer: {},
        contacts: [],
        contact: {},
        user: null,
        loader: false,
        layoutSidebarClass: "noSideMenu",
        layoutContentStyle: {},
        layoutSidebarStyle: {},
        layoutContentRightType: "",
        layoutContentRightOpen: false,
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
        setUser(state, data) {
            state.user = data;
        },
        showLoader(state, data) {
            state.loader = data;
        },
        setContentStyle(state, data) {
            state.layoutContentStyle = data;
        },
        setSidebarClass(state, data) {
            state.layoutSidebarClass = data;
        },
        setSidebarStyle(state, data) {
            state.layoutSidebarStyle = data;
        },
        setContentRight(state, data) {
            state.layoutContentRightType = data;
        },
        toggleContentRight(state, data) {
            state.layoutContentRightOpen = data;
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

            let cont = {
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

        resetUser({ commit }) {

            let usr = {
                "username": "nana",
                "fullname": "Namn Namn",
                "firstname": "Namn",
                "lastname": "Namn",
                "email": "namn.namn@email.com"
            }
            commit('setUser', usr);
        },

        loadUser({ dispatch }, { vm }) {

            localStorage.setItem('vm', vm);

            return new Promise((resolve) => {
                
                if (vm.$useExternalApi == "true") {

                    dispatch('resetUser');
                    resolve();

                } else {
      
                    dispatch('resetUser');
                    resolve();
                }
            });
        },

        loadCustomers({ commit }, { vm }) {

            var url = vm.$dataUrlCustomerRead;

            return new Promise((resolve, reject) => {

                vm.axios
                    .get(url)
                    .then(response => {
                        commit('setCustomers', response.data);
                        resolve();
                    })
                    .catch(error => {
                        console.log(error);
                        reject();
                    });
            });
        },

        loadCustomer({ dispatch, commit }, { customerId, vm }) {

            localStorage.setItem('customerId', customerId);
            localStorage.setItem('vm', vm);

            var url = "";

            return new Promise((resolve, reject) => {

                dispatch('resetCustomer');
                
                if (vm.$useExternalApi == "true") {

                    url = vm.$dataUrlCustomerReadOne + customerId;

                    vm.axios
                        .get(url)
                        .then(response => {
                            commit('setCustomer', response.data);
                            resolve();
                        })
                        .catch(error => {
                            console.log(error);
                            reject();
                        });

                } else {
      
                    url = vm.$dataUrlCustomerReadOne;

                    vm.axios
                        .get(url)
                        .then(response => {
                            if(response.data.length > 0) {
                                var cust = response.data.find(function (el) {
                                    return el.id==customerId;
                                });
                                if(cust) {          
                                  commit('setCustomer', cust);
                                }
                            }
                            resolve();
                        })
                        .catch(error => {
                            console.log(error);
                            reject();
                        });
                }
            });
        },

        loadContacts({ commit }, { customerId, vm }) {

            localStorage.setItem('customerId', customerId);
            localStorage.setItem('vm', vm);
            
            var url = "";
            
            return new Promise((resolve, reject) => {

                commit('setContacts', []);

                if (vm.$useExternalApi == "true") {

                    url = vm.$dataUrlContactRead + customerId + vm.$dataUrlContactKey;

                    vm.axios
                        .get(url)
                        .then(response => {

                            commit('setContacts', response.data);
                            resolve();
                        })
                        .catch(error => {
                            console.log(error);
                            reject();
                        });

                } else {
      
                    url = vm.$dataUrlContactRead;

                    vm.axios
                        .get(url)
                        .then(response => {
                            let conts = _.filter(response.data, { 'custid': customerId });
                            commit('setContacts', conts);
                            resolve();
                        })
                        .catch(error => {
                            console.log(error);
                            reject();
                        });
                }
            });

        },

        loadContact({ commit, dispatch, getters }, { customerId, contactId, vm }) {

            localStorage.setItem('customerId', customerId);
            localStorage.setItem('contactId', contactId);
            localStorage.setItem('vm', vm);

            var url = "";

            return new Promise((resolve, reject) => {

                dispatch('resetContact');
                
                if (vm.$useExternalApi == "true") {

                    url = vm.$dataUrlContactReadOne + customerId + vm.$dataUrlContactKey + contactId;

                    vm.axios
                        .get(url)
                        .then(response => {

                            console.log("Contact: " + JSON.stringify(response.data));

                            commit('setContact', response.data);
                            resolve();
                        })
                        .catch(error => {
                            console.log(error);
                            reject();
                        });

                } else {
      
                    if (getters.contacts.length > 0) {

                        var cont = getters.contacts.find(function (el) {
                            return el.id == contactId;
                        });
                        if (cont) {
                            commit('setContact', cont);
                        }
                        resolve();

                    } else {

                        url = vm.$dataUrlContactReadOne;

                        vm.axios
                            .get(url)
                            .then(response => {

                                if (response.data.length > 0) {
                                    
                                    var cont = response.data.find(function (el) {
                                        return el.id == contactId;
                                    });
                                    if (cont) {
                                        commit('setContact', cont);
                                    }                                
                                }
                                resolve();
                            })
                            .catch(error => {
                                console.log(error);
                                reject();
                            });
                    }
                }
            
            });
        },

        deleteContact({commit, dispatch, getters}, {cont, vm}) {

            localStorage.setItem('cont', cont);
            localStorage.setItem('vm', vm);

            return new Promise((resolve, reject) => {
               
                if (vm.$useExternalApi == "true") {
                
                    var url = vm.$dataUrlContactDelete + cont.custid + vm.$dataUrlContactKey + cont.id;
                    var params = new URLSearchParams();

                    params.append('_method', "DELETE");

                    vm.axios
                        .post(url, params)
                        .then(response => {                        
                            console.log("deleted: " + response);
                            dispatch('resetContact');
                            var contactList = getters.contacts.filter(function (e) {
                                return e.id !== cont.id;
                            });
                            commit('setContacts', contactList);
                            resolve();
                        })
                        .catch(error => {
                            console.log(error);
                            reject();
                        });
                    
                } else {

                    dispatch('resetContact');
                    var contactList = getters.contacts.filter(function (e) {
                        return e.id !== cont.id;
                    });
                    commit('setContacts', contactList);
                    resolve();
                }
            })
  
        },

        addCustomer({ dispatch, commit }, { cust, cont, vm }) {

            localStorage.setItem('cust', cust);
            localStorage.setItem('cont', cont);
            localStorage.setItem('vm', vm);
                        
            dispatch('resetCustomer');
            commit('setContacts', []);

            return new Promise((resolve, reject) => {
               
                if (vm.$useExternalApi == "true") {
                
                    var url = vm.$dataUrlCustomerCreate;

                    var params = new URLSearchParams();

                    params.append('name', cust.name);
                    params.append('address', cust.address);
                    params.append('zipcode', cust.zipcode);
                    params.append('city', cust.city);

                    vm.axios
                        .post(url, params)
                        .then(response => {
                        
                            // add customer
                            cust.id = response.data.id;
                            commit('setCustomer', cust);
                            commit('addCustomer', cust);

                            // add contact
                            cont.custid = cust.id;
                            dispatch('addContact',  { cont, vm}).then(() => {
                                resolve();
                            })
                        })
                        .catch(error => {
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
                        dispatch('addContact', { cont, vm}).then(() => {
                            resolve();
                        })
                    }, 1000)
                }
            })
        },

        editCustomer({ dispatch, commit }, { cust, vm }) {

            localStorage.setItem('cust', cust);
            localStorage.setItem('vm', vm);
                        
            return new Promise((resolve, reject) => {
               
                if (vm.$useExternalApi == "true") {
                
                    var url = vm.$dataUrlCustomerUpdate + cust.id;
                    var params = new URLSearchParams();

                    params.append('_method', "PUT");
                    params.append('name', cust.name);
                    params.append('address', cust.address);
                    params.append('zipcode', cust.zipcode);
                    params.append('city', cust.city);

                    vm.axios
                        .post(url, params)
                        .then(response => {                        
                            console.log("updated: " + response);
                            commit('setCustomer', cust);
                            dispatch('updateCustomers', cust);
                            resolve();
                        })
                        .catch(error => {
                            console.log(error);
                            reject();
                        });
                    
                } else {

                    commit('setCustomer', cust);
                    dispatch('updateCustomers', cust);
                    resolve();
                }
            })
        },

        deleteCustomer({commit, dispatch, getters}, {cust, vm}) {

            localStorage.setItem('cust', cust);
            localStorage.setItem('vm', vm);

            return new Promise((resolve, reject) => {
               
                if (vm.$useExternalApi == "true") {
                
                    var url = vm.$dataUrlCustomerDelete + cust.id;
                    var params = new URLSearchParams();

                    params.append('_method', "DELETE");

                    vm.axios
                        .post(url, params)
                        .then(response => {                        
                            console.log("deleted: " + response);
                            dispatch('resetCustomer');
                            var customerList = getters.customers.filter(function (e) {
                                return e.id !== cust.id;
                            });
                            commit('setCustomers', customerList);
                            resolve();
                        })
                        .catch(error => {
                            console.log(error);
                            reject();
                        });
                    
                } else {

                    dispatch('resetCustomer');                    
                    var customerList = getters.customers.filter(function (e) {
                        return e.id !== cust.id;
                    });                    
                    commit('setCustomers', customerList);
                    resolve();
                }
            })
  
        },

        updateCustomers({ commit, getters }, cust) {

            var customerList = getters.customers;
            
            customerList.some(function(obj){
                if (obj.id === cust.id) {
                    obj.name = cust.name;
                    obj.address = cust.address;
                    obj.zipcode = cust.zipcode;
                    obj.city = cust.city;
                    return true;
                }
            });
            commit('setCustomers', customerList);
        },

        editContact({ dispatch, commit }, { cont, vm }) {

            localStorage.setItem('cont', cont);
            localStorage.setItem('vm', vm);
                        
            cont.fullname = cont.firstname + " " + cont.lastname;

            return new Promise((resolve, reject) => {
               
                if (vm.$useExternalApi == "true") {
                
                    var url = vm.$dataUrlContactUpdate + cont.custid + vm.$dataUrlContactKey + cont.id;
                    var params = new URLSearchParams();

                    params.append('_method', "PUT");
                    params.append('firstname', cont.firstname);
                    params.append('lastname', cont.lastname);
                    params.append('phone', cont.phone);
                    params.append('mobilephone', cont.mobilephone);
                    params.append('email', cont.email);

                    vm.axios
                        .post(url, params)
                        .then(response => {                        
                            console.log("updated: " + response);
                            commit('setContact', cont);
                            dispatch('updateContacts', cont);
                            resolve();
                        })
                        .catch(error => {
                            console.log(error);
                            reject();
                        });
                    
                } else {

                    commit('setContact', cont);
                    dispatch('updateContacts', cont);
                    resolve();
                }
            })
        },

        updateContacts({ commit, getters }, cont) {

            var contactList = getters.contacts;
            
            contactList.some(function(obj){
                if (obj.id === cont.id) {
                    obj.fullname = cont.fullname;
                    obj.firstname = cont.firstname;
                    obj.lastname = cont.lastname;
                    obj.phone = cont.phone;
                    obj.mobilephone = cont.mobilephone;
                    obj.email = cont.email;
                    return true;
                }
            });
            commit('setContacts', contactList);
        },

        addContact({ commit }, { cont, vm }) {
            
            localStorage.setItem('cont', cont);
            localStorage.setItem('vm', vm);

            return new Promise((resolve, reject) => {

                if (vm.$useExternalApi == "true") {
                    
                    var url = vm.$dataUrlContactCreate + cont.custid + vm.$dataUrlContactKey;
                    var params = new URLSearchParams();

                    params.append('firstname', cont.firstname);
                    params.append('lastname', cont.lastname);
                    params.append('phone', cont.phone);
                    params.append('mobilephone', cont.mobilephone);
                    params.append('email', cont.email);

                    vm.axios
                        .post(url, params)
                        .then(response => {

                            cont.id = response.data.id;
                            cont.fullname = cont.firstname + " " + cont.lastname;
                            commit('setContact', cont);
                            commit('addContact', cont);
                            resolve();
                        })
                        .catch(error => {
                            console.log(error);
                            reject();
                        });
                    
                } else {

                    let contId = (Math.floor(Math.random() * 10000) + 2000).toString();
                    cont.id = contId.toString();
                    cont.fullname = cont.firstname + " " + cont.lastname;

                    commit('setContact', cont);
                    commit('addContact', cont);
                    resolve();
                }
            });
        },

        showSidebar({ commit }, status) {
            if (status) {
                commit('setSidebarClass', 'hold-transition sidebar-mini sidebar-collapse');
            } else {
                commit('setSidebarClass', 'noSideMenu');
            }
        },

        openSidebar({ commit }, status) {
            if (status) {
                commit('setSidebarClass', 'sidebar-mini sidebar-open');
            } else {
                commit('setSidebarClass', 'hold-transition sidebar-mini sidebar-collapse');
            }
        },

        setLayoutHeights({ commit }, { contentHeight, sidebarHeight }) {
            
            localStorage.setItem('contentHeight', contentHeight)
            localStorage.setItem('sidebarHeight', sidebarHeight)

            commit('setContentStyle', { 'min-height': contentHeight + 'px' });
            commit('setSidebarStyle', { 'min-height': sidebarHeight + 'px' });
        },
        
    },
    getters: {
        customers: state => state.customers,
        customer: state => state.customer,        
        contacts: state => state.contacts,
        contact: state => state.contact,
        user: state => state.user,
        loader: state => state.loader,
        layoutContentStyle: state => state.layoutContentStyle,
        layoutSidebarStyle: state => state.layoutSidebarStyle,
        layoutSidebarClass: state => state.layoutSidebarClass,
        layoutContentRightOpen: state => state.layoutContentRightOpen,
        layoutContentRightType: state => state.layoutContentRightType
    }
    
})