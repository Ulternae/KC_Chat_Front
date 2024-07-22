import { IconAddGroup } from "../../assets/IconAddGroup"
import { IconFlagGroupBottom } from "../../assets/IconFlagGroupBottom"
import { IconFlagGroupTop } from "../../assets/IconFlagGroupTop"

const GroupCardView = () => {
  return (
    <div className="max-w-lg relative min-h-20 bg-liwr-100/50 dark:bg-perl-600 grid grid-cols-[42px_1fr] rounded-lg overflow-hidden -2 border-2 border-liwr-300/50 dark:border-perl-300">
      <div className="w-full border-r-2 border-r-liwr-300/50 dark:border-r-perl-300 grid place-content-center">
        <IconAddGroup className='w-5 h-5' />
      </div>
      <div className="px-4 flex flex-wrap py-6 xl:py-2 gap-y-2 gap-x-4 justify-between">
        <div className="flex gap-2 items-center mr-auto">
          <img
            className="rounded-full w-7 h-7 object-cover"
            src="https://generative-ai-ultisaer.s3.sa-east-1.amazonaws.com/images/astronaut_skull_in_space.png"
            alt="Avatar of group"
          />
          <span className="text-liwr-700 dark:text-perl-100">
            <h1 className="font-medium text-sm sm:text-base leading-none sm:leading-snug">Group 1 Elements</h1>
            <p className="text-xs leading-none sm:leading-snug">PUBLIC</p>
          </span>
        </div>
        <div className="w-44 flex items-center ml-auto">
          <img className=" w-7 h-7 rounded-full object-cover" src="https://generative-ai-ultisaer.s3.sa-east-1.amazonaws.com/images/cosmic_astronaut_with_vibrant_hues.png" alt="" />
          <img className="-ml-2 w-7 h-7 rounded-full object-cover" src="https://generative-ai-ultisaer.s3.sa-east-1.amazonaws.com/images/astronaut_gazing_into_space.png" alt="" />
          <img className="-ml-2 w-7 h-7 rounded-full object-cover" src="https://generative-ai-ultisaer.s3.sa-east-1.amazonaws.com/images/dog_survivor_in_ruined_city.png" alt="" />
          <p className=" ml-2 text-liwr-700 dark:text-perl-100 text-xs ">+2 participants</p>
        </div>

      </div>
      <IconFlagGroupTop className='fill-grp-crimson-100 dark:fill-grp-crimson-300 absolute max-w-72 -top-[1px] -right-[1px]' />
      <IconFlagGroupBottom className='fill-grp-crimson-100 dark:fill-grp-crimson-300 absolute max-w-52 -bottom-[1px] -left-[1px]' />
      <div className="bg-grp-crimson-100 dark:bg-grp-crimson-300 px-2 min-h-4 w-auto rounded-[4px] absolute top-0 right-0 sm:right-1 sm:top-1 ">
        <p className="text-[10px] sm:text-sx truncate font-semibold text-grp-crimson-200 dark:text-grp-crimson-400">
          Super Name Larer Name Large More Nar</p>
      </div>
    </div>
  )
}

export { GroupCardView }
