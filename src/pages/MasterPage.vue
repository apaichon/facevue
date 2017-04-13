<template>
    <div>
        <pageheader class="ui center aligned container" :title="masterPage.title" :subtitle="masterPage.subtitle" icon="icon lab" ></pageheader>
        <searchmaster :menuId="menuId" searchText="Search" createText="Create New" searchPlaceholder="Search ..." @searchClick="setMode('CREATE')" ></searchmaster>
      <div class="ui styled fluid accordion">
      <div class="title active">
        <i class="dropdown icon"></i> {{masterPage.title}}
      </div>
      <div class="content active">
        <listview :keys="keys" :buttonTexts="buttonTexts" :items="getItems" @editClicked="update"></listview>
        <datapager :options="dataPagerOpt"></datapager>
      </div>
       <div class="title">
        <i class="dropdown icon"></i> {{masterPage.titleDetail}}
        <a class="ui teal tag label">{{getMode}}</a>
      </div>
      <div class="content">
            <div class="field">
                <label>Product Selected</label>
                <select class="ui primary dropdown" id="ddlProductSelected">
                    <option v-for="a in getItems" :value="a.productCode" :v-model="selectedItem">{{a.productCode + '-' + a.productName}} </option>
                </select>
            </div>
       <form class="ui form" v-on:submit.prevent>
   
        <div class="ui divider"></div>
            <div class="field required">
                <label>Product Code</label>
                <input id="productCode" type="text" v-model="item.productCode" name="productCode" placeholder="Product Code">
            </div>
            <div class="field required">
                <label>Product Name</label>
                <input id="productName" type="text" name="productName" v-model="item.productName" placeholder="Product Name">
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
            <div class="ui error message transition hidden">
                <i class="close icon"></i>
                <div class="header">
                    {{statusTitle}}
                </div>
                <ul class="list">
                    <li v-for="m in fieldMessages ">{{'* ' + m}}</li>
                </ul>
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
    import * as modes from '@/stores/crudMode'

/* Members */
    var mode = modes.CREATE
    var fieldMessages = []
    var item = {}
    var items = []
    var selectedItem = {}

    const onSuccess = () => {
      $('.ui.error.message').transition('hide')
      switch (mode) {
        case modes.CREATE:
          addItemToStore(options.item)
          break
        case modes.UPDATE:

          break
      }
    }
    const onFailure = (formErrors, fields) => {
      focusOnError(fields)
      fieldMessages = formErrors
      $('.ui.error.message').transition('show')
      return false
    }

    const dataPagerOpt = {
      firstText: 'First',
      previousText: 'Previous',
      nextText: 'Next',
      lastText: 'Last',
      totalPages: 'Total Pages',
      totalItems: 'Total Items',
      currentPage: 'Current Page'
    }
    const keys = {
      headerKey: 'productCode',
      descKey: 'productName',
      itemsKey: 'products',
      itemKey: 'product'
    }
    const buttonTexts = {
      edit: 'Edit',
      delete: 'Delete',
      moreDetail: 'More ...'
    }
    const masterPage = {
      title: 'Product Maintenance',
      subtitle: `This is a product master page. It's purpose to maintenance , create,
          update, delete and search.`,
      titleList: 'Product List',
      titleDetail: 'Product Detail'
    }
    const statusList = [
      {code: 0, name: 'In Active'},
      {code: 1, name: 'Active'}
    ]

    const validateRules = {
      fields: {
        code: {
          identifier: 'productCode',
          rules: [{
            type: 'empty',
            prompt: 'Please enter your product code!'
          }]
        },
        name: {
          identifier: 'productName',
          rules: [{
            type: 'empty',
            prompt: 'Please enter your product name!'
          }]
        }
      },
      onFailure: onFailure,
      onSuccess: onSuccess
    }
    const focusOnError = (fields) => {
      $.each(fields, (e) => {
        var ele = $('#' + e)
        var fail = (ele.val() === false || ele.val().length === 0)
        if (fail) {
          ele.focus()
          $('html,body').animate({
            scrollTop: ele.offset().top - ($(window).height() - ele.outerHeight(true)) / 2
          }, 200)
          return false
        }
      })
    }

    const options = {
      statusTitle: 'Error',
      fieldMessages: fieldMessages,
      menuId: 'pagerMenu',
      dataPagerOpt: dataPagerOpt,
      keys: keys,
      item: item,
      items: items,
      selectedItem: selectedItem,
      buttonTexts: buttonTexts,
      masterPage: masterPage,
      statusList: statusList,
      validateRules: validateRules
    }
    
    const setMode = (mode) => {
      switch (mode) {
        case modes.CREATE:
          create()
          break
        case modes.UPDATE:
          update()
          break
      }
    }

    const create = () => {
      $('.ui.accordion').accordion('open', 1)
      $('#productCode').attr('disabled', false)
      options.item = {}
      $('#productCode').focus()
      productStore.dispatch('setMode', modes.CREATE)
    }
    const update = () => {
      console.log('Updated')
      $('.ui.accordion').accordion('open', 1)
      $('#productCode').attr('disabled', true)
      $('#productName').focus()
      productStore.dispatch('setMode', modes.UPDATE)
    }
    const save = () => {
      $('.ui.form').form(validateRules)
    }
    const addItemToStore = (item) => {
      productStore.dispatch('addProducts', item).then(function () {
        $('#ddlProductSelected').prop('selectedIndex', productStore.state[keys.itemsKey].length - 1)
        setMode(modes.UPDATE)
      })
    }

    export default {
      name: 'masterpage',
      components: { pageheader, searchmaster, datapager, listview },
      productStore,
      mounted: function () {
        $('.ui.accordion').accordion()
      },
      data () {
        return options
      },
      computed: {
        getItem: function () {
          return productStore.state[keys.itemKey]
        },
        getItems: function () {
          return productStore.state[keys.itemsKey]
        },
        getMode: function () {
          return productStore.state.mode
        }
      },
      methods: {
        setMode: setMode,
        create: create,
        update: update,
        save: save
      }
    }
</script>
