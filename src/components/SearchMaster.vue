<template>
   <div class="ui fluid action input">
      <input type="text" :placeholder="searchPlaceholder" :value="getTextSearch"  @change="onChangedTextSearch">
      <button class="ui basic button" @click="searchClicked" >
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
      props: ['searchText', 'createText', 'searchPlaceholder', 'menuId', 'textSearchInput'],
      computed: {
        getTextSearch () {
          return this.textSearchInput
        }
      },
      methods: {
        createClicked () {
          this.$emit('createClicked')
        },
        searchClicked () {
          console.log(this.textSearchInput)
          this.$emit('searchClicked', this.textSearchInput)
        },
        onChangedTextSearch (e) {
          this.$emit('onChangedTextSearch', e.target.value)
        }
      }
    }
</script>
