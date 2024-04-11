import i18next from 'i18next';
import { initReactI18next } from "react-i18next";
import ChainedBackend, { ChainedBackendOptions } from 'i18next-chained-backend'
import resourcesToBackend from 'i18next-resources-to-backend';

i18next
    .use(initReactI18next)
    .use(ChainedBackend)
    .init<ChainedBackendOptions>({
        fallbackLng: 'en',
        lng:"en", //default language
        backend: {
            backends: [

                resourcesToBackend((language:any, namespace:any) => import(`./content/${namespace}/${namespace}-config-${language}.json`)),
                // resourcesToBackend((language:any, namespace:any) => import(`./content/${namespace}/${namespace}-config-${language}.json`)),
            ]
        }
    });

export default i18next;