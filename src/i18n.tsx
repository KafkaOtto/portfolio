import i18next from 'i18next';
import { initReactI18next } from "react-i18next";
import ChainedBackend, { ChainedBackendOptions } from 'i18next-chained-backend'
import resourcesToBackend from 'i18next-resources-to-backend';
import aboutEnMd from './content/about/about-en.md'
import landingEnMd from './content/landing/landing-en.md'

const markdownResources = {
    en: {
        markdown: {
            about: aboutEnMd,
            landing: landingEnMd
        }
    },
    // cn: {
    //     markdown: {
    //         about: aboutCnMd
    //     }
    // }
};

i18next
    .use(initReactI18next)
    .use(ChainedBackend)
    .init<ChainedBackendOptions>({
        fallbackLng: 'en',
        lng:"en", //default language
        backend: {
            backends: [
                resourcesToBackend((language:any, namespace:any) => import(`./content/${namespace}/${namespace}-config-${language}.json`)),
                resourcesToBackend(markdownResources),
            ]
        }
    });

export default i18next;
