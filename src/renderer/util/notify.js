import Vue from 'vue'

const n = tm => {
  Vue.prototype.$notify({
    title: tm.t,
    message: tm.m,
    type: tm.t,
    position: 'bottom-left'
  })
}

const err = ctmd => {
  if (ctmd.c === -1) n({ t: 'error', m: ctmd.m })
}

const succ = ctmd => {
  if (ctmd.c === 0) n({ t: 'success', m: ctmd.m })
}

const warn = ctmd => {
  if (ctmd.c !== -1 && ctmd.c !== 0) n({ t: 'warning', m: ctmd.m })
}

const cc = ctmd => {
  if (ctmd.c === -1) err(ctmd)
  else if (ctmd.c === 0) succ(ctmd)
  else warn(ctmd)
}

export default {
  n,
  cc,
  err,
  succ,
  warn
}
