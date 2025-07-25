import HeroSection from "../Components/HeroSection";
import NavBar from "../Components/NavBar";
import { motion } from 'framer-motion';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Marquee from 'react-fast-marquee';
import { useState, useEffect } from 'react';
import batch_actions from '../assets/batch_actions.mp4';
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";
import Form from "./Form";
export default function Main_Page() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);


        return () => clearTimeout(timer);
    }, []);
    const testimonials = [
        {
            quote: "Simple, straightforward, and super powerful. Our team's productivity increased by 40% after switching.",
            author: "Sarah Johnson",
            role: "Product Manager at TechCorp",
            avatar: "SJ"
        },
        {
            quote: "The perfect balance between simplicity and powerful features. It just works.",
            author: "Michael Chen",
            role: "CTO at StartupX",
            avatar: "MC"
        },
        {
            quote: "We've tried countless tools, but this one actually gets adopted by the whole team effortlessly.",
            author: "Emma Rodriguez",
            role: "Team Lead at DesignHub",
            avatar: "ER"
        }
    ];

    return (
        <>

            {loading ? (<>
            {/* <p>Loading...</p> */}
            </>) : (
                <div>
                    <NavBar />
                    <HeroSection />
                    <Form />


                    {/* Testimonials Section */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="py-20 bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8"
                    >
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                                >
                                    Trusted by teams worldwide
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-lg text-gray-600 max-w-3xl mx-auto"
                                >
                                    Join thousands of satisfied teams who have transformed their workflow
                                </motion.p>
                            </div>

                            {/* Mobile Marquee */}
                            <div className="md:hidden mb-20">
                                {/* <Marquee
                                    speed={40}
                                    gradient={false}
                                    pauseOnHover
                                    className="py-4"
                                > */}
                                    <div className="flex overflow-x-auto    gap-5 s "> 
                                    {testimonials.map((testimonial, index) => (
                                        <motion.div
                                            key={index}
                                            className="mx-4 bg-white p-3 min-w-[390px] rounded-lg w-4xl   hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                                            whileHover={{ scale: 1.03 }}
                                        >
                                            <div className="flex items-start mb-4">
                                                <FontAwesomeIcon
                                                    icon={faQuoteLeft}
                                                    className="text-indigo-400 text-xs mr-2 mt-1"
                                                />
                                                <p className="text-gray-700 italic">
                                                    {testimonial.quote}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4">
                                                    {testimonial.avatar}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{testimonial.author}</p>
                                                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                    </div>
                                {/* </Marquee> */}
                            </div>


                            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
                                {testimonials.map((testimonial, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        whileHover={{ y: -5 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                                    >
                                        <div className="mb-6 text-indigo-400">
                                            <FontAwesomeIcon icon={faQuoteLeft} className="text-3xl opacity-70" />
                                        </div>
                                        <p className="text-lg text-gray-700 mb-6 flex-grow">
                                            {testimonial.quote}
                                        </p>
                                        <div className="flex items-center mt-auto">
                                            <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-full flex items-center justify-center font-bold mr-4">
                                                {testimonial.avatar}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8"
                    >
                        <div className="text-center mb-16">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                            >
                                Kickstart your next project with Todoist Templates
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg text-gray-600 max-w-3xl mx-auto"
                            >
                                No need to create projects or setups from scratch when we have 50+ templates made for you.
                            </motion.p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex flex-col justify-center"
                            >

                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    Stay <span className="text-indigo-600">organized</span> with subtasks
                                </h1>

                                <p className="text-xl text-gray-600 mb-8 max-w-lg">
                                    Create custom task templates to generate common tasks quickly and efficiently.
                                    Break down complex projects into manageable subtasks with ease.
                                </p>
                            </motion.div>
                            <div>
                                <video
                                    src={batch_actions}
                                    autoPlay
                                    loop
                                    muted
                                    className="w-full h-auto rounded-lg shadow-lg drop-shadow-2xl transition-transform duration-300 hover:scale-105"
                                />

                            </div>
                        </div>

                    </motion.section>
                <Footer/>
                </div>
                
            )}
            
        </>
    )
}