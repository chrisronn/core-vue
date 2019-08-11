<template>
    <aside id="contentLeft" class="main-sidebar" :style="$store.getters.layoutSidebarStyle">
        <div class="sidebar">
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" role="menu" data-accordion="false">
                    
                <li class="nav-item">
                <router-link class="nav-link" :to="{name: 'CustomerCard', params: {customerId: customerId}}">
                <i class="nav-icon fas fa-th"></i>
                <p>Kundkort</p>
                </router-link>
                </li>
                    
                <li class="nav-item">
                <router-link class="nav-link" :to="{name: 'CustomerEdit', params: {customerId: customerId}}">
                <i class="nav-icon fas fa-info-circle"></i>
                <p>Information</p>
                </router-link>
                </li>

                <li class="nav-item">
                <router-link class="nav-link" :to="{name: 'CustomerContactList', params: {customerId: customerId}}">
                <i class="nav-icon fas fa-user"></i>
                <p>Kontakter</p>
                </router-link>
                </li>
                    
                </ul>
            </nav>
        </div>
    </aside>
</template>

<script>
export default {
    name: 'ContentLeft',
    props: ["customerId"]
}
</script>

<style scoped>
</style>