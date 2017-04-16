<template>
    <div :id="id" class="ui modal">
        <div class="header">{{header}}</div>
        <div class="content">
            <div class="ui form">
                <div class="inline field" v-for="a in itemsDetail">
                    <a class="author">{{a.label}}</a>
                        <label >{{a.value}}</label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'moredetailmodal',
  props: ['header', 'icon', 'id', 'itemsDetail']
}
</script>
