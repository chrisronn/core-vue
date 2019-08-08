<template>
    <div :class="[
            {'control-sidebar-slide-open':isOpenContentRight},
            sidebarClass
        ]">
        <div class="wrapper">

            <SiteHeader />

            <div class="content-wrapper" :style="$store.getters.layoutContentStyle">      
                <SiteContent />
            </div> 
            <div id="sidebar-overlay" @click="resetOverlay"></div>

            <SiteFooter />
            <SiteRight />    
        </div>
    </div>
</template>

<script>

import SiteHeader from './SiteHeader.vue'
import SiteRight from './SiteRight.vue'
import SiteFooter from './SiteFooter.vue'
import SiteContent from './Content.vue'

export default {
    name: 'CustomerCard',
    components: {
        SiteHeader,
        SiteRight,
        SiteFooter,
        SiteContent
    }, 
    methods: {
        resetOverlay() {
            this.$store.commit('toggleSidebarForce', false);
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
