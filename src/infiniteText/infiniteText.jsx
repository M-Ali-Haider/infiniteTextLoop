"use client"
import { useEffect, useRef } from 'react'
import styles from './style.module.css'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
export default function InfiniteText() {

  useEffect(()=>{
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  },[])


  const firstText = useRef(null)
  const secondText = useRef(null)
  const slider = useRef(null)
  let xPercent=0;
  let direction = -1;

  const animation = () =>{
    if(xPercent<= -100){
      xPercent=0;
    }
    if(xPercent> 0){
      xPercent=-100;
    }
    gsap.set(firstText.current, {xPercent:xPercent})
    gsap.set(secondText.current, {xPercent:xPercent})
    xPercent += 0.1 * direction
    requestAnimationFrame(animation)
  }

  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger)
    requestAnimationFrame(animation)

    gsap.to(slider.current,{
      scrollTrigger:{
        trigger:document.documentElement,
        start:0,
        end: window.innerHeight,
        scrub:0.25,
        onUpdate: e => direction = e.direction * -1
      },
      x:"-300px"
    })
  },[])
  return (
    <>
      <div className={styles.background}>
        <div className={styles.shader}></div>
        <Image
          src={`/images/bgdark.jpg`}
          fill={true}
          alt='background image'
        />
        <div ref={slider} className={styles.loopContainer}>
          <div className={styles.loop}>
            <p ref={firstText}>Full Stack Developer -</p>
            <p ref={secondText}>Full Stack Developer -</p>
          </div>
        </div>
      </div>
    </>
  )
}
