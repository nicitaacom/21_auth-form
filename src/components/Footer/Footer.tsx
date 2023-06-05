import { Link } from 'react-router-dom'
import { footerLinks } from '../../constant/index'

export function Footer () {



return (
<footer className='mt-auto'>
      
     {/* Logo + subTitle */}
     <div className='flex flex-col items-center text-center mb-4'>
     <svg className='w-38 h-12 mb-2 MobileL:w-40 MobileL:h-12 Tablet:w-36 Tablet:h-16 LaptopL:w-44 LaptopL:h-22
      4K:w-72 4K:h-28'>
        <use xlinkHref='./sprite.svg#logo'/>
     </svg>
      <p className='MobileM:px-8 4K:text-3xl'>A new way to make the payments easy, 
      reliable and secure.</p>
     </div>


    {/* Footer links */}
    <div className='flex justify-around flex-wrap gap-4 border-b-[1px] border-solid border-[#3F3E45]
    MobileL:flex-nowrap MobileL:px-4'>
      {footerLinks.map((section) => (
          <div className='w-full' key={section.title}>
            <h1 className='font-bold text-xl text-center 4K:text-4xl 4K:pb-2'>{section.title}</h1>
            <ul className='flex flex-col text-center 4K:text-2xl'>
            {section.links.map(link => (
              <Link className='leading-8 4K:leading-10' to={link.link} key={link.name}>{link.name}</Link>
            ))}
            </ul>
          </div>
        )
      )}
    </div>



</footer>
)
}