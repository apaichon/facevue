<template>
    <div class="ui input center aligned container">
    <button class="ui icon button" @click="onFirstClicked">
    <i class="angle double left icon"></i>
    {{options.firstText}}
    </button>
    <button class="ui icon button" @click="onPreviousClicked">
    <i class="angle left icon"></i>
    {{options.previousText}}
    </button>
    <a class="item">
        <div class="ui green horizontal label">{{options.totalItems}} <br> {{totalItems}}</div>
    </a>
    <input type="number" class="ui center aligned segment" :value="currentPage" :placeholder="options.currentPage" @change="onCurrentPageChanged" number/>
    <a class="item">
        &nbsp;
        <div class="ui green horizontal label">{{options.totalPages}}<br> {{totalPages}}</div>
    </a>
    <button class="ui icon button" @click="onNextClicked">
    {{options.nextText}}
    <i class="angle right icon"></i>
    </button>
    <button class="ui icon button" @click="onLastClicked">
    {{options.lastText}}
    <i class="angle double right icon"></i>
    </button>
    </div>
</template>
<script>
    export default {
      name: 'datapager',
      props: ['options', 'totalPages', 'totalItems', 'currentPage'],
      computed: {
        getCurrentPage () {
          return this.currentPage
        }
      },
      methods: {
        onCurrentPageChanged (e) {
          this.$emit('onCurrentPageChanged', e.target.value)
        },
        onFirstClicked (e) {
          this.$emit('onFirstClicked', e)
        },
        onPreviousClicked (e) {
          this.$emit('onPreviousClicked', e)
        },
        onNextClicked (e) {
          this.$emit('onNextClicked', e)
        },
        onLastClicked (e) {
          this.$emit('onLastClicked', e)
        }
      }
    }
</script>
