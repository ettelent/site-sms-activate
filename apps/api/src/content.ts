export const articles = [
  ['temporary-number-guide','Temporary phone numbers: a practical guide','Временные номера: практическое руководство'],
  ['receive-sms-online','How online SMS reception works','Как работает приём SMS онлайн'],
  ['choose-country','How to choose a country for verification','Как выбрать страну для верификации'],
  ['privacy-basics','Privacy basics for verification codes','Основы приватности для кодов подтверждения'],
  ['number-lifetime','Why temporary numbers expire','Почему временные номера истекают'],
  ['sms-delivery','What affects SMS delivery speed','Что влияет на скорость доставки SMS'],
  ['public-vs-private','Public and private numbers compared','Публичные и приватные номера'],
  ['account-safety','Account safety checklist','Чек-лист безопасности аккаунта'],
  ['verification-errors','Common verification errors','Частые ошибки при верификации'],
  ['api-automation','Automating catalog access with an API','Автоматизация каталога через API']
].map(([slug,titleEn,titleRu], index) => ({
  slug, titleEn, titleRu, publishedAt: new Date(Date.UTC(2026, 6, 31 - index)).toISOString(),
  excerptEn: 'A clear, safety-first explanation with practical steps for working with temporary verification numbers.',
  excerptRu: 'Понятное и безопасное объяснение с практическими рекомендациями по работе с временными номерами.'
}))

const reviewTextsRu = ['Всё нашлось быстро, интерфейс понятный.','Удобно сравнивать страны и сервисы.','Каталог большой, поиск работает хорошо.','Понравилась аккуратная подача информации.','На мобильном пользоваться удобно.']
const reviewTextsEn = ['Fast catalog and a clear interface.','It is easy to compare countries and services.','The search works well on mobile.','Clean layout and useful explanations.','A convenient way to explore the catalog.']
export const reviews = Array.from({ length: 84 }, (_, i) => ({
  id: i + 1, name: ['Alex','Maria','Sam','Nikita','Elena','Chris','Anna'][i % 7], rating: i % 17 === 0 ? 3 : i % 5 === 0 ? 4 : 5,
  textRu: reviewTextsRu[i % reviewTextsRu.length], textEn: reviewTextsEn[i % reviewTextsEn.length],
  date: new Date(Date.UTC(2026, 7, 12 - (i % 70))).toISOString()
}))
