<template>
<nav class="floating-bar">
    <div class="floating-bar__item floating-bar__item--active">
        <div class="floating-bar__item-content">
            <twitter :url="url" :title="content"></twitter>
        </div>
    </div>
    <div class="floating-bar__item">
        <div class="floating-bar__item-content">
            <linked-in :url="url"></linked-in>
        </div>
    </div>
    <div class="floating-bar__item">
        <div class="floating-bar__item-content">
            <whatsapp :url="url" :title="content"></whatsapp>
        </div>
    </div>

    <div class="floating-bar__item">
        <div class="floating-bar__item-content">
            <facebook :url="url" :title="content"></facebook>
        </div>
    </div>
    <div class="floating-bar__item">
        <div class="floating-bar__item-content">
            <hamburger  v-on:click="isHidden = !isHidden" height="20px" width="20px"/>
            <div v-if="isHidden" class="copy-to-clipboard-popup">
                <div>
                    <div>
                        <input type="text" id="copy-link-input" ref="copy-link-input" :value="url" readonly="">
                        <svg v-on:click="copyToClipboard()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="article-copy-icon" role="img" class="copy-link-button">
                            <path fill="currentColor" d="M7 6V3a1 1 0 011-1h12a1 1 0 011 1v14a1 1 0 01-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1 1 0 013 21l.003-14c0-.552.45-1 1.007-1H7zm2 0h8v10h2V4H9v2zm-2 5v2h6v-2H7zm0 4v2h6v-2H7z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>
</template>

<style lang="scss">
    @media screen and (max-width: 550px) {
        .floating-bar{
            position:fixed;
            bottom:0;
            left:0;
            right:0;
            z-index:1000;

            //give nav it's own compsite layer
            will-change:transform;
            transform: translateZ(0);

            display:flex;

            height:40px;

            box-shadow: 0 -2px 5px -2px #333;
            background-color: var(--bg-teritary);

            &__item{
                flex-grow:1;
                text-align:center;
                font-size:12px;

                display:flex;
                flex-direction:column;
                justify-content:center;
                color: var(--primary-color);
            }
            &__item--active{
                //dev
                //color:red;
            }
            &__item-content{
                display:flex;
                flex-direction:column;
            }
        }

        .copy-to-clipboard-popup {
            background-color: var(--bg-secondary);
            border-radius: 5px;
            position: absolute;
            display: block;
            padding: 0.5rem;
            min-width: 100%;
            z-index: 999999;
            color: var(--primary-color);
            left: 0;
            bottom: 100% !important;
        }
        #copy-link-input {
            float: left;
            width: 90%;
            outline: 0;
            box-shadow: 0 0 0 2px var(--primary-color);
        }

        .copy-link-button {
            margin: auto !important;
        }
    }
    @media screen and (min-width: 551px) {
        .floating-bar {
            display: none;
        }
    }

</style>

<script>
    import Twitter from '@/components/social/Twitter.vue'
    import LinkedIn from '@/components/social/LinkedIn.vue'
    import Whatsapp from "@/components/social/Whatsapp";
    import Facebook from "../components/social/Facebook";
    import Hamburger from '@/assets/images/hamburger.svg';

    export default {
        name: "floating-bar",
        components: {
            Facebook,
            Whatsapp,
            Twitter,
            LinkedIn,
            Hamburger
        },
        props: {
            url: {
                required: true,
                type: String
            },
            content: {
                required: true,
                type: String
            }
        },
        data() {
            return {isHidden: false}
        },
        methods: {
            copyToClipboard() {
                let copyText = this.$refs['copy-link-input'];
                copyText.select();
                copyText.setSelectionRange(0, 99999); /*For mobile devices*/
                document.execCommand("copy");
            }
        }
    }
</script>