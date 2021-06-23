<template lang="pug">
    #app
        .container
            yx-share-user(
                v-if="$env.isMainland"
                share-id="pages"
                biz-id="note"
                :desc="$t('shareDesc')"
            )
            .banner
                img(v-if="$env.isMainland" :src="require(`./images/banner-mainland-2.jpg`)")
                template(v-else)
                    img(src="./images/banner-2.jpg")
                    .banner-info
                        p.title {{ $t('title') }}
                            span {{ featureText }}
                        p.des {{ $t('feature2') }}

            .info(v-if="flag !== 4")
                .info-img
                    .headimg
                        img(:src="headImg")
                    .info-img__pro(v-if="$bus.isProAccount" :class="{pro1: $bus.isPro1, pro2: $bus.isPro2}")
                        img(v-if="$bus.isPro1" src="@/assets/images/v1-pro.png")
                        img(v-if="$bus.isPro2" src="@/assets/images/v2-pro.png")
                        img(v-if="$bus.isPro3" src="@/assets/images/v3-pro.png")
                .info-name(:class="{'none-min-width': flag !== 3}")
                    p.name(v-if="user") {{ user.nickname }}
                    p.des {{ statusText }}
                // 按钮
                .info-buttons
                    .button(v-if="!user" @click="goLogin") {{ $t('noLogin') }}
                    .button.pro(v-if="!hasRight" @click="goUpgrade") {{ $t('upgrade') }}
            van-tabs(
                v-model="tab"
                :color="$env.isProApp ? $color.pro.orange : ($env.isHK ? $color.hk.blue : $color.mainland.blueLink)"
                :title-active-color="$env.isProApp ? $color.pro.orange : ($env.isHK ? $color.hk.blue : $color.mainland.blueLink)"
                :line-width="30"
                sticky
            )
                van-tab(:title="$t('highlight')")
                    news-list(section="TYJX")
                van-tab(:title="$t('ipoNews')")
                    news-list(section="DXJL")
        yx-share-footer(v-if="!$env.isMainland" share-id="pages" biz-id="note")
</template>

<script>
import { Tab, Tabs } from 'vant'
import { getUserAuth } from '@/service/zt-user-apiserver'
import { getCurrentUser } from '@/service/user-server'
import getLoginStatus from '@/business/get-login-status'
import dayjs from 'dayjs'
import YxShareFooter from '@/components/yx-share-footer'
import YxShareUser from '@/components/yx-share-user'
import NewsList from './components/news-list'
import { messages, getAuthFlag } from '@/components/yx-stock-search-bar'
import { ALL_AUTH, getProText, UNLIMITED_AUTH, USER_ROLE_TYPES } from '../../../components/yx-stock-search-bar.vue'
export default {
    name: 'app',
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        YxShareFooter,
        YxShareUser,
        NewsList
    },
    data() {
        return {
            item_id: 1,
            product_type: 4,
            user: null,
            user_right: null,
            tab: 0,
            auth: null
        }
    },
    computed: {
        hasRight() {
            if (!this.auth) return false
            return this.auth.rightType === ALL_AUTH
        },
        // 是否pro账户
        isPro() {
            if (!this.user_right) {
                return false
            }
            return this.user_right.role_type > 1
        },
        // 权限要求：1:购买 2:pro 3:购买/pro 4:所有用户可见
        flag() {
            if (!this.user_right || !this.user_right.product_right_info) {
                return 3
            }
            return this.user_right.product_right_info.flag
        },
        // 0:无，1:试用天数，2:试用次数，3:购买
        right_type() {
            if (!this.user_right) {
                return 0
            }
            return this.user_right.detail.right_type
        },
        // 0:无权限 1:试用 2:完全权限
        right_flag() {
            return this.user_right ? this.user_right.right_flag : 0
        },
        // 显示文案
        statusText() {
            // 未登录
            if (!this.user) {
                return this.$t('noLogin')
            }
            if (!this.auth) return ''
            const { user_right } = this.auth.authData
            const { num_rule, user_role_type, remaining_num } = user_right || {}
            const userText = getProText(user_role_type)
            const i18n = key => messages[key][this.$env.langType - 1]
            if (num_rule !== UNLIMITED_AUTH) {
                return i18n('haveTimes')(userText, remaining_num)
            } else {
                return i18n('unlimitedTimes')(userText)
            }
        },
        //banner付费-pro文案
        featureText() {
            let featureText = this.$t('featurePro')
            return featureText
        },
        headImg() {
            return (this.user && this.user.avatar) || require('./images/people.png')
        }
    },
    mounted() {
        this.$sensors.track('yxstock_web_view_screen', { prop_view_page: '盈立内参' })
        this.initStatus()
        this.$jsBridge.watchPageActivity(this.initStatus)
        this.$jsBridge.setTitleBar_to_share({
            shareType: 'freedom',
            title: this.$t('title'),
            description: this.$t('feature2'),
            pageUrl: `${location.origin}${location.pathname}?appType=${this.$env.appType}&langType=${this.$env.langType}`
        })
    },
    methods: {
        async initStatus() {
            this.getUser()
            this.getAuth()
        },
        async getUser() {
            try {
                const isLogin = await getLoginStatus()
                if (!isLogin) {
                    return
                }
                this.user = await getCurrentUser()
            } catch (e) {
                this.$toast(e.msg || this.$t('yx.errorTips'))
            }
        },
        async getAuth() {
            try {
                const data = await getAuthFlag({
                    item_id: this.item_id,
                    product_type: this.product_type
                })
                this.auth = data
            } catch (e) {
                this.$toast(e.msg || this.$t('yx.errorTips'))
            }
        },
        goLogin() {
            this.$checkLogin({ shareId: 'pages', bizId: 'note' })
        },
        goPay() {
            this.$sensors.track(
                'yxstock_web_view_click',
                {
                    prop_view_page: '盈立内参',
                    prop_view_name: '立即购买'
                },
                () => {
                    if (!this.$env.isYouxinApp) {
                        this.$alert(this.$t('payInApp'))
                        return
                    }
                    this.$jsBridge.gotoNewWebview(`${location.origin}/hqzx/market/pay-middle.html?item_id=${this.item_id}&product_type=${this.product_type}#/`) // eslint-disable-line
                }
            )
        },
        goUpgrade() {
            this.$sensors.track(
                'yxstock_web_view_click',
                {
                    prop_view_page: '盈立内参',
                    prop_view_name: '去升级'
                },
                () => {
                    const source = this.$env.isHK ? 'YZNC_HK' : 'YZNC_CN'
                    const origin = this.$env.isLocal ? 'http://m1-sit.yxzq.com' : location.origin
                    // 跳转到推荐权限等级
                    const { recommend_user_role } = this.auth.authData.user_right || {}
                    const level = {
                        [USER_ROLE_TYPES.COMMON]: 1,
                        [USER_ROLE_TYPES.V1]: 10,
                        [USER_ROLE_TYPES.V2]: 20,
                        [USER_ROLE_TYPES.V3]: 30
                    }[recommend_user_role]
                    this.$jsBridge.gotoNewWebview(`${origin}/hqzx/market/pro-account-center.html?source=${source}&level=${level}`) // eslint-disable-line
                }
            )
        }
    }
}
</script>

