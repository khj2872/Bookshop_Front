<template>
    
</template>

<script>
    import Constant from "../../store/Constant";

    export default {
        data() {
            return {
                access_token : ''
            }
        },

        created () {
            this.access_token = this.$route.query.token;
            console.log(this.access_token);
            this.$store.commit(Constant.ADD_JWT, this.access_token);
            this.$store.dispatch(Constant.ADD_USERNAME_AND_ROLE_AND_ID)
                .then(() => {
                    this.$router.push('/');
                })

        }
    }
</script>

<style scoped>

</style>