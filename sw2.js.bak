'use strict'
// console.log('window:'+ window)
const version = 'xinwen_v1.4'
const __DEVELOPMENT__ = false
const __DEBUG__ = true
const offlineResources = [
  '/' ,
  '/offline.html' ,
]
const ignoreCache = [
  // /https?:\/\/hm.baidu.com\//,
  // /https?:\/\/cdn.bootcss.com\//,
  // /https?:\/\/static.duoshuo.com\//,
  // /https?:\/\/www.google-analytics.com\//,
  // /https?:\/\/dn-lbstatics.qbox.me\//,
  // /https?:\/\/ajax.cloudflare.com\//,
  // /https?:\/\/cdn1.lncld.net\//,
  // /https?:\/\/api.leancloud.cn\//
  /https?:\/\/www.easy-mock.com\//
]

// 慎重使用全局可变变量，因为 serviceWork 不可控的停止和重启，会导致它们的取值在后续读取时无法预测
let port

/**
 * common function
 */

function developmentMode () {
  return __DEVELOPMENT__ || __DEBUG__
}

function cacheKey () {
  return [version, ...arguments].join(':')
}

function log () {
  if (developmentMode()) {
    console.log('SW:', ...arguments)
  }
}

// 不需要缓存的请求
function shouldAlwaysFetch (request) {
  console.log(request)
  return __DEVELOPMENT__ ||
    request.method !== 'GET' ||
    ignoreCache.some(regex => request.url.match(regex))
}

// 缓存 html 页面
function shouldFetchAndCache (request) {
  return (/text\/html/i).test(request.headers.get('Accept'))
}

// 发送 Notification 通知
function sendNotify (title, options, event) {
  if (Notification.permission !== 'granted') {
    log('Not granted Notification permission.')

    // 无授权时，向来源页面申请授权
    if (port && port.postMessage) {
      port.postMessage({
        type: 'applyNotify',
        info: {title, options}
      })
    }

    return
  }

  const notificationPromise = self.registration.showNotification(title || 'Hi：', Object.assign({
    body: '这是一个通知示例',
    icon: '//lzw.me/images/avatar/lzwme-80x80.png',
    tag: 'push'
  }, options))

  return event && event.waitUntil(notificationPromise)
}

/**
 * onClickNotify
 */

function onClickNotify (event) {
  // debugger

  var action = event.action;
  console.log(`action tag: ${event.notification.tag}`, `action: ${action}`);

  switch (action) {
    case 'show-book':
      console.log('show-book');
      break;
    case 'contact-me':
      console.log('contact-me');
      break;
    default:
      console.log(`未处理的action: ${event.action}`);
      action = 'default';
      break;
  }
  event.notification.close();

  event.waitUntil(
  // event.waitUntil(async function() {
    // 获取所有clients
    self.clients.matchAll().then(function (clients) {
      // debugger
      if (!clients || clients.length === 0) {
        return;
      }
      clients.forEach(function (client) {
        // 使用postMessage进行通信
        client.postMessage(action)
      });
    })
  )




  // event.notification.close()
  // const url = 'http://localhost:8080'
  //
  // event.waitUntil(
  //   self.clients.matchAll({
  //     type: 'window'
  //   })
  //     .then(() => {
  //       if (self.clients.openWindow) {
  //         return self.clients.openWindow(url)
  //       }
  //     })
  // )
}

/**
 * Install 安装
 */

function onInstall (event) {
  log('install event in progress.')

  event.waitUntil(
    caches.open(cacheKey('offline'))
      .then(cache => cache.addAll(offlineResources))
      .then(() => log('installation complete! version: ' + version))
      .then(() => self.skipWaiting())
  )
}

/**
 * Fetch
 */

// 当网络离线或请求发生了错误，使用离线资源替代 request 请求
function offlineResponse (request) {
  // debugger
  log('(offline)', request.method, request.url)
  if (request.url.match(/\.(jpg|png|gif|svg|jpeg)(\?.*)?$/)) {
    return caches.match('/wp-content/themes/Kratos/images/default.jpg')
  } else {
    // debugger
    // TODO:这里直接返回页面
    return caches.match('/offline.html')
  }
}

// 从缓存读取或使用离线资源替代
function cachedOrOffline (request) {
  return caches
    .match(request)
    .then((response) => response || offlineResponse(request))
}

// 从网络请求，并将请求成功的资源缓存
function networkedAndCache (request) {
  return fetch(request)
    .then(response => {
      const copy = response.clone()

      caches.open(cacheKey('resources'))
        .then(cache => {
          cache.put(request, copy)
        })

      log('(network: cache write)', request.method, request.url)
      return response
    })
}

