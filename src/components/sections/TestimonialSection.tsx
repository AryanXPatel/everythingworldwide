'use client';

import { useState, useEffect } from 'react';

export default function TestimonialSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        { quote: 'Bath time transformed.', author: 'Daniela A.' },
        { quote: 'Pure luxury, every day.', author: 'Tina H.' },
        { quote: 'My skin has never felt better.', author: 'Sandra D.' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <section className="testimonial" id="reviews">
            <blockquote className="testimonial-quote">
                {testimonials[currentIndex].quote}
            </blockquote>
            <cite className="testimonial-author">
                {testimonials[currentIndex].author}
            </cite>
        </section>
    );
}
