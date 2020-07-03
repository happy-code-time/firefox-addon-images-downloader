import getTranslations from "../../Translations";

const getSecurityList = () => {

    const translations: any = getTranslations();

    return [
        {
            name: 'blacklistedElementsCookies',
            translated: translations.blacklistedElementsCookies,
            link: 'blacklist-cookies',
            img: 'cookies-690037_1920.jpg'
        },
        {
            name: 'blacklistedElementsDomians',
            translated: translations.blacklistedElementsDomians,
            link: 'blacklist-urls',
            img: 'earth-1149733_1920.jpg'
        },
        {
            name: 'blacklistedElementsUrlsIncludes',
            translated: translations.blacklistedElementsUrlsIncludes,
            link: 'blacklist-urls-includes',
            img: 'earth-1149733_1920.jpg'
        },
        {
            name: 'blacklistedElementsIframes',
            translated: translations.blacklistedElementsIframes,
            link: 'blacklist-iframes',
            img: 'building-1245984_1920.jpg'
        },
        {
            name: 'blacklistedElementsTrackers',
            translated: translations.blacklistedElementsTrackers,
            link: 'blacklist-trackers',
            img: 'people-690810_1920.jpg'
        },
        {
            name: 'blacklistedElementsWords',
            translated: translations.blacklistedElementsWords,
            link: 'blacklist-words',
            img: 'book-1209805_1920.jpg'
        },
        {
            name: 'blacklistedElementsClass',
            translated: translations.blacklistedElementsClass,
            link: '360-dom-blocker-class',
            img: 'computer-1209641_1920.jpg'
        },
        {
            name: 'blacklistedElementsHref',
            translated: translations.blacklistedElementsHref,
            link: '360-dom-blocker-href',
            img: 'computer-1209641_1920.jpg'
        },
        {
            name: 'blacklistedElementsId',
            translated: translations.blacklistedElementsId,
            link: '360-dom-blocker-id',
            img: 'computer-1209641_1920.jpg'
        },
        {
            name: 'whitelistedElementsDomains',
            translated: translations.whitelistedElementsDomains,
            link: 'whitelist-domains',
            img: 'desk-1081708_1920.jpg'
        }
    ];
}

export default getSecurityList;