const createElement = str => {
  const el = document.createElement('div');
  el.innerHTML = str;
  return el.firstElementChild;
}

export const vHtmlUnwrap = {
  mounted(el, binding) {
    el.__swapper = createElement(binding.value)
    el.replaceWith(el.__swapper)
  },
  updated(el, binding) {
    let newSwapper = createElement(binding.value)
    el.__swapper.replaceWith(newSwapper)
    el.__swapper.remove()
    el.__swapper = newSwapper
  },
  beforeUnmount(el) {
    el.__swapper.remove()
    delete el.__swapper
  }
}

export default vHtmlUnwrap