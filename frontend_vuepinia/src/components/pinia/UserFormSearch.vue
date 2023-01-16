<script>
import { useUserStore } from '../../stores/user';
export default {
    setup() {
        const User = useUserStore()
        return { User }
    },
    data() {
        return {
            name: '',
            phone: ''
        }
    },
    methods: {
        serach() {
            this.User.searchUser({ name: this.$data.name, phone: this.$data.phone })
        },
        reset() {
            this.User.$state.value.params = {page: 1, totalPage: 1, query: {}}
            this.$data.name = ''
            this.$data.phone = ''
            this.User.loadUser()
        }
    },

}
</script>
<template>
    <form @submit.prevent="serach">
        <div class="row g-1 align-items-center">
            <div class="col-auto">
                <label htmlFor="name" class="col-form-label">Name</label>
            </div>
            <div class="col-auto">
                <input type="text" id="name" name='name' class="form-control" placeholder='name' v-model="name" />
            </div>

            <div class="col-auto">
                <label htmlFor="phone" class="col-form-label">Phone</label>
            </div>
            <div class="col-auto">
                <input type="text" id="phone" name='phone' class="form-control" placeholder='phone' v-model="phone" />
            </div>
            <div class="col-auto">
                <button class='btn btn-primary'><i class="fa-regular fa-circle-check"></i> search</button>
            </div>
            <div class="col-auto">
                <button class='btn btn-dark' @click="reset" ><i class="fa-regular fa-circle-check"></i> reset</button>
            </div>
        </div>
    </form>
</template>
