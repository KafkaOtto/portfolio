import i18next from 'i18next';
import { initReactI18next } from "react-i18next";
import ChainedBackend, { ChainedBackendOptions } from 'i18next-chained-backend'
import resourcesToBackend from 'i18next-resources-to-backend';
import aboutEnMd from './content/about/about-en.md'
import landingEnMd from './content/landing/landing-en.md'
import aboutNlMd from './content/about/about-nl.md'
import landingNlMd from './content/landing/landing-nl.md'


const markdownResources = {
    en: {
        markdown: {
            about: aboutEnMd,
            landing: landingEnMd
        }
    },
    nl: {
        markdown: {
            about: aboutNlMd,
            landing: landingNlMd
        }
    },
};
export const supportedLanguages = ['en', 'nl'];

i18next
    .use(initReactI18next)
    .use(ChainedBackend)
    .init<ChainedBackendOptions>({
        fallbackLng: supportedLanguages[0],
        lng: supportedLanguages[0], //default language
        supportedLngs: supportedLanguages,
        backend: {
            backends: [
                resourcesToBackend((language:any, namespace:any) => import(`./content/${namespace}/${namespace}-config-${language}.json`)),
                resourcesToBackend(markdownResources),
            ]
        }
    });

export default i18next;
