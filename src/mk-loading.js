const mdToBackend = (res) => ({
    type: 'backend',
    init(services, backendOptions, i18nextOptions) {
        // Initialization logic (if any)
    },
    read(language, namespace, callback) {

        if (typeof res === 'function') {
            if (res.length < 3) {
                try {
                    const r = res(language, namespace);
                    if (r && typeof r.then === 'function') {
                        r.then((module) => {
                            if (module.default && typeof module.default === 'object') {
                                callback(null, (module && module.default) || module)
                            } else {
                                fetch(module.default)
                                    .then(res => res.text())
                                    .then(res => callback(null, {content: res}))
                            }
                        }).catch((err) => {
                            console.error(`Error fetching data for ${language}/${namespace}:`, err);
                            callback(err, false);
                        });
                    } else {
                        callback(null, r);
                    }
                } catch (err) {
                    console.log(`Fetched data error for ${language}/${namespace}:`, err);
                    callback(err);
                }
                return;
            }

            console.log(`Fetched normal data for ${language}/${namespace}:`);
            res(language, namespace, callback);
            return;
        }

        console.log(`Fetched res data for ${language}/${namespace}:`);
        callback(null, res && res[language] && res[language][namespace]);
    }
});

export default mdToBackend;

// const mdToBackend = (res, otherReses = [], keys = []) => ({
//     type: 'backend',
//     init(services, backendOptions, i18nextOptions) {
//         // Initialization logic (if any)
//     },
//     read(language, namespace, callback) {
//         const handleAdditionalResources = (otherReses, keys) => {
//             return Promise.all(otherReses.map((otherRes, i) => {
//                 let other = otherRes(language, namespace)
//                 return other.then((or) => {
//                     return fetch(or.default)
//                         .then(res => res.text())
//                         .then(text => ({ key: keys[i], content: text }))
//                         .catch(err => {
//                             console.error(`Error fetching additional resource for key ${keys[i]}:`, err);
//                             return { key: keys[i], content: null };
//                         });
//                 });
//             }));
//         };
//
//         if (typeof res === 'function') {
//             if (res.length < 3) {
//                 try {
//                     const r = res(language, namespace);
//                     if (r && typeof r.then === 'function') {
//                         r.then((module) => {
//                             handleAdditionalResources(otherReses, keys).then((additionalResources) => {
//                                 const otherJson = additionalResources.reduce((acc, { key, content }) => {
//                                     acc[key] = content;
//                                     return acc;
//                                 }, {});
//
//                                 const mainContent = (module && module.default) || module;
//                                 console.log("mainContent", mainContent)
//                                 const result = { ...otherJson, ...mainContent };
//                                 console.log("result1", result)
//                                 callback(null, result);
//                             }).catch(err => {
//                                 console.error('Error handling additional resources:', err);
//                                 callback(err, false);
//                             });
//                         }).catch((err) => {
//                             console.error(`Error fetching data for ${language}/${namespace}:`, err);
//                             callback(err, false);
//                         });
//                     } else {
//                         console.log(`Fetched sync data for ${language}/${namespace}:`, r);
//                         handleAdditionalResources(otherReses, keys).then((additionalResources) => {
//                             const otherJson = additionalResources.reduce((acc, { key, content }) => {
//                                 acc[key] = content;
//                                 return acc;
//                             }, {});
//
//                             const mainContent = r;
//                             const result = { ...otherJson, ...mainContent };
//                             console.log("result2", result)
//                             callback(null, result);
//                         }).catch(err => {
//                             console.error('Error handling additional resources:', err);
//                             callback(err, false);
//                         });
//                         // callback(null, r);
//                     }
//                 } catch (err) {
//                     console.log(`Fetched data error for ${language}/${namespace}:`, err);
//                     callback(err);
//                 }
//                 return;
//             }
//
//             console.log(`Fetched normal data for ${language}/${namespace}:`);
//             res(language, namespace, callback);
//             return;
//         }
//
//         console.log(`Fetched res data for ${language}/${namespace}:`);
//         callback(null, res && res[language] && res[language][namespace]);
//     }
// });
//
// export default mdToBackend;
