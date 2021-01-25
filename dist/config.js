window.konsensConfig = {
  attributes: ['user-agent', 'cohort', 'segment', 'language'],
  events: [
    // these are elementary default events that we always want to capture
    {
        name: 'my-pageview',
        type: 'pageview',
    },
    {
        name: 'unique-visitor',
        type: 'unique-visitor',
    },
    {
      name: 'signup',
      type: 'click',
      config: {
        id: 'signup-button',
      },
    },
    {
      name: 'recurring-visitor',
      type: 'complex',
      match: [
        {
          $repeat: {
            min: 2,
            match: [
              {
                type: 'visit',
              }
            ]
          }
        }
      ]
    },
  ]
}