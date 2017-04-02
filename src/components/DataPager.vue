<template>
    <div class="ui input center aligned container">
    <button class="ui icon button">
    <i class="angle double left icon"></i>
    {{options.firstText}}
    </button>
    <button class="ui icon button">
    <i class="angle left icon"></i>
    {{options.previousText}}
    </button>
    <a class="item">
        <div class="ui green horizontal label">{{options.totalItems}}</div>
    </a>
    <input type="text" class="ui center aligned segment" :placeholder="options.currentPage" />
    <a class="item">
        &nbsp;
        <div class="ui green horizontal label">{{options.totalPages}}</div>
    </a>
    <button class="ui icon button">
    {{options.nextText}}
    <i class="angle right icon"></i>
    </button>
    <button class="ui icon button">
    {{options.lastText}}
    <i class="angle double right icon"></i>
    </button>
    </div>
</template>
<script>
    export default {
      name: 'datapager',
      props: ['options']
    }
</script>
