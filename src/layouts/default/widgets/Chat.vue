<template>
  <v-badge
    bordered
    bottom
    color="red"
    offset-x="20"
    offset-y="45"
    content="6"
  >
    <v-btn
      class="ml-2"
      min-width="0"
      text
      to="/admins/chats"
      exact
    >
      <v-icon>mdi-forum</v-icon>
    </v-btn>
  </v-badge>
</template>

<script>
  export default {
    name: 'Chat',
  }
</script>
