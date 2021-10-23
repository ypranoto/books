<template>
  <v-menu
    bottom
    left
    min-width="200"
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        class="ml-2"
        min-width="0"
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item @click="logout">
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'DefaultAccount',

    data: () => ({
      profile: [
        { divider: true },
        { title: 'Log out' },
      ],
    }),

    methods: {
      logout () {
        axios.get('auth/logout').then(() => {
          this.$store.commit('authentication', null)
          this.$store.commit('Authorization', false)
          this.$store.commit('users', {})
        })
      },
    },
  }
</script>
