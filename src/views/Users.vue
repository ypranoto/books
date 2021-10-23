<template>
  <div>
    <template>
      <material-card
        color="accent"
        full-header
      >
        <template #heading>
          <v-tabs
            v-model="tab"
            background-color="transparent"
            slider-color="transparent"
            class="pa-8"
          >
            <v-tab
              href="#menu-1"
              @click="formType = 'create'"
            >
              DATA USER
            </v-tab>
            <v-tab
              href="#menu-2"
              @click="formType = 'create' , clear()"
            >
              {{ formType === 'create' ? 'Add User' : 'Edit User' }}
            </v-tab>
          </v-tabs>
        </template>
        <v-tabs-items
          v-model="tab"
          background-color="transparent"
        >
          <v-tab-item
            v-for="n in 2"
            :key="n"
          >
            <v-card-text>
              <template>
                <v-row
                  align="center"
                  class="flex-nowrap"
                >
                  <v-col cols="1">
                    <v-list-item-action>
                      <v-simple-checkbox color="secondary" />
                    </v-list-item-action>
                  </v-col>

                  <v-col
                    class="font-weight-light"
                    cols="8"
                  />
                  <v-col
                    cols="auto"
                    class="text-right"
                  >
                    <v-icon class="mx-1">
                      mdi-pencil
                    </v-icon>

                    <v-icon
                      class="mx-1"
                      color="error"
                    >
                      mdi-close
                    </v-icon>
                  </v-col>
                </v-row>
              </template>
            </v-card-text>
          </v-tab-item>
        </v-tabs-items>
      </material-card>
    </template>

    <v-tabs-items v-model="tab">
      <v-tab-item id="menu-1">
        <v-card flat>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="usersData"
              :search="search"
              sort-by="calories"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-text-field
                    v-model="search"
                    class="mx-4"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                    align-right
                  />
                  <v-spacer />
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn
                  icon
                  small
                  @click="edit(item._id)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <template v-slot:item.active="{ item }">
                <v-chip
                  v-if="item.active == true"
                  class="ma-2"
                  color="green"
                  text-color="white"
                  x-small
                >
                  active
                </v-chip>
                <v-chip
                  v-else
                  class="ma-2"
                  color="red"
                  text-color="white"
                  x-small
                >
                  nonactive
                </v-chip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item id="menu-2">
        <v-card
          flat
          class="pa-5"
        >
          <v-form>
            <v-row>
              <v-col class="px-9">
                <v-text-field
                  v-model="username"
                  :error-messages="nameErrors"
                  label="Username"
                  required
                  @input="$v.username.$touch()"
                  @blur="$v.username.$touch()"
                />
                <v-text-field
                  v-if="formType === 'create'"
                  v-model="email"
                  :error-messages="emailErrors"
                  label="E-mail"
                  required
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                />
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  :error-messages="passwordErrors"
                  label="Password"
                  required
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                  @click:append="show1 = !show1"
                />

                <v-text-field
                  v-model="passwordConfirmation"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  :error-messages="passwordConfirmationErrors"
                  label="Password Confirmation"
                  required
                  @input="$v.passwordConfirmation.$touch()"
                  @blur="$v.passwordConfirmation.$touch()"
                  @click:append="show1 = !show1"
                />
              </v-col>
              <v-col class="px-9 pt-8">
                <v-select
                  v-model="role_id"
                  :items="role"
                  :error-messages="roleErrors"
                  label="Role"
                  required
                  @change="$v.role.$touch()"
                  @blur="$v.role.$touch()"
                />
              </v-col>
            </v-row>

            <v-btn
              v-if="formType === 'create'"
              class="mr-4 mb-5 float-right"
              @click="save"
            >
              Save
            </v-btn>
            <v-btn
              v-else
              class="mr-4 mb-5 float-right"
              @click="update"
            >
              Update
            </v-btn>
            <!-- <v-btn
              class="mr-4 float-right"
              @click="clear"
            >
              clear
            </v-btn> -->
          </v-form>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  import axios from 'axios'
  import { validationMixin } from 'vuelidate'
  import {
    required,
    maxLength,
    email,
    minLength,
    sameAs,
  } from 'vuelidate/lib/validators'
  export default {
    mixins: [validationMixin],

    validations: {
      username: { required, maxLength: maxLength(20) },
      email: { required, email },
      password: { required, minLength: minLength(8) },
      role: { required },
      passwordConfirmation: {
        required,
        sameAsPassword: sameAs('password'),
        minLength: minLength(8),
      },
      phone: { required, minLength: minLength(10) },
    },
    data: () => ({
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          'Avatar size should be less than 2 MB!',
      ],
      search: '',
      show1: false,
      tab: null,
      dialog: false,
      dialogDelete: false,
      filterUsers: [],
      password: '',
      passwordConfirmation: '',
      user_id: '',
      username: '',
      email: '',
      role_id: null,
      role: [],
      formType: 'create',
      headers: [
        {
          text: 'Username',
          align: 'start',
          sortable: true,
          value: 'username',
        },
        { text: 'Email', value: 'email' },
        { text: 'Role', value: 'role' },
        { text: 'Status', value: 'active' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      users: [],
    }),
    computed: {
      roleErrors () {
        const errors = []
        if (!this.$v.role.$dirty) return errors
        !this.$v.role.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.maxLength &&
          errors.push('username must be at most 10 characters long')
        !this.$v.username.required && errors.push('username is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        return errors
      },

      passwordConfirmationErrors () {
        const errors = []
        if (!this.$v.passwordConfirmation.$dirty) return errors
        !this.$v.passwordConfirmation.sameAsPassword &&
          errors.push('Passwords must be identical')
        return errors
      },

      rolecheck () {
        return this.$store.state.users.role
      },

      usersData () {
        if (this.users.length > 0) {
          return this.users
        }
        const me = [this.$store.state.users]
        return me
      },
    },
    created () {
      this.getUsers()
      this.getRole()
    },

    methods: {
      getUsers () {
        axios
          .get('/users?page=1&limit=10')
          .then(res => {
            this.users = res.data.data
            console.log(this.$store.state.users.role)
          })
          .catch(error => {
            console.log(error)
          })
      },
      getRole () {
        axios.get('users/roles').then(res => {
          this.role = res.data.data
        })
      },
      save () {
        this.$swal.showLoading()
        axios
          .post('users', {
            email: this.email,
            username: this.username,
            password: this.password,
            confirm: this.passwordConfirmation,
            role: this.role_id,
          })
          .then(() => {
            this.$swal(
              'Data Created Successfully',
              '',
              'success',
            )
            this.$v.$reset()
            this.username = ''
            this.email = ''
            this.password = ''
            this.passwordConfirmation = ''
            this.role_id = null

            this.getUsers()
          })
      },

      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.user_id = ''
        this.username = ''
        this.email = ''
        this.password = ''
        this.passwordConfirmation = ''
        this.role_id = null
      },
      edit (id) {
        this.formType = 'edit'
        this.filterUsers = []
        this.filterUsers = this.users.filter(
          users => users._id === id,
        )
        this.user_id = this.filterUsers[0]._id
        this.username = this.filterUsers[0].username
        this.password = this.filterUsers[0].password
        this.passwordConfirmation = this.filterUsers[0].confirm
        this.role_id = this.filterUsers[0].role
        this.tab = 'menu-2'
      },

      update () {
        this.$swal.showLoading()
        axios
          .put('user/' + this.user_id, {
                 email: this.email,
                 username: this.username,
                 password: this.password,
                 confirm: this.passwordConfirmation,
                 role: this.role_id,
               },
               {
                 headers: {
                   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
                 },
               },
          )
          .then(() => {
            this.$swal(
              'Data Updated Successfully',
              '',
              'success',
            )
            this.$v.$reset()
            this.getUsers()
            this.tab = 'menu-1'
          })
      },

    },
  }
</script>

<style>
.preview {
  width: 200px;
  height: 200px;
  justify-content:right
}
</style>
