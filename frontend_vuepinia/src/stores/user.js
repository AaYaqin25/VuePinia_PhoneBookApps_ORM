import { defineStore } from 'pinia'
import { request } from './api'

export const useUserStore = defineStore('user', {
    state: () => ({
        value: {
            bigData: [],
            params: {
                page: 1,
                totalPage: 0
            }
        }
    }),
    getters: {
        items: (state) => state.value.bigData
    },
    actions: {
        loadUser() {
            request.get('users').then(({ data }) => {
                this.$state.value = {
                    bigData: data.data.result.map(item => {
                        item.sent = true
                        return item
                    }),
                    params: {
                        page: data.data.page,
                        totalPage: data.data.totalPage
                    }
                }
            }).catch((err) => {
                console.log('gagal', err);
            })
        },
        addUser({ name, phone }) {
            const id = Date.now()
            if (!this.searchUser()) {
                this.$state.value.bigData.push({ id, name, phone })
            }
            request.post('users', { name, phone }).then(({ data }) => {
                this.$state.value.bigData = this.$state.value.bigData.map(item => {
                    if (item.id === id) {
                        return {
                            id: data.data.id,
                            name: data.data.name,
                            phone: data.data.phone,
                            sent: true
                        }
                    }
                    return item
                })
            }).catch(() => {
                this.$state.value.bigData = this.$state.value.bigData.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            sent: false
                        }
                    }
                    return item
                })
            })
        },
        removeUser(id) {
            request.delete(`users/${id}`).then(({ data }) => {
                this.$state.value.bigData = this.$state.value.bigData.filter(item => item.id !== id)
            }).catch((err) => {
                console.log('gagal', err);
            })
        },
        updateUser({ id, name, phone }) {
            request.put(`users/${id}`, { name, phone }).then(({ data }) => {
                this.$state.value.bigData = this.$state.value.bigData.map(item => {
                    if (item.id === id) {
                        return {
                            id: data.data.id,
                            name: data.data.name,
                            phone: data.data.phone,
                            sent: true
                        }
                    }
                    return item
                })
            }).catch((err) => {
                console.log('gagal', err);
            })
        },
        resendUser({ id, name, phone }) {
            request.post('users', { name, phone }).then(({ data }) => {
                this.$state.value.bigData = this.$state.value.bigData.map(item => {
                    if (item.id === id) {
                        return {
                            id: data.data.id,
                            name: data.data.name,
                            phone: data.data.phone,
                            sent: true
                        }
                    }
                    return item
                })
            }).catch((e) => {
                console.log('gagal', e);
            })
        },
        loadPagination() {
            if (this.$state.value.params.page < this.$state.value.params.totalPage) {
                let params = {
                    ...this.$state.value.params,
                    page: this.$state.value.params.page + 1
                }
                request.get('users', { params: params }).then(({ data }) => {
                    params = {
                        ...params,
                        totalPage: data.data.totalPage
                    }
                    this.$state.value = {
                        bigData: [...this.$state.value.bigData, ...data.data.result.map(item => {
                            item.sent = true
                            return item
                        })],
                        params: params
                    }
                })

            }
        },
        searchUser(query) {
            let params = {
                ...this.$state.value.params,
                ...query,
                page: 1
            }
            request.get('users', { params: params }).then(({ data }) => {
                params = {
                    ...params,
                    totalPage: data.data.totalPage
                }
                this.$state.value = {
                    bigData: data.data.result.map(item => {
                        item.sent = true
                        return item
                    }),
                    params: params
                }
            })
        }
    }
})

