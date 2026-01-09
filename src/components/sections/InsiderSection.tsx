'use client';

import Image from 'next/image';

export default function InsiderSection() {
    return (
        <section className="statement">
            <div className="statement-text">
                <h2 className="statement-headline">
                    Turning your shower<br/>
                    into a sanctuary.
                </h2>
            </div>
            <div className="statement-media">
                <Image
                    src="/images/assets/dad_washing_child_laughing.jpg"
                    alt="Father and child enjoying bath time"
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
        </section>
    );
}
