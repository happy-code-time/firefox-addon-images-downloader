const getAllTabs = async () => {
    //@ts-ignore
    return await browser.runtime.sendMessage({
        action: 'get-all-tabs',
    })
        .then(data => {
            const tabs = [];

            if (data.allTabs) {
                const activeTabs = data.allTabs;

                /**
                 * Append new urls to the currently stored urls
                 */
                for (let x = 0; x <= activeTabs.length - 1; x++) {
                    if (activeTabs[x] && activeTabs[x].url) {
                        const { url } = activeTabs[x];

                        if (-1 !== url.indexOf('http')) {
                            tabs.push(activeTabs[x]);
                        }
                    }
                }

                return {
                    tabs,
                    data: data.data ? data.data : {}
                };
            }

            return{
                tabs: [],
                data: {}
            };
        })
        .catch((error) => {
            return{
                tabs: [],
                data: {}
            };
        });
};

export default getAllTabs;