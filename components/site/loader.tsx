import Image from 'next/image'

// Splash screen: plays on every full page load (not on in-app navigation, where the layout persists).
// Pure CSS timing, so it always removes itself, even if JavaScript fails.
export function Loader({ legalName }: { legalName: string }) {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader-core">
        <div className="loader-globe">
          <svg className="loader-ring" viewBox="0 0 200 200"><circle cx="100" cy="100" r="96" pathLength="1" /></svg>
          <Image src="/brand/wims-globe.png" alt="" width={512} height={512} sizes="168px" priority />
        </div>
        <Image className="loader-word" src="/brand/wims-wordmark.png" alt="" width={298} height={84} sizes="150px" priority />
        <div className="loader-bar"><span /></div>
        <p className="loader-name">{legalName}</p>
      </div>
    </div>
  )
}

// Marks JS as available, and once the splash has finished, shortens the hero delay for later in-app visits to Home.
export const loaderScript = `try{var d=document.documentElement;d.classList.add('js');setTimeout(function(){d.setAttribute('data-seen','')},2900)}catch(e){}`
