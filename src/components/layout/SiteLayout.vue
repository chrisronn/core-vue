<template>
    <div :class="$store.getters.layoutSidebarClass">
        <div class="wrapper">

            <SiteHeader />

            <div class="content-wrapper" :style="$store.getters.layoutContentStyle">      
                <SiteContent />
            </div> 

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
    data () {      
      return {}
    }
}
</script>

<style scoped>
</style>
