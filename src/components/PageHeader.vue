<template>
<div>
    <h2 class="ui icon header">
      <i :class="icon"></i>
      <div class="content">
        {{title}}
        <div class="sub header">{{subtitle}}</div>
      </div>
    </h2>
  </div>
</template>

<script>
  export default {
    name: 'pageheader',
    props: ['subtitle', 'title', 'icon'],
    data () {
      return {
      }
    }
  }
</script>
