let isFirst = 2
const echipadropdown = document.getElementById('echipa')
const buttondropdown = document.getElementById('echipaimg')
const images = document.querySelectorAll('[data-src]')
const homeScroll = document.getElementById('home').offsetTop
const text1 = document.getElementById('teamName')
const text2 = document.getElementById('slogan')
let canAnimate = 1
let lastScroll = 0
const firstSwiper = new Swiper('.first', {
  slidesPerView: 'auto',
  loop: !0,
  speed: 600,
  grabCursor: !0,
  observer: !0,
  roundLengths: !0,
  observeParents: !0,
  autoplay: {
    delay: 5e3,
    disableOnInteraction: !0
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
})
firstSwiper.autoplay.stop()
const otherSwiper = new Swiper('.other', {
  slidesPerView: 'auto',
  loop: !0,
  speed: 600,
  observer: !0,
  observeParents: !0,
  roundLengths: !0,
  grabCursor: !0,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
})
const swiper2 = new Swiper('.swiper', {
  effect: 'coverflow',
  speed: 800,
  grabCursor: !0,
  observer: !0,
  observeParents: !0,
  centeredSlides: !0,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 50,
    depth: 200,
    strech: 0,
    modifier: 1,
    slideShadows: !0
  }
})

function preloadimage (e) {
  const t = e.getAttribute('data-src')
  e.src || (e.src = t)
}
const imgOptions = {
  threshold: 0,
  rootMargin: '100px 0px 100px 0px'
}
const callback = (e, t) => {
  e.forEach(e => {
    e.isIntersecting && (preloadimage(e.target), t.unobserve(e.target))
  })
}
const imgObserver = new IntersectionObserver(callback, imgOptions)

function loadSwiperImages (e) {
  const t = e.getAttribute('data-swiper-lazy')
  console.log(t), Array.prototype.forEach.call(document.getElementsByClassName(t), function (e) {
    const t = e.getAttribute('data-swiper-src')
    e.src || (e.src = t)
  })
}
images.forEach(e => {
  imgObserver.observe(e)
})
const swipers = document.querySelectorAll('[data-swiper-lazy]')
const swiperCallback = (e, t) => {
  e.forEach(e => {
    e.isIntersecting && (loadSwiperImages(e.target), t.unobserve(e.target))
  })
}
const swiperImgOptions = {
  threshold: 0,
  rootMargin: '200px 0px 200px 0px'
}
const swiperObserver = new IntersectionObserver(swiperCallback, swiperImgOptions)
let isDown = 0
let firsttime = 1

function dropdown () {
  console.log(isDown)
  isDown = 1
  document.querySelectorAll('#echipasub li').forEach(e => {
    e.style.pointerEvents = 'all'
  })
  document.getElementById('echipasub').style.opacity = 1
  document.getElementById('echipasub').style.pointerEvents = 'auto'
  echipadropdown.addEventListener('mouseout', () => {
    isDown = 0, document.getElementById('echipasub').style.opacity = 0
    document.getElementById('echipasub').style.pointerEvents = 'none'
    document.querySelectorAll('#echipasub li').forEach(e => {
      e.style.pointerEvents = 'none'
    })
  })
  document.getElementById('echipasub').addEventListener('mouseover', () => {
    echipadropdown.removeEventListener('mouseout', this)
  })
  document.getElementById('echipasub').addEventListener('mouseout', () => {
    isDown = 0, document.getElementById('echipasub').style.opacity = 0
    document.getElementById('echipasub').style.pointerEvents = 'none'
  })
}

