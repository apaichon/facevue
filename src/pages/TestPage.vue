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
                <label>Product Selected</label>
                <select class="ui primary dropdown" id="ddlProductSelected" v-model="states.selectedItem" @change="selectedItem">
                    <option v-for="(a, index) in getItems" :value="index" >{{a.productCode + '-' + a.productName}} </option>
                </select>
            </div>
       <form class="ui form" v-on:submit.prevent>
        <div class="ui divider"></div>
            <div class="field required">
                <label>Product Code</label>
                <input id="productCode" type="text" v-model="states.item.productCode" name="productCode" placeholder="Product Code">
            </div>
            <div class="field required">
                <label>Product Name</label>
                <input id="productName" type="text" name="productName" v-model="states.item.productName" placeholder="Product Name">
            </div>
             <div class="field">
                <label>Product Category</label>
                <input type="text" name="productCategory" v-model="states.item.productCategory" placeholder="Product Category">
            </div>
            <div class="field">
                <label>Product Type</label>
                <input type="text" name="productType" v-model="states.item.productType" placeholder="Product Type">
            </div>
            <div class="field">
                <label>Product Standard Value</label>
                <input type="text" name="productValue" v-model="states.item.productValue" placeholder="Product Standard Value">
            </div>
             <div class="field">
                <label>Product Unit</label>
                <input type="text" name="productUnit" v-model="states.item.productUnit" placeholder="Product Unit">
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
    import productStore from '@/stores/products'
    import MasterPage from '@/classes/masterPage'
    import confirmmodal from '@/components/confirmmodal'
    import moredetailmodal from '@/components/moredetailmodal'
    
    var master = new MasterPage()
    master.use({store: productStore})

    export default {
      name: 'testpage',
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
