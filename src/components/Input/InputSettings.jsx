import { Hidden } from "@/assets/Hidden"
import { Show } from "@/assets/Show"
import { IconCheck } from "../../assets/IconCheck"

const InputPassword = ({ title, placeholder, typeField = 'password', fields, setFields, showPassword, setShowPassword }) => {
  const onToggleShowPassword = () => setShowPassword(!showPassword)

  return (
    <div>
      <div className="absolute px-3 py-[2px] left-4 min-w-40 rounded-md bg-liwr-100 dark:bg-perl-800">
        <p className="text-liwr-900 dark:text-perl-100 text-sm font-medium">
          {title}
        </p>
      </div>

      <div className="pt-3">
        <div className="w-full min-h-16  bg-liwr-200 dark:bg-perl-600 rounded-lg flex items-center md:px-8 py-4 px-4 ">
          <div className="relative w-full grid grid-cols-[1fr_25px] gap-2 justify-between">
            <input
              className=" text-ellipsis text-sm text-liwr-900 dark:text-perl-100 mt-1 -mb-1 focus:outline-none bg-transparent placeholder:text-liwr-900/50 dark:placeholder:text-perl-100/50"
              onChange={(e) => setFields({ ...fields, [typeField]: e.target.value })}
              value={fields[typeField]}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
            ></input>
            <button
              type="button"
              onClick={onToggleShowPassword}
              className="h-6  flex items-center "
            >
              {showPassword ? <Show /> : <Hidden />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const InputConfirmAccion = ({ title , placeholder , typeField = 'confirm' , fields, setFields, accionUser }) => {
  return (
    <div>
      <div className="absolute px-3 py-[2px] left-4 min-w-40 rounded-md bg-liwr-100 dark:bg-perl-800">
        <p className="text-liwr-900 dark:text-perl-100 text-sm font-medium">
          { title }
        </p>
      </div>

      <div className="pt-3">
        <div className=" w-full min-h-16  bg-liwr-200 dark:bg-perl-600 rounded-lg flex items-center md:px-8 py-4 px-4 ">
          <div className="relative w-full grid grid-cols-[1fr_25px] gap-2 justify-between">
            <input
              className=" text-ellipsis text-sm text-liwr-900 dark:text-perl-100 mt-1 -mb-1 focus:outline-none bg-transparent placeholder:text-liwr-900/50 dark:placeholder:text-perl-100/50"
              onChange={(e) => setFields({ ...fields, [typeField]: e.target.value })}
              value={fields[typeField]}
              placeholder={ placeholder }
            ></input>
            <IconCheck className={`${accionUser} mt-1 -mb-1 `} />
          </div>
        </div>
      </div>


    </div>
  )
}

const InputConfirmAccionPersonalized = ({ title, placeholder, value, onChange, themeValidate }) => {
  return (
    <div>
      <div className="absolute px-3 py-[2px] left-4 min-w-40 rounded-md bg-liwr-100 dark:bg-perl-800">
        <p className="text-liwr-900 dark:text-perl-100 text-sm font-medium">
          {title}
        </p>
      </div>

      <div className="pt-3">
        <div className="w-full min-h-16 bg-liwr-200 dark:bg-perl-600 rounded-lg flex items-center md:px-8 py-4 px-4">
          <div className="relative w-full grid grid-cols-[1fr_25px] gap-2 justify-between">
            <input
              className="text-ellipsis text-sm text-liwr-900 dark:text-perl-100 mt-1 -mb-1 focus:outline-none bg-transparent placeholder:text-liwr-900/50 dark:placeholder:text-perl-100/50"
              onChange={onChange}
              value={value}
              placeholder={placeholder}
            />
            <IconCheck className={`${themeValidate} mt-1 -mb-1`} />
          </div>
        </div>
      </div>
    </div>
  );
};


const InputFields = ({ title , placeholder , typeField , fields, setFields}) => {

  return (
    <div>
      <div className="absolute px-3 py-[2px] left-4 min-w-40 rounded-md bg-liwr-100 dark:bg-perl-800">
        <p className="text-liwr-900 dark:text-perl-100 text-sm font-medium">
          {title}
        </p>
      </div>

      <div className="pt-3">
        <div className="w-full min-h-16  bg-liwr-200 dark:bg-perl-600 rounded-lg flex items-center md:px-8 py-4 px-4 ">
          <div className="relative w-full grid grid-cols-[1fr_25px] gap-2 justify-between">
            <input
              className=" text-ellipsis text-sm text-liwr-900 dark:text-perl-100 mt-1 -mb-1 focus:outline-none bg-transparent placeholder:text-liwr-900/50 dark:placeholder:text-perl-100/50"
              onChange={(e) => setFields({ ...fields, [typeField]: e.target.value })}
              value={fields[typeField]}
              type={"text"}
              placeholder={placeholder}
            ></input>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export { InputPassword, InputConfirmAccion, InputFields, InputConfirmAccionPersonalized }