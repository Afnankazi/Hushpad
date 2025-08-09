import { motion } from 'framer-motion'
import React, { type ReactNode } from 'react'

interface prop {
    children: ReactNode
    time : number
}

const Animate = ({children , time } : prop) => {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2, duration:time , ease:"easeIn"}}  >
      {children}
    </motion.div>
  )
}

export default Animate
