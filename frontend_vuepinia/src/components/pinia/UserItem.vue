<script>
import { useUserStore } from '../../stores/user'

export default {
    setup() {
        const User = useUserStore()

        return { User }
    },
    props: {
        no: {
            type: Number,
            required: true
        },
        value: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isEdit: false,
            name: this.$props.value.name,
            phone: this.$props.value.phone
        }
    },
    methods: {
        update(id) {
            this.User.updateUser({ id, name: this.name, phone: this.phone })
            this.$data.isEdit = false
        }
    }
}
</script>

<template>
    <tr>
        <td>{{ no }}</td>
        <td v-if="isEdit">
            <input type="text" id="name" name='name' class="form-control" placeholder='name' v-model="name" />
        </td>
        <td v-else>{{ value.name }}</td>

        <td v-if="isEdit">
            <input type="text" id="phone" name='phone' class="form-control" placeholder='phone' v-model="phone" />
        </td>
        <td v-else>{{ value.phone }}</td>

        <td v-if="isEdit">
            <button class='btn btn-info' @click="update(value.id)"><i class="fa-sharp fa-solid fa-pen"></i>save</button>
            <button class='btn btn-warning' @click="isEdit = false"><i class="fa-solid fa-ban"></i>cancel</button>
        </td>
        <td v-else-if="value.sent && !isEdit">
            <button id='btnedit' class='btn btn-light' @click="isEdit = true"><i class="fa-sharp fa-solid fa-pen"></i>
                edit</button>
            <button id='btndelete' class='btn btn-light' @click="User.removeUser(value.id)"><i
                    class="fa-solid fa-ban"></i>delete</button>
        </td>
        <td v-else>
            <button class='btn btn-warning'
                @click="User.resendUser({ id: value.id, name: value.name, phone: value.phone })"><i
                    class="fa-solid fa-rotate-left"></i>resend</button>
        </td>


    </tr>




</template>