function scrollElem (e) {
  const t = document.getElementById(e)
  let scrollDist
  isDown = 0
  document.getElementById('echipasub').pointerEvents = 'all'
  if (t.id === 'home') {
    document.getElementById('header').classList.remove('backgroundFadeIn')
    document.getElementById('header').classList.add('backgroundFadeOut')
  } else {
    document.getElementById('header').classList.remove('backgroundFadeOut')
    document.getElementById('header').classList.add('backgroundFadeIn')
  }
  document.getElementById('echipasub').classList.remove('dropdownFadeIn')
  if (t.offsetTop > window.pageYOffset) {
    scrollDist = t.offsetTop
    document.getElementById('echipasub').classList.add('dropdownFadeOut')
    document.querySelectorAll('#echipasub li').forEach(e => {
      e.style.opacity = '0'
      document.getElementById('echipasub').pointerEvents = 'none'
      e.style.pointerEvents = 'none'
    })
  }
  else
  {
    scrollDist = t.offsetTop - document.getElementById('header').clientHeight
    if (document.getElementById('header').classList.contains('slideUp')) {
      document.getElementById('header').classList.remove('slideUp')
      document.getElementById('header').classList.add('slideDown')
    }
  }
  t.id === 'home' && videoPlay(), window.scrollTo({
    top: scrollDist,
    behavior: 'smooth'
  }), canAnimate = 0, setTimeout(function () {
    canAnimate = 1
  }, 1500)
  if (t.id !== 'home' && t.offsetTop > window.pageYOffset) document.getElementById('header').classList.contains('slideDown') && (document.getElementById('header').classList.add('slideUp'), document.getElementById('header').classList.remove('slideDown'))
}

function swiperAutoPlay () {
  window.pageYOffset > document.getElementById('members').offsetTop && (firstSwiper.autoplay.start(), window.removeEventListener('scroll', swiperAutoPlay))
}

function videoPlay () {
  window.pageYOffset > homeScroll + 400 ? this.document.getElementById('myVideo').pause() : this.document.getElementById('myVideo').play()
}
function dropdownchangebackground (ok) {
  const lists = document.querySelectorAll('#echipasub li')
  if (ok === true) {
    document.getElementById('echipasub').classList.remove('dropdownFadeIn')
    document.getElementById('echipasub').classList.add('dropdownFadeOut')
    let i = 0
    console.log(lists.length)
    while (i < lists.length - 1) {
      lists[i].classList.remove('listFadeIn')
      lists[i].classList.add('listFadeOut')
      i++
    }
  } else {
    document.getElementById('echipasub').classList.remove('dropdownFadeOut')
    document.getElementById('echipasub').classList.add('dropdownFadeIn')
    let i = 0
    while (i < lists.length - 1) {
      lists[i].classList.remove('listFadeOut')
      lists[i].classList.add('listFadein')
      i++
    }
  }
}
function scrollAnimations () {
  const currentScroll = window.pageYOffset
  const about = document.getElementById('about')
  const homeScroll = document.getElementById('home').offsetTop
  const aboutImage = document.getElementById('aboutImage')
  const aboutScroll = about.offsetTop
  if (currentScroll === 0) {
    dropdownchangebackground(true)
    if (document.getElementById('header').classList.contains('slideDown')) {
      document.getElementById('header').classList.remove('backgroundFadeIn')
      document.getElementById('header').classList.add('backgroundFadeOut')
    } else {
      isFirst--
    }
  } else if (currentScroll < lastScroll) {
    if (canAnimate) {
      document.getElementById('echipasub').pointerEvents = 'all'
      document.getElementById('echipasub').classList.remove('dropdownFadeOut')
      document.getElementById('echipasub').classList.add('dropdownFadeIn')
      document.getElementById('header').classList.add('slideDown')
      document.getElementById('header').classList.remove('slideUp')
      document.querySelectorAll('#echipasub li').forEach(e => {
        e.style.opacity = '1'
      })
      dropdownchangebackground(false)
      canAnimate = 0
      setTimeout(() => {
        canAnimate = 1
      }, 300)
    }
  } else if (currentScroll > lastScroll) {
    if (canAnimate) {
      if (document.getElementById('header').classList.contains('slideDown')) {
        dropdownchangebackground(false)
        if (isDown === 1) {
          document.getElementById('echipasub').pointerEvents = 'none'
          document.getElementById('echipasub').style.opacity = '0'
          document.getElementById('echipasub').classList.remove('dropdownFadeIn')
          document.getElementById('echipasub').classList.add('dropdownFadeOut')
          document.querySelectorAll('#echipasub li').forEach(e => {
            e.style.pointerEvents = 'none'
            e.style.opacity = '0'
          })
          isDown = 0
        }
        document.getElementById('header').classList.add('slideUp')
        document.getElementById('header').classList.remove('backgroundFadeOut')
        document.getElementById('header').classList.add('backgroundFadeIn')
        document.getElementById('header').classList.remove('slideDown')
      } else isFirst--
      canAnimate = 0
      setTimeout(() => {
        canAnimate = 1
      }, 300)
    }
  }
  if (currentScroll > homeScroll) {
    document.getElementById('aboutText-text').classList.add('fadeIn')
    this.setTimeout(function () {
      aboutImage.style.visibility = 'visible'
      aboutImage.classList.add('slidelefttocenter')
    }, 200)
  }
  if (currentScroll > aboutScroll) {
    this.setTimeout(function () {
      document.getElementById('FTC_title').classList.add('fadeIn')
      setTimeout(function () {
        document.getElementById('FTC_text').classList.add('slidelefttocenter')
        document.getElementById('FTC_text').style.visibility = 'visible'
        setTimeout(function () {
          document.getElementById('videoFTC').style.visibility = 'visible'
          document.getElementById('videoFTC').classList.add('sliderighttocenter')
          setTimeout(function () {
            document.getElementById('citatFTC_p').classList.add('fadeIn')
          }, 600)
        }, 200)
      }, 300)
    }, 100)
  }
  lastScroll = currentScroll
}

