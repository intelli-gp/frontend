import classNames from 'classnames';

type SkeletonInput = {
    times?: number;
    className?: string;
    darker?: boolean;
};

function Skeleton({ times, className, darker }: SkeletonInput) {
    const outerClassNames = classNames(
        'relative',
        'overflow-hidden',
        { 'bg-gray-200': !darker, 'bg-gray-300': darker },
        'rounded',
        'mb-2.5',
        className,
    );
    const innerClassNames = classNames(
        'animate-shimmer',
        'absolute',
        'inset-0',
        '-translate-x-full',
        'bg-gradient-to-r',
        'via-white',
        {
            'from-gray-200': !darker,
            'to-gray-200': !darker,
            'from-gray-300': darker,
            'to-gray-300': darker,
        },
    );

    const boxes = Array(times ?? 1)
        .fill(0)
        .map((_, i) => {
            return (
                <div key={i} className={outerClassNames}>
                    <div className={innerClassNames} />
                </div>
            );
        });

    return boxes;
}

export default Skeleton;
