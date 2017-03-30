<template>
 <div class="ui top fixed menu inverted">
     <a class="item" v-on:click="showSideMenu"><i class="align justify icon"> </i> Menu</a>
    <div class="item">
        <img />
        Face Mind
    </div>
    <a class="item">Features</a>
    <a class="item">Testimonials</a>
    <a class="item">Sign-in</a>
</div>
</template>
<script>
import $ from 'jquery'

export default {
  name: 'topmenu',
  data () {
    return {
      msg: 'Top Menu'
    }
  },
  methods: {
    showSideMenu: function () {
      $('.ui.sidebar').sidebar('toggle')
    }
  }
}
</script>