function load () {
  lightbox.option({
    alwaysShowNavOnTouchDevices: !0,
    wrapAround: !0
  }), this.document.getElementById('LoadingBar').classList.add('fade'), this.setTimeout(function () {
    document.getElementById('LoadingBar').style.display = 'none'
  }, 2e3), this.document.getElementById('content').style.display = 'block', this.document.getElementById('content').classList.add('fadeIn'), this.document.getElementById('myVideo'), this.setTimeout(function () {
    this.setTimeout(function () {
      text1.style.animationPlayState = 'running', setTimeout(function () {
        text1.style.animationPlayState = 'paused', text2.style.animationPlayState = 'running', setTimeout(function () {
          document.getElementById('teamName').style.borderColor = 'transparent'
        }, 100)
      }, 2500), setTimeout(function () {
        const sloganBorder = document.getElementById('slogan')
        const nameBorder = document.getElementById('teamName')
        text2.style.animationPlayState = 'paused', this.setTimeout(function () {
          while (sloganBorder.style.borderRight !== 'transparent') { sloganBorder.style.borderRight = 'transparent' }
          while (nameBorder.style.borderRight !== 'transparent') { nameBorder.style.borderRight = 'transparent' }
        }, 100)
      }, 4800)
    }, 1e3)
  }, 1e3)
}

function buttondropdownfunction () {
  firsttime === 1 && (isDown = 0, firsttime = 0), console.log(isDown), isDown ? (isDown = 0, document.getElementById('echipasub').style.opacity = 0, document.getElementById('echipasub').style.pointerEvents = 'none') : (isDown = 1, document.getElementById('echipasub').style.opacity = 1, document.getElementById('echipasub').style.pointerEvents = 'auto'), buttondropdown.classList.toggle('active')
}
swipers.forEach(e => {
  const t = e.getAttribute('data-swiper-lazy')
  console.log(t), swiperObserver.observe(e)
}), buttondropdown.addEventListener('click', buttondropdownfunction)
const bMobile = navigator.userAgent.indexOf('Mobile') !== -1 || navigator.userAgent.indexOf('iPhone') !== -1 || navigator.userAgent.indexOf('Android') !== -1 || navigator.userAgent.indexOf('Windows Phone') !== -1
bMobile || echipadropdown.addEventListener('mouseover', dropdown), window.onload = load(), window.addEventListener('load', load), window.addEventListener('scroll', swiperAutoPlay), window.addEventListener('scroll', scrollAnimations), window.addEventListener('scroll', videoPlay)
