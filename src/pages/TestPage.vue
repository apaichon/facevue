<template>
    <div>
        <pageheader class="ui center aligned container" :title="labels.title" :subtitle="labels.subtitle" icon="icon lab" ></pageheader>
        <searchmaster :menuId="ids.menuId" searchText="Search" createText="Create New" searchPlaceholder="Search ..." @createClicked="setMode('CREATE')" ></searchmaster>
      <div class="ui styled fluid accordion">
      <div class="title active">
        <i class="dropdown icon"></i> {{labels.title}}
      </div>
      <div class="content active">
        <listview :keys="bindingKeys" :items="getItems" @editClicked="update"></listview>
        <datapager :options="labels.dataPager"></datapager>
      </div>
       <div class="title">
        <i class="dropdown icon"></i> {{labels.titleDetail}}
        <a class="ui teal tag label">{{getMode}}</a>
      </div>
      <div class="content">
            <div class="field">
                <label>Product Selected</label>
                <select class="ui primary dropdown" id="ddlProductSelected">
                    <option v-for="a in getItems" :value="a.productCode" :v-model="states.selectedItem">{{a.productCode + '-' + a.productName}} </option>
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
                <select class="ui dropdown">
                <option v-for="s in states.statusList" :value="states.item.statusCode" v-model="states.selectedItem">{{s.name}}</option>
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
    
    var master = new MasterPage()
    master.use({store: productStore})

    export default {
      name: 'testpage',
      components: { pageheader, searchmaster, datapager, listview, modalmessage },
      mounted: function () {
        master.actions.uis.createAccordion()
        master.actions.crud.getItems()
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
        }
      },
      methods: {
        setMode: master.actions.crud.setMode,
        create: master.actions.crud.create,
        update: master.actions.crud.update,
        save: master.events.onSave
      }
    }
    
</script>
