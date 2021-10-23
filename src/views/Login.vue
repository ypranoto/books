<template>
  <v-container style="padding-top:10%">
    <v-row>
      <v-col>
        <v-card v-show="false">
          hide
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-8"
          align-item="center"
          flat
        >
          <v-card-title class="pa-0">
            <h3>Sign In</h3>
          </v-card-title>
          <v-form
            ref="form"
            v-model="valid"
            style="color:white;"
            lazy-validation
          >
            <h3>Sign In</h3>
            <v-divider />
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :counter="10"
              label="E-mail"
              required
            />
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordrules"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            />
            <v-btn
              color="green accent-3"
              class="mr-4"
              @click="signIn"
            >
              Sign in
            </v-btn>

            <v-btn
              color="cyan accent-4"
              class="mr-4"
              @click="reset"
            >
              Reset Form
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col>
        <v-card v-show="false">
          hide
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      show1: false,
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordrules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 10) || 'Password must be less than 8 characters',
      ],
    }),
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      signIn () {
        this.$swal.showLoading()
        axios
          .post('/auth/login', {
            email: this.email,
            password: this.password,
          })
          .then(res => {
            axios.defaults.headers.common.Authorization =
              'Bearer ' + res.data.token
            this.$store.commit('authentication', res.data.token)
            this.$store.commit('Authorization', true)
            this.users()
            this.$swal.close()
          })
          .catch((error) => {
            if (error.response.status === 422 || error.response.status === 401) {
              return this.$swal('Email/Password yang anda masukan salah', '', 'error')
            }
            this.$swal(error.response.data.message, '', 'error')
          },
          )
      },

      users () {
        axios.get('/users/me').then((res) => {
          this.$store.commit('users', res.data)
        })
      },

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
