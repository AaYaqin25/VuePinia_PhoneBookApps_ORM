<script setup>
import '../../styling/all.css'
import UserList from './UserList.vue';
import UserFormSearch from './UserFormSearch.vue';
import UserFormAdd from './UserFormAdd.vue';
import { useUserStore } from '../../stores/user'
import { ref } from 'vue';

const isAdd = ref(false)

const handleClickAdd = () => {
    isAdd.value = true
    
}

const handleCancelAdd = () => {
    isAdd.value = false
}
const User = useUserStore()
    
const vLoadUser = {
    beforeMount: () => {
        User.loadUser()
    }
}
</script>



<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <div class="head">
                    <h1>Phone Book Apps</h1>
                </div>
            </div>
        </div>
        <br />
        <div v-if="isAdd">
            <div class="card">
                <div class="card-header">
                    <h5 id='texthead'>Adding Form</h5>
                </div>
                <div class="card-body">
                    <UserFormAdd @cancel="handleCancelAdd" @createUser="User.addUser" />

                </div>
            </div>
        </div>
        <div v-else>
            <button id='btnadd' class='btn btn-light' @click="handleClickAdd"><i class="fas fa-plus"></i>
                add</button>
        </div>

        <br />

        <div class="card">
            <div class="card-header">
                <h5 id='texthead'>Search Form</h5>
            </div>
            <div class="card-body">
                <UserFormSearch/>
            </div>
        </div>
        <br />
        <UserList v-load-user :users="User.$state.value" />

    </div>

</template>
    
