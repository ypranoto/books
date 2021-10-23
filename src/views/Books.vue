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
              Books
            </v-tab>
            <v-tab
              href="#menu-2"
              @click="formType = 'create' , clear()"
            >
              {{ formType === 'create' ? 'Add Books' : 'Edit Books' }}
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
              :items="books"
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
                  v-model="name"
                  label="name"
                  required
                />
                <v-text-field
                  v-model="description"
                  label="Description"
                  required
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
  export default {
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
      filterBooks: [],
      _id: '',
      role_id: '',
      name: '',
      description: '',
      formType: 'create',
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'Description', value: 'description' },
        { text: 'Created By id', value: 'created_by_id' },
        { text: 'Created At', value: 'created' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      books: [],
    }),
    created () {
      this.getBooks()
    },

    methods: {
      getBooks () {
        axios
          .get('/books?page=1&limit=10')
          .then(res => {
            this.books = res.data.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      save () {
        this.$swal.showLoading()
        axios
          .post('books', {
            name: this.name,
            description: this.description,
          })
          .then(() => {
            this.$swal(
              'Data Created Successfully',
              '',
              'success',
            )
            this.name = ''
            this.description = ''
            this.getBooks()
          })
      },

      clear () {
        this._id = ''
        this.name = ''
        this.description = ''
      },
      edit (id) {
        this.formType = 'edit'
        this.filterBooks = []
        this.filterBooks = this.books.filter(
          books => books._id === id,
        )
        this._id = this.filterBooks[0]._id
        this.name = this.filterBooks[0].name
        this.description = this.filterBooks[0].description
        this.tab = 'menu-2'
      },

      update () {
        this.$swal.showLoading()
        axios
          .put('books/' + this._id, {
                 description: this.description,
                 name: this.name,
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
            this.getBooks()
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
