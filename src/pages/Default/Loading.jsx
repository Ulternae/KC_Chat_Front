const DefaultLoading = () => {
  return (
    <>
      <div className="w grid animate-pulse  md:justify-end place-content-center lg:pr-24">
        <div className="grid grid-rows-[80px_1fr_160px] mt-8 gap-5 sm:grid-rows-2 sm:grid-cols-12 sm:max-w-[1024px] sm:max-h-[525px]">
          <div className="dark:bg-perl-500 bg-liwr-400 rounded-lg h-10 w-[300px] lg:w-[320px] xl:w-[420px] mt-8"></div> 
          <div className="dark:bg-perl-500 bg-liwr-400 rounded-lg  m-auto w-full h-[300px] sm:col-start-7 sm:col-end-13 sm:row-start-1 sm:row-end-3"></div>
          <div className="mt-10 sm:col-start-2 sm:col-end-7 sm:row-start-2 flex flex-col">
            <div className="dark:bg-perl-500 bg-liwr-400 rounded-lg h-8 w-[90%] mb-4 self-end"></div>
            <div className="dark:bg-perl-500 bg-liwr-400 rounded-lg h-6 w-[50%] self-end"></div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export { DefaultLoading };
