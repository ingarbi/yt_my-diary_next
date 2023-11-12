import DayState from "@/components/DayState"
import Image from "next/image"


export default function Home() {

  const duties = {
  }
  const today = new Date()
  const todayWeekDay = today.getDay()
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  // console.log(todayWeekDay);
  
  const sortedWeekDays = weekDays.slice(todayWeekDay).concat(weekDays.slice(0, todayWeekDay))
  const last7Days = weekDays.map((_, index)=>{
    const date = new Date()
    date.setDate(date.getDate() -index)
    return date.toISOString().slice(0,10)
  }).reverse()
  // console.log(last7Days);
  
  // console.log(sortedWeekDays);
  return (
    <main className="container relative flex flex-col gap-8 px-4 pt-16">
      {duties === null || (Object.keys(duties).length === 0 && (
        <h1 className="mt-20 text-4xl font-light text-white font-display text-center">
          You have no registered duty
        </h1>
      ))}

      {duties !== null &&
      Object.entries(duties).map(([duty])=>(
        <div key={duty} className="flex flex-col gap-2">
          <div className="flex justify-between item-center">
            <span className="text-xl font-light text-white font-sans">
              {duty}
            </span>
            <button>
              <Image src="/images/delete.svg"  width={20} height={20} alt="Icon delete mark"/>
            </button>
          </div>

          <section className="grid grid-cols-7 bg-neutral-800 rounded-md p-2">
            {weekDays.map((day)=>(
              <div key={day} className="flex flex-col">
                <span  className="font-sans text-center text-xs text-white">{day}</span>
              <DayState day={undefined} />
              </div>
            ))}
          </section>


        </div>
      ))}
      

    </main>
  )
}
