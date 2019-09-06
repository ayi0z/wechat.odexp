export default {
  success (d, m = 'success') {
    return {
      c: 0,
      t: 'success',
      m: m,
      d: d
    }
  },
  error (m, d) {
    return {
      c: -1,
      t: 'error',
      m: m,
      d: d
    }
  }
}
