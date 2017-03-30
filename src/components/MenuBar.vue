<template>
    <div>
  <v-app id="sidebar-example-2" class="grey darken-1" top-toolbar left-fixed-sidebar sidebar-under-toolbar>
    <v-toolbar class="secondary">
      <v-toolbar-side-icon @click.native.stop="sidebar2 = !sidebar2" />
       <v-toolbar-logo>Face Mind</v-toolbar-logo>
    </v-toolbar>
    <main>
      <v-sidebar class="blue darken-3" drawer v-model="sidebar2">
        <v-list dense>
          <v-list-item v-for="item in items">
            <v-list-tile>
              <v-list-tile-title v-text="item.title" :key="item.id" />
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-sidebar>
      <v-content>
        <v-container fluid> </v-container>
      </v-content>
    </main>
  </v-app>
</div>
</template>
<script>
  export default {
    name: 'menubar',
    data () {
      return {
        itemGroup: [
          { header: 'Header' },
          {
            title: 'Parent',
            group: '/company',
            items: [
              { title: 'Child' },
              { title: 'Child' },
              { title: 'Child' }
            ]
          },
          { title: 'Link' },
          { title: 'Link' },
          { divider: true },
          { header: 'Another Header' },
          { title: 'Link' }
        ]
      }
    }
  }

</script>
