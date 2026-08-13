<script setup lang="ts">
const { lang } = useLocale()
const { data: countries } = await useFetch<any[]>('/api/catalog/countries')
const q = ref('')
const filtered = computed(() => countries.value?.filter(country =>
  `${country.nameRu} ${country.nameEn} ${country.phoneCode}`.toLowerCase().includes(q.value.toLowerCase())
) || [])

usePageSeo(
  computed(() => lang.value === 'ru' ? 'Виртуальные номера по странам для приёма SMS' : 'Virtual SMS numbers by country'),
  computed(() => lang.value === 'ru'
    ? 'Выберите временный номер по стране и телефонному коду. Каталог 195 направлений для знакомства с онлайн-приёмом SMS и кодами подтверждения.'
    : 'Choose a temporary number by country and calling code. Browse 195 destinations for exploring online SMS and verification codes.')
)

const config = useRuntimeConfig()
useHead({ script: [{ type: 'application/ld+json', innerHTML: computed(() => JSON.stringify({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: lang.value === 'ru' ? 'Главная' : 'Home', item: config.public.siteUrl },
    { '@type': 'ListItem', position: 2, name: lang.value === 'ru' ? 'Страны' : 'Countries', item: `${config.public.siteUrl}/countries` }
  ]
})) }] })
</script>

<template>
  <div class="shell page">
    <span class="kicker">Catalog / 195</span>
    <h1>{{ lang === 'ru' ? 'Виртуальные номера по странам' : 'Virtual numbers by country' }}</h1>
    <p class="lead">{{ lang === 'ru'
      ? 'Найдите временный телефонный номер по стране или международному коду. Каталог помогает сравнить направления для SMS-верификации и перейти к демонстрационной ленте сообщений.'
      : 'Find a temporary phone number by country or international calling code. Compare destinations for SMS verification and open a simulated message feed.' }}</p>
    <input v-model="q" class="search" :placeholder="lang === 'ru' ? 'Поиск страны или телефонного кода…' : 'Search country or calling code…'">
    <div class="card-grid"><CountryCard v-for="country in filtered" :key="country.id" :country="country" /></div>
    <section class="catalog-seo">
      <h2>{{ lang === 'ru' ? 'Как выбрать страну для временного номера' : 'How to choose a country for a temporary number' }}</h2>
      <template v-if="lang === 'ru'">
        <p>Страна определяет международный телефонный код и формат виртуального номера. Для быстрого поиска используйте название направления или код — например, +44 для Великобритании, +1 для Канады и +49 для Германии. На странице выбранной страны отображается набор временных номеров и демонстрационная лента входящих SMS.</p>
        <p>Если вам нужен одноразовый код подтверждения, заранее проверьте, принимает ли выбранное приложение номера нужного региона. У сервисов могут действовать собственные ограничения по географии, частоте запросов и повторной регистрации. Несколько последовательных запросов кода иногда приводят к временной блокировке.</p>
        <p>Публичный бесплатный номер видят другие посетители. Не применяйте его для банковских операций, платёжных аккаунтов, государственных сервисов, восстановления пароля или профиля, к которому нужен постоянный доступ. Для личного использования выбирайте приватный номер.</p>
      </template>
      <template v-else>
        <p>The country determines the international calling code and virtual number format. Search by destination name or code, such as +44 for the United Kingdom, +1 for Canada, or +49 for Germany.</p>
        <p>Check whether the target app accepts the selected region before requesting a verification code. Services may restrict geography, request frequency, and repeated registrations.</p>
        <p>Other visitors can see a public free number. Never use it for banking, payments, government services, password recovery, or an account you need to keep.</p>
      </template>
    </section>
  </div>
</template>
