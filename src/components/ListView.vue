<template>
<div class="ui segment">
   <div class="ui middle aligned divided list">
    <div v-for="(item, index) in getItems" class="item">
        <div class="right floated content">
            <div class="ui buttons">
                <button name="buttonEditor" class="ui orange basic button" data-content="Edit Item" @click="editClicked(index)" ><i class="write icon"></i></button>
                <button @click="deleteClicked" name="buttonEditor" class="ui red basic button" data-content="Delete Item"><i class="erase icon"></i></button>
                <button @click="moreClicked" name="buttonEditor" class="ui teal basic button" data-content="View more item description"><i class="list icon"></i></button>
            </div>
        </div>
      
        <img v-if="keys.imgKey" class="ui avatar image" :src="item[keys.imgKey]">
        <div class="content">
            <a class="header">{{item[keys.headerKey]}}</a>
            <div class="description">
                <p>{{item[keys.descKey]}}</p>
            </div>
        </div>
    </div>
</div>
</div> 
</template>
<script>
    import $ from 'jquery'
    export default {
      name: 'listview',
      props: ['items', 'buttonTexts', 'keys'],
      computed: {
        getItems: function () {
          return this.items
        }
      },
      mounted: function () {
        $('button[name="buttonEditor"]').popup()
      },
      methods: {
        editClicked: function (index) {
          console.log('Edit Clicked', index)
          this.$emit('editClicked', index)
        },
        deleteClicked: function () {
          this.$emit('deleteClick')
        },
        moreClicked: function () {
          this.$emit('moreClick')
        }
      }

    }
</script>
