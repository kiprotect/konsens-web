export default {
    attributes: [
        'user-agent',
        'country',
        'referer',
        'language',
    ],
    events: [
        {
            name: 'pageview',
            type: 'pageview',
        },
        {
            name: 'unique-visitor',
            type: 'unique-visitor',
        }
    ]
}