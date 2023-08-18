import React from 'react'

import { Flowbite } from 'flowbite-react'

import { Accordion } from 'flowbite-react'
import type { CustomFlowbiteTheme } from 'flowbite-react'

const accordionTheme: CustomFlowbiteTheme = {
  accordion: {
    root: {
      base: 'divide-y divide-[#CD2444]-200 border-[#CD2444]-200 dark:divide-[#CD2444]-700 dark:border-[#CD2444]-700',
      flush: {
        off: 'rounded-lg border',
        on: 'border-b',
      },
    },
    content: {
      base: 'py-5 px-5 last:rounded-b-lg dark:bg-red-900 first:rounded-t-lg text-gray-800',
    },
    title: {
      arrow: {
        base: 'h-6 w-6 shrink-0',
        open: {
          off: '',
          on: 'rotate-180',
        },
      },
      base: 'flex w-full items-center justify-between first:rounded-t-lg last:rounded-b-lg py-5 px-5 text-left font-medium text-black dark:text-red-400',
      flush: {
        off: '',
        on: 'bg-transparent dark:bg-transparent',
      },
      heading: '',
      open: {
        off: '',
        on: 'text-[#CD2444] bg-red-100 dark:bg-red-800 dark:text-white',
      },
    },
  },
}

export default function faq() {
  return (
    <div className="px-32 py-8">
      <Flowbite theme={{ theme: accordionTheme }}>
        <Accordion
          collapseAll
          className="bg-white"
        >
          <Accordion.Panel>
            <Accordion.Title className="text-2xl">
              How does the app calculate your jump height?
            </Accordion.Title>
            <Accordion.Content>
              <p>
                The app uses the time that you are in the air for and the
                displacement equation from physics to calculate the distance you
                are in the air for. Refer to the image below:
              </p>
              <img src="/images/faq-explanation.png"></img>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title className="text-2xl">
              How accurate is this app?
            </Accordion.Title>
            <Accordion.Content>
              <p>
                The equation above does not take into account air resistance
                which would affect acceleration however the effects should be
                negligible.
              </p>
              <br />
              <p>
                However, the biggest thing that would affect your jump height
                using our app would be when you mark your takeoff and landing
                time. To get the most accurate result you want to mark your
                takeoff right when your foot leaves the ground and landing right
                when your foot touches the ground.
              </p>
              <br />
              <p>
                Ideally, you would want to land as minimal knee bend. Since
                bending your legs on landing would artificially increase flight
                time.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title className="text-2xl">
              Why is the app not working?
            </Accordion.Title>
            <Accordion.Content>
              <p>
                If there are any bugs / problems with the website. Please send
                us an email at{' '}
                <a
                  href="mailto: vertcheck@gmail.com"
                  className="text-blue-700 underline"
                >
                  vertcheck@gmail.com
                </a>{' '}
                with an explanation of the issue is. We will try to fix it as
                soon as possible.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </Flowbite>
    </div>
  )
}
