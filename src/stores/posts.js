import { ref } from 'vue';

import { defineStore } from 'pinia';

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([])

  const addPost = async (post) => {
    posts.value.unshift(post) // Добавляем новый пост в начало списка
  }

  const getPosts = () => {
    return posts.value
  }

  return {
    posts,
    addPost,
    getPosts
  }
}) 