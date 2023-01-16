<script >
export default {
    data() {
        return {
            name: '',
            phone: ''
        }
    },
    methods: {
        cancelClick() {
            this.$emit('cancel')
        },
        addUser() {
            this.$emit('createUser', { name: this.$data.name, phone: this.$data.phone })
            this.$data.name = ''
            this.$data.phone = ''
        }
    },
}
</script>

<template>
    <form @submit.prevent="addUser">
        <div class="row g-1 align-items-center">
            <div class="col-auto">
                <label for="name" class="col-form-label">Name</label>
            </div>
            <div class="col-auto">
                <input type="text" id="name" name='name' class="form-control" placeholder='name' v-model="name" />
            </div>

            <div class="col-auto">
                <label for="phone" class="col-form-label">Phone</label>
            </div>
            <div class="col-auto">
                <input type="text" id="phone" name='phone' class="form-control" placeholder='phone' v-model='phone' />
            </div>
            <div class="col-auto">
                <button id='btnsave' class='btn btn-light'><i class="fa-regular fa-circle-check"></i> save</button>
                <button id='btncancel' class='btn btn-light' @click="cancelClick"><i class="fa-regular fa-ban"></i>
                    cancel</button>
            </div>
        </div>
    </form>
</template>

