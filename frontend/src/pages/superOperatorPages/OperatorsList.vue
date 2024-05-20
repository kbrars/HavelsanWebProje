<template>
  <q-page padding>
    <q-table
      :rows="users"
      :columns="columns"
      row-key="id"
      title="Operators"
    >
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn flat color="negative" @click="confirmDelete(props.row)">
            Delete
          </q-btn>
        </q-td>
      </template>
    </q-table>
    &nbsp;
    <q-btn color="blue-9" label="Operator Add" @click="OperatorAddModal = true" class="full-width" />

    <q-dialog v-model="OperatorAddModal" persistent>
      <q-card style="min-width: 500px; max-width: 90vw;">
        <q-card-section>
          <div class="text-h6">Operator Add</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="addOperatorButton">
            <q-input v-model="formData.id" label="ID" :rules="[requiredRule_id]" dense required />
            <q-input v-model="formData.username" label="Username" :rules="[requiredRule_userName]" dense required />
            <q-input v-model="formData.firstName" label="Firstname" :rules="[requiredRule_firstName]" dense required />
            <q-input v-model="formData.lastName" label="Lastname" :rules="[requiredRule_lastName]" dense required />
            <q-input v-model="formData.email" label="Email" type="email" :rules="[requiredRule_email]" dense required />
            <q-input v-model="formData.password" label="Password" type="password" :rules="[requiredRule_password]" dense required />
            <q-input v-model="formData.phone" label="Phone" type="phone" :rules="[requiredRule_phone]" dense required />
            <q-input v-model="formData.address" label="Address" type="textarea" rows="2" :rules="[requiredRule_address]" dense required />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="İptal" color="negative" v-close-popup />
          <q-btn flat label="Ekle" color="positive" @click="addOperatorButton" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmDeleteModal" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="warning" color="warning" />
          <span class="q-ml-sm">Are you sure you want to delete?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" color="negative" v-close-popup />
          <q-btn flat label="Yes" color="positive" @click="deleteOperator" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
const requiredRule_id = val => (val && val.length > 0) || "Please enter a valid ID!";
const requiredRule_userName = val => (val && val.length > 0) || "Please enter a valid username!";
const requiredRule_firstName = val => (val && val.length > 0) || "Please enter a valid firstname!";
const requiredRule_lastName = val => (val && val.length > 0) || "Please enter a valid lastname!";
const requiredRule_email = val => (val && val.length > 0) || "Please enter a valid email!";
const requiredRule_password = val => (val && val.length > 0) || "Please enter a valid password!";
const requiredRule_phone = val => (val && val.length > 0) || "Please enter a valid phone!";
const requiredRule_address = val => (val && val.length > 0) || "Please enter a valid address!";
</script>

<script>
import axios from 'axios'

export default {
  name: 'UsersPage',
  data () {
    return {
      OperatorAddModal: false,
      confirmDeleteModal: false,
      operatorToDelete: null,
      formData: {
        id:'',
        username:'',
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        password:'',
        phone:''
      },
      users: [],
      columns: [
        { name: 'id', required: true, label: 'ID', align: 'left', field: 'id' },
        { name: 'firstname', required: true, label: 'First Name', align: 'left', field: 'firstname' },
        { name: 'lastname', required: true, label: 'Last Name', align: 'left', field: 'lastname' },
        { name: 'username', required: true, label: 'Username', align: 'left', field: 'username' },
        { name: 'email', required: true, label: 'Email', align: 'left', field: 'email' },
        { name: 'phone', required: true, label: 'Phone', align: 'left', field: 'phone' },
        { name: 'address', required: true, label: 'Address', align: 'left', field: 'address' },
        {
          name: 'action',
          required: true,
          label: 'Action',
          align: 'left',
          field: 'action',
          sortable: false
        }
      ]
    }
  },
  mounted () {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers () {
      try {
        const response = await axios.post('http://localhost:5000/api/operatorList')
        this.users = response.data
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    addOperatorButton() {
      const userData = {
        id: this.formData.id,
        username: this.formData.username,
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        email: this.formData.email,
        password:this.formData.password,
        address: this.formData.address,
        phone: this.formData.phone
      };
      axios.post('http://localhost:5000/api/addOperator', userData)
        .then(response => {
          console.log('User added successfully:');
          this.OperatorAddModal = false;
          this.fetchUsers();
        })
        .catch(error => {
          console.error('Error adding user:', error);
        });
      this.OperatorAddModal = false;
    },
    confirmDelete(row) {
      this.operatorToDelete = row;
      this.confirmDeleteModal = true;
    },
    async deleteOperator() {
      try {
        await axios.post('http://localhost:5000/api/deleteOperator', { id: this.operatorToDelete.id });
        console.log('User deleted successfully');
        this.fetchUsers();
        this.confirmDeleteModal = false;
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  }
}
</script>

<style>
.full-width {
  width: 100%;
}
</style>
