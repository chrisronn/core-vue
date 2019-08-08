<template>
  <div
    :class="classes"
  >
    <table
      v-once
      :id="tableId"
      ref="table"
      :class="className"
      cellpadding="0"
    >
      <thead>
        <tr>
          <th
            v-for="(field, i) in options.columns"
            :key="i"
            :class="field.className"
          >
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>

// https://github.com/niiknow/vue-datatables-net

import Vue from 'vue'

let myUniqueId = 1

export default {
  name: 'CustomerTable',
  props: {
    id: {type: String, default: null},
    containerClassName: {type: String,default: ''},
    className: {type: String, default: 'table dt-responsive table-hover table-bordered'},
    opts: {type: Object},
    fields: {type: Object},
    jquery: {type: Object},
    dataLoader: {type: Function},
    hideFooter: {type: Boolean}
  },
  data() {
    // initialize defaults
    return {
      tableId: null,
      options: {
        /*eslint-disable */
        dom: "<<'float-left'i><'float-right'f><'clearfix'>>rt<<'float-left'l><'float-right'p><'clearfix'>>",
        /*eslint-enable */
        columns: [],
        language: {
          infoFiltered: ''
        },
        lengthMenu: [ [15, 100, 500, 1000, -1], [15, 100, 500, 1000, 'All'] ],
        pageLength: 15,
        buttons: []  // remove any button defaults
      },
      dataTable: null
    }
  },
  computed: {
    jq() {
      return this.jquery || window.jQuery
    },
    classes() {
      const that  = this
      let classes = `${that.containerClassName}`
      if (this.hideFooter) {
        classes += ' hide-footer'
      }

      return classes
    }
  },
  created() {
    const vm     = this
    const jq     = vm.jq
    const orders = []

    let startCol = 0
    let icol     = 0

    vm.tableId = vm.id || `customertable${myUniqueId++}`

    // allow user to override default options
    if (vm.opts) {
      vm.options = jq.extend({}, vm.options, vm.opts)
    }


    // if fields are passed in, generate column definition
    // from our custom fields schema
    if (vm.fields) {
      const fields = vm.fields
      const cols   = vm.options.columns

      for (let k in fields) {
        const field = fields[k]
        field.name  = field.name || k

        // disable search and sort for local field
        if (field.isLocal) {
          field.searchable = false
          field.sortable  = false
        }

        // generate
        let col = {
          title:      field.label || field.name,
          width:      field.width,
          data:       field.data || field.name,
          name:       field.name,
          className:  field.className
        }

        if (field.width) {
          col.width = field.width
        }

        if (field.hasOwnProperty('defaultContent')) {
          col.defaultContent = field.defaultContent
        }

        if (field.hasOwnProperty('sortable')) {
          col.orderable = field.sortable
        }

        if (field.hasOwnProperty('visible')) {
          col.visible = field.visible
        }

        if (field.hasOwnProperty('searchable')) {
          col.searchable = field.searchable
        }

        if (field.template) {
          field.render = vm.compileTemplate(field.template)
        }

        if (field.render) {
          col.render = field.render
        }

        // console.log(col)
        cols.push(col)

        if (field.defaultOrder) {
          orders.push([icol, field.defaultOrder])
        }

        icol++
      }
    }

    // apply orders calculated from above
    vm.options.order = vm.options.order || orders

    

    if (startCol > 0) {
      if (vm.options.order) {
        vm.options.order.forEach((v) => {
          v[0] += startCol
        })
      } else {
        vm.options.order = [[startCol, 'asc']]
      }
    }

    // handle local data loader
    if (vm.dataLoader) {
      delete vm.options.ajax
      vm.options.serverSide = false
    }
  },
  mounted() {
    const vm = this
    const jq = vm.jq
    const $el = jq(vm.$refs.table)

    // console.log(vm.options.buttons)
    vm.dataTable = $el.DataTable(vm.options)

    // finally, load data
    if (vm.dataLoader) {
      vm.reload()
    }
  },
  beforeDestroy() {
    const vm = this
    if (vm.dataTable) {
      vm.dataTable.destroy(true)
    }

    vm.dataTable = null
  },
  methods: {
    /**
     * Vue.compile a template string and return the compiled function
     *
     * @param  {String} template the string template
     * @return {Function}          the compiled template function
     */
    compileTemplate(template) {
      const vm  = this
      const jq  = vm.jq
      const res = Vue.compile(`<div>${template}</div>`)
      const renderFunc = (data, type, row, meta) => {
        const comp = new Vue({
          data: {
              data: data,
              type: type,
              row: row,
              meta: meta
          },
          render: res.render,
          staticRenderFns: res.staticRenderFns
        }).$mount()
        return jq(comp.$el).html()
      }

      return renderFunc
    },
    /**
     * Set table data array that was loaded from somewhere else
     * This method allow for local setting of data; though, it
     * is recommended to use ajax instead of this.
     *
     * @param {Array} data   the array of data
     * @return {Object}            the component
     */
    setTableData(data) {

      console.log("hello data: " + data)  
      const vm = this
      if (data.constructor === Array) {
        vm.dataTable.clear().rows.add(data)
        vm.dataTable.draw(false)
        vm.dataTable.columns.adjust()
      }
      return vm
    },
    /**
     * pass through reload method
     *
     * @param  {Boolean}  resetPaging true to reset current page position
     * @return {Object}            the component
     */
    reload(resetPaging = false) {
      const vm = this
      if (vm.dataLoader) {
        // manual data loading
        vm.dataLoader((data) => {
          if (data && !data.data) {
            data = { data: data }
          }
          vm.setTableData( data.data )

          vm.$emit('reloaded', data, vm)
        })
      } else {
        vm.dataTable.ajax.reload( (data) => { vm.$emit('reloaded', data, vm) } , resetPaging )
      }

      return vm
    },
    search(value) {
      const vm = this
      vm.dataTable.search( value ).draw()

      return vm
    },
    setPageLength(value) {
      const vm = this
      vm.dataTable.page.len( value )

      return vm.reload()
    },
    getServerParams() {
      if (this.dataLoader) {
        return {}
      }

      return this.dataTable.ajax.params()
    }
  }
}
</script>
<style>

</style>