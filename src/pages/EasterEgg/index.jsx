import { useTranslation } from "react-i18next";
import { Bear } from "../../assets/Bear";
import { Dog } from "../../assets/Dog";

const EasterEgg = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full max-w-[1111px] h-full min-h-[600px] grid grid-cols-[repeat(16,_minmax(0,_1fr))] grid-rows-8">
      <div className="max-w-[600px] col-start-1 col-end-12 sm:col-end-10 row-start-1 row-end-9 sm:row-end-8 flex justify-end">
        <img className="mt-auto w-full" src="easterEgg.png" />
      </div>
      <div className="transform scale-x-[-1] max-w-[400px] col-start-3 col-end-9 row-start-6 row-end-9 sm:row-start-4 sm:row-end-8 flex justify-end">
        <Dog className="mt-auto w-full" />
      </div>
      <div className="transform scale-x-[-1]  max-w-[380px] col-start-1 col-end-6 row-start-4 row-end-7 sm:row-start-2 sm:row-end-6 flex justify-end">
        <img className="mt-auto w-full"  src="parrot.png" />
      </div>
      <div className="transform scale-x-[-1]  max-w-[400px] col-start-1 col-end-7 row-start-5 row-end-9 flex justify-end">
        <Bear className="mt-auto w-full" />
      </div>
      <div className="z-10 max-w-[400px] col-start-6 col-end-13 row-start-5 row-end-9 flex justify-end">
        <img className="mt-auto w-full" src="salamander.png" />
      </div>
      <div className="z-10 max-w-[400px] col-start-10 col-end-[17] row-start-5 row-end-9 flex justify-end">
        <img className="mt-auto w-full" src="crocodile.png" />
      </div>
      <div className="place-content-center col-start-1 col-end-[17] row-start-1 row-end-4 sm:grid sm:place-content-center sm:col-start-2 sm:col-end-[16] sm:row-start-1 sm:row-end-3 md:col-start-11 md:col-end-[17] md:row-start-2 md:row-end-4 lg:col-start-2 lg:col-end-[16] lg:row-start-1 lg:row-end-3 xl:col-start-11 xl:col-end-[17] xl:row-start-2 xl:row-end-4 lg:grid lg:place-content-center">
        <span className="text-center sm:text-center lg:text-center xl:text-end text-2xl md:text-3xl lg:text-4xl font-semibold text-liwr-900 dark:text-perl-100">
        <h1>{t('easterEgg.easterEggFound')}</h1>
        <h1>{t('easterEgg.congratulations')}</h1>
        </span>
      </div>
    </div>
  );
};

export { EasterEgg };
