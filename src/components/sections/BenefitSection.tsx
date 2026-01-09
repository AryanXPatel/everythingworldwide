'use client';

export default function BenefitSection() {
    const benefits = [
        'Frictionless cleansing',
        'Dense micro-foam',
        'Warmth retention',
        'For all skin types',
    ];

    return (
        <section className="benefits" id="benefits">
            <div className="benefits-inner">
                <span className="benefits-label">Benefits</span>
                <ul className="benefits-list">
                    {benefits.map((benefit, i) => (
                        <li key={i} className="benefits-item">
                            {benefit}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
