import { AnimationProps, motion } from 'motion/react';
import { ComponentProps, memo } from 'react';

type TProps = Omit<ComponentProps<typeof motion.div>, keyof AnimationProps>;

const animation: AnimationProps = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: 0.3 },
};

export const FadeMotion = memo<TProps>((props) => {
	return <motion.div {...animation} {...props} />;
});
FadeMotion.displayName = 'FadeMotion';
