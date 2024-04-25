# Portfolio Template
This is a Portfolio Template from [portfolio-template-v2](https://github.com/hrishikeshpaul/portfolio-template-v2.git) with additional feature `language option`,
powered by i18next.

To add language, modify supportedLanguages in [i18n.tsx](src/i18n.tsx) and add
corresponding json file with {{ns}}-{{language}}.json in corresponding directory. For example,
add about-config-en.json under src/content/about.

As i18next doesn't natively support markdown format, adding resources for about.md and landing.md requires an additional step. First, add the necessary files,
then explicitly include them [i18n.tsx](src/i18n.tsx) explicitly. Here's an example:

```javascript
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
```