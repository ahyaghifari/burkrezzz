import $ from "jquery"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from 'gsap/TextPlugin'

$('document').ready(function() {
  
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
  
  $('.nav-toggle').click(function () {
    $('nav').toggleClass('nav-anim');
  });
  
  $('.navs').click(function () {
    $('nav').toggleClass('nav-anim');
  });


  if ($('#home').length) {
    gsap.from('#intro-image', {
      scrollTrigger: {
        trigger: '#intro',
        scrub: true,
        pin: true,
      },
      rotate: -90,
      duration: 1000
    });
    gsap.from('#burgers h1', {
      scrollTrigger: {
        trigger: "#intro h3"
      },
      duration: 4,
      text: {
        value: ""
      }
    });
  }


})
