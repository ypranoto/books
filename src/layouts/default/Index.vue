<template>
  <v-app>
    <div v-if="$store.state.Authorization === true">
      <default-bar />
      <default-drawer />
      <default-view />
      <default-footer />
    </div>
    <div v-else>
      <default-login />
    </div>
    <!-- <default-settings /> -->
  </v-app>
</template>

<script>
  import { get } from 'vuex-pathify'
  export default {
    name: 'DefaultLayout',

    components: {
      DefaultBar: () =>
    import(
      /* webpackChunkName: "default-app-bar" */
      './AppBar'
    ),
      DefaultDrawer: () =>
    import(
      /* webpackChunkName: "default-drawer" */
      './Drawer'
    ),
      DefaultFooter: () =>
    import(
      /* webpackChunkName: "default-footer" */
      './Footer'
    ),
      // DefaultSettings: () => import(
      //   /* webpackChunkName: "default-settings" */
      //   './Settings'
      // ),
      DefaultView: () =>
    import(
      /* webpackChunkName: "default-view" */
      './View'
    ),
      DefaultLogin: () =>
    import(
      /* webpackChunkName: "default-view" */
      '../../views/Login.vue'
    ),
    },

    computed: {
      ...get(['user', 'authentication', 'Authorization']),
    },

  }

</script>
