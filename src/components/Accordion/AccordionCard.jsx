import { IconArrowBottom } from "../../assets/IconArrowBottom"
import { IconFlagStatus } from "../../assets/IconFlagStatus"

const AccordionCard = ({ statusColor, name, section, openSection, toggleSection, children }) => {
  
  return (
    <section className='grid gap-4'>

      <div className='grid gap-1 w-full h-auto py-4 px-4 rounded-lg bg-liwr-400 dark:bg-perl-550'>
        <div className='flex justify-between cursor-pointer'
          onClick={() => toggleSection(section)}
        >
          <IconArrowBottom
            className={`fill-liwr-100 dark:fill-perl-100/80 self-center transform transition-transform duration-300 cursor-pointer ${openSection === section ? 'rotate-180' : ''}`}
          />
          <div
            className=' w-32 flex items-center'
          >
            <IconFlagStatus
              className={`${statusColor}  h-[22px]`}
            />
            <div className='flex items-center bg-liwr-100/80 dark:bg-perl-300 w-full h-5 px-3 rounded-tr-lg rounded-bl-lg'>
              <p className='font-normal leading-none text-sm text-liwr-800 dark:text-perl-100/80'>{name}</p>
            </div>
          </div>
        </div>


        <div
          className={`${openSection === section ? 'flex flex-col gap-4 pt-6' : 'hidden'}`}
        >
          {children}
        </div>
      </div>
    </section>
  )

}

export { AccordionCard }