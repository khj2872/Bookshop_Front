<template>
<div class="container">
    <div class="row">
        <div class="main">

            <h3>간편 로그인
<!--                , or <router-link to="/signUp">Sign Up</router-link>-->
            </h3>

            <div class="row2">
                <a @click="loginGoogle"><img src="../../assets/google.png" style="width:320px;"></a>
                <a :href="naverLoginURL"><img src="../../assets/naver_login.png" style="width: 320px;"></a>
            </div>
<!--            <div class="login-or">-->
<!--                <hr class="hr-or">-->
<!--                <span class="span-or">or</span>-->
<!--            </div>-->

<!--            <form>-->
<!--                <div class="form-group">-->
<!--                    <label for="inputUsernameEmail">Username or email</label>-->
<!--                    <input type="text" class="form-control" id="inputUsernameEmail" v-model="email">-->
<!--                </div>-->
<!--                <div class="form-group">-->
<!--                    &lt;!&ndash;<a class="pull-right" href="#">Forgot password?</a>&ndash;&gt;-->
<!--                    <label for="inputPassword">Password</label>-->
<!--                    <input type="password" class="form-control" id="inputPassword" v-model="pw">-->
<!--                </div>-->
<!--                <div class="checkbox pull-right">-->
<!--                    &lt;!&ndash;<label>&ndash;&gt;-->
<!--                    &lt;!&ndash;<input type="checkbox">&ndash;&gt;-->
<!--                        &lt;!&ndash;Remember me &ndash;&gt;-->
<!--                    &lt;!&ndash;</label>&ndash;&gt;-->
<!--                </div>-->
<!--            </form>-->
<!--            <button class="btn btn-primary" @click="login()">로그인</button>-->

        </div>

    </div>
</div>
</template>

<script>
import Constant from '../../store/Constant';
import LoginConfig from '../../store/loginConfig';

export default {
    data () {
        return {
            email : '',
            pw : '',
            naverLoginURL: ''
        }
    },

    created () {
        this.makeNaverLoginURL();
    },

    methods: {
        makeNaverLoginURL() {
            this.naverLoginURL = LoginConfig.NAVER.AUTHORIZE_URL +
                '&client_id=' + LoginConfig.NAVER.CLIENT_ID +
                '&redirect_uri=' + LoginConfig.NAVER.REDIRECT_URI +
                '&state=' + LoginConfig.NAVER.STATE;
        },

        loginGoogle() {
            this.$gAuth.signIn()
                .then(GoogleUser => {
                    const auth = {
                        oauthId: GoogleUser.getBasicProfile().getId(),
                        userEmail: GoogleUser.getBasicProfile().getEmail(),
                        username: GoogleUser.getBasicProfile().getName()
                    };
                    this.$store.dispatch(Constant.LOGIN_GOOGLE, auth)
                        .then(()=> {
                            this.$router.push('/');
                        })
                })
                .catch(ex => {
                    console.log(ex);
                })
        },

        login() {
            const loginInfo = {
                userEmail : this.email,
                password : this.pw
            };
            console.log(loginInfo);
            this.$store.dispatch(Constant.LOGIN, loginInfo)
                .then(()=> {
                    this.$router.push('/');
                })
                .catch(ex=> {
                    console.log(ex);
                    alert('로그인 오류');
                })
        }
    }
}
</script>

<style>
body {
    padding-top: 15px;
    font-size: 12px
}

.main {
    max-width: 320px;
    margin: 0 auto;
}

.row2 {
    margin-bottom: 10px
}

.login-or {
    position: relative;
    font-size: 18px;
    color: #aaa;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
}

.span-or {
    display: block;
    position: absolute;
    left: 50%;
    top: -2px;
    margin-left: -25px;
    background-color: #fff;
    width: 50px;
    text-align: center;
}

.hr-or {
    background-color: #cdcdcd;
    height: 1px;
    margin-top: 0px !important;
    margin-bottom: 0px !important;
}

h3 {
    text-align: center;
    line-height: 300%;
}
</style>
