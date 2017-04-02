<template>
    <div>
        <pageheader class="ui center aligned container" title="Test Page" subtitle="gogogogogowerewrewrwerwereeeeeeee11111111" icon="icon search" ></pageheader>
        <searchmaster :menuId="menuId" searchText="Search" createText="Create New" searchPlaceholder="Search ..."></searchmaster>
      <div class="ui styled fluid accordion">
      <div class="title active">
        <i class="dropdown icon"></i> Product List
      </div>
      <div class="content active">
        <listview :keys="keys" :buttonTexts="buttonTexts" :items="items"></listview>
        <datapager :options="dataPagerOpt"></datapager>
      </div>
       <div class="title">
        <i class="dropdown icon"></i> Product Detail
      </div>
      <div class="content">
        <p class="transition hidden">There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that
          they find to be compatible with their own lifestyle and desires from a companion.</p>
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

    export default {
      name: 'testpage',
      components: { pageheader, searchmaster, datapager, listview },
      mounted: function () {
        $('.ui.accordion').accordion()
      },
      data () {
        return {
          message: 'hahahaha',
          menuId: 'pagerMenu',
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
          items: [
            {name: 'Item 1', description: 'Description 1'},
            {name: 'Item 2', description: 'Description 2'}
          ]
        }
      }
    }
</script>

