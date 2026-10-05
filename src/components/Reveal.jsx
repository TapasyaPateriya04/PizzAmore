/* eslint-disable react/prop-types */
import { motion, useReducedMotion } from 'motion/react';

const elements = {
  article: motion.article,
  aside: motion.aside,
  div: motion.div,
  nav: motion.nav,
  section: motion.section,
};

export default function Reveal({
  as = 'div',
  children,
  className,
  delay = 0,
  distance = 18,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();
  const Element = elements[as] || motion.div;
  const revealMotion = shouldReduceMotion
    ? { initial: false }
    : {
      initial: { opacity: 0, y: distance },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.12, margin: '0px 0px -36px' },
      transition: { duration: 0.58, delay, ease: [0.22, 0.68, 0, 1] },
    };

  return (
    <Element className={className} {...revealMotion} {...props} whileHover={shouldReduceMotion ? undefined : props.whileHover}>
      {children}
    </Element>
  );
}
