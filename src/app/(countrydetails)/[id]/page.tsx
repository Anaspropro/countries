// import { StaticImport } from "next/dist/shared/lib/get-img-props"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import { FaArrowLeftLong } from "react-icons/fa6";
import Image from "next/image"
import Link from "next/link"

type Detail = {
  name: {
    common: string,
    official: string
  },
  flags: {
    svg: StaticImport
  },
  population : string,
  capital: [number],
  region: string,
  borders: []
}



export default async function codes(
  props: {
    params : Promise<{
      id : string
    }>
  }
) {
  const params = await props.params;
  const response = await fetch (`https://restcountries.com/v3.1/alpha/${params.id}`)
  const details = await response.json()

  return(     
    <div className="my-10 px-8 md:px-32 "> 
      <Link href={'/'} className="border flex shadow px-4 py-2 mt-16 mb-10 w-36 items-center justify-center gap-3 text-xl">
        <FaArrowLeftLong /> Back
      </Link>  
      {details.map((detail: Detail) => (
        <div key={detail.capital[0]} className="grid grid-cols-2 gap-6 justify-center items-center align-middle">
          <article className="col-span-2 md:col-span-1">
            <Image 
              src={detail.flags.svg} 
              alt="" 
              width={200} 
              height={200} 
              priority 
              className="w-[30rem]" 
            />
          </article>

          
          <div className="col-span-1">
            <h1 className="text-2xl md:text-4xl font-bold my-2">
              {detail.name.official}
            </h1>
            <ul className="flex flex-col my-4 text-base gap-3">
              <li><span className="font-semibold">Population:</span> {detail.population.toLocaleString()} </li>
              <li><span className="font-semibold">Region:</span> {detail.region} </li>
              <li><span className="font-semibold">Capital:</span> {detail.capital[0]} </li>
            </ul>
            <div className="">
              <h1 className="font-semibold text-lg mb-4">Border countries: </h1>

              {detail.borders ?
                <div className="grid grid-cols-4 gap-3">
                  {detail.borders.map((item) => (
                    <ul key={item}>
                      <li className="text-center py-2 shadow border-black border">{item}</li>
                    </ul>
                  ))}
                </div>
                : <p>No border countries</p>
              }
            </div>
          </div>
          

          <div>
              {detail.name.common}
          </div>

          
          

        </div>
      ))}      
    </div>
  )
}