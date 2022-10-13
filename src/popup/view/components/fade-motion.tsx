import { motion } from 'framer-motion';
import { ComponentProps, memo, useMemo } from 'react';

type TProps = Pick<ComponentProps<typeof motion.div>, 'children' | 'style'>;

export const FadeMotion = memo<TProps>((props) => {
	const fixed = useMemo<ComponentProps<typeof motion.div>>(
		() => ({
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			transition: { duration: 0.3 },
		}),
		[]
	);

	return <motion.div {...fixed} {...props} />;
});
FadeMotion.displayName = 'FadeMotion';
