import { afterAll, expect, test } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import TestSubject from './TestSubject.vue'

const defaultHtmlSample = `<div data-test="sample-1">sample 1</div>`
const htmlSample2 = `<div data-test="sample-2">sample 1</div>`
const multiNodeSample = `
  <div data-test="mn-sample-1">mn sample 1</div>
  <div data-test="mn-sample-2">mn sample 2</div>
`
const mixedNodeSample = `
  Some text then <a href="https://example.com" data-test="mix-node-link">a link</a>.
`

function Wrapper(mountOptions = {}) {
  return mount(TestSubject, {
    props: { html: defaultHtmlSample },
    ...mountOptions
  })
}

function findByTestId(wrapper, testId) {
  return wrapper.find(`[data-test="${testId}"]`)
}

test('unwraps when declared on a regular element', () => {
  const wrapper = Wrapper()
  const scope = findByTestId(wrapper, "unwrap-on-el")

  expect(findByTestId(scope, "replaced").exists()).toBe(false)
  expect(findByTestId(scope, "sample-1").exists()).toBe(true)
})

test('unwraps when declared on a template tag', () => {
  const wrapper = Wrapper()
  const scope = findByTestId(wrapper, "unwrap-on-template")

  expect(findByTestId(scope, "replaced").exists()).toBe(false)
  expect(findByTestId(scope, "sample-1").exists()).toBe(true)
})

test('unwraps reactively when binding value changes', async() => {
  const wrapper = Wrapper()
  const scope = findByTestId(wrapper, "unwrap-on-template")

  expect(findByTestId(scope, "replaced").exists()).toBe(false)
  expect(findByTestId(scope, "sample-1").exists()).toBe(true)

  await wrapper.setProps({ html: htmlSample2 })

  expect(findByTestId(scope, "replaced").exists()).toBe(false)
  expect(findByTestId(scope, "sample-1").exists()).toBe(false)
  expect(findByTestId(scope, "sample-2").exists()).toBe(true)
})

test('cleanups on unmount', async() => {
  const wrapper = Wrapper()
  const elementScope = findByTestId(wrapper, "unwrap-on-el")
  const templateScope = findByTestId(wrapper, "unwrap-on-template")

  expect(findByTestId(elementScope, "sample-1").exists()).toBe(true)
  expect(findByTestId(templateScope, "sample-1").exists()).toBe(true)
  wrapper.unmount()

  expect(findByTestId(elementScope, "sample-1").exists()).toBe(false)
  expect(findByTestId(templateScope, "sample-1").exists()).toBe(false)
})

// TODO
test('it works with multinode content', () => {
  const wrapper = Wrapper({
    props: { html: multiNodeSample }
  })
  const scope = findByTestId(wrapper, "unwrap-on-el")


  expect(findByTestId(scope, "mn-sample-1").exists()).toBe(true)
  expect(findByTestId(scope, "mn-sample-2").exists()).toBe(true)
})

// TODO
test('it works with mixed nodes content (text nodes + element nodes)', () => {
  const wrapper = Wrapper({
    props: { html: mixedNodeSample }
  })
  const scope = findByTestId(wrapper, "unwrap-on-el")


  expect(findByTestId(scope, "mix-node-link").exists()).toBe(true)
  expect(scope.text()).toContain('Some text then')
})

