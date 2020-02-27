import I18n from 'react-native-i18n'
import * as RNLocalize from "react-native-localize"
import en from './en'
import zh from './zh'

I18n.defaultLocale = 'CN'


I18n.fallbacks = true

I18n.translations = {
    en,
    zh,
}

const locales = RNLocalize.getLocales()
const countryCode =locales[0].countryCode
export  {I18n,locales,countryCode}