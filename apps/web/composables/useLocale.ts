const dictionary = {
  ru: { countries:'Страны', services:'Сервисы', premium:'Премиум', blog:'Блог', reviews:'Отзывы', api:'API', heroTag:'Коды подтверждения без лишнего шума', heroTitle:'Публичные номера для приёма SMS', heroText:'Выберите страну и просматривайте входящие сообщения в обновляемой ленте. Для важных аккаунтов используйте приватный номер.', start:'Выбрать номер', private:'Получить приватный номер', online:'онлайн', messages:'сообщений сегодня', search:'Найти страну или сервис', popularCountries:'Популярные страны', popularServices:'Популярные сервисы', live:'Живая лента номеров', all:'Смотреть все', safety:'Публично по своей природе', safetyText:'Сообщения доступны всем посетителям. Не используйте публичные номера для банков, платежей или важных аккаунтов.', footer:'Удобный каталог публичных номеров для знакомства с приёмом SMS.', legal:'Сервис демонстрирует симулируемую ленту сообщений и не гарантирует доставку реальных SMS.', affiliateNote:'Не используйте бесплатные номера для важных или платёжных аккаунтов.', terms:'Условия', privacy:'Конфиденциальность', active:'Активен', busy:'Занят', expires:'Обновится через', open:'Открыть', noSms:'Нужен номер без очереди?', noSmsText:'Приватный номер быстрее и доступен только вам.', getPremium:'Перейти к премиум-номерам' },
  en: { countries:'Countries', services:'Services', premium:'Premium', blog:'Blog', reviews:'Reviews', api:'API', heroTag:'Verification codes without the noise', heroTitle:'Public numbers for receiving SMS', heroText:'Choose a country and browse incoming messages in a refreshed feed. Use a private number for important accounts.', start:'Choose a number', private:'Get a private number', online:'online', messages:'messages today', search:'Find a country or service', popularCountries:'Popular countries', popularServices:'Popular services', live:'Live number feed', all:'View all', safety:'Public by design', safetyText:'Messages are visible to every visitor. Never use public numbers for banking, payments, or important accounts.', footer:'A focused public-number catalog for exploring online SMS reception.', legal:'This service displays a simulated message feed and does not guarantee delivery of real SMS.', affiliateNote:'Do not use free numbers for important or payment accounts.', terms:'Terms', privacy:'Privacy', active:'Active', busy:'Busy', expires:'Refreshes in', open:'Open', noSms:'Need a number without a queue?', noSmsText:'A private number is faster and available only to you.', getPremium:'Browse premium numbers' }
} as const
export function useLocale() {
  const lang = useCookie<'ru' | 'en'>('signal_locale', {
    default: () => 'ru',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365
  })
  const t = computed(() => dictionary[lang.value === 'en' ? 'en' : 'ru'])
  const local = (path = '') => path || '/'
  const switchLocale = () => {
    lang.value = lang.value === 'ru' ? 'en' : 'ru'
    if (import.meta.client) document.documentElement.lang = lang.value
  }
  return { lang, t, local, switchLocale }
}
