<template>
    <div v-if="user">
        <p>Hello {{user.first_name}}</p>
        <button @click="signOut()">Déconnexion</button>
    </div>
</template>

<script>
export default {
    name: 'UserComponent',
    props:{
        user: {
            type: Object,
            default:()=>(undefined)
        }
    },
    methods:{
        signOut(){
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            console.log(this.user);
            this.$emit('deconnexion');
        }
    },
    emits: ['deconnexion']
}
</script>

<style scoped>

</style>