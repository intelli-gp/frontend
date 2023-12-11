import classNames from "classnames";

type FeactureProps = {
    color: string;
    imgURL: string;
    title: string;
    para: string;
    additionalClass: string;
    typoStyles: string;
};

export default function Feature({ color, imgURL, title, para,additionalClass,typoStyles }: FeactureProps) {
     const stylee= classNames(
        color, "h-auto max-h-[800px] flex flex-wrap cursor-pointer space-between gap-x-2 flex-row items-stretch rounded-2xl py-4 px-8 shadow-md shadow-indigo-500/10");
      const titleStyle=`mb-1 text-[24px] ${additionalClass}`;
      const paraStyle=`text-sm pt-3  ${additionalClass}`;
      const imgStyle=`max-h-full w-full   `;
      const typoStyle=`flex flex-col justify-center   ${typoStyles}`;
    return (
        <div className={stylee}>
            <div className={typoStyle}>
                <h2 className={titleStyle}>
                    {title}
                </h2>
                <p className={paraStyle}>
                    {para}
                </p>
            </div>
            <div className="flex  w-2/6 justify-center">
            <img
                src={imgURL}
                alt={title}
                className={imgStyle}
            />
            </div>
            
        </div>
    );
}