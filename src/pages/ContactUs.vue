<template>
    <Layout>
        <Section container="md" dots="true" >
            <h1>{{$page.strapi.currentPage.title}}</h1>
            <Card class="contact-us" id="contact-us">
                <p v-if="response == false" class="mb-half"><strong>👋 </strong>{{$page.strapi.currentPage.description}}</p>
                <form v-if="response == false" action="https://adapttive.us3.list-manage.com/subscribe/post?u=7da89dacdf00360d85d530c7a&amp;id=4b37c1aff2" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="contact-us__form validate" target="_blank" novalidate>
                    <div id="mc_embed_signup_scroll" class="flex">
                        <div class="contact-us__field mc-field-group flex-fit" style="margin-right: 15px">
                            <input v-model="input.email" type="email" aria-label="Email" placeholder="your@email.com" value="" name="email" class="required email" id="email">
                        </div>

                        <div class="contact-us__field mc-field-group flex-fit" style="margin-right: 15px">
                            <input v-model="input.mobile" type="text" aria-label="Contact Number" placeholder="Contact Number" value="" name="mobile" id="mobile">
                        </div>

                        <div class="contact-us__field mc-field-group row-100" style="margin-right: 15px">
                            <input v-model="input.subject" type="text" aria-label="subject" placeholder="Subject" value="" name="subject"  id="subject">
                        </div>

                        <div class="contact-us__field mc-field-group row-100" style="margin-right: 15px">
                            <textarea v-model="input.content" aria-label="content" placeholder="Share anything!" name="content" id="content"></textarea>
                        </div>
                        <input v-model="input.bot" type="text" aria-label="Important" value="" name="important"  id="important">
                    </div>

                    <div class="contact-us__button" >
                        <button v-if="loader === false" v-on:click="submit" type="button" value="Submit" name="contact-us-submit" id="contact-us-submit" class="button primary" :disabled='!isEmail'>
                            Submit
                        </button>
                        <div class="spinner" v-if="loader">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                    </div>
                </form>
                <div id="res-msg" v-if="response"><div class="check-mark"></div>Submitted Successfully! We will surely connect you in a while.</div>
                <div class="contact-us__top"></div>
            </Card>
        </Section>
    </Layout>
</template>

<script>
    import axios from 'axios';
    import { getMetaTags } from "~/utils/seo";

    export default {
        name: 'contact-us',
        data() {
            return{
                input: {
                    email: '',
                    mobile: '',
                    subject: '',
                    content: '',
                    bot:''
                },
                loader:false,
                response:false
            }
        },
        methods:{
            async submit() {
                if(this.input.bot){
                    this.input.isBot = true;
                    console.log("This is bot filling the form!");
                    this.response = true;
                } else {
                    this.loader = true;
                   this.recaptcha().then(
                        (token) => {
                            this.input.recaptcha = token;
                            delete this.input.bot;
                            axios.post(process.env.GRIDSOME_FORM_ENDPOINT, this.input)
                                .then((response) => {
                                    console.log("contact-us-success",response);
                                    this.response = true;
                                })
                                .catch((error) => {
                                    console.log("contact-us-error", error);
                                }).finally(() => {
                                this.loader = false;
                            });
                        }
                    )
                }
            },

            async recaptcha() {
                // (optional) Wait until recaptcha has been loaded.
                await this.$recaptchaLoaded()

                // Execute reCAPTCHA with action "login".
                return await this.$recaptcha('contact_us');
            }
        },
        computed: {
            isEmail () {
                return this.input.email;
            }
        },
        metaInfo() {
        const { title, description, picture } = this.$page.strapi.currentPage;
        // Merge default and article-specific SEO data
        const seo = {
          metaTitle: title,
          metaDescription: description,
          shareImage: picture,
          ...this.$page.strapi.currentPage.seo,
        };

        return {
          title: this.$page.strapi.currentPage.title,
          meta: getMetaTags(seo),
        };
      },
    }
</script>


<page-query>
query {
  strapi {
    currentPage: contactUsPage {
      title
      description
      seo {
        metaTitle
        metaDescription
        shareImage {
          url
        }
        keywords {
          name
          slug
        }
      }
    }
  }
}
</page-query>



<style lang="scss" scoped>
    .contact-us {
        &__top {
            height: 4px;
            position: absolute;
            top:0;
            left:0;
            right:0;
            background: linear-gradient(90deg, var(--primary-color) 0%, #8ED6FB 50%, #D32E9D 100%);
        }

        &__form {
            margin-bottom:0;
        }
        &__field {
            min-width: 200px;
            margin-bottom: 1rem;
        }
        &__button {
            margin: 0 auto;
            margin-bottom: 1rem;
            text-align: center;
        }

        p {
            margin-bottom: .5rem;
        }

        #content {
            width: 100%;
            padding: .34rem .8rem;
            border-radius: 5px;
            color: var(--body-color);
            border: 0;
            transition: background .3s, box-shadow .3s;
            background-color: var(--bg-teritary);
            height: 200px;
        }
        .row-100{
            width: 100%;
        }

        #res-msg {
            padding: 10px;
            color: var(--primary-color);
            text-align: center;

            .check-mark {
                display: inline-block;
                transform: rotate(45deg);
                height: 24px;
                width: 12px;
                border-bottom: 7px solid var(--primary-color);
                border-right: 7px solid var(--primary-color);
                margin-right: 10px;
                vertical-align: middle;
            }
        }



        .spinner {
            text-align: center;
        }

        .spinner > div {
            width: 18px;
            height: 18px;
            background-color: var(--primary-color);

            border-radius: 100%;
            display: inline-block;
            -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
            animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        }

        .spinner .bounce1 {
            -webkit-animation-delay: -0.32s;
            animation-delay: -0.32s;
        }

        .spinner .bounce2 {
            -webkit-animation-delay: -0.16s;
            animation-delay: -0.16s;
        }

        @-webkit-keyframes sk-bouncedelay {
            0%, 80%, 100% { -webkit-transform: scale(0) }
            40% { -webkit-transform: scale(1.0) }
        }

        @keyframes sk-bouncedelay {
            0%, 80%, 100% {
                -webkit-transform: scale(0);
                transform: scale(0);
            } 40% {
                  -webkit-transform: scale(1.0);
                  transform: scale(1.0);
              }
        }

        #important {
            height: 0px;
            width: 0px;
            opacity: 0;
        }
    }
</style>