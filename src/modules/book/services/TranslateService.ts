const secretKey = ""

const options = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Api-Key ${secretKey}`,
    },
} as const;

const body = {
    "targetLanguageCode": "ru",
    "texts": [
        "dog",
        "cat",
        "THE baby was born at Whitewater Farms about nine in the morning, April 19, 1900. " +
        "Two pure-breed calves,—one a heifer, the other a bull,—were dropped the same day at nearly the same hour."
    ],
    "folderId": "b1g6p2drfpmac6ddu0sf"
} as const

try {
    // console.log('1')
    // const {data} = await axios.post('https://translate.api.cloud.yandex.net/translate/v2/translate', body, options)

    // {
    //     translations: [
    //         { text: 'собака', detectedLanguageCode: 'en' },
    //         { text: 'кошка', detectedLanguageCode: 'en' },
    //         {
    //             text: 'Ребенок родился на ферме Уайтуотер около девяти утра 19 апреля 1900 года. Два чистокровных теленка - одна телка, другой бык — были брошены в тот же день почти в один и тот же
    //             час.',
    //             detectedLanguageCode: 'en'
    //         }
    //     ]
    // }

}catch (e) {
    console.log(e)
}