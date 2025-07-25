import { useState, useEffect } from "react";
import SplitText from "./SplitText";

export default function Hero() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Trigger animation only on initial page load (i.e., refresh)
        setAnimate(true);
    }, []);

    const handleAnimationComplete = () => {
        setAnimate(false); // reset if needed
    };

    return (
        <div className="my-4">
            <SplitText
                text="Todo App"
                className="text-7xl text-center text-white font-mono mb-10"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                animate={animate} // your SplitText should accept this to run
                onLetterAnimationComplete={handleAnimationComplete}
            />
        </div>
    );
}
