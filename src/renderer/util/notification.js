export default (body, title = 'Export OpenID & Datacube', icon = 'static/icon.ico') => {
  let myNotification = new Notification(title, {
    body: body,
    icon: icon
  })
  myNotification.onclick = () => { console.log('通知被点击') }
}
