import Vue from 'vue'

// 接受 {t,m}
const n = (tm, duration = 3000) => {
  Vue.prototype.$notify({
    title: tm.t,
    message: tm.m,
    type: tm.t,
    position: 'bottom-left',
    duration
  })
}

// 接受 res, 提示错误信息
const err = ctmd => {
  if (ctmd.c === -1) n({ t: 'error', m: ctmd.m })
}

// 接受 res, 提示成功信息
const succ = ctmd => {
  if (ctmd.c === 0) n({ t: 'success', m: ctmd.m })
}

// 接受 res, 提示警告信息
const warn = ctmd => {
  if (ctmd.c === 1) n({ t: 'warning', m: ctmd.m })
}

// 接受 res, 提示普通信息
const info = ctmd => {
  if (ctmd.c !== -1 && ctmd.c !== 0 && ctmd.c !== 1) n({ t: 'info', m: ctmd.m })
}

// 接受 res, 自动提示成功、错误、警告 或 普通提示信息
const cc = ctmd => {
  if (ctmd.c === -1) err(ctmd)
  else if (ctmd.c === 0) succ(ctmd)
  else if (ctmd.c === 1) warn(ctmd)
  else info(ctmd)
}

export default {
  n,
  cc,
  err,
  succ,
  warn,
  info
}
