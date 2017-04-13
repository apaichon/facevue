<template>
   <div class="ui fluid action input">
      <input type="text" :placeholder="searchPlaceholder">
      <button class="ui basic button" >
      <i class="icon search"></i>
      {{searchText}}
      </button>
      <div class="ui teal labeled icon button" @click="createClicked">
         {{createText}}
         <i class="add icon"></i>
      </div>
   </div>
</template>

<script>
    export default {
      name: 'searchmaster',
      props: ['searchText', 'createText', 'searchPlaceholder', 'menuId'],
      methods: {
        createClicked: function () {
          this.$emit('createClicked')
        }
      }
    }
</script>
