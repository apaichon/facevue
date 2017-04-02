<template>
<div class="ui segment">
   <div class="ui middle aligned divided list">
    <div v-for="item in getItems" class="item">
        <div class="right floated content">
            <div class="ui buttons">
                <button class="ui orange basic button"><i class="write icon"></i></button>
                <button class="ui red basic button"><i class="erase icon"></i></button>
                <button class="ui teal basic button"><i class="list icon"></i></button>
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
    export default {
      name: 'listview',
      props: ['items', 'buttonTexts', 'keys'],
      computed: {
        getItems: function () {
          return this.items
        }
      }
    }
</script>
