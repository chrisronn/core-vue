<template>
    <div :class="[
            {'control-sidebar-slide-open':isOpenContentRight},
            sidebarClass
        ]">
        <div class="wrapper">

            <SiteHeader />

            <div class='ajax-loader icon-loader text-center' v-if="this.$store.getters.loader"><i class='fas fa-spinner fa-pulse'></i></div>
            <!--div class="floating-message text-center icon-loader" v-if="this.$store.getters.loader"><i class="fas fa-spinner fa-pulse"></i></div-->

            <div class="content-wrapper" :style="$store.getters.layoutContentStyle">      
                <SiteContent />
            </div> 
            <div id="sidebar-overlay" @click="resetOverlay"></div>

            <SiteFooter />
            <SiteRight />    
        </div>
        
        <GenericModal />

    </div>
</template>

<script>

import SiteHeader from './SiteHeader.vue'
import SiteRight from './SiteRight.vue'
import SiteFooter from './SiteFooter.vue'
import SiteContent from './Content.vue'
import GenericModal from './GenericModal.vue'

export default {
    name: 'CustomerCard',
    components: {
        SiteHeader,
        SiteRight,
        SiteFooter,
        SiteContent,
        GenericModal
    }, 
    methods: {
        resetOverlay() {
            this.$store.dispatch('openSidebar', false);
        }
    },
    computed: {

        isOpenContentRight() {
            return this.$store.getters.layoutContentRightOpen;
        },
        sidebarClass() {
            return this.$store.getters.layoutSidebarClass;            
        }
    },
    data () {      
      return {}
    }
}
</script>

<style scoped>
</style>
