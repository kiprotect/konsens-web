/*
attributes: # these attributes will be added to all submitted events
  - segment
  - referer
  - cohort
  - country
  - user-agent
specs:
    - name: signup # see how many visitors click on the signup button
      match: # a list is always interpreted as a sequence, i.e. two events occuring in chronological order one after another
        - type: click
          id: signup-button
    - name: recurring-visitor # see how many visitors visit more than once
      match:
        - $repeat: # an example of a special `repeat` action that
          min: 2
          match:
            - type: visit
    - name: unique-visitor # this is an elementary event that we capture
    - name: pageview # this is an elementary event that we capture
    - name: perform-scan #
      match:
        - type: url
          regexp: .*#scan-url=(.*)$
          name: scan-url
*/
window.konsensConfig = {
  events: [
    {
      name: 'signup',
      match: [
        {
          type: 'click',
          id: 'signup-button'
        }
      ],
    },
    {
      name: 'recurring-visitor',
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
    {
      name: 'unique-visitor'
    },
    {
      name: 'pageview'
    }
  ]
}