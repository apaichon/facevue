<template>
    <div>
        <pageheader class="ui center aligned container" :title="labels.title" :subtitle="labels.subtitle" icon="icon lab" ></pageheader>
        <searchmaster :menuId="ids.menuId" searchText="Search" createText="Create New" searchPlaceholder="Search ..." @createClicked="setMode('CREATE')"  @searchClicked="searchItems" @onChangedTextSearch="setTextSearch" :textSearchInput="getTextSearch" ></searchmaster>
      <div class="ui styled fluid accordion">
      <div class="title active">
        <i class="dropdown icon"></i> {{labels.title}}
      </div>
      <div class="content active">
        <listview :keys="bindingKeys" :items="getItems" @editClicked="update" @deleteClicked="del" @moreClicked="showMoreDetail"></listview>
        <datapager :options="labels.dataPager"  :totalItems="states.totalItems" :totalPages="states.totalPages" :currentPage="getCurrentPage"
         @onCurrentPageChanged="setCurrentPage" @onFirstClicked="firstPage" @onPreviousClicked="previousPage" @onNextClicked="nextPage" @onLastClicked="lastPage" ></datapager>
      </div>
       <div class="title">
        <i class="dropdown icon"></i> {{labels.titleDetail}}
        <a class="ui teal tag label">{{getMode}}</a>
      </div>
      <div class="content">
            <div class="field">
                <label>Product Category Selected</label>
                <select class="ui primary dropdown" id="ddlProductCatgegorySelected" v-model="states.selectedItem" @change="selectedItem">
                    <option v-for="(a, index) in getItems" :value="index" >{{a.productCategoryCode + '-' + a.productCategoryName}} </option>
                </select>
            </div>
       <form class="ui form" v-on:submit.prevent>
        <div class="ui divider"></div>
            <div class="field required">
                <label>Product Category Code</label>
                <input id="productCategoryCode" type="text" v-model="states.item.productCategoryCode" name="productCategoryCode" placeholder="Product Category Code">
            </div>
            <div class="field required">
                <label>Product Category Name</label>
                <input id="productCategoryName" type="text" name="productCategoryName" v-model="states.item.productCategoryName" placeholder="Product Category Name">
            </div>
             <div class="field">
                <label>Description</label>
                <textarea  name="description" v-model="states.item.description" placeholder="Description">
                </textarea>
            </div>
           
            <div class="field required">
             <label>Status</label>
                <select class="ui dropdown" v-model="states.item.statusCode">
                <option v-for="s in states.statusList" :value="s.code" >{{s.name}}</option>
                </select>
               
            </div>
             <div class="ui buttons center aligned container">
                <button class="ui primary basic button" @click="save()"><i class="save icon"></i>Save</button>
                <button class="ui primary basic button" @click="saveNew()"><i class="undo icon"></i>Save and New</button>
                <button class="ui primary basic button" @click="openList();firstPage()"><i class="sign out icon"></i>Close</button>
            </div>
            <div class="ui error message transition hidden">
                <i class="close icon"></i>
                <div class="header">
                    {{labels.statusTitle}}
                </div>
                <ul class="list">
                    <li v-for="m in states.fieldMessages ">{{'* ' + m}}</li>
                </ul>
            </div>
        </form>
      </div>
      </div>
      <modalmessage :modalId="ids.modalId" :headerTitle="messages.headerTitle" :message="messages.message" ></modalmessage>
      <confirmmodal id="confirmModal" header="Delete Item" :message="messages.deleteMsg" icon="help circle large icon" @onOKClicked="confirmDel"></confirmmodal>
      <moredetailmodal id="moredetail" header="Detail" :itemsDetail="states.itemsDetail"> </moredetailmodal>
    </div>
</template>

