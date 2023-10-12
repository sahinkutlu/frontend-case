import {motion} from 'framer-motion'

const Checkbox = ({label,onToggle,checked=false}:CheckboxProps) => {
  return (
    <motion.button 
        initial={{opacity:0,translateX:-300}}
        animate={{opacity:1,translateX:0}}
        /* exit={{opacity:0,translateX:-300}} */
        transition={{type:'spring',duration:0.3}}
        className='text-left flex gap-2 py-0.5' 
        type='button'
        onClick={onToggle}
    >
        <span className='w-5 h-5 border-2 flex p-0.5'>
            {checked&&<span className='bg-blue-500 w-full h-full' />}
        </span>
        <span>{label}</span>
    </motion.button>
  )
}

export default Checkbox