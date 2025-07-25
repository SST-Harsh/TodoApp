import hero1 from '../assets/hero1.png';
import { motion } from 'framer-motion';
import arrow from '../assets/arrow.png';
import { useEffect } from 'react';

export default function HeroSection() {
    
    return (
        <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-gray-100 to-indigo-500 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mt-0 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="flex flex-col justify-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Work Smarter</span>
                            <span className="block">Together Efficiently</span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-gray-600 max-w-md">
                            Streamline your team's workflow and boost productivity with our intuitive task management platform.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Get Started - It's Free
                            </motion.button>
                        </div>
                    </motion.div>
                    
                    
                </div>
                
                {/* Image */}
                <div className=' '>
                     <img 
                     className='  transform  rotate-340  '
                     src={arrow} alt="Arrow icon" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative bg-gradient-to-br from-gray-100 to-blue-200"
                >       
               
                    <img 
                        src={hero1} 
                        alt="Team collaboration"  loading='lazy'
                        className="w-full   h-auto rounded-xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300" 
                    />
                    
                </motion.div>
                </div>
            </div>
        </div>
    )
}