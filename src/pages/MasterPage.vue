<template>
    <div>
        <pageheader class="ui center aligned container" :title="masterPage.title" :subtitle="masterPage.subtitle" icon="icon lab" ></pageheader>
        <searchmaster :menuId="menuId" searchText="Search" createText="Create New" searchPlaceholder="Search ..." @searchClick="setMode('CREATE')" ></searchmaster>
      <div class="ui styled fluid accordion">
      <div class="title active">
        <i class="dropdown icon"></i> {{masterPage.title}}
      </div>
      <div class="content active">
        <listview :keys="keys" :buttonTexts="buttonTexts" :items="items"></listview>
        <datapager :options="dataPagerOpt"></datapager>
      </div>
       <div class="title">
        <i class="dropdown icon"></i> {{masterPage.titleDetail}}
        <a class="ui teal tag label">{{mode}}</a>
      </div>
      <div class="content">
        
       <form class="ui form" v-on:submit.prevent>
       <div class="field">
                <label>Product Selected</label>
                <select class="ui primary dropdown" name="ddlProductSelected">
                    <option v-for="a in getItems" :value="a.productCode">{{a.productCode + '-' + a.productName}} </option>
                </select>
            </div>
        <div class="ui divider"></div>
            <div class="field required">
                <label>Product Code</label>
                <input id="productCode" type="text" v-model="item.productCode" name="productCode" placeholder="Product Code">
            </div>
            <div class="field required">
                <label>Product Name</label>
                <input type="text" name="productName" v-model="item.productName" placeholder="Product Name">
            </div>
             <div class="field">
                <label>Product Category</label>
                <input type="text" name="productCategory" v-model="item.productCategory" placeholder="Product Category">
            </div>
            <div class="field">
                <label>Product Type</label>
                <input type="text" name="productType" v-model="item.productType" placeholder="Product Type">
            </div>
            <div class="field">
                <label>Product Standard Value</label>
                <input type="text" name="productValue" v-model="item.productValue" placeholder="Product Standard Value">
            </div>
             <div class="field">
                <label>Product Unit</label>
                <input type="text" name="productUnit" v-model="item.productUnit" placeholder="Product Unit">
            </div>
            <div class="field required">
             <label>Status</label>
                <select class="ui dropdown">
                <option v-for="s in statusList" :value="item.statusCode">{{s.name}}</option>
                </select>
               
            </div>
             <div class="ui buttons center aligned container">
                <button class="ui primary basic button" @click="save()"><i class="save icon"></i>Save</button>
                <button class="ui primary basic button"><i class="sign out icon"></i>Close</button>
                <button class="ui primary basic button"><i class="undo icon"></i>Clear</button>
            </div>
        </form>

      </div>
      </div>
      
    </div>
</template>

<script>
    import pageheader from '@/components/PageHeader'
    import searchmaster from '@/components/SearchMaster'
    import datapager from '@/components/DataPager'
    import listview from '@/components/listview'
    import $ from 'jquery'
    import productStore from '@/stores/products'

    const CREATE = 'CREATE'
    const UPDATE = 'UPDATE'

    export default {
      name: 'testpage',
      components: { pageheader, searchmaster, datapager, listview },
      productStore,
      mounted: function () {
        $('.ui.accordion').accordion()
      },
      data () {
        return {
          message: 'hahahaha',
          menuId: 'pagerMenu',
          mode: CREATE,
          dataPagerOpt: {
            firstText: 'First',
            previousText: 'Previous',
            nextText: 'Next',
            lastText: 'Last',
            totalPages: 'Total Pages',
            totalItems: 'Total Items',
            currentPage: 'Current Page'
          },
          keys: {
            headerKey: 'name',
            descKey: 'description'
          },
          buttonTexts: {
            edit: 'Edit',
            delete: 'Delete',
            moreDetail: 'More ...'
          },
          masterPage: {
            title: 'Product Maintenance',
            subtitle: `This is a product master page. It's purpose to maintenance , create,
            update, delete and search.`,
            titleList: 'Product List',
            titleDetail: 'Product Detail'
          },
          item: {},
          items: [
            {name: 'Item 1', description: 'Description 1'},
            {name: 'Item 2', description: 'Description 2'}
          ],
          statusList: [
            {code: 0, name: 'In Active'},
            {code: 1, name: 'Active'}
          ],
          validateRules: {
            fields: {
              name: {
                identifier: 'productCode',
                rules: [{
                  type: 'empty',
                  prompt: 'Please enter your product code!'
                }
                ]
              }
            }
          }
        }
      },
      computed: {
        getItems: function () {
          return productStore.state.products
        }
      },
      methods: {
        setMode: function (mode) {
          switch (mode) {
            case CREATE:
              this.create()
              break
            case UPDATE:
              break
          }
        },
        create: function () {
          this.item = {}
          this.mode = CREATE
          $('.ui.accordion').accordion('open', 1)
          $('#productCode').focus()
        },
        save: function () {
          switch (this.mode) {
            case CREATE:
              this.addItem()
              break
            case UPDATE:
              break
          }
        },
        addItem: function () {
          this.validate()
          productStore.dispatch('addProducts', this.item)
          this.setMode(UPDATE)
          // console.log('products', productStore.state.products)
        },
        validate: function () {
          var result = $('.ui.form').form(this.validateRules)
          console.log(result)
        }
      }
    }
</script>
