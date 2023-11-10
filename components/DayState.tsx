import Image from "next/image"

export default function DayState({day}: {day: boolean | undefined}){
    let image: [string, string, number?] = ["/images/mark.svg", "gray mark", 12]

    if (day === true) image = ["/images/check.svg", "green mark", 24]
    if (day === false) image = ["/images/x.svg", "red mark", 24]


    const [src, alt, size] = image
    return(

        <div className="flex items-center justify-center h-9">
            <Image src={src} width={size} height={size} alt={alt} />
        </div>
    )

}