<script>
    import pageheader from '@/components/PageHeader'
    import searchmaster from '@/components/SearchMaster'
    import datapager from '@/components/DataPager'
    import listview from '@/components/listview'
    import modalmessage from '@/components/modalmessage'
    import productCategoriesStore from '@/stores/productCategories'
    import MasterPage from '@/classes/masterPage'
    import confirmmodal from '@/components/confirmmodal'
    import moredetailmodal from '@/components/moredetailmodal'
    import api from '@/api/productCategory'
    
    var master = new MasterPage(api)
    master.use({store: productCategoriesStore})
    master.members.labels.title = 'Product Category'
    master.members.labels.titleDetail = 'Product Category'
    master.members.labels.subtitle = `This is a product cagtegory master page. It's purpose to maintenance, create, update, delete and search.`
    master.members.validateRules = {
      fields: {
        code: {
          identifier: 'productCategoryCode',
          rules: [{
            type: 'empty',
            prompt: 'Please enter your product category code!'
          }]
        },
        name: {
          identifier: 'productCategoryName',
          rules: [{
            type: 'empty',
            prompt: 'Please enter your product category name!'
          }]
        },
        statusCode: {
          identifier: 'statusCode',
          rules: [{
            type: 'empty',
            prompt: 'Please enter your status!'
          }]
        }
      }
    }

    master.members.bindingKeys.headerKey = 'productCategoryCode'
    master.members.bindingKeys.descKey = 'productCategoryName'
    master.members.bindingKeys.itemsKey = 'productCategories'
    master.members.bindingKeys.itemKey = 'productCategory'
    master.members.bindingKeys.primaryKey = 'productCategoryCode'
    master.members.bindingKeys.moreDetails.fields = [
      {
        label: 'Product Category Code',
        keyId: 'productCategoryCode'
      },
      {
        label: 'Product Category Name',
        keyId: 'productCategoryName'
      },
      {
        label: 'Status',
        keyId: 'status'
      }
    ]
    master.members.ids.selectedItemId = 'ddlProductCategorySelected'
    master.members.ids.modalId = 'modalMessage'
    master.members.ids.confirmId = 'confirmModal'

    master.members.actionKeys.ADD_ITEM = 'addProductCategories'
    master.members.actionKeys.GET_ITEM = 'getProductCategory'
    master.members.actionKeys.GET_ITEMS = 'getProductCategories'
    master.members.actionKeys.GET_MODE = 'getMode'
    master.members.actionKeys.GET_TEXTSEARCH = 'getTextSearch'
    master.members.actionKeys.GET_CURRENTPAGE = 'getCurrentPage'
    master.members.actionKeys.SET_MODE = 'setMode'
    master.members.actionKeys.SET_ITEMS = 'setProductCategories'
    master.members.actionKeys.SET_TEXTSEARCH = 'setTextSearch'
    master.members.actionKeys.SET_CURRENTPAGE = 'setCurrentPage'
    master.members.actionKeys.UPDATE_ITEM = 'updateProductCategory'
    master.members.actionKeys.REMOVE_ITEM = 'removeProductCategory'

    export default {
      name: 'productCategory',
      components: { pageheader, searchmaster, datapager, listview, modalmessage, confirmmodal, moredetailmodal },
      mounted: function () {
        master.actions.uis.createAccordion()
        var json = {'search': '', 'currentPage': 1}
        master.actions.crud.getItems(json)
      },
      data () {
        return master.members
      },
      computed: {
        getItems: () => {
          console.log('computed get Items', master.dispatch.getItems())
          return master.dispatch.getItems()
        },
        getItem: () => {
          return master.dispatch.getItem()
        },
        getMode: () => {
          console.log('mode', master.dispatch.getMode())
          return master.dispatch.getMode()
        },
        getTextSearch: () => {
          console.log('computed text search', master.dispatch.getTextSearch())
          return master.dispatch.getTextSearch()
        },
        getCurrentPage: () => {
          return master.dispatch.getCurrentPage()
        }
      },
      methods: {
        firstPage: master.actions.crud.firstPage,
        previousPage: master.actions.crud.previousPage,
        nextPage: master.actions.crud.nextPage,
        lastPage: master.actions.crud.lastPage,
        setMode: master.actions.crud.setMode,
        setTextSearch: master.dispatch.setTextSearch,
        setCurrentPage: master.dispatch.setCurrentPage,
        create: master.actions.crud.create,
        update: master.actions.crud.update,
        del: master.actions.crud.del,
        confirmDel: master.actions.crud.remove,
        openList: master.actions.uis.openList,
        save: master.events.onSave,
        saveNew: master.events.onSaveNew,
        selectedItem: master.events.onSelectedItem,
        showMoreDetail: master.actions.crud.readMoreDetail,
        searchItems: master.actions.crud.searchItems
      }
    }
    
</script>
