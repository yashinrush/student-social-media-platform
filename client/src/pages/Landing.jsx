import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaProjectDiagram, FaQuestionCircle, FaComments } from 'react-icons/fa';

const Landing = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
                        >
                            Connect, Collaborate, and <span className="text-blue-600 dark:text-blue-500">Grow</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                        >
                            The ultimate platform for students to showcase projects, ask doubts, find internships, and build a community. Join thousands of students today!
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-10 flex items-center justify-center gap-x-6"
                        >
                            <Link
                                to="/register"
                                className="rounded-md bg-blue-600 px-5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all hover:scale-105"
                            >
                                Get Started
                            </Link>
                            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:underline decoration-blue-500 underline-offset-4">
                                Already have an account? <span aria-hidden="true">→</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">Everything you need</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Supercharge your student life
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                            {[
                                {
                                    name: 'Showcase Projects',
                                    description: 'Build your portfolio by sharing your academic and personal projects with peers and recruiters.',
                                    icon: FaProjectDiagram,
                                    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
                                },
                                {
                                    name: 'Ask Doubts',
                                    description: 'Stuck on a problem? Ask the community and get answers from fellow students and seniors.',
                                    icon: FaQuestionCircle,
                                    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
                                },
                                {
                                    name: 'Find Internships',
                                    description: 'Discover internship opportunities and get referrals from alumni and seniors in top companies.',
                                    icon: FaUserGraduate,
                                    color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
                                },
                                {
                                    name: 'Join Communities',
                                    description: 'Connect with like-minded individuals in specialized communities for coding, design, and more.',
                                    icon: FaComments,
                                    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
                                },
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature.name}
                                    className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${feature.color}`}>
                                        <feature.icon className="h-8 w-8" aria-hidden="true" />
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                                        <p className="flex-auto">{feature.description}</p>
                                    </dd>
                                </motion.div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative isolate overflow-hidden bg-blue-600 py-16 sm:py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                        <div className="max-w-xl lg:max-w-lg">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to get started?</h2>
                            <p className="mt-4 text-lg leading-8 text-blue-100">
                                Join the fastest growing student community today. Create your account and start your journey.
                            </p>
                            <div className="mt-6 flex max-w-md gap-x-4">
                                <Link
                                    to="/register"
                                    className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    Sign up now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
