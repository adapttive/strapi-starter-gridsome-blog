<template>
  <ClientOnly>

  <Card class="project" :link="node.url">
    <link-prevue :url="node.url">
      <template slot-scope="props">
        <div class="project-container">
          <img class="project-image" :src="props.img" :alt="props.title" />
          <div class="card-block text-center">
            <g-link :to="props.url" class="card-title"><span class="project__title">{{props.title}}</span></g-link>
            <p class="project-description">{{props.description}}</p>
            <g-link :to="props.url" class="button project-link">View More</g-link>
          </div>
        </div>
      </template>
    </link-prevue>

    <div v-if="node.authors || node.platforms" class="project__footer">
      <div class="project__author" v-if="node.authors && node.authors.length">
        By
        <div class="project__author-image" v-for="author in node.authors" :key="author.id" :node="author" >
          <div class="project__actions flex gap-15">
            <g-link :to="author.linked_user.username">
              <g-image v-if="author.picture" class="author-image" :alt="author.name" :src="getSmallImageUrl(author.picture)"/>
            {{ author.name }}
            </g-link>
          </div>
        </div>
      </div>

      <div class="project__platform" v-if="node.platforms" v-for="platform in node.platforms" :key="platform.id" :node="platform" >
        <div class="project__platform-image">
          <g-image :src="platform.image.url" />
        </div>
      </div>
    </div>
  </Card>
    </ClientOnly>

</template>

<script>
import {getSmallImageUrl} from "~/utils/medias";

export default {
  methods: {
    getSmallImageUrl
  },
  components: {
    // loading components without ssr support
    LinkPrevue: () => import('link-prevue')
  },
  props: {
    node: { type: Object, required: true }
  }
}
</script>

<style lang="scss">
.project {
  border: solid 1px var(--primary-color);

  .card__link {
    height: 85%;
  }
  &__author {
    float: left;
    display: flex;
    padding: 0.5rem;
  }

  &__author-image {
    margin-left: 0.5rem;
  }

  .project-link {
    margin-bottom: 0.50rem;
    text-transform: lowercase;
    font-size: small;
  }

  .project-description {
    font-size: small;
    padding: 0.25rem;
  }

  .project-container {
    border-radius: 5px;
    width: 16rem;
    margin: auto;
  }

  @media screen and (max-width: 550px) {
    .project-container {
      border-radius: 5px;
      width: 14rem;
    }
  }

  .project-image {
    border-radius: 5px;
    width: 100%;
    vertical-align: middle;
    border-style: none;
  }

  .card__inner {
    padding: 1rem;
  }

  &:hover {
    .card__image img {

    }
  }

  &__title {
    font-size: .9rem;
    font-weight: 500;
    white-space: nowrap;
    max-width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__desc {
    font-size: .85rem;
    margin-bottom: .5rem!important;
    opacity: .8;
    white-space: nowrap;
    max-width: 220px;
    text-overflow: ellipsis;
    overflow-x: hidden;
  }

  &__footer {
    display: flex;
    background-color: var(--bg);
    align-items: center;
    justify-content: space-between;
    font-size: .85rem;
    position: relative;
    transition: background-color .3s;
  }

  &__actions {
    opacity: .6;
  }

  &__platform {
    float: right;
  }

  &__platform-image {
    img {
      max-width: 25px;
      margin:0;
    }
  }

  &:hover {
    .project__footer {
      transform: translateY(0);
    }
  }
}
</style>
