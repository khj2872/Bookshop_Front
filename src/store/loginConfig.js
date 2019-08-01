export default {
    NAVER : {
        CLIENT_ID: 'aXJAQ9m_D_59dFXwH6Op',
        REDIRECT_URI: 'https://localhost:8442/api/login/naver',
        AUTHORIZE_URL: 'https://nid.naver.com/oauth2.0/authorize?response_type=code',
        STATE: 123
    },

    KAKAO : {
        HOST: 'https://kauth.kakao.com',
        CLIENT_ID: 'f60abc63b27a004463c7b07c19bc7633',
        REDIRECT_URI: 'https://localhost:8442/api/login/kakao',
        AUTHORIZE_URL: 'https://kauth.kakao.com/oauth/authorize'
    },

    GOOGLE : {
        CLIENT_ID: '715195752938-dhkksls0crjkm62hu5510dvuu2edvs0n.apps.googleusercontent.com',
        REDIRECT_URI: 'https://localhost:8442/api/login/google',
        AUTHORIZE_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
        STATE: 123
    },

    FACEBOOK : {
        CLIENT_ID: '824386747955304',
        REDIRECT_URI: 'https://localhost:8442/api/login/facebook',
        AUTHORIZE_URL: 'https://www.facebook.com/dialog/oauth',
        STATE: 123
    }

}