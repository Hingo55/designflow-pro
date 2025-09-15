'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import PersonaSelector from '@/components/PersonaSelector'
import Footer from '@/components/Footer'
import React, { useState } from 'react'
import { Compass } from 'lucide-react'
import { usePersona } from '@/hooks/usePersona'
import Lottie from 'lottie-react'
import { useEffect, useState as useComponentState, useRef } from 'react'

function LottieGraphic({ src, alt, className }: { src: string, alt: string, className: string }) {
  const [animationData, setAnimationData] = useComponentState(null)
  const [isLoading, setIsLoading] = useComponentState(true)
  const [error, setError] = useComponentState<string | null>(null)
  const lottieRef = useRef<any>(null)

  // Load animation data
  useEffect(() => {
    console.log('Loading Lottie animation from:', src)
    setIsLoading(true)
    setError(null)
    
    fetch(src)
      .then(response => {
        console.log('Fetch response status:', response.status, response.statusText)
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
        }
        return response.json()
      })
      .then(data => {
        console.log('Animation data loaded successfully, frame count:', data.op || 'unknown')
        setAnimationData(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Error loading Lottie animation:', err)
        setError(err.message)
        setIsLoading(false)
      })
  }, [src])

  // Set speed after the animation loads and starts playing
  useEffect(() => {
    if (lottieRef.current && animationData) {
      // Set speed to 0.33 for slower, more elegant animation
      const attempts = [100, 500, 1000]
      
      attempts.forEach((delay) => {
        setTimeout(() => {
          if (lottieRef.current) {
            // Force pause/play cycle to apply new speed
            if (typeof lottieRef.current.pause === 'function' && typeof lottieRef.current.play === 'function') {
              lottieRef.current.pause()
              setTimeout(() => {
                if (lottieRef.current) {
                  lottieRef.current.setSpeed(0.33)
                  lottieRef.current.play()
                }
              }, 50)
            }
          }
        }, delay)
      })
    }
  }, [animationData])

  if (isLoading) {
    return <div className={className} style={{background: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading...</div>
  }

  if (error || !animationData) {
    console.error('Failed to render Lottie:', error)
    return <div className={className} style={{background: 'rgba(255,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Failed to load</div>
  }

  console.log('Rendering Lottie with data')
  return (
    <Lottie 
      lottieRef={lottieRef}
      animationData={animationData} 
      className={className}
      loop={true}
      autoplay={true}
    />
  )
}

export default function Home() {
  const [isPersonaSelectorOpen, setIsPersonaSelectorOpen] = useState(false)
  const [showTopBanner, setShowTopBanner] = useState(true)
  const [activeFrameworkElement, setActiveFrameworkElement] = useState(0) // 0=discover, 1=define, 2=develop, 3=deliver, 4=design4 logo
  const [highlightedElement, setHighlightedElement] = useState(0) // For continuous visual highlighting
  const [heroElement, setHeroElement] = useState(0) // For hero button/icon cycling (0=Discover, 1=Define, 2=Develop, 3=Deliver, 4=Design4)
  const [heroElementText, setHeroElementText] = useState(0) // For delayed text changes
  const { selectedPersona, handlePersonaSelect } = usePersona()

  // Synchronize framework highlighting with control-system Lottie cadence  
  // Control-system animation at 0.33 speed: 90 frames at 30fps = 9 seconds total
  // Frame timing: 0-15 (1.5s pause) -> 15-65 (5s rotation) -> 65-90 (2.5s pause)
  useEffect(() => {
    const LOTTIE_CYCLE_DURATION = 9000 // 9 seconds total (3s * 3 due to 0.33 speed)
    const GEAR_ROTATION_START_DELAY = 1500 // Start transition when gear begins rotating (frame 15)
    
    // Start first transition after initial pause
    setTimeout(() => {
      setActiveFrameworkElement((prev) => {
        const next = (prev + 1) % 5
        console.log('Active framework element changing from', prev, 'to', next)
        return next
      })
      setHighlightedElement((prev) => {
        const next = (prev + 1) % 5
        console.log('Highlighted element changing from', prev, 'to', next)
        return next
      })
      setHeroElement((prev) => {
        const next = (prev + 1) % 5
        console.log('Hero element changing from', prev, 'to', next)
        return next
      })
      // Delay text change by 1 second after color starts changing
      setTimeout(() => {
        setHeroElementText(1) // Set to 1 (Define) explicitly for first change
        console.log('Hero element text changing to', 1)
      }, 1000)
    }, GEAR_ROTATION_START_DELAY)
    
    // Set up repeating cycle with delay for gear rotation start
    const mainInterval = setInterval(() => {
      setTimeout(() => {
        setActiveFrameworkElement((prev) => {
          const next = (prev + 1) % 5
          console.log('Active framework element changing from', prev, 'to', next)
          return next
        })
        setHighlightedElement((prev) => {
          const next = (prev + 1) % 5
          console.log('Highlighted element changing from', prev, 'to', next)
          return next
        })
        setHeroElement((prev) => {
          const next = (prev + 1) % 5
          console.log('Hero element changing from', prev, 'to', next)
          return next
        })
        // Delay text change by 1 second after color starts changing
        setTimeout(() => {
          setHeroElementText((prev) => {
            const next = (prev + 1) % 5
            console.log('Hero element text changing from', prev, 'to', next)
            return next
          })
        }, 1000)
      }, GEAR_ROTATION_START_DELAY)
    }, LOTTIE_CYCLE_DURATION)

    return () => {
      clearInterval(mainInterval)
    }
  }, [])

  const getPersonaGraphic = () => {
    console.log('Selected persona:', selectedPersona) // Debug log
    switch (selectedPersona) {
      case 'founder-innovator':
        return {
          type: 'inline-svg',
          alt: 'Founder / Innovator',
          className: 'w-80 h-auto',
          svgContent: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-80 h-auto">
              <path fill="white" d="M96 176h48c4.42 0 8-3.58 8-8s-3.58-8-8-8h-48c-4.42 0-8 3.58-8 8s3.58 8 8 8ZM360 168c0 4.42 3.58 8 8 8h48c4.42 0 8-3.58 8-8s-3.58-8-8-8h-48c-4.42 0-8 3.58-8 8ZM155.01 217.07l-41.57 24c-3.83 2.21-5.14 7.1-2.93 10.93 1.48 2.57 4.17 4 6.94 4 1.36 0 2.73-.35 3.99-1.07l41.57-24c3.83-2.21 5.14-7.1 2.93-10.93-2.21-3.83-7.1-5.14-10.93-2.93ZM353 120c1.36 0 2.73-.35 3.99-1.07l41.57-24c3.83-2.21 5.14-7.1 2.93-10.93-2.21-3.83-7.1-5.14-10.93-2.93l-41.57 24c-3.83 2.21-5.14 7.1-2.93 10.93 1.48 2.57 4.17 4 6.94 4ZM308 77.93c1.26.73 2.63 1.07 3.99 1.07 2.76 0 5.45-1.44 6.94-4l24-41.57c2.21-3.83.9-8.72-2.93-10.93-3.83-2.21-8.72-.9-10.93 2.93l-24 41.57c-2.21 3.83-.9 8.72 2.93 10.93ZM256 64c4.42 0 8-3.58 8-8V8c0-4.42-3.58-8-8-8s-8 3.58-8 8v48c0 4.42 3.58 8 8 8ZM193.07 75.01c1.48 2.57 4.17 4 6.94 4 1.36 0 2.73-.35 3.99-1.07 3.83-2.21 5.14-7.1 2.93-10.93l-24-41.57c-2.21-3.83-7.1-5.14-10.93-2.93-3.83 2.21-5.14 7.1-2.93 10.93l24 41.57ZM349 230.93l41.57 24c1.26.73 2.63 1.07 3.99 1.07 2.76 0 5.45-1.44 6.94-4 2.21-3.83.9-8.72-2.93-10.93l-41.57-24c-3.83-2.21-8.72-.9-10.93 2.93-2.21 3.83-.9 8.72 2.93 10.93ZM113.44 94.93l41.57 24c1.26.73 2.64 1.07 3.99 1.07 2.76 0 5.45-1.44 6.94-4 2.21-3.83.9-8.72-2.93-10.93l-41.57-24c-3.83-2.21-8.72-.9-10.93 2.93-2.21 3.83-.9 8.72 2.93 10.93ZM388.37 360.35l-90.31-24.08c-3.01-.8-6.21.21-8.21 2.61l-33.85 40.62-33.85-40.62c-2-2.39-5.2-3.41-8.21-2.61l-90.31 24.08c-20.98 5.59-35.63 24.67-35.63 46.38v97.27c0 4.42 3.58 8 8 8h320c4.42 0 8-3.58 8-8v-97.27c0-21.71-14.65-40.78-35.63-46.38ZM298.88 353.05l4.33 1.15-12.35 49.38-22.73-13.64 30.75-36.9ZM243.87 389.95l-22.73 13.64-12.35-49.38 4.33-1.15 30.75 36.9ZM408 496H104v-89.27c0-14.48 9.77-27.19 23.75-30.92l65.58-17.49 14.9 59.62c.61 2.46 2.36 4.48 4.7 5.45 2.34.97 5 .77 7.18-.53l35.88-21.53 35.88 21.53c1.26.76 2.69 1.14 4.12 1.14 1.04 0 2.08-.2 3.06-.61 2.34-.97 4.08-2.99 4.7-5.45l14.9-59.62 65.58 17.49c13.99 3.73 23.75 16.44 23.75 30.92v89.27ZM240 312h32c13.23 0 24-10.77 24-24v-24c0-8.15 7.27-19.59 14.96-31.71 11.74-18.48 25.04-39.42 25.04-64.29 0-44.11-35.89-80-80-80s-80 35.89-80 80c0 24.87 13.3 45.81 25.04 64.29 7.7 12.12 14.96 23.56 14.96 31.71v24c0 13.23 10.77 24 24 24ZM272 296h-32c-4.41 0-8-3.59-8-8v-16h48v16c0 4.41-3.59 8-8 8ZM214.54 223.71c-10.57-16.64-22.54-35.5-22.54-55.71 0-35.29 28.71-64 64-64s64 28.71 64 64c0 20.21-11.98 39.07-22.54 55.71-7.42 11.68-14.02 22.1-16.45 32.29h-17.01v-20.85c5.06-5.72 16-19.84 16-35.15v-24c0-4.42-3.58-8-8-8s-8 3.58-8 8v24c0 6.64-4.08 14.05-8 19.51-3.92-5.47-8-12.88-8-19.51v-24c0-4.42-3.58-8-8-8s-8 3.58-8 8v24c0 15.3 10.94 29.43 16 35.15v20.85h-17.01c-2.43-10.19-9.03-20.61-16.45-32.29Z" />
            </svg>
          )
        }
      case 'transformation-leader':
        return {
          type: 'inline-svg',
          alt: 'Transformation Leader',
          className: 'w-80 h-auto',
          svgContent: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-80 h-auto">
              <path fill="white" d="M109.01368,22.7568C96.373-2.2187,69.27338-.0508,67.56638.1152,38.06928,1.5938,25.45308,22,24.17188,35.3633c-.3155,3.2676.0498,13.1133.0498,14.7402a3.70936,3.70936,0,0,1-.2549,1.1485s-10.1943,21.2089-10.1973,21.2138a2.7102,2.7102,0,0,0,2.4463,3.8711h5.2334l-.57618,5.374a2.00114,2.00114,0,0,0,.49908,1.5528c.0156.0176,2.4287,2.8506,2.4648,2.8916l-1.7705,2.8603a1.936,1.936,0,0,0,.26862,2.4688c.01948.0185,1.77828,2.0586.52238,7.7148a6.01765,6.01765,0,0,0,1.5889,5.5156c1.9609,2.0557,5.1172,2.8604,8.666,2.2002,3.0215-.5586,7.3506-.1298,9.71,2.125,2.2431,2.1475,3.3711,5.5166,3.5488,10.5987.0742,2.1484.0547,4.2519-.0596,6.249A1.9962,1.9962,0,0,0,48.17578,128a2.05387,2.05387,0,0,0,2.0908-1.8828,55.52892,55.52892,0,0,0,.0635-6.6192c-.1377-3.9003-.7832-9.5312-4.7842-13.3623-3.6133-3.4521-9.3408-3.8593-13.1475-3.1552-2.1787.4033-4.0908.0156-5.0996-1.042a2.01858,2.01858,0,0,1-.5752-1.8672c1.1621-5.2334.2481-8.3926-.6162-10.0381,0,0,1.3955-2.2637,1.4307-2.3389.6494-1.4433.7676-2.4228-.3809-3.7675-.0888-.1006-1.6865-2.0293-2.2509-2.6719l.71972-6.7061a2.013,2.013,0,0,0-.49512-1.5498,1.96934,1.96934,0,0,0-1.4746-.6631h-5.4239l9.294-19.332a7.39554,7.39554,0,0,0,.6552-2.9004c0-1.7031-.3593-11.3535-.0693-14.3535,1.1514-11.9883,12.6738-30.3057,39.6953-31.6426.043-.0029,25.96-2.6826,37.6797,20.4697a47.2743,47.2743,0,0,1,2.0996,37.7139c-1.7226,4.6358-6.5488,14.5469-6.5488,14.5469-3.12008,6.4053-6.1504,13.3408-7.208,20.6504a1.9806,1.9806,0,1,0,3.91792.583c.97858-6.7666,3.86818-13.3545,6.84578-19.4688,0,0,4.9091-10.0849,6.7011-14.9033A51.31939,51.31939,0,0,0,109.01368,22.7568Z" />
              <path fill="white" d="M86.53908 55.042a5.06366 5.06366 0 0 0-1.1953-3.29 5.05646 5.05646 0 0 0 2.2304-.7637h-6.623c-.0508.0996-.0918.2041-.1446.3027a1.57047 1.57047 0 0 0 .2247 1.7754l1.1816 1.1856a1.11048 1.11048 0 0 1 0 1.5732l-2.3652 2.3672a1.13 1.13 0 0 1-1.5782 0l-1.1816-1.1797a1.557 1.557 0 0 0-1.7774-.2246 13.46333 13.46333 0 0 1-2.414 1.0039 1.5742 1.5742 0 0 0-1.1016 1.416v1.668a1.11548 1.11548 0 0 1-1.1152 1.1123h-3.3379a1.11385 1.11385 0 0 1-1.1191-1.1123V59.208A1.56852 1.56852 0 0 0 65.127 57.792a13.59766 13.59766 0 0 1-2.42192-1.0039 1.5537 1.5537 0 0 0-1.7754.2246L59.748 58.1924a1.12787 1.12787 0 0 1-1.57422 0l-2.3691-2.3672a1.11743 1.11743 0 0 1 0-1.5732l1.1816-1.1856a1.56616 1.56616 0 0 0 .2246-1.7754 13.30324 13.30324 0 0 1-1.0058-2.4199A1.56678 1.56678 0 0 0 54.791 47.7715H53.127a1.11039 1.11039 0 0 1-1.11532-1.1113V43.3154A1.11011 1.11011 0 0 1 53.127 42.2051h1.664a1.56692 1.56692 0 0 0 1.41408-1.0996 13.36047 13.36047 0 0 1 1.0058-2.42 1.566 1.566 0 0 0-.2246-1.7753l-1.1816-1.1856a1.11633 1.11633 0 0 1 0-1.5723l2.3691-2.3681a1.125 1.125 0 0 1 1.57422 0l1.18168 1.1797a1.55442 1.55442 0 0 0 1.7754.2246 13.7548 13.7548 0 0 1 2.41792-1.003 1.57484 1.57484 0 0 0 1.09968-1.4169V29.1035a1.11631 1.11631 0 0 1 1.1191-1.1152h3.3379a1.118 1.118 0 0 1 1.1152 1.1152v1.6651a1.57685 1.57685 0 0 0 1.1016 1.4169 13.5335 13.5335 0 0 1 2.414 1.003 1.55531 1.55531 0 0 0 1.7774-.2246l1.1816-1.1797a1.128 1.128 0 0 1 1.5782 0l2.3652 2.3681a1.1094 1.1094 0 0 1 0 1.5723l-1.1816 1.1856a1.57033 1.57033 0 0 0-.2247 1.7753c.0528.0977.0938.2032.1446.3028h6.623a5.047 5.047 0 0 0-2.2304-.7637 5.11042 5.11042 0 0 0-.3165-6.9131l-2.3496-2.3545a5.12175 5.12175 0 0 0-6.9023-.3076 5.12253 5.12253 0 0 0-5.0957-4.6611h-3.3379a5.125 5.125 0 0 0-5.0996 4.6621 5.11521 5.11521 0 0 0-6.8906.2988l-2.375 2.374a5.129 5.129 0 0 0-.3008 6.9014 5.11968 5.11968 0 0 0-4.6641 5.0908v3.3448a5.12006 5.12006 0 0 0 4.6641 5.0918 5.13113 5.13113 0 0 0 .2949 6.8955l2.377 2.374a5.114 5.114 0 0 0 6.8945.3056 5.12211 5.12211 0 0 0 5.0996 4.6612h3.3379a5.11982 5.11982 0 0 0 5.0957-4.6612 5.12032 5.12032 0 0 0 6.8965-.3027L85.043 58.6523A5.06211 5.06211 0 0 0 86.53908 55.042zM38.02728 43.9668c-.0117.3389-.0156 1.0791-.0156 1.0791a1.97556 1.97556 0 0 0 2 1.9717 2.026 2.026 0 0 0 2-2.0293c0-.2969.0039-.5928.0137-.8867a2.00019 2.00019 0 0 0-3.9981-.1348zM40.793 37.9893a2.01756 2.01756 0 0 0 2.51558-1.293c.0957-.2979.1973-.5947.3027-.8887a1.99994 1.99994 0 1 0-3.7597-1.3652q-.18465.5112-.35158 1.0312A1.99907 1.99907 0 0 0 40.793 37.9893zM94.02928 26.6777a2.00011 2.00011 0 1 0-3.2246 2.3672q.27825.378.541.7666a1.99976 1.99976 0 1 0 3.3066-2.25Q94.34763 27.1148 94.02928 26.6777zM43.957 63.249a2.021 2.021 0 0 0 2.795.4356 1.99909 1.99909 0 0 0 .43548-2.795c-.1836-.2529-.3652-.5087-.541-.7695a2.00031 2.00031 0 1 0-3.3106 2.2461C43.53708 62.6641 43.74608 62.959 43.957 63.249zM39.53708 54.6201a2.02606 2.02606 0 0 0 2.5215 1.2813 1.99855 1.99855 0 0 0 1.2812-2.5215c-.0976-.2988-.1894-.5986-.2753-.9014a2.00007 2.00007 0 1 0-3.8438 1.1074Q39.37008 54.10745 39.53708 54.6201zM53.168 66.8545q-.38387-.2784-.75592-.5693A2.00024 2.00024 0 1 0 49.959 69.4453c.28318.2197.57028.4365.86128.6475A1.9999 1.9999 0 0 0 53.168 66.8545zM60.69918 70.6846c-.3008-.0977-.5996-.1992-.8945-.3067a2 2 0 0 0-1.3652 3.7598 11.53413 11.53413 0 0 0 1.64252.4502 2.00056 2.00056 0 0 0 .61718-3.9033zM47.34378 25.6045a2.001 2.001 0 0 0-2.8067.3535c-.2187.2842-.4355.5713-.6465.8623a1.99989 1.99989 0 1 0 3.2383 2.3477q.2784-.38385.5684-.7569A1.99975 1.99975 0 0 0 47.34378 25.6045zM77.375 70.6689c-.29692.0967-.59372.1885-.89652.2745a1.99687 1.99687 0 0 0-1.373 2.4716 2.02321 2.02321 0 0 0 2.4707 1.3741q.5244-.1494 1.039-.3174A2 2 0 0 0 77.375 70.6689zM98.46678 35.2959A2.00019 2.00019 0 1 0 94.668 36.5498q.14637.44385.27538.8936a2.02646 2.02646 0 0 0 2.4765 1.3681 1.99928 1.99928 0 0 0 1.3672-2.4756Q98.63768 35.81015 98.46678 35.2959zM69.01168 71.9883c-.3066 0-.6133-.0059-.9179-.0156a2.00007 2.00007 0 1 0-.1309 3.998c.3476.0117 1.0762.0176 1.0762.0176a1.98787 1.98787 0 0 0 1.9863-2A2.01247 2.01247 0 0 0 69.01168 71.9883zM93.65428 60.4082a1.99809 1.99809 0 0 0-2.793.4453c-.1836.2529-.373.5029-.5644.749a1.9995 1.9995 0 0 0 .3398 2.8077 2.01978 2.01978 0 0 0 2.8086-.3409q.33408-.42765.6543-.8681A1.99951 1.99951 0 0 0 93.65428 60.4082zM99.99218 46.0693c-.0029-.3584.0176-1.1953.0176-1.1953a2 2 0 1 0-4 0s-.0039.7432-.0157 1.0567a2.0021 2.0021 0 0 0 1.9297 2.0683A1.85559 1.85559 0 0 0 99.99218 46.0693zM84.89258 66.8271c-.2559.1856-.5117.3663-.7735.543a2.00167 2.00167 0 0 0-.5332 2.7783 2.022 2.022 0 0 0 2.7793.5323q.44535-.3033.8809-.6192a2 2 0 0 0-2.3535-3.2344zM97.21878 52.043a2.001 2.001 0 0 0-2.5196 1.2851c-.0976.2998-.19918.5977-.3066.8916a1.99974 1.99974 0 0 0 3.7578 1.3692q.1875-.50835.3535-1.0264A1.999 1.999 0 0 0 97.21878 52.043zM59.97268 19.4229a5.564 5.564 0 0 0 1.5214-.3731 2 2 0 0 0-1.1074-3.8437q-.5214.15075-1.0351.3183a2.00175 2.00175 0 0 0-1.2813 2.5215A2.0319 2.0319 0 0 0 59.97268 19.4229zM51.91018 23.5586a3.55541 3.55541 0 0 0 1.9472-.9199 2.00031 2.00031 0 0 0-2.2461-3.3106q-.4512.3048-.8867.626a1.99324 1.99324 0 0 0 1.1856 3.6045zM66.96878 15.9893a2.03572 2.03572 0 0 0 2.0429 1.999c.2871 0 .90632.0146.9278.0146a2 2 0 0 0 .06252-3.999c-.33012-.0107-1.07622-.0146-1.07622-.0146A1.96259 1.96259 0 0 0 66.96878 15.9893zM85.56448 23.6572a2.00025 2.00025 0 0 0 2.4531-3.1601c-.2832-.2198-.5723-.4356-.8633-.6465a1.99989 1.99989 0 0 0-2.3477 3.2383C85.06248 23.2744 85.31638 23.4629 85.56448 23.6572zM78.16988 19.5801a2.00018 2.00018 0 0 0 1.3555-3.7637q-.50985-.18315-1.02738-.3496a2 2 0 1 0-1.22262 3.8086Q77.72658 19.42045 78.16988 19.5801z" />
              <path fill="white" d="M88.01168,42.9883H72.09958a1.99585,1.99585,0,0,0-3.084-1.6787l-3.0918,2a2.00086,2.00086,0,0,0,0,3.3574l3.0918,2a1.99585,1.99585,0,0,0,3.084-1.6787h15.9121a2,2,0,0,0,0-4Z" />
            </svg>
          )
        }
      case 'consultant-architect':
        console.log('Returning Lottie config for consultant') // Debug log
        return {
          src: '/businessman.json',
          alt: 'Consultant / Business Architect', 
          className: 'w-80 h-auto',
          isLottie: true
        }
      case 'project-operations':
        return {
          type: 'inline-svg',
          alt: 'Project / Operations',
          className: 'w-80 h-auto',
          svgContent: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-80 h-auto">
              <path fill="white" d="m444.075,164.494l-23.037-4.542-16.379-39.534,13.081-19.505c4.37-6.519,3.547-14.946-2.003-20.495l-35.004-35.004c-5.548-5.548-13.978-6.371-20.494-2l-19.505,13.08-39.533-16.379-4.542-23.037c-1.518-7.7-8.059-13.078-15.907-13.078h-49.504c-7.848,0-14.389,5.377-15.907,13.077l-4.543,23.038-39.533,16.379-19.505-13.08c-6.521-4.371-14.946-3.545-20.494,2.001l-35.004,35.003c-5.551,5.55-6.373,13.978-2.001,20.495l13.079,19.505-16.379,39.534-23.035,4.542c-7.7,1.518-13.078,8.059-13.078,15.907v49.504c0,7.848,5.377,14.39,13.076,15.908l23.037,4.542,16.379,39.534-13.079,19.505c-4.372,6.518-3.549,14.946,2,20.495l12.786,12.786c-.142,1.362-.269,2.765-.381,4.218-.004.05-.007.101-.01.152-2.443,44.38-1.301,85.251.14,119.379.985,23.314,20.035,41.577,43.37,41.577h207.667c23.336,0,42.386-18.263,43.371-41.578,1.439-34.136,2.582-75.014.14-119.378-.003-.051-.006-.102-.01-.152-.112-1.454-.239-2.856-.381-4.219l12.784-12.785c5.551-5.55,6.374-13.978,2.002-20.496l-13.08-19.504,16.379-39.534,23.037-4.542c7.7-1.518,13.077-8.06,13.077-15.908v-49.504c0-7.848-5.378-14.389-13.077-15.907Zm-54.859,301.338c-.666,15.795-13.573,28.168-29.383,28.168h-11.41v-105.23c0-3.866-3.134-7-7-7s-7,3.134-7,7v105.23h-156.847v-105.23c0-3.866-3.134-7-7-7s-7,3.134-7,7v105.23h-11.41c-15.81,0-28.716-12.373-29.382-28.168-1.426-33.771-2.559-74.191-.153-117.941,1.676-21.677,6.226-28.031,18.178-35.039,10.06-5.899,27.919-10.743,46.823-15.579l44.139-10.856c1.34-.33,2.662-.623,3.977-.9l-18.933,136.042c-.247,1.773.195,3.574,1.235,5.032l32.253,45.181c1.313,1.84,3.436,2.933,5.697,2.933s4.384-1.093,5.697-2.933l32.253-45.181c1.04-1.458,1.482-3.258,1.235-5.032l-18.934-136.042c1.315.277,2.637.571,3.978.901l44.075,10.84c18.968,4.853,36.827,9.697,46.888,15.595,11.951,7.007,16.501,13.361,18.177,35.039,2.404,43.734,1.272,84.162-.153,117.941Zm-66.378-183.352l-35.374-8.701c7.811-5.036,14.892-11.953,20.799-20.511,17.689-25.629,20.928-60.898,7.875-85.769-11.105-21.16-32.463-32.813-60.138-32.813s-49.032,11.653-60.138,32.813c-13.053,24.871-9.814,60.14,7.875,85.769,5.908,8.559,12.988,15.476,20.797,20.511l-35.372,8.701c-22.524-19.468-35.376-47.454-35.376-77.328,0-56.361,45.853-102.213,102.213-102.213s102.214,45.853,102.214,102.213c0,29.874-12.853,57.86-35.375,77.327Zm-66.168-13.167c-.45-.003-.9-.003-1.349,0-15.307-.226-29.513-8.716-40.062-23.998-14.856-21.527-17.737-50.852-7-71.309,8.693-16.564,25.202-25.319,47.741-25.319s39.048,8.755,47.741,25.319c10.737,20.458,7.859,49.782-7,71.309-10.548,15.281-24.75,23.77-40.072,23.997Zm-1.572,14.007c.277.004.554.014.833.014.041,0,.084,0,.123,0,.28,0,.56-.01.84-.014,1.645.016,3.291.069,4.943.175l19.099,137.231-24.936,34.93-24.936-34.93,19.098-137.231c1.649-.106,3.293-.159,4.936-.175Zm188.054-53.415c0,1.106-.7,1.958-1.784,2.172l-26.716,5.267c-2.298.453-4.217,2.025-5.113,4.188l-19.249,46.461c-.896,2.164-.651,4.633.653,6.578l15.169,22.618c.616.918.509,2.016-.274,2.798l-6.076,6.076c-3.637-11.426-10.128-18.628-21.489-25.289-9.433-5.531-23.644-9.964-39.367-14.177,21.307-21.642,33.306-50.663,33.306-81.446,0-64.08-52.134-116.213-116.214-116.213s-116.213,52.133-116.213,116.213c0,30.782,11.999,59.802,33.306,81.445-15.702,4.206-29.926,8.642-39.365,14.177-11.361,6.661-17.853,13.864-21.49,25.29l-6.077-6.077c-.781-.781-.889-1.879-.272-2.797l15.168-22.619c1.305-1.945,1.55-4.414.653-6.578l-19.249-46.461c-.896-2.164-2.815-3.735-5.112-4.188l-26.715-5.267c-1.085-.214-1.785-1.066-1.785-2.172v-49.504c0-1.105.701-1.958,1.786-2.171l26.714-5.267c2.297-.453,4.216-2.025,5.112-4.188l19.249-46.461c.896-2.164.651-4.632-.653-6.578l-15.169-22.621c-.615-.917-.508-2.015.273-2.796l35.004-35.003c.782-.782,1.881-.889,2.799-.274l22.618,15.168c1.944,1.305,4.415,1.55,6.577.653l46.462-19.249c2.163-.896,3.735-2.815,4.188-5.113l5.268-26.715c.214-1.085,1.067-1.786,2.173-1.786h49.504c1.105,0,1.958.7,2.172,1.785l5.268,26.716c.452,2.298,2.024,4.216,4.188,5.113l46.461,19.249c2.161.896,4.632.651,6.577-.653l22.618-15.167c.919-.616,2.018-.508,2.799.273l35.004,35.004c.781.781.889,1.88.273,2.798l-15.169,22.618c-1.305,1.945-1.55,4.414-.653,6.578l19.249,46.461c.896,2.164,2.815,3.735,5.112,4.188l26.716,5.267c1.084.214,1.785,1.066,1.785,2.171v49.504Z" />
            </svg>
          )
        }
      case 'other':
        return {
          src: '/design4gears.svg',
          alt: 'Design4 Framework',
          className: 'w-80 h-auto'
        }
      default:
        return {
          src: '/design4gears.svg',
          alt: 'Design4 Framework Gears - Discover, Define, Develop, Deliver',
          className: 'w-80 h-auto'
        }
    }
  }

  const getHeroText = () => {
    switch (selectedPersona) {
      case 'founder-innovator':
        return "Most startups lose their way as they scale—vision gets diluted, strategy gets scattered, and systems break under growth pressure. The Design4 Framework helps you build a business that scales without losing what made you successful in the first place."
      case 'transformation-leader':
        return "Transform how your organization executes strategy. The Design4 Framework delivers the alignment system that transformation leaders need—connecting purpose directly to performance so your initiatives create lasting change, not just temporary wins."
      case 'consultant-architect':
        return "Most organizations know they need to change but struggle with where to start and how to sustain progress. Design4 gives you a proven framework to guide clients from purpose to performance—creating lasting transformation they'll credit you for."
      case 'project-operations':
        return "Most organizations have great strategies that fail in execution—processes don't connect, capabilities aren't aligned, and performance metrics miss the mark. The Design4 Framework bridges strategy and operations, ensuring what gets planned actually gets done."
      default:
        return "Use the Design4 Framework to keep your outcomes, strategy, capabilities, and operations working together—no matter what comes next."
    }
  }

  const getButtonConfig = () => {
    switch (selectedPersona) {
      case 'founder-innovator':
        return {
          text: "Design4 scale, without losing focus",
          href: "/founder"
        }
      case 'transformation-leader':
        return {
          text: "Design4 your Transformation",
          href: "/transformation-leader"
        }
      case 'consultant-architect':
        return {
          text: "Master the Design4 Framework",
          href: "/consultant"
        }
      case 'project-operations':
        return {
          text: "Design4 strategy to execution",
          href: "/project-operations"
        }
      default:
        return {
          text: "Get the Framework",
          href: "/resources"
        }
    }
  }

  const getHeroElement = () => {
    switch (heroElement) {
      case 0:
        return {
          bgClass: "hero-button-discover",
          icon: "/purpose.json",
          href: "/discover"
        }
      case 1:
        return {
          bgClass: "hero-button-define",
          icon: "/strategy.json",
          href: "/define"
        }
      case 2:
        return {
          bgClass: "hero-button-develop",
          icon: "/capability.json",
          href: "/develop"
        }
      case 3:
        return {
          bgClass: "hero-button-deliver",
          icon: "/success.json", 
          href: "/deliver"
        }
      case 4:
        return {
          bgClass: "hero-button-design4",
          icon: "/design4_logo_white_v2.svg",
          href: "/resources"
        }
      default:
        return {
          bgClass: "hero-button-discover",
          icon: "/purpose.json",
          href: "/discover"
        }
    }
  }

  const getHeroElementText = () => {
    switch (heroElementText) {
      case 0:
        return "Discover"
      case 1:
        return "Define"
      case 2:
        return "Develop"
      case 3:
        return "Deliver"
      case 4:
        return "Design4"
      default:
        return "Discover"
    }
  }
  return (
    <>
      {/* Custom scaling and transition CSS */}
      <style jsx global>{`
        .scale-200 {
          transform: scale(2);
        }
        .scale-100 {
          transform: scale(1);
        }
        .framework-box {
          transition: background-color 3s ease-in-out !important;
        }
        .hero-button {
          transition: all 2s ease-in-out !important;
        }
        .hero-button-discover {
          background-color: #E5C823 !important;
        }
        .hero-button-define {
          background-color: #A02B93 !important;
        }
        .hero-button-develop {
          background-color: #7FBB47 !important;
        }
        .hero-button-deliver {
          background-color: #EE7F24 !important;
        }
        .hero-button-design4 {
          background-color: #5F2762 !important;
        }
      `}</style>
      
      {/* Black Floating Banner */}
      {showTopBanner && (
        <div className="bg-black text-white py-3 px-6 relative">
          <div className="mx-auto max-w-design4-container flex items-center justify-center">
            <button
              onClick={() => setIsPersonaSelectorOpen(true)}
              className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
            >
              <Compass className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">
                Discover how to use the Design4 Framework to accelerate your business success
              </span>
              <span className="ml-2 text-white/60">→</span>
            </button>
            <button
              onClick={() => setShowTopBanner(false)}
              className="absolute right-6 text-white/60 hover:text-white/80 transition-colors p-1"
              aria-label="Close banner"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <Navigation />
      <main className="min-h-screen bg-design4-teal">

      {/* Hero Section */}
      <section className="bg-design4-teal">
        <div className="mx-auto max-w-design4-container px-6 py-24">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-4">
            {/* Control System Graphic with Framework Button */}
            <div className="flex-shrink-0 order-1 lg:order-1 relative flex items-center justify-center">
              {/* Control System Animation */}
              <div className="w-[20rem] lg:w-[22rem] h-auto" style={{filter: 'invert(0.6) sepia(1) saturate(0.8) hue-rotate(180deg) brightness(1.1)'}}>
                <LottieGraphic
                  src="/control-system.json"
                  alt="Design4 Framework Control System"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Cycling Framework Button - Centered on top */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Link 
                  href={getHeroElement().href}
                  className={`w-[6.4rem] h-[6.4rem] text-white rounded-full hero-button ${getHeroElement().bgClass} hover:transform hover:scale-105 flex items-center justify-center`}
                >
                  {heroElementText === 4 ? (
                    <img 
                      src="/design4_logo_white_v2.svg" 
                      alt="Design4 Logo" 
                      className="w-32 h-32"
                    />
                  ) : (
                    <span className="text-base font-bold uppercase">{getHeroElementText()}</span>
                  )}
                </Link>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center lg:text-left order-2 lg:order-2 lg:pt-8">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
                <span className="block">Design business that works...</span>
                <span className="block font-normal text-3xl lg:text-4xl xl:text-5xl text-white/90">and keeps working</span>
              </h1>
              <p className="text-lg xl:text-xl text-white/80 mb-8 max-w-2xl lg:max-w-4xl lg:pr-8">
                {getHeroText()}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <div className="relative inline-block p-1 rounded-xl overflow-hidden animate-border-chase" style={{
                  background: `linear-gradient(90deg, 
                    #E5C823 0%, 
                    #EE7F24 25%, 
                    #A02B93 50%, 
                    #7FBB47 75%, 
                    #E5C823 100%)`,
                  backgroundSize: '300% 100%'
                }}>
                  <Link 
                    href={getButtonConfig().href}
                    className="inline-flex items-center justify-center bg-design4-ink text-white px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-gold focus:ring-offset-2"
                  >
                    {getButtonConfig().text}
                  </Link>
                </div>
                <Link 
                  href={`/ai-strategy${selectedPersona ? `?persona=${selectedPersona}` : ''}`} 
                  className="inline-flex items-center text-white/80 font-medium text-lg hover:text-white transition-colors"
                >
                  Try the Design4 Assistant →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design4 Principles - Modern Feature Layout */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-design4-container px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-6">
              Four Interconnected Framework Elements
            </h2>
            <p className="text-xl text-design4-neutral-500 max-w-4xl mx-auto">
              Each Design4 element depends on and strengthens the others in a continuous cycle.
            </p>
          </div>

          {/* Features Grid */}
          <div className="relative">
            {/* Background Control System Animation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 opacity-15" style={{
                filter: 'invert(0.2) sepia(1) saturate(3) hue-rotate(190deg) brightness(0.6)'
              }}>
                <LottieGraphic
                  src="/control-system.json"
                  alt="Design4 Control System"
                  className="w-full h-full"
                />
              </div>
              
              {/* Cycling Framework Button - Centered on gear */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                <Link 
                  href={getHeroElement().href}
                  className={`w-20 h-20 text-white rounded-full hero-button ${getHeroElement().bgClass} hover:transform hover:scale-105 flex items-center justify-center shadow-lg`}
                >
                  {heroElementText === 4 ? (
                    <img 
                      src="/design4_logo_white_v2.svg" 
                      alt="Design4 Logo" 
                      className="w-16 h-16"
                    />
                  ) : (
                    <span className="text-sm font-bold uppercase">{getHeroElementText()}</span>
                  )}
                </Link>
              </div>
            </div>
            
            <div className="relative grid lg:grid-cols-2 gap-6 mb-6 z-10">
            {/* Discover - Purpose */}
            <div className="group">
              <Link href="/discover" className="block">
                <div className={`framework-box flex items-start gap-6 pl-12 pr-28 py-8 rounded-3xl border border-design4-gold hover:border-design4-gold hover:shadow-lg transition-colors duration-[3s] ease-in-out relative ${highlightedElement === 0 ? 'bg-design4-gold' : 'bg-design4-gold/30'}`}>
                  <div className="flex-1">
                    <div className="inline-block bg-white text-design4-gold rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                      Discover Your Purpose
                    </div>
                    <p className="text-white text-lg font-medium mb-3">
                      Ask: Are we getting the results?
                    </p>
                    <p className="text-white/80 leading-relaxed">
                      <strong>Start with outcomes that matter.</strong> Measure what creates real value for stakeholders and use those insights to drive continuous improvement across everything you do.
                    </p>
                  </div>
                  <div className={`absolute bottom-4 right-4 transition-transform duration-700 ease-in-out ${highlightedElement === 0 ? 'scale-200' : 'scale-100'}`}>
                    <LottieGraphic
                      src="/purpose.json"
                      alt="Purpose Discovery Animation"
                      className="w-16 h-16"
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Define - Strategy */}
            <div className="group">
              <Link href="/define" className="block">
                <div className={`framework-box flex items-start gap-6 pl-28 pr-12 py-8 rounded-3xl border border-design4-purple hover:border-design4-purple hover:shadow-lg transition-colors duration-[3s] ease-in-out relative ${highlightedElement === 1 ? 'bg-design4-purple' : 'bg-design4-purple/30'}`}>
                  <div className="flex-1">
                    <div className="inline-block bg-white text-design4-purple rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                      Define Your Strategy
                    </div>
                    <p className="text-white text-lg font-medium mb-3">
                      Ask: Are we doing the right things?
                    </p>
                    <p className="text-white/80 leading-relaxed">
                      <strong>Purpose without direction is just inspiration.</strong> Connect your organizational why to clear strategic choices about where to play, how to win, and what you won't do.
                    </p>
                  </div>
                  <div className={`absolute bottom-4 left-4 transition-transform duration-700 ease-in-out ${highlightedElement === 1 ? 'scale-200' : 'scale-100'}`}>
                    <LottieGraphic
                      src="/strategy.json"
                      alt="Strategy Definition Animation"
                      className="w-16 h-16"
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Deliver - Value */}
            <div className="group">
              <Link href="/deliver" className="block">
                <div className={`framework-box flex items-start gap-6 pl-12 pr-28 py-8 rounded-3xl border border-design4-orange hover:border-design4-orange hover:shadow-lg transition-colors duration-[3s] ease-in-out relative ${highlightedElement === 3 ? 'bg-design4-orange' : 'bg-design4-orange/30'}`}>
                  <div className="flex-1">
                    <div className="inline-block bg-white text-design4-orange rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                      Deliver Real Value
                    </div>
                    <p className="text-white text-lg font-medium mb-3">
                      Ask: Are we getting them done well?
                    </p>
                    <p className="text-white/80 leading-relaxed">
                      <strong>Capabilities without execution deliver nothing.</strong> Align daily operations with strategic intent through disciplined delivery and clear accountability that drives results.
                    </p>
                  </div>
                  <div className={`absolute top-4 right-4 transition-transform duration-700 ease-in-out ${highlightedElement === 3 ? 'scale-200' : 'scale-100'}`}>
                    <LottieGraphic
                      src="/success.json"
                      alt="Success Delivery Animation"
                      className="w-16 h-16"
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Develop - Capabilities */}
            <div className="group">
              <Link href="/develop" className="block">
                <div className={`framework-box flex items-start gap-6 pl-28 pr-12 py-8 rounded-3xl border border-design4-green hover:border-design4-green hover:shadow-lg transition-colors duration-[3s] ease-in-out relative ${highlightedElement === 2 ? 'bg-design4-green' : 'bg-design4-green/30'}`}>
                  <div className="flex-1">
                    <div className="inline-block bg-white text-design4-green rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                      Develop Your Capabilities
                    </div>
                    <p className="text-white text-lg font-medium mb-3">
                      Ask: Are we doing things the right way?
                    </p>
                    <p className="text-white/80 leading-relaxed">
                      <strong>Strategy without capability is just wishful thinking.</strong> Build systematic approaches, skills, and resources that turn your strategic choices into competitive advantages.
                    </p>
                  </div>
                  <div className={`absolute top-4 left-4 transition-transform duration-700 ease-in-out ${highlightedElement === 2 ? 'scale-200' : 'scale-100'}`}>
                    <LottieGraphic
                      src="/capability.json"
                      alt="Capability Development Animation"
                      className="w-16 h-16"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <p className="text-design4-neutral-500 text-lg mb-6">
              Ready to transform how your organization connects strategy to execution?
            </p>
            <Link 
              href="/resources" 
              className="inline-block bg-design4-primary text-white px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
            >
              Explore the Framework
            </Link>
          </div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="bg-design4-bg">
        <div className="mx-auto max-w-design4-container px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
              Tools That Turn Strategy Into Action
            </h2>
            <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
              Practical resources designed to help you implement the Design4 framework in your organization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI Strategy Advisor */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-gold text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                AI Advisor
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Strategy Assistant
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Get personalized guidance on implementing Design4 principles in your organization.
              </p>
              <Link 
                href={`/ai-strategy${selectedPersona ? `?persona=${selectedPersona}` : ''}`}
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-purple transition-colors"
              >
                Try the AI Advisor →
              </Link>
            </article>

            {/* Resources Library */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-green text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                Library
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Templates & Guides
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Access frameworks, templates, and step-by-step guides for each Design4 phase.
              </p>
              <Link 
                href="/resources" 
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-purple transition-colors"
              >
                Explore Resources →
              </Link>
            </article>

            {/* Dashboard */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-orange text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                Analytics
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Progress Dashboard
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Track your organization's progress through the Design4 transformation journey.
              </p>
              <Link 
                href="/dashboard" 
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-purple transition-colors"
              >
                View Dashboard →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* What Makes Design4 Different */}
      <section className="bg-design4-primary">
        <div className="mx-auto max-w-design4-container px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              What Makes Design4 Different
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Move beyond traditional planning approaches with a framework built for continuous adaptation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Continuous Design</h3>
              <p className="text-white/80 text-sm">Iterate and adapt continuously rather than plan annually</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Integration Patterns</h3>
              <p className="text-white/80 text-sm">Prevent strategy traps through systematic linkage</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Outcome-First</h3>
              <p className="text-white/80 text-sm">Build service models that enable stakeholder success</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Evidence-Based</h3>
              <p className="text-white/80 text-sm">Ground choices in data and stakeholder feedback</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/resources" 
              className="inline-block bg-white text-design4-primary px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-gold focus:ring-offset-2 focus:ring-offset-design4-primary"
            >
              Get the Framework
            </Link>
          </div>
        </div>
      </section>

      </main>
      
      {/* Footer */}
      <Footer />

      {/* Persona Selector Popup */}
      <PersonaSelector 
        isOpen={isPersonaSelectorOpen}
        onClose={() => setIsPersonaSelectorOpen(false)}
        onPersonaSelect={handlePersonaSelect}
      />
    </>
  )
}