import i18next from 'i18next';
import { initReactI18next } from "react-i18next";
import ChainedBackend, { ChainedBackendOptions } from 'i18next-chained-backend'
import mdToBackend from "./mk-loading";

export const supportedLanguages = ['en', 'nl'];

i18next
    .use(initReactI18next)
    .use(ChainedBackend)
    .init<ChainedBackendOptions>({
        fallbackLng: supportedLanguages[0],
        lng: supportedLanguages[0], //default language
        supportedLngs: supportedLanguages,
        defaultNS: "about",
        backend: {
            backends: [
                mdToBackend(
                    (language:any, namespace:any) => import(`./content/${namespace}/${namespace}-config-${language}.json`)
                ),
                mdToBackend(
                    (language:any, namespace:any) => import(`./content/markdown/${namespace}-${language}.md`)
                )
            ]
        }
    });

export default i18next;
