<script setup lang="ts">
const { t, local, switchLocale, lang } = useLocale()
const open = ref(false)
</script>
<template><header class="header"><div class="shell nav"><NuxtLink :to="local()" class="brand"><span class="brand-mark">•••</span><span>signal<span>sms</span></span></NuxtLink><nav :class="{open}"><NuxtLink :to="local('/countries')">{{t.countries}}</NuxtLink><NuxtLink :to="local('/services')">{{t.services}}</NuxtLink><NuxtLink :to="local('/premium')" class="premium-link">✦ {{t.premium}}</NuxtLink><NuxtLink :to="local('/blog')">{{t.blog}}</NuxtLink><NuxtLink :to="local('/api-access')">{{t.api}}</NuxtLink></nav><div class="nav-actions"><button type="button" class="lang" @click="switchLocale">{{lang==='ru'?'EN':'RU'}}</button><a :href="`/api/go/header?lang=${lang}`" rel="nofollow sponsored noopener" class="button button-small">{{t.private}}</a><button class="menu" @click="open=!open">☰</button></div></div></header></template>