// 优先从 cache 读取，读取失败则从网络请求并缓存。网络请求也失败，则使用离线资源替代
function cachedOrNetworked (request) {
  return caches.match(request)
    .then((response) => {
      log(response ? '(cached)' : '(network: cache miss)', request.method, request.url)
      return response ||
        networkedAndCache(request)
          .catch(() => offlineResponse(request))
    })
}
// 优先从网络请求，失败则使用离线资源替代
function networkedOrOffline (request) {
  // debugger
  return fetch(request)
    .then(response => {
      // debugger
      log('(network)', request.method, request.url)
      return response
    })
    .catch(() => offlineResponse(request))
}
// 离线断网读取缓存：优先从 cache 读取，读取失败则使用离线资源替代
function cachedOroffline (request) {
  // debugger
  return caches.match(request)
    .then((response) => {
      // debugger
      log(response ? '(cached)' : '(network: cache miss)', request.method, request.url)
      return response || offlineResponse(request)
    })
    // .catch(() => offlineResponse(request))
}
// 优先从网络请求，请求成功则加入缓存，请求失败则用缓存，再失败则使用离线资源替代
function networkedOrcachedOrOffline (request) {
  // debugger
  return fetch(request)
    .then(response => {
      // debugger
      const copy = response.clone()
      caches.open(cacheKey('resources'))
        .then(cache => {
          cache.put(request, copy)
        })
      log('(network)', request.method, request.url)
      return response
    })
    .catch(() => cachedOroffline(request))
}

function onFetch (event) {
  // debugger
  const request = event.request

  // 优先从网络请求，请求失败则用缓存，再失败则使用离线资源替代
  log(shouldAlwaysFetch(request))
  if (shouldAlwaysFetch(request)) {
    log('AlwaysFetch request: ', event.request.url)
    event.respondWith(networkedOrcachedOrOffline(request))
    return
  }

  // 应当永远从网络请求的资源
  // 如果请求失败，则使用离线资源替代
  // // debugger
  // log(shouldAlwaysFetch(request))
  // if (shouldAlwaysFetch(request)) {
  //   log('AlwaysFetch request: ', event.request.url)
  //   event.respondWith(networkedOrOffline(request))
  //   return
  // }

  // 应当从网络请求并缓存的资源
  // 如果请求失败，则尝试从缓存读取，读取失败则使用离线资源替代
  // // debugger
  log(shouldFetchAndCache(request))
  if (shouldFetchAndCache(request)) {
    event.respondWith(
      networkedAndCache(request).catch(() => cachedOrOffline(request))
    )
    return
  }

  // 优先从 cache 读取，读取失败则从网络请求并缓存。网络请求也失败，则使用离线资源替代
  event.respondWith(cachedOrNetworked(request))
}

/**
 * Activate
 */

function removeOldCache () {
  return caches
    .keys()
    .then(keys =>
      Promise.all( // 等待所有旧的资源都清理完成
        keys
          .filter(key => !key.startsWith(version)) // 过滤不需要删除的资源
          .map(key => caches.delete(key)) // 删除旧版本资源，返回为 Promise 对象
      )
    )
    .then(() => {
      log('removeOldCache completed.')
    })
}

function onActivate (event) {
  log('activate event in progress.')
  event.waitUntil(Promise.all([
    // 更新客户端
    self.clients.claim(),
    removeOldCache()
  ]))
}

/**
 * onPush
 */

function onPush (event) {
  log('onPush ', event)
  sendNotify('Hi:', {
    body: `【${new Date()}】发生了一次 Push 同步事件 ~`
  }, event)
}

/**
 * onSync
 */

function onSync (event) {
  log('onSync', event)
  sendNotify('Hi:', {
    body: `【${new Date()}】发生了一次 Sync 同步事件 ~`
  }, event)
}

/**
 * onMessage
 */

function onMessage (event) {
  log('onMessage', event)

  if (event.ports) {
    port = event.ports[0]
  }

  if (!event.data) {
    return
  }

  // 如果是要求一条通知，则发送
  if (event.data.type === 'notify') {
    const {title, options} = event.data.info || {}
    sendNotify(title, options, event)
  }
}

/**
 * 当网络状态发生变化时，会触发 online 或 offline 事件
 * online:联网
 * offline：断网
 */
function offline () {
  // debugger
  Notification.requestPermission().then(grant => {
    // debugger
    if (grant !== 'granted') {
      return;
    }
    const notification = new Notification("Hi，网络不给力哟", {
      body: '您的网络貌似离线了，不过在志文工作室里访问过的页面还可以继续打开~',
      icon: '//lzw.me/images/avatar/lzwme-80x80.png'
    })
    notification.onclick = function() {
      notification.close()
    }
  })
}

log('Hello from ServiceWorker land!', version)
self.addEventListener('install', onInstall)
self.addEventListener('fetch', onFetch)
self.addEventListener('activate', onActivate)
self.addEventListener('push', onPush)
self.addEventListener('sync', onSync)
self.addEventListener('message', onMessage)
self.addEventListener('offline', offline)
self.addEventListener('notificationclick', onClickNotify)
