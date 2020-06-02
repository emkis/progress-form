const fullViewportHeightMixin = {
  beforeCreate() {
    function handleResize() {
      const viewportHeight = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${viewportHeight}px`)
    }

    window.addEventListener('resize', handleResize)
  },
}

export default fullViewportHeightMixin
