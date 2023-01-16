<script setup>
import UserItem from './UserItem.vue';
import { useUserStore } from '../../stores/user'

const User = useUserStore()

defineProps({
    users: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="scroll" @scroll="User.loadPagination()">
        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <UserItem v-for="(item, index ) in users.bigData" :no="index + 1" :value="item" />
            </tbody>
        </table>
    </div>

</template>

<style scoped>
.scroll {
    overflow-y: scroll;
    height: 200px;
}
</style>