<style lang="scss" scoped>
@include yx-up-down-color(background, '', ':after');
#app {
    display: flex;
    height: 100vh;
    flex-direction: column;
}
.container {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
.banner {
    position: relative;
    img {
        width: 100%;
    }
}
.info {
    position: relative;
    top: -16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 14px 20px;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(#353547, 0.12);
    background: #fff;
    margin: 0 12px;
    &-img {
        width: 45px;
        height: 45px;
        margin-right: 10px;
        position: relative;
        .headimg {
            overflow: hidden;
            border-radius: 50%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        &__pro {
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
            width: 41px;
            height: 13px;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            &.pro1 {
                background: linear-gradient(88deg, #faac22 0%, #ffd36e 47%, #ffe9a6 100%);
            }
            &.pro2 {
                background: #2d2d2e;
            }
            img {
                width: 32px;
            }
        }
    }
    &-name {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        margin-right: 10px;
        min-width: 160px;
        &.none-min-width {
            min-width: unset;
        }
        .name {
            margin-bottom: 2px;
            @include yx-overflow-ellipsis;
        }
        .des {
            color: $yx-ml-font-black-2;
            @include yx-overflow-ellipsis;
        }
    }
    &-buttons {
        margin-top: 10px;
        white-space: nowrap;
    }
    .button {
        min-width: 88px;
        text-align: center;
        box-sizing: border-box;
        display: inline-block;
        line-height: 30px;
        padding: 0 8px;
        color: #fff;
        border-radius: 4px;
        background: $yx-ml-blue-btn;
        &.pro {
            background: linear-gradient(174deg, #fad961, #f7971c);
        }
        + .button {
            margin-left: 10px;
        }
    }
}
// 香港版
.yx-root-hk {
    .banner-info {
        position: absolute;
        left: 25px;
        right: 25px;
        top: 30px;
        color: #fff;
        .title {
            font-size: 24px;
            margin-bottom: 5px;
            span {
                display: inline-block;
                font-size: 10px;
                line-height: 16px;
                border-radius: 4px;
                background: linear-gradient(134deg, #535af0, #0ec0f1);
                padding: 0 6px;
                margin-left: 10px;
            }
        }
    }
    .info {
        top: -30px;
        padding: 10px 15px;
        margin: 0 18px;
        border-radius: 8px;
        &-img {
            width: 40px;
            height: 40px;
        }
        &-name {
            .name {
                margin-bottom: 0;
            }
            .des {
                font-size: 10px;
                color: #ffba00;
            }
        }
        &-button {
            line-height: 25px;
            border-radius: 12px;
            font-size: 12px;
            background: linear-gradient(134deg, #0ec0f1, #535af0);
            &.pro {
                background: linear-gradient(174deg, #fad961, #f7971c);
            }
        }
    }
}
.yx-root-pro {
    .info {
        .button {
            background: $yx-pr-color;
        }
    }
    /deep/ .yx-share-footer {
        button {
            background: $yx-pr-color;
        }
    }
}
</style>
